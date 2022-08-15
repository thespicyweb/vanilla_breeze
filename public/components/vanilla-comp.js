import sheet from "./vanilla-comp.css" assert { type: "css" }

class VanillaComp extends HTMLElement {
  static styles = [sheet]

  constructor() {
    super()

    this.attachShadow({ mode: "open" })
    this.shadowRoot.adoptedStyleSheets = this.constructor.styles
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <p>Rendering a vanilla web component. Totally rad! <slot></slot></p>
    `
  }
}

customElements.define("vanilla-comp", VanillaComp)