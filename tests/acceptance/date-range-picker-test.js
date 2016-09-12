import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
// import { nativeKeyDown } from '../helpers/click-trigger';

const { run } = Ember;

moduleForAcceptance('Acceptance | date range picker');

test('visiting /date-range-picker', function(assert) {
  visit('/');

  andThen(() => {
    assert.equal($('.dp-panel').length, 0, "date panel is close to begin");
  });

  clickDropdown('.dp-date-range-picker');

  andThen(() => {
    assert.equal($('.dp-panel').length, 1, "date panel is opened on tab");
  });

  keyDown('Escape');

  andThen(() => {
    assert.equal($('.dp-panel').length, 0, "date panel is closed on escape");
  });

  keyDown('Enter');

  // keyEvent('.dp-date-range-picker .ember-basic-dropdown-trigger', 'keydown', 13);
  // keyDown('Enter');
  // andThen(() => {debugger;});
  //nativeKeyDown('Enter', '.dp-date-range-picker .ember-basic-dropdown-trigger');

  andThen(() => {
    debugger;
    assert.equal($('.dp-panel').length, 1, "date panel is opened on enter");
  });
});
