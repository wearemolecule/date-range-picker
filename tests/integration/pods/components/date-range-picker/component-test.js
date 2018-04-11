import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import $ from 'jquery';
import wait from 'ember-test-helpers/wait';

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

  this.render(hbs`{{date-range-picker startDate=today
                                      endDate=today
                                      initiallyOpened=true}}`);

  let calendar_days = this.$(".dp-calendar-body").text().trim();
  assert.equal(calendar_days.match(new RegExp('[0-9]{1,2}', 'g')).length, 84, 'Has 84 days represented');

  let calendar_header = this.$(".dp-calendar-header").text().trim();
  assert.equal(calendar_header.match(new RegExp('[0-9]{4}', 'g')).length, 2, 'Has two years represented');
});

test('will accept strings as startDate and endDate', function(assert) {
  this.setProperties({startDate, endDate});

  this.render(hbs`{{date-range-picker startDate=startDate
                                      endDate=endDate
                                      initiallyOpened=true}}`);

  let dateInput = this.$('input.dp-date-input').val();
  let expectedDateRangeText = `${startDate.format(format)}—${endDate.format(format)}`;

  assert.equal(dateInput, expectedDateRangeText, 'displays correct range in range input');
});

test('prev/next buttons travel through time', function(assert) {
  this.setProperties({startDate, endDate});

  this.render(hbs`{{date-range-picker startDate=startDate
                                      endDate=endDate
                                      initiallyOpened=true}}`);

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

test('has a default date of today', function(assert) {
  let today = moment().startOf('day').format("MM/DD/YYYY");

  this.render(hbs`{{date-range-picker initiallyOpened=true}}`);
  let text = this.$('.dp-date-input')[0].value.trim();
  assert.equal(text.match(new RegExp(today, 'g')).length, 2, 'startDate and endDate defaults to today');
});

test('can choose a new startDate month & year', function(assert) {
  this.setProperties({
    startDate: moment('2016-04-19', 'YYYY-MM-DD'),
    endDate: moment('2016-05-19', 'YYYY-MM-DD')
  });

  this.render(hbs`{{date-range-picker startDate=startDate
                                      endDate=endDate
                                      initiallyOpened=true}}`);

  let $leftCal = this.$('.dp-display-calendar:first');
  let $rightCal = this.$('.dp-display-calendar:last');

  // Left side

  $leftCal.find('.dp-btn-month').click();
  $leftCal.find(".dp-month-body button:contains('Mar')").click();
  assert.equal($leftCal.find(".dp-btn-month").text().trim(), 'Mar', 'Start month button displays Mar.');

  $leftCal.find('.dp-btn-year').click();
  $leftCal.find(".dp-year-body button:contains('2015')").click();
  assert.equal($leftCal.find('.dp-btn-year').html().trim(), '2015', 'Start year button display 2015.');

  $leftCal.find('.dp-btn-year').click();
  $leftCal.find(".dp-day:contains('15')").click();

  assert.equal(this.$('.dp-date-input').val(), '03/15/2015—05/19/2016', 'Outer input is updated.');
  assert.equal(this.$('.dp-presets-date-input').val(), '03/15/2015—05/19/2016', 'Inner input is updated.');
  assert.equal(this.get('startDate').format(format), '03/15/2015', 'startDate is updated.');
  assert.equal(this.get('endDate').format(format), '05/19/2016', 'endDate does not change.');

  // Right side

  $rightCal.find('.dp-btn-month').click();
  $rightCal.find(".dp-month-body button:contains('Jun')").click();
  assert.equal($rightCal.find(".dp-btn-month").text().trim(), 'Jun', 'End month button displays Jun.');

  $rightCal.find('.dp-btn-year').click();
  $rightCal.find(".dp-year-body button:contains('2017')").click();
  assert.equal($rightCal.find('.dp-btn-year').html().trim(), '2017', 'End year button display 2017.');

  $rightCal.find('.dp-btn-year').click();
  $rightCal.find(".dp-day:contains('20')").click();

  assert.equal(this.$('.dp-date-input').val(), '03/15/2015—06/20/2017', 'Outer input is updated.');
  assert.equal(this.$('.dp-presets-date-input').val(), '03/15/2015—06/20/2017', 'Outer input is updated.');
  assert.equal(this.get('startDate').format(format), '03/15/2015', 'startDate does not change.');
  assert.equal(this.get('endDate').format(format), '06/20/2017', 'endDate is updated.');
});

test('can render 12/25/2015', function(assert) {
  let today = moment('2015-12-25', 'YYYY-MM-DD');

  this.set('today', today);

  this.render(hbs`{{date-range-picker startDate=today
                                      endDate=today
                                      initiallyOpened=true}}`);

  let $leftCal = this.$('.dp-display-calendar:first');

  assert.equal($leftCal.find('.dp-day').length, 42, '12/2015 has the correct number of days');
  let firstOfMonth = $leftCal.find(".dp-day").not(".dp-other-month").filter(function() { return $(this).text().trim() === "1"; });
  assert.equal(firstOfMonth.length, 1, '12/1/2015 shows up');
  let endOfMonth = $leftCal.find(".dp-day").not(".dp-other-month").filter(function() { return $(this).text().trim() === "31"; });
  assert.equal(endOfMonth.length, 1, '12/31/2015 shows up');
});

test('can render 12/31/2017', function(assert) {
  let today = moment('2017-12-31', 'YYYY-MM-DD');

  this.set('today', today);

  this.render(hbs`{{date-range-picker startDate=today
                                      endDate=today
                                      initiallyOpened=true}}`);

  let $leftCal = this.$('.dp-display-calendar:first');

  assert.equal($leftCal.find('.dp-day').length, 42, '12/2017 has the correct number of days');
  let firstOfMonth = $leftCal.find(".dp-day").not(".dp-other-month").filter(function() { return $(this).text().trim() === "1"; });
  assert.equal(firstOfMonth.length, 1, '12/1/2017 shows up');
  let endOfMonth = $leftCal.find(".dp-day").not(".dp-other-month").filter(function() { return $(this).text().trim() === "31"; });
  assert.equal(endOfMonth.length, 1, '12/31/2017 shows up');
});

test('converts strings to moments', function(assert) {
  let dateString = '3015-01-02';
  let dateStringMoment = moment(dateString, 'YYYY-MM-DD');

  this.setProperties({
    startDate: dateString,
    endDate: dateString,
  });

  this.render(hbs`{{date-range-picker startDate=startDate
                                      endDate=startDate
                                      initiallyOpened=true}}`);

  let $leftCal = this.$('.dp-display-calendar:first');
  let $rightCal = this.$('.dp-display-calendar:last');
  let [ leftMonth, leftYear, rightMonth, rightYear ] = allText($leftCal, $rightCal);

  assert.equal(leftMonth, dateStringMoment.format(monthFormat), 'startDate month is initial value.');
  assert.equal(leftYear, dateStringMoment.format(yearFormat), 'startDate year is initial value.');
  assert.equal(rightMonth, dateStringMoment.format(monthFormat), 'endDate month is initial value.');
  assert.equal(rightYear, dateStringMoment.format(yearFormat), 'endDate year is intitial value.');
});

// TODO: Test that the year and month picker scrolls selection to the top
// There are two reasons why this hard to test:
// 1. The scroll calculation appears that it MAY be off due to this picker being inside the ember-testing container
// 2. You MUST use jquery animate to force the scroll to happen in the integration test. Because of this, it causes a race condition between assertion and scroll completion
skip('automatically scrolls to selected year');
skip('automatically scrolls to selected month');

test('reverts changes when cancel is pressed', function(assert) {
  this.setProperties({
    startDate: moment('2016-04-19', 'YYYY-MM-DD'),
    endDate: moment('2016-05-19', 'YYYY-MM-DD')
  });

  this.render(hbs`{{date-range-picker startDate=startDate
                                      endDate=endDate
                                      initiallyOpened=true}}`);

  changeDateInPicker(moment("2015-03-15", "YYYY-MM-DD"), moment("2017-06-20", "YYYY-MM-DD"), assert, this)
  assert.equal(this.$('.dp-date-input').val(), '03/15/2015—06/20/2017', 'Outer input is updated.');

  this.$(".dp-cancel").click()
  return wait().then(() => {
    assert.equal(this.$('.dp-date-input').val(), '04/19/2016—05/19/2016', 'Outer input is updated.');
  });
});

test('keeps changes when apply is pressed', function(assert) {
  this.setProperties({
    startDate: moment('2016-04-19', 'YYYY-MM-DD'),
    endDate: moment('2016-05-19', 'YYYY-MM-DD')
  });

  this.render(hbs`{{date-range-picker startDate=startDate
                                      endDate=endDate
                                      initiallyOpened=true}}`);

  changeDateInPicker(moment("2015-03-15", "YYYY-MM-DD"), moment("2017-06-20", "YYYY-MM-DD"), assert, this)
  assert.equal(this.$('.dp-date-input').val(), '03/15/2015—06/20/2017', 'Outer input is updated.');

  this.$(".dp-apply").click()
  return wait().then(() => {
    assert.equal(this.$('.dp-date-input').val(), '03/15/2015—06/20/2017', 'Outer input is updated.');
  });
});

function changeDateInPicker(startDate, endDate, assert, context) {
  let originalEndDate = context.get('endDate');

  let $leftCal = context.$('.dp-display-calendar:first');
  let $rightCal = context.$('.dp-display-calendar:last');

  // Left side
  $leftCal.find('.dp-btn-month').click();
  let leftMonth = startDate.format("MMM");
  $leftCal.find(`.dp-month-body button:contains('${leftMonth}')`).click();
  assert.equal($leftCal.find(".dp-btn-month").text().trim(), leftMonth, `Start month button displays ${leftMonth}.`);

  $leftCal.find('.dp-btn-year').click();
  let leftYear = startDate.format("YYYY");
  $leftCal.find(`.dp-year-body button:contains('${leftYear}')`).click();
  assert.equal($leftCal.find('.dp-btn-year').text().trim(), leftYear, `Start year button display ${leftYear}.`);

  $leftCal.find('.dp-btn-year').click();
  let leftDay = startDate.format("D");
  $leftCal.find(`.dp-day:contains('${leftDay}')`).click();

  assert.equal(context.$('.dp-date-input').val(), `${startDate.format("MM/DD/YYYY")}—${originalEndDate.format("MM/DD/YYYY")}`, 'Outer input is updated.');
  assert.equal(context.$('.dp-presets-date-input').val(), `${startDate.format("MM/DD/YYYY")}—${originalEndDate.format("MM/DD/YYYY")}`, 'Inner input is updated.');
  assert.equal(context.get('startDate').format(format), startDate.format("MM/DD/YYYY"), 'startDate is updated.');
  assert.equal(context.get('endDate').format(format), originalEndDate.format("MM/DD/YYYY"), 'endDate does not change.');

  // Right side
  $rightCal.find('.dp-btn-month').click();
  let rightMonth = endDate.format("MMM");
  $rightCal.find(`.dp-month-body button:contains('${rightMonth}')`).click();
  assert.equal($rightCal.find(".dp-btn-month").text().trim(), rightMonth, `End month button displays ${rightMonth}.`);

  $rightCal.find('.dp-btn-year').click();
  let rightYear = endDate.format("YYYY");
  $rightCal.find(`.dp-year-body button:contains('${rightYear}')`).click();
  assert.equal($rightCal.find('.dp-btn-year').text().trim(), rightYear, `End year button display ${rightYear}.`);

  $rightCal.find('.dp-btn-year').click();
  let rightDay = endDate.format("D");
  $rightCal.find(`.dp-day:contains('${rightDay}')`).click();

  assert.equal(context.$('.dp-date-input').val(), `${startDate.format("MM/DD/YYYY")}—${endDate.format("MM/DD/YYYY")}`, 'Outer input is updated.');
  assert.equal(context.$('.dp-presets-date-input').val(), `${startDate.format("MM/DD/YYYY")}—${endDate.format("MM/DD/YYYY")}`, 'Inner input is updated.');
  assert.equal(context.get('startDate').format(format), startDate.format("MM/DD/YYYY"), 'startDate is updated.');
  assert.equal(context.get('endDate').format(format), endDate.format("MM/DD/YYYY"), 'endDate does not change.');
}

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
