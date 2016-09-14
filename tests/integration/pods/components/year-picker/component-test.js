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

test('optional, masked input - moment', function(assert) {
  this.setProperties({
    startDate: moment('2016-01-01', 'YYYY-MM-DD'),
    endDate: moment('2016-12-30', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{year-picker startDate=startDate
                                endDate=endDate}}`);

  inputExpectations.call(this, assert);
});

test('optional, masked input - string', function(assert) {
  this.setProperties({
    startDate: '2016-01-01',
    endDate: '2016-12-30',
  });

  this.render(hbs`{{year-picker startDate=startDate
                                endDate=endDate}}`);

  inputExpectations.call(this, assert);
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

function inputExpectations(assert) {
  let $input = this.$('.dp-date-input');

  triggerEvent($input, 'keypress');

  assert.equal($input.val().trim(), '2016');

  $input.val('2035');

  triggerEvent($input, 'keypress');

  assert.equal($input.val().trim(), '2035');
}

function triggerEvent($selector, eventType) {
  let event = $.Event(eventType);
  return $selector.trigger(event);
}
