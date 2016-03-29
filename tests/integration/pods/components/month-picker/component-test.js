import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('month-picker', 'Integration | Component | month picker', {
  integration: true
});

test('it renders', function(assert) {
  this.setProperties({
    startDate: moment('2015-06-07'),
    endDate: moment('2016-07-08'),
    showInput: true,
  });

  this.render(hbs`{{month-picker startDate=startDate
                                 endDate=endDate
                                 showInput=showInput}}`);

  assert.equal(this.$('input').length, 1, 'shows one input if showInput=true');
  assert.equal(this.$('input').val(), '06/2015 - 07/2016', 'populated the input correctly');

  this.set('showInput', false);

  assert.equal(this.$('input').length, 0, 'does not display input if showInput=false');
});

test('month/year display visibilities are togglable', function(assert) {
  this.setProperties({
    startDate: moment('2015-06-07'),
    endDate: moment('2016-07-08'),
    showInput: true,
  });

  this.render(hbs`{{month-picker startDate=startDate
                                 endDate=endDate
                                 showInput=showInput
                                 isExpanded=true}}`);

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
