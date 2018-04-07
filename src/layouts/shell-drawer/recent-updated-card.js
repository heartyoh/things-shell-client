import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin, setRoute } from '../../reducer/redux-mixin';

import style from './style-group-card.css';

export default class RecentUpdatedCard extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
    <style include="shared-styles">
    ${style}
    </style>

    <div class="card" on-click="onClick">

      <h1>Recently Updated</h1>
    </div>
    `;
  }

  static get is() { return 'recent-updated-card'; }

  static get properties() {
    return {
      group: {
        type: Object
      }
    }
  }

  onClick(e) {
    this.dispatch(setRoute('list-recent'));
    e.stopPropagation();
  }
}

customElements.define(RecentUpdatedCard.is, RecentUpdatedCard);
