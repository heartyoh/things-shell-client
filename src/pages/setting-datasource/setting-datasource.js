import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './style.css';

import '../../layouts/page-toolbar/page-toolbar';

import './datasource-card';

class SettingDataSource extends ReduxMixin(PolymerElement) {
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
      <template is="dom-repeat" items="[[datasourceList]]">
        <datasource-card datasource="[[item]]"></datasource-card>
      </template>
    </div>
    `;
  }

  static get is() { return 'setting-datasource'; }

  static get properties() {
    return {
      datasourceList: {
        type: Array,
        statePath: 'datasourceList'
      }
    }
  }
}

customElements.define(SettingDataSource.is, SettingDataSource);
