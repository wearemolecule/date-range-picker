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

test('selecting a year retains the month', function(assert) {
  this.setProperties({
    startDate: moment('2016-03-01', 'YYYY-MM-DD')
  });

  this.render(hbs`{{year-display startDate=startDate}}`);

  this.$("button:contains('2016')").click();

  this.$("button:contains('2017')").click();

  assert.equal(this.get('startDate').format('MM'), '03', 'Month should still be March.');
});

test('updating the year changes the displayed year', function(assert) {
  this.setProperties({
    startDate: moment('2016-01-01', 'YYYY-MM-DD'),
    endDate: moment('2016-12-30', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{year-display startDate=startDate
                                 endDate=endDate
                                 month=startDate}}`);

  this.$("button:contains('2016')").click();

  this.$("button:contains('2017')").click();

  assert.equal(this.get('startDate').format("YYYY"), '2017', 'startDate is updated to 2017.');
  assert.equal(this.get('endDate').format("YYYY"), '2017', 'startDate is updated to 2017.');
  assert.equal(this.$('.dp-btn-year').text().trim(), '2017', 'Year button displays 2017.');
});
