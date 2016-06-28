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
    if (!this.get('isDestroying') || !this.get('isDestroyed')) {
      this.removeClickOutsideListener();
    }
  }),

  selectorIsInside(e) {
    return this.$(e.target) &&
           (this.$(e.target).closest(".dp-year-body").length > 0 ||
           this.$(e.target).closest(".dp-month-body").length > 0);
  },

  clickOutside(e) {
    if (this.selectorIsInside(e)) {
      return;
    }
    this.set('isExpanded', false);
  },
});
