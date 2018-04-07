import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-icons/av-icons';

import { ReduxMixin, setRoute, updateGroup } from '../../reducer/redux-mixin';

import style from './style-group-card.css';

export default class GroupCard extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
    <style include="shared-styles">
    ${style}
    </style>

    <div class="card" on-click="onClick">

      <h1 on-dblclick="onNameDblclick">[[group.name]]</h1>
      <p on-dblclick="onDescriptionDblclick">[[group.description]]</p>

      <dom-if if="[[_isNameEditMode(mode)]]" restamp>
        <template>
          <paper-input id="name-input" always-float-label label="name" value="{{group.name}}"
            on-change="onNameEditEnd" on-blur="onNameEditEnd"></paper-input>
        </template>
      </dom-if>

      <dom-if if="[[_isDescriptionEditMode(mode)]]" restamp>
        <template>
          <paper-input id="desc-input" always-float-label label="description" value="{{group.description}}"
            on-change="onDescriptionEditEnd" on-blur="onDescriptionEditEnd"></paper-input>
        </template>
      </dom-if>

      <paper-icon-button icon="icons:add" on-click="onClickNewBoard"></paper-icon-button>
    </div>
    `;
  }

  static get is() { return 'group-card'; }

  static get properties() {
    return {
      group: {
        type: Object
      }
    }
  }

  dim(on) {
    var button = this.root.querySelector('paper-icon-button');
    if (on)
      button.style.color = 'red'
    else
      button.style.color = ''
  }

  onClick(e) {
    this.dispatch(setRoute('list-by-group', this.group.id));
    e.stopPropagation();
  }

  onClickNewBoard(e) {
    this.dispatch({
      type: 'CHANGE-GROUP',
      group: this.group.id,
      groupType: 'group'
    });

    this.dispatch(setRoute('modeler', ''));
    e.stopPropagation();
  }

  onNameDblclick(e) {
    if (this.mode == 'name_edit')
      return;
    this.mode = 'name_edit';

    requestAnimationFrame(() => {
      let input = this.root.querySelector('#name-input');
      input && input.focus();
    });
  }

  onNameEditEnd(e) {
    this.mode = 'view';

    if (this.group.name != this.name) {
      this.dispatch(updateGroup({
        id: this.group.id,
        name: this.group.name
      }));
    }
  }

  onDescriptionDblclick(e) {
    if (this.mode == 'desc_edit')
      return;
    this.mode = 'desc_edit';

    requestAnimationFrame(() => {
      let input = this.root.querySelector('#desc-input');
      input && input.focus();
    });
  }

  onDescriptionEditEnd(e) {
    this.mode = 'view';

    if (this.group.description != this.description) {
      this.dispatch(updateGroup({
        id: this.group.id,
        description: this.group.description
      }));
    }
  }

  _isNameEditMode(mode) {
    return mode == 'name_edit';
  }

  _isDescriptionEditMode(mode) {
    return mode == 'desc_edit';
  }
}

customElements.define(GroupCard.is, GroupCard);
