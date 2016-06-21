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
  let ClickOutsideController = Ember.Component.extend(ClickOutsideMixin);

  let subject = ClickOutsideController.create({
    isExpanded: true,
  });

  subject.clickOutside({ target: ".some-class" });

  assert.equal(subject.get('isExpanded'), false, 'isExpanded gets toggled to become false.');
});

test('#clickOutside when #selectorIsInside', function(assert) {
  let ClickOutsideController = Ember.Component.extend(ClickOutsideMixin, {
    selectorIsInside() { return true; },
  });

  let subject = ClickOutsideController.create({
    isExpanded: true,
  });

  subject.clickOutside(({ target: ".some-class" }));
  assert.equal(subject.get('isExpanded'), true, 'isExpanded does not get toggled.');
});
