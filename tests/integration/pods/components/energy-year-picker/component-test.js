import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import Ember from 'ember';

moduleForComponent('energy-year-picker', 'Integration | Component | energy year picker', {
  integration: true
});

test('it renders', function(assert) {
  this.setProperties({
    startDate: moment('2016-06-01', 'YYYY-MM-DD'),
    endDate: moment('2017-05-31', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{energy-year-picker startDate=startDate endDate=endDate showInput=true}}`);
  assert.equal(this.$().text().trim(), '');
});

test('optional, masked input - string', function(assert) {
  this.setProperties({
    startDate: '2016-06-01',
    endDate: '2017-05-31',
  });

  this.render(hbs`{{energy-year-picker startDate=startDate
                                       endDate=endDate
                                       showInput=true}}`);


  let $input = this.$('.dp-date-input');
  $input.trigger($.Event('keypress'));
  assert.equal($input.val().trim(), 'EY 2016');

  $input.val('2035');
  $input.trigger($.Event('keypress'));
  assert.equal($input.val().trim(), 'EY 2035');
});

test('can select a new year', function(assert) {
  this.setProperties({
    startDate: moment('2016-01-01', 'YYYY-MM-DD'),
    endDate: moment('2016-12-30', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{energy-year-picker startDate=startDate
                                       endDate=endDate
                                       showInput=true
                                       isExpanded=true}}`);

  this.$(".dp-year-body button:contains('2015')").click();

  Ember.run.next(this, () => {
    assert.equal(this.get('startDate').format('YYYY-MM-DD'), '2015-06-01', 'Start is updated.');
    assert.equal(this.get('endDate').format('YYYY-MM-DD'), '2016-05-31', 'End is updated.');
  });
});
