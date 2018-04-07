import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom';

Polymer({
  is: 'things-editor-angle-select',
  _template: `
  <style>
  </style>
  <slot id="content" on-change="_onChangeValue"></slot>
  `,

  properties: {
    /**
     * `value`는 각도의 degree값으로 input element의 입력값과 연동된다.
     */
    value: {
      type: String,
      notify: true,
      reflectToAttribute: true
    },

    /**
     * `radian`은 각도의 ragian값이다.
     */
    radian: {
      type: Number,
      notify: true
    }
  },

  listeners: {
    'change': "_onChangeValue"
  },

  observers: [
    "_onChangeDegree(value)",
    "_onChangeRadian(radian)"
  ],

  attached() {
    if (!this.getAttribute('placeholder'))
      this.setAttribute('placeholder', '°')

    this._observer = dom(this).observeNodes(function (info) {
      this._initSlottedSelect();
    }.bind(this));
  },

  detached() {
    if (this._observer) {
      dom(this).unobserveNodes(this._observer);
      this._observer = null;
    }
  },
  /**
   * Returns the distributed <select> element.
   */
  get selectElement() {
    return this._selectElement;
  },

  get options() {
    return (this.selectElement && this.selectElement.options) || [];
  },

  get selectedIndex() {
    return (this.selectElement && this.selectElement.selectedIndex) || 0;
  },

  set selectedIndex(selectedIndex) {
    if (!this.selectElement)
      return;

    this._selectElement.selectedIndex = selectedIndex;
  },

  _initSlottedSelect: function () {
    this._selectElement = this.getEffectiveChildren()[0];

    if (!this._selectElement) {
      console.error('select element not found.');
      return;
    }

    this.selectElement.setAttribute('type', 'number');
    if (!this.selectElement.getAttribute('placeholder'))
      this.selectElement.setAttribute('placeholder', '°');

    this._onChangeRadian(this.radian);
  },

  _onChangeValue(e) {
    if (!this.selectElement)
      return;

    this.set('value', this.options[this.selectedIndex].value)
  },

  _onChangeRadian(radian) {
    if (!this.selectElement || this._dont_loop)
      return

    var PI_2 = Math.PI * 2
    var value = (((radian % PI_2) + PI_2) % PI_2) * 180 / Math.PI

    var nearest_option = -1
    var diff

    Array.from(this.options).forEach(function (option, index) {
      let gap = Math.abs(Number(value) - Number(option.value)) % 360
      if (gap > 180)
        gap = 360 - gap

      if (nearest_option == -1) {
        nearest_option = index
        diff = gap
        return
      }

      if (diff > gap) {
        nearest_option = index
        diff = gap
      }
    })

    this.selectedIndex = nearest_option
    this.set('value', this.options[this.selectedIndex].value)
  },

  _onChangeDegree(degree) {
    this._dont_loop = true
    this.set('radian', degree * (Math.PI / 180))
    this._dont_loop = false
  }
});
