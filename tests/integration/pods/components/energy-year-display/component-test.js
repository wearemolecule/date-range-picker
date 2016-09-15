import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('energy-year-display', 'Integration | Component | energy year display', {
  integration: true
});

test('it renders', function(assert) {
  this.setProperties({
    startDate: moment('2016-01-01', 'YYYY-MM-DD'),
    endDate: moment('2016-12-30', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{energy-year-display startDate=startDate
                                        endDate=endDate}}`);

  assert.equal(this.$().text().trim(), 'EY 2016', 'displays the correct placeholder year');
});

test('expands to show all the years', function(assert) {
  this.setProperties({
    startDate: moment('2016-01-01', 'YYYY-MM-DD'),
    endDate: moment('2016-12-30', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{energy-year-display startDate=startDate
                                        endDate=endDate}}`);

  this.$("button:contains('2016')").click();

  assert.equal(this.$('.dp-year-body button').length, 21, 'shows 21 (10 + 1 + 10) years at a time by default');
});

test('updating the year changes start and end dates', function(assert) {
  this.setProperties({
    startDate: moment('2016-01-01', 'YYYY-MM-DD'),
    endDate: moment('2016-12-30', 'YYYY-MM-DD'),
    startOfYearMonth: 06,
    startOfYearDay: 01,
    endOfYearMonth: 05,
    endOfYearDay: 31
  });

  this.render(hbs`{{energy-year-display startDate=startDate
                                        endDate=endDate
                                        startOfYearMonth=startOfYearMonth
                                        startOfYearDay=startOfYearDay
                                        endOfYearMonth=endOfYearMonth
                                        endOfYearDay=endOfYearDay}}`);
  this.$("button:contains('2016')").click();
  this.$("button:contains('2017')").click();

  assert.equal(this.get('startDate').format("YYYY-MM-DD"), '2017-06-01', 'startDate is updated to 2017.');
  assert.equal(this.get('endDate').format("YYYY-MM-DD"), '2018-05-31', 'endDate is updated to 2018.');
});
