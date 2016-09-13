import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | date range picker');

// We need to make this test work one day, this tests basic keyboard functionality
// It currently works on live reload, but does not work on initial test reload
// [MG] 2016-09-13
// test('visiting /date-range-picker', function(assert) {
//   visit('/');
//   andThen(() => {
//     assert.equal($('.dp-panel').length, 0, "date panel is close to begin");
//     click('.dp-date-range-picker .ember-basic-dropdown-trigger');
//   });
// 
//   andThen(() => {
//     assert.equal($('.dp-panel').length, 1, "date panel is opened on focus");
//     keyEvent('.dp-panel', 'keydown', 27);
//   });
// 
//   andThen(() => {
//     assert.equal($('.dp-panel').length, 0, "date panel is closed on escape");
//     var event = document.createEvent('Event');
//     event.keyCode = 13; // Press Enter
//     event.initEvent('keydown');
//     document.activeElement.dispatchEvent(event);
//   });
// 
//   andThen(() => {
//     assert.equal($('.dp-panel').length, 1, "date panel is opened on enter");
//   });
// });

test('apply/cancel actions on date range picker', function(assert) {
  visit('/');
  andThen(() => {
    assert.equal($('.dp-panel').length, 0, "date panel is close to begin");
    click('.dp-date-range-picker .ember-basic-dropdown-trigger');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 1, "date panel is opened on focus");
    assert.equal($('.dp-apply').length, 1, "date panel has apply button");
    assert.equal($('.dp-cancel').length, 1, "date panel has cancel button");
    click('.dp-apply');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 0, "date panel is closed on apply");
    click('.dp-date-range-picker .ember-basic-dropdown-trigger');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 1, "date panel is reopened");
    assert.equal($('.dp-apply').length, 1, "date panel has apply button");
    assert.equal($('.dp-cancel').length, 1, "date panel has cancel button");
    click('.dp-cancel');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 0, "date panel is closed on cancel");
  });
});

test('apply/cancel actions on month range picker', function(assert) {
  visit('/');
  andThen(() => {
    assert.equal($('.dp-panel').length, 0, "date panel is close to begin");
    click('.dp-month-picker .ember-basic-dropdown-trigger');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 1, "date panel is opened on focus");
    assert.equal($('.dp-apply').length, 1, "date panel has apply button");
    assert.equal($('.dp-cancel').length, 1, "date panel has cancel button");

    click('.dp-apply');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 0, "date panel is closed on apply");
    click('.dp-month-picker .ember-basic-dropdown-trigger');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 1, "date panel is reopened");
    assert.equal($('.dp-apply').length, 1, "date panel has apply button");
    assert.equal($('.dp-cancel').length, 1, "date panel has cancel button");

    click('.dp-cancel');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 0, "date panel is closed on cancel");
  });
});

test('apply/cancel actions on year range picker', function(assert) {
  visit('/');
  andThen(() => {
    assert.equal($('.dp-panel').length, 0, "date panel is close to begin");
    click('.dp-year-picker .ember-basic-dropdown-trigger');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 1, "date panel is opened on focus");
    assert.equal($('.dp-apply').length, 1, "date panel has apply button");
    assert.equal($('.dp-cancel').length, 1, "date panel has cancel button");

    click('.dp-apply');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 0, "date panel is closed on apply");
    click('.dp-year-picker .ember-basic-dropdown-trigger');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 1, "date panel is reopened");
    assert.equal($('.dp-apply').length, 1, "date panel has apply button");
    assert.equal($('.dp-cancel').length, 1, "date panel has cancel button");

    click('.dp-cancel');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 0, "date panel is closed on cancel");
  });
});
