import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('year-picker', 'Integration | Component | year picker', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{year-picker}}`);

  assert.equal(this.$().text().trim(), '');
});
