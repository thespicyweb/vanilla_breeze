import "./lit-comp.js"
import "./vanilla-comp.js"

function classesForNode(node) {
  if (typeof node.className === "object") { // svg
    return node.className.baseVal
  } else {
    return node.className
  }
}

document.querySelector("#convert").addEventListener("click", async () => {
  const componentName = document.querySelector("#component-name").value

  const parser = new DOMParser()
  const doc = parser.parseFromString(`<tailwind-conversion>${document.querySelector("#html-source").value}</tailwind-conversion>`, "text/html")

  const rootEl = doc.querySelector("tailwind-conversion")

  const treeWalker = document.createTreeWalker(rootEl, NodeFilter.SHOW_ELEMENT)

  var getParents = function (elem) {

    // Set up a parent array
    var parents = [];

    // Push each parent element to the array
    for ( ; elem && elem !== rootEl; elem = elem.parentNode ) {
      parents.push(elem);
    }

    // Return our parent array
    return parents;

  };

  let nodeList = []
  let uniqCount = 1

  let currentNode = treeWalker.currentNode

  while(currentNode) {
    let uniqAppendix = null
    const nodeParents = getParents(currentNode)
//    let cssSelector = ["tailwind-conversion", ...nodeParents.map(item => item.localName).reverse()].join(" > ")
    const parentsSelectorList = nodeParents.map(item => item.localName).reverse()
    parentsSelectorList[0] += `.${componentName}`
    let cssSelector = parentsSelectorList.join(" > ")

    const uniq = nodeList.find(item => item.selector === cssSelector && item.classes !== classesForNode(currentNode))
    const same = nodeList.find(item => item.selector === cssSelector && item.classes === classesForNode(currentNode) && !item.uniqAppendix)

    if (uniq) {
      if (!uniq.uniqAppendix) {
        if (uniq.node.getAttribute("uniq-class")) {
          uniq.uniqAppendix = `${componentName}__${uniq.node.getAttribute("uniq-class")}`
          uniq.node.removeAttribute("uniq-class")
        } else {
          uniq.uniqAppendix = `${componentName}__uniq${uniqCount}`
          uniqCount++
        }
        uniq.node.setAttribute("class", uniq.uniqAppendix)
      }
      if (currentNode.getAttribute("uniq-class")) {
        uniqAppendix = `${componentName}__${currentNode.getAttribute("uniq-class")}`
        currentNode.removeAttribute("uniq-class")
      } else {
        uniqAppendix = `${componentName}__uniq${uniqCount}`
        uniqCount++
      }
    }

    if (!same) {
      nodeList.push({
        node: currentNode,
        selector: cssSelector,
        classes: classesForNode(currentNode),
        uniqAppendix
      })
    }

    if (uniqAppendix) {
      currentNode.setAttribute("class", uniqAppendix)
    } else {
      currentNode.removeAttribute("class")
    }
    
    currentNode = treeWalker.nextNode();
  }

  rootEl.children[0].classList.add(componentName)
  document.querySelector("#html-output").value = rootEl.children[0].outerHTML

  let cssOutput = []
  nodeList.forEach(nodeData => {
    if (nodeData.classes !== "") {
      cssOutput.push(`${nodeData.selector}${nodeData.uniqAppendix ? `.${nodeData.uniqAppendix}` : ""} {`)
      console.info(nodeData.classes)
      nodeData.classes.split(/\s+/).forEach(cls => {
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
  const response = await fetch("/tw-convert", {
    method: "POST",
    body: formData
  })
  const text = await response.text()

  const outputParts = text.split("/* --CUSTOM-- */")

  document.querySelector("#css-output-global").value = outputParts[0].trim()
  document.querySelector("#css-output-component").value = outputParts[1].trim()

  const preview = document.querySelector("#preview")
  preview.innerHTML = ""

  const html = `
    <html>
      <head>
        <style>${document.querySelector("#css-output-global").value}</style>
        <style>${document.querySelector("#css-output-component").value}</style>
      </head>
      <body>
        ${document.querySelector("#html-output").value}
      </body>
    </html>
  `;
  const iframe = document.createElement('iframe');
  iframe.srcdoc = html;
  preview.appendChild(iframe)
})
