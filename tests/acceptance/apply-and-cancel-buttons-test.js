import { test } from 'ember-qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Ember from 'ember';

const { $ } = Ember;

moduleForAcceptance('Acceptance | apply and cancel buttons');

let pickers = ['.dp-date-range-picker', '.dp-month-picker', '.dp-year-picker', '.dp-energy-year-picker'];
pickers.forEach((picker) => {
  test('apply/cancel actions on ' + picker, function(assert) {
    visit('/');
    andThen(() => assert.equal($('.dp-panel').length, 0, "date panel is close to begin"));

    triggerEvent(picker + ' .ember-basic-dropdown-trigger', 'focusin');

    andThen(() => {
      assert.equal($('.dp-panel').length, 1, "date panel is opened on focus");
      assert.equal($('.dp-apply').length, 1, "date panel has apply button");
      assert.equal($('.dp-cancel').length, 1, "date panel has cancel button");
    });

    click('.dp-apply');

    andThen(() => assert.equal($('.dp-panel').length, 0, "date panel is closed on apply"));

    triggerEvent(picker + ' .ember-basic-dropdown-trigger input', 'blur');

    triggerEvent(picker + ' .ember-basic-dropdown-trigger input', 'focusin');

    andThen(() => {
      assert.equal($('.dp-panel').length, 1, "date panel is reopened");
      assert.equal($('.dp-apply').length, 1, "date panel has apply button");
      assert.equal($('.dp-cancel').length, 1, "date panel has cancel button");
    });

    click('.dp-cancel');
    andThen(() => assert.equal($('.dp-panel').length, 0, "date panel is closed on cancel"));
  });
});
