import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
import keyboardRegisterTestHelpers from './ember-keyboard/register-test-helpers';
import registerBasicDropdownHelpers from './ember-basic-dropdown';

export default function startApp(attrs) {
  let application;

  let attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    keyboardRegisterTestHelpers();
    registerBasicDropdownHelpers();
    application.injectTestHelpers();
  });

  return application;
}
