import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('year-display', 'Integration | Component | year display', {
  integration: true
});

// year-display use the current year as the placeholder
test('it renders', function(assert) {
  this.setProperties({
    startDate: moment('2016-01-01', 'YYYY-MM-DD'),
    endDate: moment('2016-12-30', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{year-display startDate=startDate
                                 endDate=endDate}}`);

  let currentYear = moment().format('YYYY');
  assert.equal(this.$().text().trim(), currentYear, 'displays the correct placeholder year');
});

test('it renders as an energy year display', function(assert) {
  this.setProperties({
    startDate: moment('2016-06-01', 'YYYY-MM-DD'),
    endDate: moment('2017-05-31', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{year-display startDate=startDate
                                 endDate=endDate
                                 energyYear=true}}`);

  let currentYear = moment().format('YYYY');
  assert.equal(this.$().text().trim(), "EY " + currentYear, 'displays the correct placeholder year');
});

test('expands to show all the years', function(assert) {
  this.setProperties({
    startDate: moment('2016-01-01', 'YYYY-MM-DD'),
    endDate: moment('2016-12-30', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{year-display startDate=startDate
                                 endDate=endDate
                                 isExpanded=true}}`);

  this.$("button:contains('2016')").click();

  assert.equal(this.$('.dp-year-body button').length, 21, 'shows 21 (10 + 1 + 10) years at a time by default');
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

test('updating the year changes the displayed year as an energy year display', function(assert) {
  this.setProperties({
    startDate: moment('2016-06-01', 'YYYY-MM-DD'),
    endDate: moment('2017-05-31', 'YYYY-MM-DD'),
  });

  this.render(hbs`{{year-display startDate=startDate
                                 endDate=endDate
                                 month=endDate
                                 energyYear=true}}`);

  this.$("button:contains('2017')").click();
  this.$("button:contains('2020')").click();
  assert.equal(this.get('startDate').format("YYYY"), '2019', 'startDate is updated to 2019.');
  assert.equal(this.get('endDate').format("YYYY"), '2020', 'endDate is updated to 2020.');
  assert.equal(this.$('.dp-btn-year').text().trim(), 'EY 2020', 'Year button displays EY 2020.');
});
