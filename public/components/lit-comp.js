import { LitElement, html } from "lit"
import sheet from "./lit-comp.css" assert { type: "css" }

class LitComp extends LitElement {
  static styles = [sheet]

  render() {
    return html`
      <p>Rendering a Lit component. This is cool! <slot></slot></p>
    `
  }
}

customElements.define("lit-comp", LitComp)
