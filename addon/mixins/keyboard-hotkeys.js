import Ember from 'ember';
import { EKMixin, keyDown } from 'ember-keyboard';
const {
  on,
  Mixin,
  computed,
} = Ember;

export default Mixin.create(EKMixin, {
  dropdownOpen: computed.alias('dropdownController.isOpen'),
  keyboardActivated: computed.alias('dropdownOpen'),
  keyboardFirstResponder: computed.alias('dropdownOpen'),
  cancelSelected: true,
  applySelected: false,

  _returnHandler: on(keyDown('Enter'), function() {
    this.onTriggerReturn();
  }),

  _escapeHandler: on(keyDown('Escape'), function() {
    this.onTriggerEscape();
  }),

  _leftArrowHandler: on(keyDown('ArrowLeft'), function() {
    this.onTriggerArrowUp();
  }),

  _rightArrowHandler: on(keyDown('ArrowRight'), function() {
    this.onTriggerArrowDown();
  }),

  _downArrowHandler: on(keyDown('ArrowDown'), function() {
    this.onTriggerArrowDown();
  }),

  _upArrowHandler: on(keyDown('ArrowUp'), function() {
    this.onTriggerArrowUp();
  }),

  toggleSelection() {
    this.toggleProperty('cancelSelected');
    this.toggleProperty('applySelected');
  },

  onTriggerArrowDown() {
    this.toggleSelection();
  },

  onTriggerArrowUp() {
    this.toggleSelection();
  },

  onTriggerEscape() {
    this.send('cancel');
  },

  onTriggerReturn() {
    if (this.get('dropdownOpen')) {
      if (!this.get('datesSame')) {
        if (this.get('cancelSelected')) {
          this.send('cancel');
        } else {
          this.send('apply');
        }
      }
    } else {
      this.get('dropdownController').actions.toggle();
      if (this.get('dropdownOpen')) {
        let element = document.querySelector("." + this.get('topClass') + " .dp-date-input");
        this.$(element).focus();
        this.$(element).select();
      }
    }
  },
});
