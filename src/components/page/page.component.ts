import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Settings } from '../../utils/settings.utils.js';
import styles from './page.component.css?inline';

@customElement('kvlm-pricelist-page')
export class Page extends LitElement {
  static readonly styles = unsafeCSS(styles);

  @property({ type: String, reflect: true })
  private format!: Settings['format'];

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kvlm-pricelist-page': Page;
  }
}
