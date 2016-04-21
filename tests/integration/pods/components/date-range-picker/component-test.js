import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import Ember from 'ember';

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

test('has a default start/end date of today', function(assert) {
  let today = moment().startOf('day').format();

  this.set('startDate', undefined);
  this.set('endDate', undefined);

  this.render(hbs`{{date-range-picker startDate=startDate
                                      endDate=endDate
                                      isExpanded=true}}`);

  Ember.run.next(this, () => {
    let startDate = this.get('startDate').format();
    let endDate = this.get('endDate').format();

    assert.equal(startDate, today, 'startDate defaults to today');
    assert.equal(endDate, today, 'endDate defaults to today.');
  });
});

test('can choose a new startDate month & year', function(assert) {
  this.setProperties({
    startDate: moment('2016-04-19', 'YYYY-MM-DD'),
    endDate: moment('2016-05-19', 'YYYY-MM-DD')
  });

  this.render(hbs`{{date-range-picker startDate=startDate
                                      endDate=endDate
                                      showInput=true
                                      isExpanded=true}}`);

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

  assert.equal(this.$('.dp-date-input').val(), '03/15/2015 - 05/19/2016', 'Outer input is updated.');
  assert.equal(this.$('.dp-presets-date-input').val(), '03/15/2015 - 05/19/2016', 'Inner input is updated.');
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

  assert.equal(this.$('.dp-date-input').val(), '03/15/2015 - 06/20/2017', 'Outer input is updated.');
  assert.equal(this.$('.dp-presets-date-input').val(), '03/15/2015 - 06/20/2017', 'Outer input is updated.');
  assert.equal(this.get('startDate').format(format), '03/15/2015', 'startDate does not change.');
  assert.equal(this.get('endDate').format(format), '06/20/2017', 'endDate is updated.');
});

test('apply/cancel actions', function(assert) {
  assert.expect(4);

  let today = moment('2016-03-11', 'YYYY-MM-DD');

  this.setProperties({
    today,
    isExpanded: true,
    apply() {
      assert.ok(true);
    },
    cancel() {
      assert.ok(true);
    }
  });

  this.render(hbs`{{date-range-picker startMonth=today
                                      isExpanded=isExpanded
                                      apply=(action apply)
                                      cancel=(action cancel)}}`);

  this.$('.dp-apply').click();

  assert.equal(this.get('isExpanded'), false, 'isExpanded is toggled to false');

  this.set('isExpanded', true);

  this.$('.dp-cancel').click();

  assert.equal(this.get('isExpanded'), false, 'isExpanded is toggled to false again');
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
