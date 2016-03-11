import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('calendar-display', 'Integration | Component | calendar display', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{calendar-display}}`);
  assert.ok(this.$());
});
