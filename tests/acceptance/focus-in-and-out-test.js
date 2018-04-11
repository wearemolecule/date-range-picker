import { test } from 'ember-qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import $ from 'jquery';
import moment from 'moment';

let startDate = moment('2015-03-15', 'YYYY-MM-DD')
let endDate = moment('2017-06-19', 'YYYY-MM-DD')

moduleForAcceptance('Acceptance | Focus Tests');

test('Monther Picker: applies changes when focus is lost', function(assert) {
  visit("/");
  triggerEvent('.dp-month-picker .ember-basic-dropdown-trigger', 'focusin');

  var $leftCal
  var $rightCal
  andThen(() => {
    $leftCal = $('.dp-display-month-year:first');
    $rightCal = $('.dp-display-month-year:last');
    $leftCal.find('.dp-btn-year').click();
  })

  // Left side
  var leftYear
  andThen(() => {
    leftYear = startDate.format("YYYY");
    $leftCal.find(`.dp-year-body button:contains('${leftYear}')`).click();
  })

  var leftMonth
  andThen(() => {
    assert.equal($leftCal.find('.dp-btn-year').text().trim(), leftYear, `Start year button display ${leftYear}.`);

    leftMonth = startDate.format("MMM");
    $leftCal.find(`.dp-month-body button:contains('${leftMonth}')`).click();
  })

  andThen(() => {
    assert.equal($leftCal.find(".dp-btn-month").text().trim(), leftMonth, `Start month button displays ${leftMonth}.`);
    assert.equal($('.dp-month-picker .dp-date-input').val(), `${startDate.format("MM/YYYY")}—${moment().add(2, 'days').format("MM/YYYY")}`, 'Outer input is updated.');

    // Right side
    $rightCal.find('.dp-btn-year').click();
  })

  var rightYear
  andThen(() => {
    rightYear = endDate.format("YYYY");
    $rightCal.find(`.dp-year-body button:contains('${rightYear}')`).click();
  })

  var rightMonth
  andThen(() => {
    assert.equal($rightCal.find('.dp-btn-year').text().trim(), rightYear, `End year button display ${rightYear}.`);

    rightMonth = endDate.format("MMM");
    $rightCal.find(`.dp-month-body button:contains('${rightMonth}')`).click();
  })

  andThen(()=> {
    assert.equal($rightCal.find(".dp-btn-month").text().trim(), rightMonth, `End month button displays ${rightMonth}.`);

    assert.equal($('.dp-month-picker .dp-date-input').val(), `${startDate.format("MM/YYYY")}—${endDate.format("MM/YYYY")}`, 'Outer input is updated.');
    assert.equal($('.dp-month-picker .dp-date-input').val(), '03/2015—06/2017', 'Outer input is updated.');

    triggerEvent('.dp-month-picker .ember-basic-dropdown-trigger', 'focusout');
  })

  andThen(() => {
    assert.equal($('.dp-month-picker .dp-date-input').val(), '03/2015—06/2017', 'Outer input is updated.');
    assert.equal($('.dp-display-month-year').length, 0, 'month range is closed');

    // There was a bug where if you focused on the input and then focused back out it'd lose it's application
    // this is to ensure that the date stays applied
    triggerEvent('.dp-month-picker .ember-basic-dropdown-trigger', 'focusin');
  })

  andThen(() => {
    assert.equal($('.dp-month-picker .dp-date-input').val(), '03/2015—06/2017', 'Date is maintained when focusing in');
    assert.equal($('.dp-display-month-year').length, 2, 'month range is open');

    triggerEvent('.dp-month-picker .ember-basic-dropdown-trigger', 'focusout');
  })

  andThen(() => {
    assert.equal($('.dp-month-picker .dp-date-input').val(), '03/2015—06/2017', 'Date is maintained when focusing out.');
    assert.equal($('.dp-display-month-year').length, 0, 'month range is closed');

    triggerEvent('.dp-month-picker .ember-basic-dropdown-trigger', 'focusin');
  })

  andThen(() => {
    assert.equal($('.dp-cancel').length, 1, 'cancel button is available to be pressed');
    // Continuation of this bug, should remain the same value after hitting cancel as well

    click('.dp-cancel')
  })

  andThen(()=> {
    assert.equal($('.dp-month-picker .dp-date-input').val(), '03/2015—06/2017', 'Date is maintained when canceling.');
  })
});

