import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('date-picker', 'Integration | Component | date picker', {
  integration: true
});

test('it renders', function(assert) {
  let today = moment('2016-03-11', 'YYYY-MM-DD');

  this.set('today', today);

  this.render(hbs`{{date-picker date=today}}`);

  assert.equal(this.$().text().trim(), '');
});
