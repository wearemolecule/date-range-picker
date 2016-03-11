import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('day-display', 'Integration | Component | day display', {
  integration: true
});

test('it renders', function(assert) {
  this.set('day', moment('2016-03-11').startOf('day'));

  this.render(hbs`{{day-display day=day}}`);

  assert.equal(this.$().text().trim(), '11', 'Renders the day of the month');
});
