import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin, setRoute, updatePublisher } from '../../reducer/redux-mixin';

import style from './publisher-card-style.css';

export default class PublisherCard extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
      <style>
      ${style}
      </style>

      <div id="card">
        <div front>
          <img src="[[thumbnail(publisher)]]"></img>
          <div class="name">
            <h1>[[publisher.name]]</h1>
            <p>[[publisher.description]]<slot></slot></p>
            <iron-icon icon="icons:redo" on-click="onFlip" flip></iron-icon>
          </div>
        </div>

        <div back>
          <div id="info">
            <things-i18n-msg msgid="label.created-at" msg="{{lCreatedAt}}" hidden></things-i18n-msg>
            <h5>[[lCreatedAt]] [[toDateString(publisher.createdAt, locale)]]</h5>

            <things-i18n-msg msgid="label.updated-at" msg="{{lUpdatedAt}}" hidden></things-i18n-msg>
            <h5>[[lUpdatedAt]] [[toDateString(publisher.updatedAt, locale)]]</h5>

            <things-i18n-msg msgid="label.name" msg="{{lName}}" hidden></things-i18n-msg>
            <paper-input label="[[lName]]" value="{{publisher.name}}" on-change="onChangeName"></paper-input>

            <things-i18n-msg msgid="label.description" msg="{{lDescription}}" hidden></things-i18n-msg>
            <paper-input label="[[lDescription]]" value="{{publisher.description}}" on-change="onChangeDescription"></paper-input>
          </div>

          <div class="name">
            <h1>[[publisher.name]]</h1>
            <p>[[publisher.description]]<slot></slot></p>
            <iron-icon icon="icons:undo" on-click="onFlip" flip></iron-icon>
          </div>
        </div>
      </div>
    `;
  }

  static get is() { return 'publisher-card'; }

  static get properties() {
    return {
      publisher: Object,
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
    this.dispatch(updatePublisher({
      id: this.publisher.id,
      name: input.value
    }));
    e.stopPropagation();
  }

  onChangeDescription(e) {
    var input = e.target;
    this.dispatch(updatePublisher({
      id: this.publisher.id,
      description: input.value
    }));
    e.stopPropagation();
  }

  thumbnail(publisher) {
    return publisher.thumbnail || "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  }

  toDateString(t, locale) {
    return t ? new Date(t).toLocaleString(locale) : '';
  }
}

customElements.define(PublisherCard.is, PublisherCard);
