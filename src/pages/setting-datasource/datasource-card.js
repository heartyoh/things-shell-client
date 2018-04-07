import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin, setRoute, updateDataSource } from '../../reducer/redux-mixin';

import style from './datasource-card-style.css';

export default class DataSourceCard extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
      <style>
      ${style}
      </style>

      <div id="card">
        <div front>
          <img src="[[thumbnail(datasource)]]"></img>
          <div class="name">
            <h1>[[datasource.name]]</h1>
            <p>[[datasource.description]]<slot></slot></p>
            <iron-icon icon="icons:redo" on-click="onFlip" flip></iron-icon>
          </div>
        </div>

        <div back>
          <div id="info">
            <things-i18n-msg msgid="label.created-at" msg="{{lCreatedAt}}" hidden></things-i18n-msg>
            <h5>[[lCreatedAt]] [[toDateString(datasource.createdAt, locale)]]</h5>

            <things-i18n-msg msgid="label.updated-at" msg="{{lUpdatedAt}}" hidden></things-i18n-msg>
            <h5>[[lUpdatedAt]] [[toDateString(datasource.updatedAt, locale)]]</h5>

            <things-i18n-msg msgid="label.name" msg="{{lName}}" hidden></things-i18n-msg>
            <paper-input label="[[lName]]" value="{{datasource.name}}" on-change="onChangeName"></paper-input>

            <things-i18n-msg msgid="label.description" msg="{{lDescription}}" hidden></things-i18n-msg>
            <paper-input label="[[lDescription]]" value="{{datasource.description}}" on-change="onChangeDescription"></paper-input>
          </div>

          <div class="name">
            <h1>[[datasource.name]]</h1>
            <p>[[datasource.description]]<slot></slot></p>
            <iron-icon icon="icons:undo" on-click="onFlip" flip></iron-icon>
          </div>
        </div>
      </div>
    `;
  }

  static get is() { return 'datasource-card'; }

  static get properties() {
    return {
      datasource: Object,
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
    this.dispatch(updateDataSource({
      id: this.datasource.id,
      name: input.value
    }));
    e.stopPropagation();
  }

  onChangeDescription(e) {
    var input = e.target;
    this.dispatch(updateDataSource({
      id: this.datasource.id,
      description: input.value
    }));
    e.stopPropagation();
  }

  thumbnail(datasource) {
    return datasource.thumbnail || "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  }

  toDateString(t, locale) {
    return t ? new Date(t).toLocaleString(locale) : '';
  }
}

customElements.define(DataSourceCard.is, DataSourceCard);
