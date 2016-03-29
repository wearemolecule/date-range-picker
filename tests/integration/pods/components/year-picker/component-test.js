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

  this.render(hbs`{{year-picker start=start
                                end=end}}`);

  assert.equal(this.$().text().trim(), '');
});

test('optional, masked input - moment', function(assert) {
  this.setProperties({
    startDate: moment('2016-01-01', 'YYYY-MM-DD'),
    endDate: moment('2016-12-30', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{year-picker startDate=startDate
                                endDate=endDate
                                showInput=true}}`);

  inputExpectations.call(this, assert);
});

test('optional, masked input - string', function(assert) {
  this.setProperties({
    startDate: '2016-01-01',
    endDate: '2016-12-30',
  });

  this.render(hbs`{{year-picker startDate=startDate
                                endDate=endDate
                                showInput=true}}`);

  inputExpectations.call(this, assert);
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
