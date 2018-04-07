import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-textarea';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/hardware-icons';

import '@polymer/neon-animation/animations/scale-up-animation';
import '@polymer/neon-animation/animations/fade-out-animation';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable';

import {
  ReduxMixin,
  fetchGroupList,
  fetchPlayGroupList,
  createGroup,
  createPlayGroup,
  setRoute,
  joinGroup,
  fetchDataSourceList,
  fetchPublisherList,
  fetchFontList
} from '../../reducer/redux-mixin';
import '../../components/things-i18n-msg';

import style from './style.css';
import template from './html.template';

import GroupCard from './group-card';
import PlayGroupCard from './playgroup-card';
import RecentUpdatedCard from './recent-updated-card';
import { joinPlayGroup } from '../../reducer/actions';

class ShellDrawer extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
    <style include="shared-styles">
    ${style}
    </style>

    ${template}
    `;
  }

  static get is() { return 'shell-drawer'; }

  static get properties() {
    return {
      boardGroupList: {
        type: Array,
        statePath: 'boardGroupList'
      },
      boardPlayGroupList: {
        type: Array,
        statePath: 'boardPlayGroupList'
      },
      selected: {
        type: Number,
        value: 0
      },
      boardGroupCurrent: {
        type: Object,
        statePath: 'boardGroupCurrent'
      },
      drawerCollapsed: {
        type: Boolean,
        statePath: 'drawer.collapsed'
      }
    }
  }

  static get observers() {
    return [
      'onBoardGroupChanged(boardGroupCurrent, boardGroupList)'
    ]
  }

  ready() {
    super.ready();

    this.dispatch(fetchGroupList());
    this.dispatch(fetchPlayGroupList());
  }

  onRouteSetting(e) {
    var route = e.target.getAttribute('data-route');

    switch (route) {
      case 'setting-datasource':
        this.dispatch(fetchDataSourceList());
        break;

      case 'setting-publisher':
        this.dispatch(fetchPublisherList());
        break;

      case 'setting-font':
        this.dispatch(fetchFontList());
        break;

      default:
    }

    this.dispatch(setRoute(route));
  }

  onClickLogo(e) {
    this.dispatch({
      type: 'CLOSE-DRAWER'
    })
  }

  onBoardGroupChanged(boardGroupCurrent, boardGroupList) {

    /* card 엘리먼트들이 만들어지기를 기다려서, 처리한다. */
    setTimeout(() => {
      this.root.querySelectorAll('group-card').forEach(element => {

        if (boardGroupCurrent && boardGroupCurrent.type == 'group' && boardGroupCurrent.id == element.group.id)
          element.setAttribute('active', true);
        else
          element.removeAttribute('active');
      });

      this.root.querySelectorAll('playgroup-card').forEach(element => {

        if (boardGroupCurrent && boardGroupCurrent.type == 'playgroup' && boardGroupCurrent.id == element.group.id)
          element.setAttribute('active', true);
        else
          element.removeAttribute('active');
      });

      const recentUpdatedCard = this.root.querySelector('recent-updated-card');

      if (!boardGroupCurrent || boardGroupCurrent.type == 'recent') {
        recentUpdatedCard.setAttribute('active', true);
      } else {
        recentUpdatedCard.removeAttribute('active');
      }

    }, 100);
  }

  onClickNewGroup(e) {
    this.newGroupName = '';
    this.newGroupDescription = '';
    this.newGroupType = 'group';

    this.$['new-group-dialog'].open();
  }

  onNewGroupDialogClosed(e) {
    var dialog = e.target;

    if (!dialog.closingReason.confirmed || !this.newGroupName)
      return;

    var group = {
      name: this.newGroupName,
      description: this.newGroupDescription
    }

    if (this.newGroupType == 'group') {
      this.dispatch(createGroup(group));
    } else {
      this.dispatch(createPlayGroup(group));
    }
  }

  onCardDrop(e) {
    e.preventDefault();

    var card = e.target;
    var board = e.dataTransfer.getData('board');

    card.dim(false);

    try {
      if (card instanceof GroupCard) {
        this.dispatch(joinGroup(board, card.group));
      } else if (card instanceof PlayGroupCard) {
        this.dispatch(joinPlayGroup(board, card.group));
      }

    } catch (e) {
      if (this.showToastMsg) this.showToastMsg(e);
    }
  }

  onCardDragOver(e) {
    e.preventDefault();

    var card = e.target;
    var board = e.dataTransfer.getData('board');

    card.dim(true);

    // console.log('onCardDragOver', board);
  }

  onCardDragLeave(e) {
    e.preventDefault();

    var card = e.target;
    var board = e.dataTransfer.getData('board');

    card.dim(false);

    // console.log('onCardDragLeave', board);
  }
}

customElements.define(ShellDrawer.is, ShellDrawer);
