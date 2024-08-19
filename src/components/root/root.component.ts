import '../content/content.component.js';
import '../editor/editor.component.js';
import '../page/page.component.js';
import '../preview/preview.component.js';
import '../settings/settings.component.js';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, eventOptions, state } from 'lit/decorators.js';

import { loadCustomFonts } from '../../utils/font.utils.js';
import {
  DEFAULT_SETTINGS,
  reflectSettingsAsCssVars,
  type Settings,
} from '../../utils/settings.utils.js';
import styles from './root.component.css?inline';

// load custom fonts once globally
await loadCustomFonts();

@customElement('kvlm-pricelist')
export class Root extends LitElement {
  static readonly styles = unsafeCSS(styles);

  @state()
  private settings: Settings = DEFAULT_SETTINGS;

  @state()
  private data: [string, string][] = [['Bier', '2,50 €']];

  @eventOptions({ passive: true })
  handleSettingsUpdate(event: CustomEvent<Settings>) {
    this.settings = event.detail;
    reflectSettingsAsCssVars(this.settings);
  }

  @eventOptions({ passive: true })
  handleEditorUpdate(event: CustomEvent<[string, string][]>) {
    this.data = event.detail;
  }

  connectedCallback() {
    super.connectedCallback();
    reflectSettingsAsCssVars(this.settings);
  }

  render() {
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
