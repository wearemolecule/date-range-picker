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

test('actions - setMonth', function(assert) {
  this.set('month', moment('2016-01-05'));

  this.render(hbs`{{month-display month=month
                                  startDate=month
                                  isExpanded=true}}`);

  this.$(".dp-month-body button:contains('May')").click();

  let actual = this.$('.dp-btn-month').html().trim();

  assert.equal(actual, 'May', 'clicking a month changes the selected month btn');
});
