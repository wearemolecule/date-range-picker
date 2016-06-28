import Ember from 'ember';

export function buildWeek(week) {
  let days = [];
  for (let i = 0; i < 7; i++) {
    days[i] = week.clone().day(i);
  }
  return days;
}

export default Ember.Helper.helper(buildWeek);
