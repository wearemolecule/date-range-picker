import Ember from 'ember';
import ClickOutside from 'ember-click-outside/mixins/click-outside';

const {
  on,
  run,
} = Ember;

export default Ember.Mixin.create(ClickOutside, {
  _attachClickOutsideHandler: on('didInsertElement', function() {
    run.next(this, this.addClickOutsideListener);
  }),

  _removeClickOutsideHandler: on('willDestroyElement', function() {
    this.removeClickOutsideListener();
  }),

  clickOutside() {
    this.set('isExpanded', false);
  },
});
