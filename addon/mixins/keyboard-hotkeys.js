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

  _returnHandler: on(keyDown('Enter'), function() {
    this.onTriggerReturn();
  }),

  onTriggerReturn() {
  },

  _escapeHandler: on(keyDown('Escape'), function() {
    this.onTriggerEscape();
  }),

  onTriggerEscape() {
    this.send('cancel');
  },
});
