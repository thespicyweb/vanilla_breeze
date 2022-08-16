import {basicSetup, EditorView} from "codemirror"
import {html} from "@codemirror/lang-html"
import {css} from "@codemirror/lang-css"

const scrollingEditor = EditorView.theme({
  "&": {height: "100%"},
  ".cm-scroller": {overflow: "auto", fontFamily: "inherit"}
})

const htmlView = new EditorView({
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
const setHTMLOutputValue = (val) => htmlOutputView.dispatch({changes: {from: 0, to: htmlOutputView.state.doc.length, insert: val}})

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
      </head>
      <body>
        ${getHTMLOutputValue()}
      </body>
    </html>
  `;
  const iframe = document.createElement('iframe');
  iframe.srcdoc = html;
  preview.appendChild(iframe)
}

document.querySelector("#show-preview").addEventListener("click", showPreview)

document.querySelector("#convert").addEventListener("click", async () => {
  const componentName = document.querySelector("#component-name").value

  const selectorType = [...document.querySelectorAll("[name=selector-type]")].find(item => item.checked).value
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
    let cssSelector = parentsSelectorList.join(" > ")

    const uniq = nodeList.find(item => item.selector === cssSelector && item.classes !== classesForNode(currentNode))
    same = nodeList.find(item => item.selector === cssSelector && item.classes === classesForNode(currentNode) && !item.uniqClassName)

    if (currentNode.hasAttribute("vb-ignore")) {
      same = true
//      uniq = false
      currentNode.removeAttribute("vb-ignore")
    } else if (uniq) {
      if (!uniq.uniqClassName) {
        if (uniq.node.getAttribute("vb-class")) {
          uniq.uniqClassName = `${componentName}__${uniq.node.getAttribute("vb-class")}`
          uniq.node.removeAttribute("vb-class")
        } else {
          uniq.uniqClassName = `${componentName}__uniq${uniqCount}`
          uniqCount++
        }
        uniq.node.setAttribute("class", uniq.uniqClassName)
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

    if (!same) {
      nodeList.push({
        node: currentNode,
        selector: cssSelector,
        classes: classesForNode(currentNode),
        uniqClassName
      })
    }

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
    if (nodeData.classes !== "") {
      cssOutput.push(`${nodeData.selector}${nodeData.uniqClassName ? `.${nodeData.uniqClassName}` : ""} {`)
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

  setCSSGlobalValue(outputParts[0].trim())
  setCSSComponentValue(outputParts[1].trim())

  showPreview()
})



