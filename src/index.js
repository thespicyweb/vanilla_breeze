import "./codemirror-editor"

const classesForNode = (node) => {
  if (typeof node.className === "object") {
    // svg
    return node.className.baseVal
  } else {
    return node.className
  }
}

const app = () => {
  const sourceHTML = () => document.querySelector("#html-source")
  const outputHTML = () => document.querySelector("#html-output")
  const globalCSS = () => document.querySelector("#css-output-global")
  const componentCSS = () => document.querySelector("#css-output-component")

  const showPreview = () => {
    const preview = document.querySelector("#preview")
    preview.innerHTML = ""
  
    const html = `
      <html>
        <head>
          <style>${globalCSS().value}</style>
          <style>${componentCSS().value}</style>
          <style>
            body.dark {
              background: rgb(17 24 39);
            }
          </style>
        </head>
        <body style="display: flex; align-items: center; justify-content: center; height: 100vh;" class="${
          document.querySelector("#toggle-dark-mode").checked ? "dark" : ""
        }">
          <main>${outputHTML().value}</main>
        </body>
      </html>
    `
    const iframe = document.createElement("iframe")
    iframe.srcdoc = html
    preview.appendChild(iframe)
  }

  document.querySelector("#toggle-dark-mode").addEventListener("click", (e) => {
    document
      .querySelector("#preview iframe")
      .contentDocument.body.classList.toggle("dark", e.target.checked)
  })

  document.querySelector("#show-preview").addEventListener("click", showPreview)

  document.querySelector("#convert").addEventListener("click", async (e) => {
    e.target.loading = true
    const componentName = document.querySelector("#component-name").value

    const selectorType = document.querySelector("#selector-type").value
    const rootElName = selectorType === "element" ? componentName : "tailwind-conversion"

    const parser = new DOMParser()
    const doc = parser.parseFromString(
      `<${rootElName}>${sourceHTML().value}</${rootElName}>`,
      "text/html"
    )

    const rootEl = doc.querySelector(rootElName)

    const treeWalker = document.createTreeWalker(rootEl, NodeFilter.SHOW_ELEMENT)

    var getParents = function (elem) {
      // Set up a parent array
      var parents = []

      // Push each parent element to the array
      for (; elem && elem !== rootEl; elem = elem.parentNode) {
        parents.push(elem)
      }

      // Return our parent array
      return parents
    }

    let nodeList = []
    let uniqCount = 1

    let currentNode = treeWalker.currentNode
    let combinator = document.querySelector("#combinator").value == "child" ? " > " : " "

    while (currentNode) {
      let uniqClassName = null
      let same = null
      const nodeParents = getParents(currentNode)
      let parentsSelectorList = nodeParents.map((item) => item.localName).reverse()
      if (selectorType == "class") {
        parentsSelectorList[0] += `.${componentName}`
      } else if (selectorType == "element") {
        parentsSelectorList = [componentName, ...parentsSelectorList]
      }
      let cssSelector = parentsSelectorList.join(combinator)

      const uniqItems = nodeList.filter(
        (item) => item.selector === cssSelector && item.classes !== classesForNode(currentNode)
      )
      same = nodeList.find(
        (item) =>
          item.selector === cssSelector &&
          item.classes === classesForNode(currentNode) &&
          !item.uniqClassName
      )

      if (currentNode.hasAttribute("vb-ignore")) {
        same = true
        currentNode.removeAttribute("vb-ignore")
      } else if (uniqItems.length > 0) {
        let lastNodeClasses = null
        let finalAdvance = false
        uniqItems.forEach((uniqItem) => {
          if (!uniqItem.uniqClassName) {
            if (uniqItem.node.getAttribute("vb-class")) {
              uniqItem.uniqClassName = `${componentName}__${uniqItem.node.getAttribute("vb-class")}`
              uniqItem.node.removeAttribute("vb-class")
            } else {
              uniqItem.uniqClassName = `${componentName}__uniq${uniqCount}`
              if (lastNodeClasses && classesForNode(currentNode) != lastNodeClasses) {
                finalAdvance = false
                uniqCount++
              } else {
                finalAdvance = true
              }
            }
            lastNodeClasses = classesForNode(currentNode)
            uniqItem.node.setAttribute("class", uniqItem.uniqClassName)
          }
        })
        if (finalAdvance) {
          uniqCount++
        }

        if (currentNode.getAttribute("vb-class")) {
          uniqClassName = `${componentName}__${currentNode.getAttribute("vb-class")}`
          currentNode.removeAttribute("vb-class")
        } else {
          uniqClassName = `${componentName}__uniq${uniqCount}`
          uniqCount++
        }
      } else if (currentNode.getAttribute("vb-class")) {
        uniqClassName = `${componentName}__${currentNode.getAttribute("vb-class")}`
        currentNode.removeAttribute("vb-class")
      }

      //    if (!same) {
      nodeList.push({
        node: currentNode,
        selector: cssSelector,
        classes: classesForNode(currentNode),
        same,
        uniqClassName,
      })
      //    }

      if (uniqClassName) {
        currentNode.setAttribute("class", uniqClassName)
      } else {
        currentNode.removeAttribute("class")
      }

      currentNode = treeWalker.nextNode()
    }

    if (selectorType === "class") {
      ;[...rootEl.children].forEach((node) => node.classList.add(componentName))
      outputHTML().value = rootEl.innerHTML
    } else if (selectorType === "element") {
      outputHTML().value = rootEl.outerHTML
    }
    document.querySelector("#html-tabs").show("output")

    let cssOutput = []
    nodeList.forEach((nodeData) => {
      if (nodeData.classes !== "" && !nodeData.same) {
        cssOutput.push(
          `${nodeData.selector}${nodeData.uniqClassName ? `.${nodeData.uniqClassName}` : ""} {`
        )
        nodeData.classes.split(/\s+/).forEach((cls) => {
          if (cls != "") {
            cssOutput.push(`  @apply ${cls};`)
          }
        })
        cssOutput.push("}\n")
      }
    })

    const cssOutputStr = cssOutput.join("\n")

    const formData = new FormData()
    formData.append("source", cssOutputStr)
    formData.append("prefix", document.querySelector("#variable-prefix").value)
    const options = {}
    const extraColors = document.querySelector("#extra-colors").value
    if (extraColors.length > 0) {
      options.extraColors = JSON.parse(extraColors)
    }
    formData.append("options", JSON.stringify(options))
    const response = await fetch("/tw-convert", {
      method: "POST",
      body: formData,
    })
    const text = await response.text()

    const outputParts = text.split("/* --CUSTOM-- */")

    globalCSS().value = outputParts[0].trim()
    componentCSS().value = outputParts[1] ? outputParts[1].trim() : ""

    showPreview()

    e.target.loading = false
  })
}

if (document.querySelector("body > main")) {
  // Wait a tick
  setTimeout(() => {
    app()
  })
} else {
  // Wait for main
  document.querySelector("#main-include").addEventListener("sl-load", (e) => {
    if (e.target != e.currentTarget) return

    app()
  }) // end of main event handler
}