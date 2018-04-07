import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './style.css';

import '../../layouts/page-toolbar/page-toolbar';

import './font-card';

class SettingFont extends ReduxMixin(PolymerElement) {
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
      <template is="dom-repeat" items="[[fontList]]">
        <font-card font="[[item]]"></font-card>
      </template>
    </div>
    `;
  }

  static get is() { return 'setting-font'; }

  static get properties() {
    return {
      fontList: {
        type: Array,
        statePath: 'fontList'
      }
    }
  }
}

customElements.define(SettingFont.is, SettingFont);
