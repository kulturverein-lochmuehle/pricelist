import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import styles from './preview.component.css?inline';

@customElement('kvlm-pricelist-preview')
export class Preview extends LitElement {
  static override readonly styles = unsafeCSS(styles);

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kvlm-pricelist-preview': Preview;
  }
}
