import Ember from 'ember';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export function friendlyMonth(monthIndex) {
  return MONTHS[monthIndex - 1];
}

export default Ember.Helper.helper(friendlyMonth);
