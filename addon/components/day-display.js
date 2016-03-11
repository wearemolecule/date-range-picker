import Ember from 'ember';
import layout from '../templates/components/day-display';

const { computed } = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['day'],
  classNameBindings: ['isSelected:selected', 'inRange:in-range', 'otherMonth:other-month'],

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
