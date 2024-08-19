import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, eventOptions, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';

import type { Settings as SettingsData } from '../../utils/settings.utils.js';
import styles from './settings.component.css?inline';

@customElement('kvlm-pricelist-settings')
export class Settings extends LitElement {
  static readonly styles = unsafeCSS(styles);

  @query('form')
  private form!: HTMLFormElement;

  @state()
  private settings!: SettingsData;

  @eventOptions({ passive: true })
  private handleInput() {
    const formData = new FormData(this.form);
    // @ts-expect-error - dom types are not up to date
    const data = Object.fromEntries(formData.entries());
    this.#dispatchEvent({ ...this.settings, ...data });
  }

  #dispatchEvent(detail: SettingsData) {
    this.dispatchEvent(
      new CustomEvent('settings-update', {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <form @input="${this.handleInput}">
        <label>
          <input
            name="size"
            type="range"
            min="8"
            max="120"
            .value="${live(this.settings.size)}"
            step="0.1"
          />
          <span>Schriftgröße</span>
        </label>
        <label>
          <input
            name="format"
            type="radio"
            value="portrait"
            ?checked="${this.settings.format === 'portrait'}"
          />
          <span>Hochformat</span>
        </label>
        <label>
          <input
            name="format"
            type="radio"
            value="landscape"
            ?checked="${this.settings.format === 'landscape'}"
          />
          <span>Querformat</span>
        </label>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kvlm-pricelist-settings': Settings;
  }
  interface HTMLElementEventMap {
    'settings-update': CustomEvent<SettingsData>;
  }
}
