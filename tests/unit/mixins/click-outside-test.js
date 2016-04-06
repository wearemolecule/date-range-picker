import Ember from 'ember';
import ClickOutsideMixin from 'date-range-picker/mixins/click-outside';
import { module, test } from 'qunit';

module('Unit | Mixin | click outside');

test('it can be mixed into an Ember.Object', function(assert) {
  let ClickOutsideObject = Ember.Object.extend(ClickOutsideMixin);
  let subject = ClickOutsideObject.create();
  assert.ok(subject);
});

test('#clickOutside', function(assert) {
  let ClickOutsideController = Ember.Controller.extend(ClickOutsideMixin);

  let subject = ClickOutsideController.create({
    isExpanded: true,
  });

  subject.clickOutside();

  assert.equal(subject.get('isExpanded'), false, 'isExpanded gets toggled to become false.');
});
