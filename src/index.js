import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/radio-button/radio-button.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js';
import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
setBasePath('/shoelace/dist');

import "./codemirror-editor"

const sourceHTML = () => document.querySelector("#html-source")
const outputHTML = () => document.querySelector("#html-output")
const globalCSS = () => document.querySelector("#css-output-global")
const componentCSS = () => document.querySelector("#css-output-component")

const classesForNode = (node) => {
  if (typeof node.className === "object") { // svg
    return node.className.baseVal
  } else {
    return node.className
  }
}

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
            background: var(--tw-color-gray-900);
          }
        </style>
      </head>
      <body style="display: flex; align-items: center; justify-content: center; height: 100vh;">
        ${outputHTML().value}
      </body>
    </html>
  `;
  const iframe = document.createElement('iframe');
  iframe.srcdoc = html;
  preview.appendChild(iframe)
}

document.querySelector("#toggle-dark-mode").addEventListener("click", (e) => {
  document.querySelector("#preview iframe").contentDocument.body.classList.toggle("dark", e.target.checked)
})

document.querySelector("#show-preview").addEventListener("click", showPreview)

document.querySelector("#convert").addEventListener("click", async (e) => {
  e.target.loading = true
  const componentName = document.querySelector("#component-name").value

  const selectorType = document.querySelector("#selector-type").value
  const rootElName = selectorType === "element" ? componentName : "tailwind-conversion"

  const parser = new DOMParser()
  const doc = parser.parseFromString(`<${rootElName}>${sourceHTML().value}</${rootElName}>`, "text/html")

  const rootEl = doc.querySelector(rootElName)

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
  let combinator = document.querySelector("#combinator").value == "child" ? " > " : " "

  while(currentNode) {
    let uniqClassName = null
    let same = null
    const nodeParents = getParents(currentNode)
    let parentsSelectorList = nodeParents.map(item => item.localName).reverse()
    if (selectorType == "class") {
      parentsSelectorList[0] += `.${componentName}`
    } else if (selectorType == "element") {
      parentsSelectorList = [componentName, ...parentsSelectorList]
    }
    let cssSelector = parentsSelectorList.join(combinator)

    const uniqItems = nodeList.filter(item => item.selector === cssSelector && item.classes !== classesForNode(currentNode))
    same = nodeList.find(item => item.selector === cssSelector && item.classes === classesForNode(currentNode) && !item.uniqClassName)

    if (currentNode.hasAttribute("vb-ignore")) {
      same = true
      currentNode.removeAttribute("vb-ignore")
    } else if (uniqItems.length > 0) {
      let lastNodeClasses = null
      let finalAdvance = false
      uniqItems.forEach(uniqItem => {
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
        uniqClassName
      })
//    }

    if (uniqClassName) {
      currentNode.setAttribute("class", uniqClassName)
    } else {
      currentNode.removeAttribute("class")
    }
    
    currentNode = treeWalker.nextNode();
  }

  if (selectorType === "class") {
    [...rootEl.children].forEach(node => node.classList.add(componentName))
    outputHTML().value = rootEl.innerHTML
  } else if (selectorType === "element") {
    outputHTML().value = rootEl.outerHTML
  }
  document.querySelector("#html-tabs").show("output")

  let cssOutput = []
  nodeList.forEach(nodeData => {
    if (nodeData.classes !== "" && !nodeData.same) {
      cssOutput.push(`${nodeData.selector}${nodeData.uniqClassName ? `.${nodeData.uniqClassName}` : ""} {`)
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

  globalCSS().value = outputParts[0].trim()
  componentCSS().value = outputParts[1] ? outputParts[1].trim() : ""

  showPreview()

  e.target.loading = false
})
