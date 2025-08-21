import '../content/content.component.js';
import '../editor/editor.component.js';
import '../page/page.component.js';
import '../preview/preview.component.js';
import '../settings/settings.component.js';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, eventOptions, state } from 'lit/decorators.js';

import { loadCustomFonts } from '../../utils/font.utils.js';
import type { Settings } from '../../utils/settings.utils.js';
import {
  DEFAULT_SETTINGS,
  reflectSettingsAsCssVars,
} from '../../utils/settings.utils.js';

import styles from './root.component.css?inline';

// load custom fonts once globally
await loadCustomFonts();

@customElement('kvlm-pricelist')
export class Root extends LitElement {
  static override readonly styles = unsafeCSS(styles);

  @state()
  private settings: Settings = DEFAULT_SETTINGS;

  @state()
  private data: [string, string][] = [
    ['Glühwein', '3,00 €'],
    ['Punsch', '2,50 €'],
    ['Bier', '2,50 €'],
    ['Kaffee', '2,00 €'],
    ['Naschtüte', '1,50 €'],
    ['Paar Wiener\nmit Brötchen', '3,00 €'],
    ['Kartoffelsuppe', '3,50 €'],
    [' +1 Wiener', '5,00 €'],
  ];

  @eventOptions({ passive: true })
  handleSettingsUpdate(event: CustomEvent<Settings>) {
    this.settings = event.detail;
    reflectSettingsAsCssVars(this.settings);
  }

  @eventOptions({ passive: true })
  handleEditorUpdate(event: CustomEvent<[string, string][]>) {
    this.data = event.detail;
  }

  override connectedCallback() {
    super.connectedCallback();
    reflectSettingsAsCssVars(this.settings);
  }

  override render() {
    return html`
      <header>
        <kvlm-pricelist-settings
          .settings=${this.settings}
          @settings-update="${this.handleSettingsUpdate}"
        ></kvlm-pricelist-settings>
      </header>
      <main>
        <kvlm-pricelist-editor
          .data=${this.data}
          @editor-update="${this.handleEditorUpdate}"
        ></kvlm-pricelist-editor>
        <kvlm-pricelist-preview>
          <kvlm-pricelist-page format="${this.settings.format}">
            <kvlm-pricelist-content .data=${this.data}></kvlm-pricelist-content>
          </kvlm-pricelist-page>
        </kvlm-pricelist-preview>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kvlm-pricelist': Root;
  }
}
