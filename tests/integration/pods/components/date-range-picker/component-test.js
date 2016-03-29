import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('date-range-picker', 'Integration | Component | date range picker', {
  integration: true
});

const monthFormat = 'MMM';

const yearFormat = 'YYYY';

const format = 'MM/DD/YYYY';

const startDate = moment().startOf('month');

const endDate = moment().endOf('month');

test('it renders', function(assert) {
  let today = moment('2016-03-11', 'YYYY-MM-DD');

  this.set('today', today);

  this.render(hbs`{{date-range-picker startMonth=today
                                      isExpanded=true}}`);

  let text = this.$().text().trim();

  assert.equal(text.match(new RegExp('[0-9]{1,4}', 'g')).length, 72, 'Has 72 1-4 digit numbers...');
});

test('will accept strings as startDate and endDate', function(assert) {
  this.setProperties({startDate, endDate});

  this.render(hbs`{{date-range-picker startDate=startDate
                                      endDate=endDate
                                      isExpanded=true
                                      showInput=true}}`);

  let dateInput = this.$('input.dp-date-input').val();
  let expectedDateRangeText = `${startDate.format(format)} - ${endDate.format(format)}`;

  assert.equal(dateInput, expectedDateRangeText, 'displays correct range in range input');
});

test('prev/next buttons travel through time', function(assert) {
  this.setProperties({startDate, endDate});

  this.render(hbs`{{date-range-picker startDate=startDate
                                      endDate=endDate
                                      isExpanded=true}}`);

  let $leftCal = this.$('.dp-display-calendar:first');
  let $rightCal = this.$('.dp-display-calendar:last');
  let [ leftMonth, leftYear, rightMonth, rightYear ] = allText($leftCal, $rightCal);

  assert.equal(leftMonth, startDate.format(monthFormat), 'startDate month is initial value.');
  assert.equal(leftYear, startDate.format(yearFormat), 'startDate year is initial value.');
  assert.equal(rightMonth, endDate.format(monthFormat), 'endDate month is initial value.');
  assert.equal(rightYear, endDate.format(yearFormat), 'endDate year is intitial value.');

  $leftCal.find('.dp-previous-month').click();

  [ leftMonth, leftYear, rightMonth, rightYear ] = allText($leftCal, $rightCal);
  assert.equal(leftMonth, lastMonth(startDate, monthFormat), 'startDate month should be decremented by one.');
  assert.equal(leftYear, lastMonth(startDate, yearFormat), 'startDate year should be decermented by one.');
  assert.equal(rightMonth, endDate.format(monthFormat), 'endDate month should not change.');
  assert.equal(rightYear, endDate.format(yearFormat), 'endDate year should not change.');

  $leftCal.find('.dp-next-month').click();

  [ leftMonth, leftYear, rightMonth, rightYear ] = allText($leftCal, $rightCal);
  assert.equal(leftMonth, startDate.format(monthFormat), 'startDate month is initial value.');
  assert.equal(leftYear, startDate.format(yearFormat), 'startDate year is initial value.');
  assert.equal(rightMonth, endDate.format(monthFormat), 'endDate month is initial value.');
  assert.equal(rightYear, endDate.format(yearFormat), 'endDate year is intitial value.');

  $rightCal.find('.dp-next-month').click();

  [ leftMonth, leftYear, rightMonth, rightYear ] = allText($leftCal, $rightCal);
  assert.equal(leftMonth, startDate.format(monthFormat), 'startDate month should not change.');
  assert.equal(leftYear, startDate.format(yearFormat), 'startDate year should not change.');
  assert.equal(rightMonth, nextMonth(endDate, monthFormat), 'endDate month should be incremented by one.');
  assert.equal(rightYear, nextMonth(endDate, yearFormat), 'endDate year should be incremented by one.');

  $rightCal.find('.dp-previous-month').click();

  [ leftMonth, leftYear, rightMonth, rightYear ] = allText($leftCal, $rightCal);
  assert.equal(leftMonth, startDate.format(monthFormat), 'startDate month is initial value.');
  assert.equal(leftYear, startDate.format(yearFormat), 'startDate year is initial value.');
  assert.equal(rightMonth, endDate.format(monthFormat), 'endDate month is initial value.');
  assert.equal(rightYear, endDate.format(yearFormat), 'endDate year is intitial value.');
});

function allText($leftCalendar, $rightCalendar) {
  return text($leftCalendar).concat(text($rightCalendar));
}

function text($calendar) {
  return [
    $calendar.find('.dp-btn-month').text().trim(),
    $calendar.find('.dp-btn-year').text().trim()
  ];
}

function lastMonth(date, format) {
  return date.clone().subtract(1, 'month').format(format);
}

function nextMonth(date, format) {
  return date.clone().add(1, 'month').format(format);
}
