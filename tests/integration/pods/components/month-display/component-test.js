import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('month-display', 'Integration | Component | month display', {
  integration: true
});

test('it renders', function(assert) {
  this.set('month', moment('2016-01-05'));

  this.render(hbs`{{month-display month=month}}`);

  assert.equal(this.$().text().trim(), 'Jan');
});
