import Ember from 'ember';
import layout from '../templates/components/day-display';

export default Ember.Component.extend({
  layout,
  classNames: ['day'],
  classNameBindings: ['isSelected:selected', 'inRange:in-range'],

  isSelected: Ember.computed('day', 'selectionStart', 'selectionEnd', function() {
    let {day, selectionStart, selectionEnd} = this.getProperties('day', 'selectionStart', 'selectionEnd');
    return day.isSame(selectionStart) || day.isSame(selectionEnd);
  }),

  inRange: Ember.computed('day', 'selectionStart', 'selectionEnd', function() {
    let {day, selectionStart, selectionEnd} = this.getProperties('day', 'selectionStart', 'selectionEnd');
    return day.isAfter(selectionStart) && day.isBefore(selectionEnd);
  }),

  click() {
    this.sendAction('daySelected', this.get('day').clone());
  }
});
