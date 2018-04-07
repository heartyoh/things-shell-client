import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './style.css';

import '../../layouts/page-toolbar/page-toolbar';

import './publisher-card';

class SettingPublisher extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
    <style include="shared-styles">
    ${style}
    </style>

    <page-toolbar>
      <things-i18n-msg msgid="label.keyword" msg="{{lKeyword}}" hidden></things-i18n-msg>
      <paper-input label="[[lKeyword]]" value="{{keyword::change}}" no-label-float>
        <iron-icon icon="icons:search" slot="prefix"></iron-icon>
      </paper-input>
    </page-toolbar>

    <div id="list">
      <template is="dom-repeat" items="[[publisherList]]">
        <publisher-card publisher="[[item]]"></publisher-card>
      </template>
    </div>
    `;
  }

  static get is() { return 'setting-publisher'; }

  static get properties() {
    return {
      publisherList: {
        type: Array,
        statePath: 'publisherList'
      }
    }
  }
}

customElements.define(SettingPublisher.is, SettingPublisher);
