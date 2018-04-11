import EmberObject from '@ember/object';
import CancelableMixin from 'date-range-picker/mixins/cancelable';
import { module, test } from 'qunit';

module('Unit | Mixin | Cancelable');

// Replace this with your real tests.
test('it works', function(assert) {
  let CancelableObject = EmberObject.extend(CancelableMixin);
  let subject = CancelableObject.create();
  assert.ok(subject);
});
