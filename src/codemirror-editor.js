import { basicSetup, EditorView } from "codemirror"
import { html } from "@codemirror/lang-html"
import { css } from "@codemirror/lang-css"

const scrollingEditorTheme = EditorView.theme({
  "&": { height: "100%" },
  ".cm-scroller": { overflow: "auto", fontFamily: "inherit" }
})

class CodeMirrorEditorElement extends HTMLElement {
  #editorView;

  static styles = `
    :host {
      --font: Dank Mono,Operator Mono,Inconsolata,Fira Mono,ui-monospace,SF Mono,Monaco,Droid Sans Mono,Source Code Pro,monospace;
      --height: 30vh;
      --background: white;

      display: block;
      position: relative;
      height: var(--height);
      background: var(--background);
      font-family: var(--font);
    }
  `

  constructor() {
    super()
    this.#editorView = null
    this.attachShadow({ mode: "open" })
    this.shadowRoot.append(
      Object.assign(document.createElement("style"), {
        textContent: this.constructor.styles
      })
    )
  }

  connectedCallback() {
    this.#editorView = new EditorView({
      doc: this.querySelector("template")?.innerHTML?.trim(),
      extensions: [basicSetup, this.languageFromAttribute(), EditorView.lineWrapping, scrollingEditorTheme],
      parent: this.shadowRoot
    })
  }

  disconnectedCallback() {
    this.#editorView.destroy()
  }

  get editorView() {
    return this.#editorView
  }

  get value() {
    return this.#editorView.state.doc.toString()
  }

  set value(val) {
    this.#editorView.dispatch({
      changes: {
        from: 0,
        to: this.#editorView.state.doc.length,
        insert: val
      }
    })
  }

  languageFromAttribute() {
    switch (this.getAttribute("language-syntax")) {
      case "html":
        return html()
      case "css":
        return css()
      default:
        throw new Error(`No language support available for ${this.getAttribute("language-syntax")}`)
    }
  }
}

customElements.define("codemirror-editor", CodeMirrorEditorElement)
