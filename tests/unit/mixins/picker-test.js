import Ember from 'ember';
import PickerMixin from 'date-range-picker/mixins/picker';
import { module, test } from 'qunit';

module('Unit | Mixin | picker');

// Replace this with your real tests.
test('it works', function(assert) {
  let PickerObject = Ember.Object.extend(PickerMixin);
  let subject = PickerObject.create();
  assert.ok(subject);
});
