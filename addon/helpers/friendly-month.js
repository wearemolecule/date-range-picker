import Ember from 'ember';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function friendlyMonth(monthIndex) {
  return MONTHS[monthIndex - 1];
}

export default Ember.Helper.helper(friendlyMonth);
