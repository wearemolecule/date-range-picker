import Ember from 'ember';

export function buildWeek(month, week) {
  let firstDay = month.weekday();
  let days = [];

  for (let i = 0; i < 7; i++) {
    let d = (i - firstDay + week * 7);
    days[i] = month.startOf('month').clone().add(d, 'day');
  }

  return days;
}

export default Ember.Helper.helper(buildWeek);
