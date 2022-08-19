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

import { basicSetup, EditorView } from "codemirror"
import { html } from "@codemirror/lang-html"
import { css } from "@codemirror/lang-css"

const scrollingEditor = EditorView.theme({
  "&": {height: "100%"},
  ".cm-scroller": {overflow: "auto", fontFamily: "inherit"}
})

const htmlView = new EditorView({
  doc: document.querySelector("#html-source > template").innerHTML.trim(),
  extensions: [basicSetup, html(), EditorView.lineWrapping, scrollingEditor],
  parent: document.querySelector("#html-source")
})
window.htmlView = htmlView
const getHTMLValue = () => htmlView.state.doc.toString()
const setHTMLValue = (val) => htmlView.dispatch({changes: {from: 0, to: htmlView.state.doc.length, insert: val}})

const htmlOutputView = new EditorView({
  extensions: [basicSetup, html(), EditorView.lineWrapping, scrollingEditor],
  parent: document.querySelector("#html-output")
})
const getHTMLOutputValue = () => htmlOutputView.state.doc.toString()
const setHTMLOutputValue = (val) => {
  htmlOutputView.dispatch({changes: {from: 0, to: htmlOutputView.state.doc.length, insert: val}})
  document.querySelector("#html-tabs").show("output")
}

const cssGlobalView = new EditorView({
  extensions: [basicSetup, css(), EditorView.lineWrapping, scrollingEditor],
  parent: document.querySelector("#css-output-global")
})
const getCSSGlobalValue = () => cssGlobalView.state.doc.toString()
const setCSSGlobalValue = (val) => cssGlobalView.dispatch({changes: {from: 0, to: cssGlobalView.state.doc.length, insert: val}})

const cssComponentView = new EditorView({
  extensions: [basicSetup, css(), EditorView.lineWrapping, scrollingEditor],
  parent: document.querySelector("#css-output-component")
})
const getCSSComponentValue = () => cssComponentView.state.doc.toString()
const setCSSComponentValue = (val) => cssComponentView.dispatch({changes: {from: 0, to: cssComponentView.state.doc.length, insert: val}})


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
        <style>${getCSSGlobalValue()}</style>
        <style>${getCSSComponentValue()}</style>
        <style>
          body.dark {
            background: var(--tw-color-gray-900);
          }
        </style>
      </head>
      <body style="display: flex; align-items: center; justify-content: center; height: 100vh;">
        ${getHTMLOutputValue()}
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
  const doc = parser.parseFromString(`<${rootElName}>${getHTMLValue()}</${rootElName}>`, "text/html")

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
//      uniq = false
      currentNode.removeAttribute("vb-ignore")
    } else if (uniqItems.length > 0) {
      console.info("OH, uniqItems!", cssSelector, uniqItems, classesForNode(currentNode))
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
    setHTMLOutputValue(rootEl.innerHTML)
  } else if (selectorType === "element") {
    setHTMLOutputValue(rootEl.outerHTML)
  }

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

  setCSSGlobalValue(outputParts[0].trim())
  setCSSComponentValue(outputParts[1] ? outputParts[1].trim() : "")

  showPreview()

  e.target.loading = false
})



