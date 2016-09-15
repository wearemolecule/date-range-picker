import { test } from 'ember-qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | apply and cancel buttons');

test('apply/cancel actions on date range picker', function(assert) {
  visit('/');
  andThen(() => {
    assert.equal($('.dp-panel').length, 0, "date panel is close to begin");
    triggerEvent('.dp-date-range-picker .ember-basic-dropdown-trigger', 'focus');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 1, "date panel is opened on focus");
    assert.equal($('.dp-apply').length, 1, "date panel has apply button");
    assert.equal($('.dp-cancel').length, 1, "date panel has cancel button");
    click('.dp-apply');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 0, "date panel is closed on apply");
    triggerEvent('.dp-date-range-picker .ember-basic-dropdown-trigger', 'blur');
    triggerEvent('.dp-date-range-picker .ember-basic-dropdown-trigger', 'focus');
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
    triggerEvent('.dp-month-picker .ember-basic-dropdown-trigger', 'focus');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 1, "date panel is opened on focus");
    assert.equal($('.dp-apply').length, 1, "date panel has apply button");
    assert.equal($('.dp-cancel').length, 1, "date panel has cancel button");
    click('.dp-apply');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 0, "date panel is closed on apply");
    triggerEvent('.dp-month-picker .ember-basic-dropdown-trigger', 'blur');
    triggerEvent('.dp-month-picker .ember-basic-dropdown-trigger', 'focus');
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
    triggerEvent('.dp-year-picker .ember-basic-dropdown-trigger', 'focus');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 1, "date panel is opened on focus");
    assert.equal($('.dp-apply').length, 1, "date panel has apply button");
    assert.equal($('.dp-cancel').length, 1, "date panel has cancel button");
    click('.dp-apply');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 0, "date panel is closed on apply");
    triggerEvent('.dp-year-picker .ember-basic-dropdown-trigger', 'blur');
    triggerEvent('.dp-year-picker .ember-basic-dropdown-trigger', 'focus');
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

test('apply/cancel actions on energy year range picker', function(assert) {
  visit('/');
  andThen(() => {
    assert.equal($('.dp-panel').length, 0, "date panel is close to begin");
    triggerEvent('.dp-energy-year-picker .ember-basic-dropdown-trigger', 'focus');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 1, "date panel is opened on focus");
    assert.equal($('.dp-apply').length, 1, "date panel has apply button");
    assert.equal($('.dp-cancel').length, 1, "date panel has cancel button");
    click('.dp-apply');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 0, "date panel is closed on apply");
    triggerEvent('.dp-energy-year-picker .ember-basic-dropdown-trigger', 'blur');
    triggerEvent('.dp-energy-year-picker .ember-basic-dropdown-trigger', 'focus');
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
