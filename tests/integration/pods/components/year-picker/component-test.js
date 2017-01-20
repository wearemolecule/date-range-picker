import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

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

  let text = this.$().text().trim();
  assert.equal(text.match(new RegExp('[0-9]{4}', 'g')).length, 21, 'Has 72 1-4 digit numbers...');
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

  let text = this.$().text().trim();
  assert.equal(text.match(new RegExp('[0-9]{4}', 'g')).length, 21, 'Has 72 1-4 digit numbers...');
});

test('optional, masked input - moment', function(assert) {
  this.setProperties({
    startDate: moment('2016-01-01', 'YYYY-MM-DD'),
    endDate: moment('2016-12-30', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{year-picker startDate=startDate
                                endDate=endDate}}`);

  inputExpectations.call(this, assert, "");
});

test('optional, masked input - moment as an energy year picker', function(assert) {
  this.setProperties({
    startDate: moment('2016-01-01', 'YYYY-MM-DD'),
    endDate: moment('2016-12-30', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{year-picker startDate=startDate
                                endDate=endDate
                                energyYear=true}}`);

  inputExpectations.call(this, assert, "EY ");
});

test('optional, masked input - string', function(assert) {
  this.setProperties({
    startDate: '2016-01-01',
    endDate: '2016-12-30',
  });

  this.render(hbs`{{year-picker startDate=startDate
                                endDate=endDate}}`);

  inputExpectations.call(this, assert, "");
});

test('optional, masked input - string as an energy year picker', function(assert) {
  this.setProperties({
    startDate: '2015-06-01',
    endDate: '2016-05-31',
  });

  this.render(hbs`{{year-picker startDate=startDate
                                endDate=endDate
                                energyYear=true}}`);

  inputExpectations.call(this, assert, "EY ");
});

test('has a default date of today', function(assert) {
  let today = moment().startOf('day').format("YYYY");

  this.render(hbs`{{year-picker initiallyOpened=true}}`);
  let text = this.$('.dp-date-input')[0].value.trim();
  assert.equal(text.match(new RegExp(today, 'g')).length, 1, 'startDate and endDate defaults to today');
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

  assert.equal(this.get('startDate').format('YYYY-MM-DD'), prevYear.clone().startOf('year').format('YYYY-MM-DD'), 'Start is updated.');
  assert.equal(this.get('endDate').format('YYYY-MM-DD'), prevYear.clone().endOf('year').format('YYYY-MM-DD'), 'End is updated.');
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

  this.$(".dp-year-body button:contains('2015')").click();

  assert.equal(this.get('startDate').format('YYYY-MM-DD'), moment('2014-06-01').format('YYYY-MM-DD'), 'Start is updated.');
  assert.equal(this.get('endDate').format('YYYY-MM-DD'), moment('2015-05-31').format('YYYY-MM-DD'), 'End is updated.');
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

  assert.equal(this.$(".dp-year-picker input").eq(0).val(), expectedDate);
});

function inputExpectations(assert, prefix) {
  let $input = this.$('.dp-date-input');

  triggerEvent($input, 'keypress');

  assert.equal($input.val().trim(), prefix + '2016');

  $input.val('2035');

  triggerEvent($input, 'keypress');

  assert.equal($input.val().trim(), prefix + '2035');
}

function triggerEvent($selector, eventType) {
  let event = $.Event(eventType);
  return $selector.trigger(event);
}
