import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';

import styles from './content.component.css?inline';

@customElement('kvlm-pricelist-content')
export class Content extends LitElement {
  static override readonly styles = unsafeCSS(styles);

  @property({ type: Array, attribute: false, reflect: false })
  readonly data: [string, string][] = [['', '']];

  override render() {
    return html`
      ${map(
        this.data,
        ([key, value]) => html`
          <div>
            <span>${key}</span>
            <span>${value}</span>
          </div>
        `,
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kvlm-pricelist-content': Content;
  }
}
