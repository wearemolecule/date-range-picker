import Ember from 'ember';
import layout from './template';

const { computed } = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['dp-day'],
  classNameBindings: ['isSelected:dp-selected', 'inRange:dp-in-range', 'otherMonth:dp-other-month'],

  isSelected: computed('day', 'selectionStart', 'selectionEnd', function() {
    let {day, selectionStart, selectionEnd} = this.getProperties('day', 'selectionStart', 'selectionEnd');
    return day.isSame(selectionStart) || day.isSame(selectionEnd);
  }),

  inRange: computed('day', 'selectionStart', 'selectionEnd', function() {
    let {day, selectionStart, selectionEnd} = this.getProperties('day', 'selectionStart', 'selectionEnd');
    return day.isAfter(selectionStart) && day.isBefore(selectionEnd);
  }),

  otherMonth: computed('day', 'month', function() {
    return this.get('day').month() !== this.get('month').month();
  }),

  click() {
    this.sendAction('daySelected', this.get('day').clone());
  }
});
