import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('date-range-picker', 'Integration | Component | date range picker', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{date-range-picker}}`);

  assert.equal(this.$().text().trim(), '');
});
