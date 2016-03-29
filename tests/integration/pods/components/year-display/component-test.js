import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('year-display', 'Integration | Component | year display', {
  integration: true
});

test('it renders', function(assert) {
  this.setProperties({
    startDate: moment('2016-01-01', 'YYYY-MM-DD'),
    endDate: moment('2016-12-30', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{year-display startDate=startDate
                                 endDate=endDate}}`);

  assert.equal(this.$().text().trim(), '2016', 'displays the correct placeholder year');
});

test('expands to show all the years', function(assert) {
  this.setProperties({
    startDate: moment('2016-01-01', 'YYYY-MM-DD'),
    endDate: moment('2016-12-30', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{year-display startDate=startDate
                                 endDate=endDate}}`);

  this.$("button:contains('2016')").click();

  assert.equal(this.$('.dp-year-body button').length, 11, 'shows 11 (5 + 1 + 5) years at a time by default');
});
