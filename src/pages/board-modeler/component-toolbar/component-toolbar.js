import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-toolbar/app-toolbar';

import { ReduxMixin } from '../../../reducer/redux-mixin';

import style from './style.css';
import template from './html.template';

import './component-menu/component-menu';

class ComponentToolbar extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
      <style include="shared-styles">
      ${style}
      </style>

      ${template}
    `;
  }

  static get is() { return 'component-toolbar'; }

  static get properties() {
    return {
      componentGroupList: {
        type: Object,
        statePath: 'component.groupList'
      },
      group: String,
      scene: Object,
      mode: {
        type: Number,
        notify: true
      }
    }
  }

  isShiftMode(mode) {
    return mode === 2
  }

  onClickShift(e) {
    this.mode = this.$.shift.active ? 2 : 1
  }

  onClickGroup(e) {
    var button = e.target;

    if (!button.hasAttribute || !button.hasAttribute('data-group')) {
      return;
    }

    this.group = button.getAttribute('data-group');

    if (!this.group)
      return;

    this.$.menu.open();

    var right = this.getBoundingClientRect().right;
    this.$.menu.style['left'] = right + 'px';
  }
}

customElements.define(ComponentToolbar.is, ComponentToolbar);