test('Date Range Picker: applies changes when focus is lost on', function(assert) {
  visit("/");
  triggerEvent('.dp-date-range-picker .ember-basic-dropdown-trigger', 'focusin');

  var $leftCal
  var $rightCal
  andThen(() => {
    $leftCal = $('.dp-display-calendar:first');
    $rightCal = $('.dp-display-calendar:last');

    // Left side
    $leftCal.find('.dp-btn-month').click();
  })

  var leftMonth
  andThen(() => {
    leftMonth = startDate.format("MMM");
    $leftCal.find(`.dp-month-body button:contains('${leftMonth}')`).click();
  })

  andThen(() => {
    assert.equal($leftCal.find(".dp-btn-month").text().trim(), leftMonth, `Start month button displays ${leftMonth}.`);

    $leftCal.find('.dp-btn-year').click();
  });

  var leftYear
  andThen(() => {
    leftYear = startDate.format("YYYY");
    $leftCal.find(`.dp-year-body button:contains('${leftYear}')`).click();
  })

  andThen(() => {
    assert.equal($leftCal.find('.dp-btn-year').text().trim(), leftYear, `Start year button display ${leftYear}.`);

    let leftDay = startDate.format("D");
    $leftCal.find(`.dp-day:contains('${leftDay}')`).click();
  })

  andThen(() => {
    assert.equal($('.dp-date-range-picker .dp-date-input').val(), `${startDate.format("MM/DD/YYYY")}—${moment().add(2, 'days').format("MM/DD/YYYY")}`, 'Outer input is updated.');
    assert.equal($('.dp-presets-date-input').val(), `${startDate.format("MM/DD/YYYY")}—${moment().add(2, 'days').format("MM/DD/YYYY")}`, 'Inner input is updated.');

    // Right side
    $rightCal.find('.dp-btn-month').click();
  })

  var rightMonth
  andThen(() => {
    rightMonth = endDate.format("MMM");
    $rightCal.find(`.dp-month-body button:contains('${rightMonth}')`).click();
  })

  andThen(() => {
    assert.equal($rightCal.find(".dp-btn-month").text().trim(), rightMonth, `End month button displays ${rightMonth}.`);

    $rightCal.find('.dp-btn-year').click();
  })

  var rightYear
  andThen(() => {
    rightYear = endDate.format("YYYY");
    $rightCal.find(`.dp-year-body button:contains('${rightYear}')`).click();
  });

  andThen(() => {
    assert.equal($rightCal.find('.dp-btn-year').text().trim(), rightYear, `End year button display ${rightYear}.`);

    $rightCal.find('.dp-btn-year').click();
  });

  andThen(() => {
    let rightDay = endDate.format("D");
    $rightCal.find(`.dp-day:contains('${rightDay}')`).click();
  });

  andThen(() => {
    assert.equal($('.dp-date-range-picker .dp-date-input').val(), `${startDate.format("MM/DD/YYYY")}—${endDate.format("MM/DD/YYYY")}`, 'Outer input is updated.');
    assert.equal($('.dp-presets-date-input').val(), `${startDate.format("MM/DD/YYYY")}—${endDate.format("MM/DD/YYYY")}`, 'Inner input is updated.');

    triggerEvent('.dp-date-range-picker .ember-basic-dropdown-trigger', 'focusout');
  })

  andThen(() => {
    assert.equal($('.dp-date-range-picker .dp-date-input').val(), '03/15/2015—06/19/2017', 'Outer input is updated.');
    assert.equal($('.dp-display-calendar').length, 0, 'Date Range Picker is Closed');

    // There was a bug where if you focused on the input and then focused back out it'd lose it's application
    // this is to ensure that the date stays applied
    triggerEvent('.dp-date-range-picker .ember-basic-dropdown-trigger', 'focusin');
  })


  andThen(() => {
    assert.equal($('.dp-display-calendar').length, 2, 'Date Range Picker is open');
    assert.equal($('.dp-date-range-picker .dp-date-input').val(), '03/15/2015—06/19/2017', 'Date is maintained when focusing back in.');
    triggerEvent('.dp-date-range-picker .ember-basic-dropdown-trigger', 'focusout');
  })

  andThen(() =>{
    assert.equal($('.dp-display-calendar').length, 0, 'Date Range Picker is closed');
    assert.equal($('.dp-date-range-picker .dp-date-input').val(), '03/15/2015—06/19/2017', 'Date is maintainted when focusing out again.');

    triggerEvent('.dp-date-range-picker .ember-basic-dropdown-trigger', 'focusin');
  })

  andThen(() => {
    assert.equal($('.dp-display-calendar').length, 2, 'Date Range Picker is open');
    // Continuation of this bug, should remain the same value after hitting cancel as well
    click(".dp-date-range-picker .dp-cancel")
  });

  andThen(() => {
    assert.equal($('.dp-date-range-picker .dp-date-input').val(), '03/15/2015—06/19/2017', 'Date is maintained when canceled.');
  });
});

test('YearPicker: applies changes when focus is lost', function(assert) {
  visit("/");
  triggerEvent('.dp-year-picker .ember-basic-dropdown-trigger', 'focusin');

  var $picker
  andThen(() => {
    $picker = $('.dp-display-year');
    $picker.find('.dp-btn-year').click();
  })

  andThen(() => {
    $picker.find(`.dp-year-body button:contains('2015')`).click();
  })

  andThen(() => {
    assert.equal($('.dp-year-picker .dp-date-input').val(), `2015`, "Year is Set to 2015");

    triggerEvent('.dp-year-picker .ember-basic-dropdown-trigger', 'focusout');
  })


  andThen(() => {
    assert.equal($('.dp-display-year').length, 0, "Year picker is Closed");
    assert.equal($('.dp-year-picker .dp-date-input').val(), '2015', "Year maintains selection of focus out");

    // There was a bug where if you focused on the input and then focused back out it'd lose it's application
    // this is to ensure that the date stays applied
    triggerEvent('.dp-year-picker .ember-basic-dropdown-trigger', 'focusin');
  });

  andThen(() => {
    assert.equal($('.dp-display-year').length, 1, "Year picker is open");
    assert.equal($('.dp-year-picker .dp-date-input').val(), '2015', 'Year is still selected after focusin');

    triggerEvent('.dp-year-picker .ember-basic-dropdown-trigger', 'focusout');
  })

  andThen(() => {
    assert.equal($('.dp-display-year').length, 0, "Year picker is closed");
    assert.equal($('.dp-year-picker .dp-date-input').val(), '2015', 'Year picker maintains selection on second focus out');

    triggerEvent('.dp-year-picker .ember-basic-dropdown-trigger', 'focusin');
  })

  andThen(() => {
    assert.equal($('.dp-display-year').length, 1, "Year picker is open");
    assert.equal($('.dp-year-picker .dp-date-input').val(), '2015', 'Year picker maintains selection on second focus out');

    // Continuation of this bug, should remain the same value after hitting cancel as well
    click(".dp-cancel")
  })

  andThen(() => {
    assert.equal($('.dp-year-picker .dp-date-input').val(), '2015', 'Year picker does not reset');
  })
});
