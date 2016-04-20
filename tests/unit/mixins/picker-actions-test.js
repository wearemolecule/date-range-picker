import Ember from 'ember';
import PickerActionsMixin from 'date-range-picker/mixins/picker-actions';
import { module, test } from 'qunit';

module('Unit | Mixin | picker actions');

// Replace this with your real tests.
test('it works', function(assert) {
  let PickerActionsObject = Ember.Object.extend(PickerActionsMixin);
  let subject = PickerActionsObject.create();
  assert.ok(subject);
});
