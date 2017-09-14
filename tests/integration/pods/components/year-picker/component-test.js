import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import wait from 'ember-test-helpers/wait';
import Ember from 'ember';

const { $ } = Ember;

moduleForComponent('year-picker', 'Integration | Component | year picker', {
  integration: true
});

test('it renders', function(assert) {
  this.setProperties({
    start: moment('2016-01-01', 'YYYY-MM-DD'),
    end: moment('2016-12-30', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{year-picker startDate=start
                                endDate=end
                                initiallyOpened=true}}`);

  return wait().then(() => {
    let text = this.$().text().trim();
    assert.equal(text.match(new RegExp('[0-9]{4}', 'g')).length, 21, 'Has 72 1-4 digit numbers...');
  });
});

test('it renders as an energy year picker', function(assert) {
  this.setProperties({
    start: moment('2016-06-01', 'YYYY-MM-DD'),
    end: moment('2017-05-31', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{year-picker startDate=start
                                endDate=end
                                initiallyOpened=true
                                energyYear=true}}`);

  return wait().then(() => {
    let text = this.$().text().trim();
    assert.equal(text.match(new RegExp('[0-9]{4}', 'g')).length, 21, 'Has 72 1-4 digit numbers...');
  });
});

test('optional, masked input - moment', function(assert) {
  this.setProperties({
    startDate: moment('2016-01-01', 'YYYY-MM-DD'),
    endDate: moment('2016-12-30', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{year-picker startDate=startDate
                                endDate=endDate}}`);

  return wait().then(() => {
    inputExpectations.call(this, assert, "");
  });
});

test('optional, masked input - moment as an energy year picker', function(assert) {
  this.setProperties({
    startDate: moment('2016-01-01', 'YYYY-MM-DD'),
    endDate: moment('2016-12-30', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{year-picker startDate=startDate
                                endDate=endDate
                                energyYear=true}}`);

  return wait().then(() => {
    inputExpectations.call(this, assert, "EY ");
  });
});

test('optional, masked input - string', function(assert) {
  this.setProperties({
    startDate: '2016-01-01',
    endDate: '2016-12-30',
  });

  this.render(hbs`{{year-picker startDate=startDate
                                endDate=endDate}}`);

  return wait().then(() => {
    inputExpectations.call(this, assert, "");
  });
});

test('optional, masked input - string as an energy year picker', function(assert) {
  this.setProperties({
    startDate: '2015-06-01',
    endDate: '2016-05-31',
  });

  this.render(hbs`{{year-picker startDate=startDate
                                endDate=endDate
                                energyYear=true}}`);
  return wait().then(() => {
    inputExpectations.call(this, assert, "EY ");
  });
});

test('has a default date of today', function(assert) {
  let today = moment().startOf('day').format("YYYY");

  this.render(hbs`{{year-picker initiallyOpened=true}}`);

  return wait().then(() => {
    let text = this.$('.dp-date-input')[0].value.trim();
    assert.equal(text.match(new RegExp(today, 'g')).length, 1, 'startDate and endDate defaults to today');
  });
});

test('can select a new year', function(assert) {
  this.setProperties({
    startDate: moment('2016-01-01', 'YYYY-MM-DD'),
    endDate: moment('2016-12-30', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{year-picker startDate=startDate
                                endDate=endDate
                                initiallyOpened=true}}`);

  this.$(".dp-year-body button:contains('2015')").click();

  let prevYear = moment('2015', 'YYYY');

  return wait().then(() => {
    assert.equal(this.get('startDate').format('YYYY-MM-DD'), prevYear.clone().startOf('year').format('YYYY-MM-DD'), 'Start is updated.');
    assert.equal(this.get('endDate').format('YYYY-MM-DD'), prevYear.clone().endOf('year').format('YYYY-MM-DD'), 'End is updated.');
  });
});

test('can select a new year as an energy year picker', function(assert) {
  this.setProperties({
    startDate: '2016-06-01',
    endDate: '2017-05-31',
  });

  this.render(hbs`{{year-picker startDate=startDate
                                endDate=endDate
                                initiallyOpened=true
                                energyYear=true}}`);

  return wait().then(() => {
    this.$(".dp-year-body button:contains('2015')").click();

    assert.equal(this.get('startDate').format('YYYY-MM-DD'), moment('2014-06-01').format('YYYY-MM-DD'), 'Start is updated.');
    assert.equal(this.get('endDate').format('YYYY-MM-DD'), moment('2015-05-31').format('YYYY-MM-DD'), 'End is updated.');
  });
});

test('converts strings to moments', function(assert) {
  let dateString = '3015-01-02';
  let expectedDate = moment(dateString, 'YYYY-MM-DD').format("YYYY");

  this.setProperties({
    startDate: dateString,
    endDate: dateString,
  });

  this.render(hbs`{{year-picker startDate=startDate
                                endDate=endDate
                                initiallyOpened=true}}`);

  return wait().then(() => {
    assert.equal(this.$(".dp-year-picker input").eq(0).val(), expectedDate);
  });
});

// TODO: Test that the year and month picker scrolls selection to the top
// There are two reasons why this hard to test:
// 1. The scroll calculation appears that it MAY be off due to this picker being inside the ember-testing container
// 2. You MUST use jquery animate to force the scroll to happen in the integration test. Because of this, it causes a race condition between assertion and scroll completion 
skip('automatically scrolls to selected year');
skip('automatically scrolls to selected month');

test('reverts changes when cancel is pressed', function(assert) {
  this.setProperties({
    startDate: moment('2016-01-01', 'YYYY-MM-DD'),
    endDate: moment('2016-12-31', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{year-picker startDate=startDate
                                 endDate=endDate
                                 initiallyOpened=true}}`);

  changeDateInPicker(moment("2015-01-01", "YYYY-MM-DD"), assert, this)
  assert.equal(this.$('.dp-date-input').val(), '2015', 'Outer input is updated.');

  this.$(".dp-cancel").click();
  assert.equal(this.$('.dp-date-input').val(), '2016', 'Outer input is updated.');
});

test('keeps changes when apply is pressed', function(assert) {
  this.setProperties({
    startDate: moment('2016-01-01', 'YYYY-MM-DD'),
    endDate: moment('2016-12-31', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{year-picker startDate=startDate
                                 endDate=endDate
                                 initiallyOpened=true}}`);

  changeDateInPicker(moment("2015-01-01", "YYYY-MM-DD"), assert, this)
  assert.equal(this.$('.dp-date-input').val(), '2015', 'Outer input is updated.');

  this.$(".dp-apply").click()
  return wait().then(() => {
    assert.equal(this.$('.dp-date-input').val(), '2015', 'Outer input is updated.');
  });
});

function changeDateInPicker(date, assert, context) {
  let $picker = context.$('.dp-display-year:first');

  // Left side
  $picker.find('.dp-btn-year').click();
  let year = date.format("YYYY");
  $picker.find(`.dp-year-body button:contains('${year}')`).click();
  assert.equal(context.$('.dp-date-input').val(), `${year}`, 'Outer input is updated.');
}

function inputExpectations(assert, prefix) {
  let $input = this.$('.dp-date-input');

  triggerEvent($input, 'keypress');

  assert.equal($input.val().trim(), prefix + '2016');

  $input.val(prefix + '2035');

  triggerEvent($input, 'keypress');

  assert.equal($input.val().trim(), prefix + '2035');
}

function triggerEvent($selector, eventType) {
  let event = $.Event(eventType);
  return $selector.trigger(event);
}


