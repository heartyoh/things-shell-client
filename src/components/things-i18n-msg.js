import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { ReduxMixin } from '../reducer/redux-mixin';
import { AppLocalizeBehavior } from './app-localize-behavior';

export default class ThingsI18nMsg extends mixinBehaviors([AppLocalizeBehavior], ReduxMixin(PolymerElement)) {
  static get is() { return 'things-i18n-msg'; }

  static get properties() {
    return {
      msgid: {
        type: String,
        observer: 'onChange'
      },
      msg: {
        notify: true
      },
      language: {
        statePath: 'user.locale',
        observer: 'onChange'
      },
      resources: {
        statePath: 'resource'
      }
    };
  }

  onChange() {
    var formatted = this.localize(this.msgid);
    if (formatted) {
      this.innerHTML = formatted;
      this.msg = formatted;
    }
  }

}

customElements.define(ThingsI18nMsg.is, ThingsI18nMsg);
