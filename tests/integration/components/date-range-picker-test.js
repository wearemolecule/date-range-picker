import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('date-range-picker', 'Integration | Component | date range picker', {
  integration: true
});

test('it renders', function(assert) {
  let today = moment('2016-03-11', 'YYYY-MM-DD');

  this.set('today', today);

  this.render(hbs`{{date-range-picker startMonth=today
                                      isExpanded=true}}`);

  let text = this.$().text().trim();

  assert.equal(text.match(new RegExp('[0-9]{1,4}', 'g')).length, 72, 'Has 72 1-4 digit numbers...');
});
