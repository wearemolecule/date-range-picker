import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | date range picker');

test('visiting /date-range-picker', function(assert) {
  visit('/');
  andThen(() => {
    assert.equal($('.dp-panel').length, 0, "date panel is close to begin");
    clickDropdown('.dp-date-range-picker');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 1, "date panel is opened on tab");
    keyDown('Escape');
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 0, "date panel is closed on escape");
    var event = document.createEvent('Event');
    event.keyCode = 13; // Press Enter
    event.initEvent('keydown');
    document.activeElement.dispatchEvent(event);
  });

  andThen(() => {
    assert.equal($('.dp-panel').length, 1, "date panel is opened on enter");
  });
});
