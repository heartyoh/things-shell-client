import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin, setRoute, updateFont } from '../../reducer/redux-mixin';

import style from './font-card-style.css';

export default class FontCard extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
      <style>
      ${style}
      </style>

      <div id="card">
        <div front>
          <img src="[[thumbnail(font)]]"></img>
          <div class="name">
            <h1>[[font.name]]</h1>
            <p>[[font.description]]<slot></slot></p>
            <iron-icon icon="icons:redo" on-click="onFlip" flip></iron-icon>
          </div>
        </div>

        <div back>
          <div id="info">
            <things-i18n-msg msgid="label.created-at" msg="{{lCreatedAt}}" hidden></things-i18n-msg>
            <h5>[[lCreatedAt]] [[toDateString(font.createdAt, locale)]]</h5>

            <things-i18n-msg msgid="label.updated-at" msg="{{lUpdatedAt}}" hidden></things-i18n-msg>
            <h5>[[lUpdatedAt]] [[toDateString(font.updatedAt, locale)]]</h5>

            <things-i18n-msg msgid="label.name" msg="{{lName}}" hidden></things-i18n-msg>
            <paper-input label="[[lName]]" value="{{font.name}}" on-change="onChangeName"></paper-input>

            <things-i18n-msg msgid="label.description" msg="{{lDescription}}" hidden></things-i18n-msg>
            <paper-input label="[[lDescription]]" value="{{font.description}}" on-change="onChangeDescription"></paper-input>
          </div>

          <div class="name">
            <h1>[[font.name]]</h1>
            <p>[[font.description]]<slot></slot></p>
            <iron-icon icon="icons:undo" on-click="onFlip" flip></iron-icon>
          </div>
        </div>
      </div>
    `;
  }

  static get is() { return 'font-card'; }

  static get properties() {
    return {
      font: Object,
      locale: {
        statePath: 'user.locale'
      }
    }
  }

  onFlip(e) {
    this.classList.toggle('flipped');
    e.stopPropagation();
  }

  onChangeName(e) {
    var input = e.target;
    this.dispatch(updateFont({
      id: this.font.id,
      name: input.value
    }));
    e.stopPropagation();
  }

  onChangeDescription(e) {
    var input = e.target;
    this.dispatch(updateFont({
      id: this.font.id,
      description: input.value
    }));
    e.stopPropagation();
  }

  thumbnail(font) {
    return font.thumbnail || "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  }

  toDateString(t, locale) {
    return t ? new Date(t).toLocaleString(locale) : '';
  }
}

customElements.define(FontCard.is, FontCard);
