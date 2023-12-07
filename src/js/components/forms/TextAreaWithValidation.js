import { html, nothing } from "lit";
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class TextAreaWithValidation extends LitWithoutShadowDom {
    static properties = {
        value: { type: String, reflect: true },
        rows: { type: String, reflect: true },
        inputId: { type: String, reflect: true },

        validFeedbackMessage: { type: String, reflect: true },
        invalidFeedbackMessage: { type: String, reflect: true },

        required: { type: Boolean, reflect: true }
    };

    constructor() {
        super();
        this._checkAvailabilityProperty();

        this.rows = 3;
        this.required = false;
    }

    _checkAvailabilityProperty() {
        if (!this.hasAttribute('invalidFeedbackMessage')) {
            throw new Error(
                `Atribut "invalidFeedbackMessage" harus diterapkan pada element ${this.localName}`
            );
        }
    }

    render() {
        return html`
            <textarea
                id=${this.inputId || nothing}
                rows=${this.rows || nothing}
                class="form-control"
                value=${this.value || nothing}
                ?required=${this.required}
                @input=${(e) => (this.value = e.target.value)}
            ></textarea>

            ${this._validFeedbackTemplate()}
            <div class="invalid-feedback">${this.invalidFeedbackMessage}</div>
        `;
    }

    _validFeedbackTemplate() {
        if (this.validFeedbackMessage) {
            return html`<div class="valid-feedback">${this.validFeedbackMessage}</div>`;
        }

        return html``;
    }
}

customElements.define('textarea-with-validation', TextAreaWithValidation);