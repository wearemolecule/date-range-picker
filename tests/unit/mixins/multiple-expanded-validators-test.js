import EmberObject from '@ember/object';
import MultipleExpandedValidatorsMixin from 'date-range-picker/mixins/multiple-expanded-validators';
import { module, test } from 'qunit';

module('Unit | Mixin | multiple expanded validators');

// Replace this with your real tests.
test('it works', function(assert) {
  let MultipleExpandedValidatorsObject = EmberObject.extend(MultipleExpandedValidatorsMixin);
  let subject = MultipleExpandedValidatorsObject.create();
  assert.ok(subject);
});
