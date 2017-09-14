import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';

const { $ } = Ember;

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

  return wait().then(() => {
    $leftCal.find('.dp-btn-year').click();

    assert.equal($leftCal.find('.dp-month-body').length, 0, 'left months should not be visible after clicking year btn');
    assert.equal($leftCal.find('.dp-year-body').length, 1, 'left years should be visible after clicking year btn');


    return wait().then(() => {
      $leftCal.find('.dp-btn-year').click();

      assert.equal($leftCal.find('.dp-month-body').length, 0, 'left months should not be visible after clicking year btn again');
      assert.equal($leftCal.find('.dp-year-body').length, 0, 'left years should not be visible after clicking year btn again');

      // Right side

      assert.equal($rightCal.find('.dp-month-body').length, 1, 'right months visible by default');
      assert.equal($rightCal.find('.dp-year-body').length, 0, 'right years not visible by default');

      return wait().then(() => {
        $rightCal.find('.dp-btn-year').click();

        assert.equal($rightCal.find('.dp-month-body').length, 0, 'right months should not be visible after clicking year btn');
        assert.equal($rightCal.find('.dp-year-body').length, 1, 'right years should be visible after clicking year btn');

        return wait().then(() => {
          $rightCal.find('.dp-btn-year').click();

          assert.equal($rightCal.find('.dp-month-body').length, 0, 'right months should not be visible after clicking year btn again');
          assert.equal($rightCal.find('.dp-year-body').length, 0, 'right years should not be visible after clicking year btn again');
        });
      });
    });
  });
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

  return wait().then(() => {
    $leftCal.find(".dp-month-body button:contains('Mar')").click();

    assert.equal(this.get('startDate').format('MMM'), 'Mar', 'start month button displays Mar.');

    return wait().then(() => {
      $leftCal.find('.dp-btn-year').click();

      return wait().then(() => {
        $leftCal.find(".dp-year-body button:contains('2015')").click();

        assert.equal(this.get('startDate').format('YYYY'), '2015', 'start year button displays Mar.');

        // Right side

        return wait().then(() => {
          $rightCal.find(".dp-month-body button:contains('Jun')").click();

          assert.equal(this.get('endDate').format('MMM'), 'Jun', 'end month button displays Jun.');

          return wait().then(() => {
            $rightCal.find('.dp-btn-year').click();

            return wait().then(() => {
              $rightCal.find(".dp-year-body button:contains('2020')").click();

              assert.equal(this.get('endDate').format('YYYY'), '2020', 'end year button displays 2020.');
            });
          });
        });
      });
    });
  });
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

test('converts strings to moments', function(assert) {
  let dateString = '3015-01-02';
  let expectedDate = moment(dateString, 'YYYY-MM-DD').format("MMM");

  this.setProperties({
    startDate: dateString,
    endDate: dateString,
  });

  this.render(hbs`{{month-picker startDate=startDate
                                 endDate=endDate
                                 initiallyOpened=true}}`);

  assert.equal($(`.dp-btn-month.active:contains(${expectedDate})`).length, 2);
});

// TODO: Test that the year and month picker scrolls selection to the top
// There are two reasons why this hard to test:
// 1. The scroll calculation appears that it MAY be off due to this picker being inside the ember-testing container
// 2. You MUST use jquery animate to force the scroll to happen in the integration test. Because of this, it causes a race condition between assertion and scroll completion 
skip('automatically scrolls to selected year');
skip('automatically scrolls to selected month');

test('reverts changes when cancel is pressed', function(assert) {
  this.setProperties({
    startDate: moment('2016-04-19', 'YYYY-MM-DD'),
    endDate: moment('2016-05-19', 'YYYY-MM-DD')
  });

  this.render(hbs`{{month-picker startDate=startDate
                                      endDate=endDate
                                      initiallyOpened=true}}`);


  changeDateInPicker(moment("2015-03-15", "YYYY-MM-DD"), moment("2017-06-20", "YYYY-MM-DD"), assert, this)
  assert.equal(this.$('.dp-date-input').val(), '03/2015—06/2017', 'Outer input is updated.');

  this.$(".dp-cancel").click();
  assert.equal(this.$('.dp-date-input').val(), '04/2016—05/2016', 'Outer input is updated.');
});

test('keeps changes when apply is pressed', function(assert) {
  this.setProperties({
    startDate: moment('2016-04-19', 'YYYY-MM-DD'),
    endDate: moment('2016-05-19', 'YYYY-MM-DD')
  });

  this.render(hbs`{{month-picker startDate=startDate
                                      endDate=endDate
                                      initiallyOpened=true}}`);

  changeDateInPicker(moment("2015-03-15", "YYYY-MM-DD"), moment("2017-06-20", "YYYY-MM-DD"), assert, this)
  assert.equal(this.$('.dp-date-input').val(), '03/2015—06/2017', 'Outer input is updated.');

  this.$(".dp-apply").click()
  return wait().then(() => {
    assert.equal(this.$('.dp-date-input').val(), '03/2015—06/2017', 'Outer input is updated.');
  });
});

function changeDateInPicker(startDate, endDate, assert, context) {
  let originalEndDate = context.get('endDate');

  let $leftCal = context.$('.dp-display-month-year:first');
  let $rightCal = context.$('.dp-display-month-year:last');

  // Left side
  $leftCal.find('.dp-btn-year').click();
  let leftYear = startDate.format("YYYY");
  $leftCal.find(`.dp-year-body button:contains('${leftYear}')`).click();
  assert.equal($leftCal.find('.dp-btn-year').text().trim(), leftYear, `Start year button display ${leftYear}.`);

  let leftMonth = startDate.format("MMM");
  $leftCal.find(`.dp-month-body button:contains('${leftMonth}')`).click();

  assert.equal($leftCal.find(".dp-btn-month").text().trim(), leftMonth, `Start month button displays ${leftMonth}.`);
  assert.equal(context.$('.dp-date-input').val(), `${startDate.format("MM/YYYY")}—${originalEndDate.format("MM/YYYY")}`, 'Outer input is updated.');
  assert.equal(context.get('startDate').format("MM/YYYY"), startDate.format("MM/YYYY"), 'startDate is updated.');
  assert.equal(context.get('endDate').format("MM/YYYY"), originalEndDate.format("MM/YYYY"), 'endDate does not change.');

  // Right side
  $rightCal.find('.dp-btn-year').click();

  let rightYear = endDate.format("YYYY");
  $rightCal.find(`.dp-year-body button:contains('${rightYear}')`).click();
  assert.equal($rightCal.find('.dp-btn-year').text().trim(), rightYear, `End year button display ${rightYear}.`);

  let rightMonth = endDate.format("MMM");
  $rightCal.find(`.dp-month-body button:contains('${rightMonth}')`).click();
  assert.equal($rightCal.find(".dp-btn-month").text().trim(), rightMonth, `End month button displays ${rightMonth}.`);

  assert.equal(context.$('.dp-date-input').val(), `${startDate.format("MM/YYYY")}—${endDate.format("MM/YYYY")}`, 'Outer input is updated.');
  assert.equal(context.get('startDate').format("MM/YYYY"), startDate.format("MM/YYYY"), 'startDate is updated.');
  assert.equal(context.get('endDate').format("MM/YYYY"), endDate.format("MM/YYYY"), 'endDate does not change.');
}
