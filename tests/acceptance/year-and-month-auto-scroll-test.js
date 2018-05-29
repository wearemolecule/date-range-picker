import { test } from 'ember-qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import $ from 'jquery';
import moment from 'moment';

moduleForAcceptance('Acceptance | Year and Month Pickers Scroll');

test("year-picker scrolls year selection to top", function(assert) {
  visit("/");
  triggerEvent('.dp-year-picker .ember-basic-dropdown-trigger', 'focusin');

  var $btn;
  var $originalOffset;
  andThen(() => {
    $btn = $(`.dp-btn-year-option`).eq(4);
    assert.equal($btn.length, 1);
    $originalOffset = $btn.offset().top;
    $btn.click();
  });

  andThen(() =>  {
    assert.notEqual($originalOffset, $btn.offset().top, 'selected year has moved');
  });
});

test("month-picker scrolls month and year selection to top", function(assert) {
  visit("/");
  triggerEvent('.dp-month-picker .ember-basic-dropdown-trigger', 'focusin');

  // Month Selection scrolls
  var $monthBtn;
  var $originalMonthOffset;
  andThen(() => {
    let $leftCal = $('.dp-display-month-year').eq(0);
    if (moment().month() <= 4) { // At top of month list
      $monthBtn = $leftCal.find(`.dp-month-option`).eq(8); // Click Sep
    } else {
      $monthBtn = $leftCal.find(`.dp-month-option`).eq(0); // Click Jan
    }
    assert.equal($monthBtn.length, 1, "found month button");
    $originalMonthOffset = $monthBtn.offset().top;
    $monthBtn.click();
  });

  andThen(() =>  {
    assert.notEqual($originalMonthOffset, $monthBtn.offset().top, 'selected month has moved');
  });

  // Year Selection Scrolls
  click('.dp-month-picker .dp-display-month-year:first .dp-btn-year');

  var $yearBtn;
  var $originalYearOffset;
  andThen(() => {
    let $leftCal = $('.dp-display-month-year').eq(0);
    $yearBtn = $leftCal.find(`.dp-btn-year-option`).eq(4);
    assert.equal($yearBtn.length, 1, "found year button");
    $originalYearOffset = $yearBtn.offset().top;
    $yearBtn.click();
  });

  andThen(() =>  {
    assert.notEqual($originalYearOffset, $yearBtn.offset().top, 'selected year has moved');
  });
});

test("date-range-picker scrolls month and year selection to top", function(assert) {
  visit("/");
  triggerEvent('.dp-date-range-picker .ember-basic-dropdown-trigger', 'focusin');

  andThen(() => click('.dp-date-range-picker .dp-display-calendar:first .dp-btn-month'));

  // Month Selection scrolls
  var $monthBtn;
  var $originalMonthOffset;
  andThen(() => {
    let $leftCal = $('.dp-display-calendar').eq(0);
    if (moment().month() <= 4) { // Won't scroll because we're at the end of the list
      $monthBtn = $leftCal.find(`.dp-month-option`).eq(4);
    } else {
      $monthBtn = $leftCal.find(`.dp-month-option`).eq(8);
    }
    assert.equal($monthBtn.length, 1, "found month button");
    $originalMonthOffset = $monthBtn.offset().top;
    $monthBtn.click();
  });

  andThen(() =>  {
    assert.notEqual($originalMonthOffset, $monthBtn.offset().top, 'selected month has moved');
  });

  // Year Selection Scrolls
  andThen(() => click('.dp-date-range-picker .dp-display-calendar:first .dp-btn-year'));

  var $yearBtn;
  var $originalYearOffset;
  andThen(() => {
    let $leftCal = $('.dp-display-calendar').eq(0);
    $yearBtn = $leftCal.find(`.dp-btn-year-option`).eq(4);
    assert.equal($yearBtn.length, 1, "found year button");
    $originalYearOffset = $yearBtn.offset().top;
    $yearBtn.click();
  });

  andThen(() =>  {
    assert.notEqual($originalYearOffset, $yearBtn.offset().top, 'selected year has moved');
  });
});
