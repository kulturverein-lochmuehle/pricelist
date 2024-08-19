import { html, LitElement, PropertyValues, unsafeCSS } from 'lit';
import {
  customElement,
  eventOptions,
  property,
  query,
  state,
} from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { map } from 'lit/directives/map.js';

import style from './editor.component.css?inline';

@customElement('kvlm-pricelist-editor')
export class Editor extends LitElement {
  static readonly styles = unsafeCSS(style);

  @query('form')
  private form!: HTMLFormElement;

  @property({ type: Array, attribute: false, reflect: false })
  private data: [string, string][] = [['', '']];

  @state()
  private isValid = false;

  #emitUpdate() {
    this.dispatchEvent(
      new CustomEvent('editor-update', {
        detail: this.data,
        bubbles: true,
        composed: true,
      }),
    );
  }

  @eventOptions({ passive: true })
  checkValidity(emit: boolean) {
    this.isValid = this.form.checkValidity();
    if (emit) this.#emitUpdate();
  }

  @eventOptions({ capture: true })
  async updateEntry(event: InputEvent) {
    event.preventDefault();

    const target = event.target as HTMLInputElement;
    const entry = event.currentTarget as HTMLTableRowElement;
    const { entryIndex } = entry.dataset;
    const { entryName } = target.dataset;
    const index = parseInt(entryIndex ?? '-1', 10);
    const field = entryName === 'key' ? 0 : 1;

    this.data = this.data.map((entry, i) =>
      i === index
        ? [
            field === 0 ? target.value : entry[0],
            field === 1 ? target.value : entry[1],
          ]
        : entry,
    );

    await this.updateComplete;
    this.checkValidity(true);
  }

  @eventOptions({ capture: true })
  async removeEntry(event: MouseEvent) {
    event.preventDefault();

    const target = event.target as HTMLButtonElement;
    const entry = target.closest('tr') as HTMLTableRowElement;
    const index = parseInt(entry.dataset.entryIndex ?? '-1', 10);

    let data = this.data.filter((_, i) => i !== index);
    if (data?.length === 0) {
      data = [['', '']];
    }
    this.data = data;

    await this.updateComplete;
    this.checkValidity(true);
  }

  @eventOptions({ capture: true })
  async addEntry(event: MouseEvent) {
    event.preventDefault();

    this.data = [...this.data, ['', '']];

    await this.updateComplete;
    this.checkValidity(true);
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>) {
    super.firstUpdated(changedProperties);
    this.checkValidity(false);
  }

  override render() {
    return html`
      <form @input="${this.checkValidity}">
        <table>
          <thead>
            <tr>
              <th>Angebot</th>
              <th>Preis</th>
              <th>
                <button
                  aria-label="Add"
                  ?disabled="${!this.isValid}"
                  @click="${this.addEntry}"
                >
                  +
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            ${map(
              this.data,
              ([key, value], index) => html`
                <tr data-entry-index="${index}" @input="${this.updateEntry}">
                  <td>
                    <input
                      required
                      type="text"
                      data-entry-name="key"
                      .value="${live(key)}"
                    />
                  </td>
                  <td>
                    <input
                      required
                      type="text"
                      data-entry-name="value"
                      .value="${live(value)}"
                    />
                  </td>
                  <td>
                    <button aria-label="Remove" @click="${this.removeEntry}">
                      -
                    </button>
                  </td>
                </tr>
              `,
            )}
          </tbody>
        </table>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kvlm-pricelist-editor': Editor;
  }
  interface HTMLElementEventMap {
    'editor-update': CustomEvent<Editor['data']>;
  }
}
