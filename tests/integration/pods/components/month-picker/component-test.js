import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import { clickTrigger, nativeClick } from '../../../../helpers/click-trigger';

moduleForComponent('month-picker', 'Integration | Component | month picker', {
  integration: true
});

test('it renders', function(assert) {
  this.setProperties({
    startDate: moment('2015-06-07'),
    endDate: moment('2016-07-08'),
  });

  this.render(hbs`{{month-picker startDate=startDate
                                 endDate=endDate
                                 initiallyOpened=true}}`);

  let text = this.$().text().trim();

  assert.equal(text.match(new RegExp('[0-9]{4}', 'g')).length, 2, 'has 2 years');
  assert.equal(text.match(new RegExp('Jun', 'g')).length, 3, 'has June Selected and in both month selectors');
  assert.equal(text.match(new RegExp('Jul', 'g')).length, 3, 'has July Selected and in both month selectors');
  assert.equal(text.match(new RegExp('2016', 'g')).length, 1, 'has 2016 selected');
  assert.equal(text.match(new RegExp('2015', 'g')).length, 1, 'has 2015 selected');
});

test('month/year display visibilities are togglable', function(assert) {
  this.setProperties({
    startDate: moment('2015-06-07'),
    endDate: moment('2016-07-08'),
  });

  this.render(hbs`{{month-picker startDate=startDate
                                 endDate=endDate
                                 initiallyOpened=true}}`);

  let $leftCal = $(this.$('.dp-display-month-year').get(0));
  let $rightCal = $(this.$('.dp-display-month-year').get(1));

  // Left side

  assert.equal($leftCal.find('.dp-month-body').length, 1, 'left months are visible by default');
  assert.equal($leftCal.find('.dp-year-body').length, 0, 'left years not visible by default');

  $leftCal.find('.dp-btn-year').click();

  assert.equal($leftCal.find('.dp-month-body').length, 0, 'left months should not be visible after clicking year btn');
  assert.equal($leftCal.find('.dp-year-body').length, 1, 'left years should be visible after clicking year btn');

  $leftCal.find('.dp-btn-year').click();

  assert.equal($leftCal.find('.dp-month-body').length, 0, 'left months should not be visible after clicking year btn again');
  assert.equal($leftCal.find('.dp-year-body').length, 0, 'left years should not be visible after clicking year btn again');

  // Right side

  assert.equal($rightCal.find('.dp-month-body').length, 1, 'right months visible by default');
  assert.equal($rightCal.find('.dp-year-body').length, 0, 'right years not visible by default');

  $rightCal.find('.dp-btn-year').click();

  assert.equal($rightCal.find('.dp-month-body').length, 0, 'right months should not be visible after clicking year btn');
  assert.equal($rightCal.find('.dp-year-body').length, 1, 'right years should be visible after clicking year btn');

  $rightCal.find('.dp-btn-year').click();

  assert.equal($rightCal.find('.dp-month-body').length, 0, 'right months should not be visible after clicking year btn again');
  assert.equal($rightCal.find('.dp-year-body').length, 0, 'right years should not be visible after clicking year btn again');
});

test('has a default date of today', function(assert) {
  let today = moment().startOf('day').format("MM/YYYY");

  this.render(hbs`{{month-picker initiallyOpened=true}}`);
  let text = this.$('.dp-date-input')[0].value.trim();
  assert.equal(text.match(new RegExp(today, 'g')).length, 2, 'startDate and endDate defaults to today');
});

test('picking new start & end month/year updates view/properties', function(assert) {
  this.setProperties({
    startDate: moment('2015-06-07'),
    endDate: moment('2016-07-08'),
  });

  this.render(hbs`{{month-picker startDate=startDate
                                 endDate=endDate
                                 initiallyOpened=true}}`);

  let $leftCal = $(this.$('.dp-display-month-year').get(0));
  let $rightCal = $(this.$('.dp-display-month-year').get(1));

  // Left side

  $leftCal.find(".dp-month-body button:contains('Mar')").click();

  assert.equal(this.get('startDate').format('MMM'), 'Mar', 'start month button displays Mar.');

  $leftCal.find('.dp-btn-year').click();

  $leftCal.find(".dp-year-body button:contains('2015')").click();

  assert.equal(this.get('startDate').format('YYYY'), '2015', 'start year button displays Mar.');

  // Right side

  $rightCal.find(".dp-month-body button:contains('Jun')").click();

  assert.equal(this.get('endDate').format('MMM'), 'Jun', 'end month button displays Jun.');

  $rightCal.find('.dp-btn-year').click();

  $rightCal.find(".dp-year-body button:contains('2020')").click();

  assert.equal(this.get('endDate').format('YYYY'), '2020', 'end year button displays 2020.');
});

test('apply/cancel actions', function(assert) {
  this.setProperties({
    startDate: moment('2015-06-07'),
    endDate: moment('2016-07-08'),
    initiallyOpened: true,
  });

  this.render(hbs`{{month-picker startDate=startDate
                                 endDate=endDate
                                 initiallyOpened=initiallyOpened}}`);

  assert.equal(this.$('.dp-panel').length, 1, "date panel is open to begin");

  nativeClick('button.dp-apply');
  assert.equal(this.$('.dp-panel').length, 0, "date panel is closed on apply");

  clickTrigger();
  assert.equal(this.$('.dp-panel').length, 1, "date panel is reopened");

  nativeClick('button.dp-cancel');
  assert.equal(this.$('.dp-panel').length, 0, "date panel is closed on cancel");
});

test('picking new start & end month/year updates view/properties', function(assert) {
  this.setProperties({
    startDate: moment('2016-06-07'),
    endDate: moment('2016-07-08'),
  });

  this.render(hbs`{{month-picker startDate=startDate
                                 endDate=endDate
                                 initiallyOpened=true}}`);

  let $leftCal = $(this.$('.dp-display-month-year').get(0));
  let $rightCal = $(this.$('.dp-display-month-year').get(1));

  $leftCal.find("button:contains('Feb')").click();
  $rightCal.find("button:contains('Feb')").click();

  let startDate = this.get('startDate').format('YYYY-MM-DD');
  let endDate = this.get('endDate').format('YYYY-MM-DD');

  assert.equal(startDate, '2016-02-01', 'startDate is the start of 02/2016');
  assert.equal(endDate, '2016-02-29', 'endDate is the end of 02/2016');
});

test('picking new, out-of-range startDate does not create invalid date', function(assert) {
  this.setProperties({
    startDate: moment('2016-03-30'),
    endDate: moment('2016-05-05'),
  });

  this.render(hbs`{{month-picker startDate=startDate
                                 endDate=endDate
                                 initiallyOpened=true}}`);

  let $leftCal = $(this.$('.dp-display-month-year').get(0));

  $leftCal.find("button:contains('Feb')").click();

  let startDate = this.get('startDate').format('YYYY-MM-DD');

  assert.equal(startDate, '2016-02-01', 'startDate is the start of 02/2016');
});
