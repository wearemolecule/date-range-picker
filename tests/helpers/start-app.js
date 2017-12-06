import Application from '../../app';
import config from '../../config/environment';
import keyboardRegisterTestHelpers from './ember-keyboard/register-test-helpers';
import registerBasicDropdownHelpers from './ember-basic-dropdown';
import { merge } from '@ember/polyfills';
import { run } from '@ember/runloop';

export default function startApp(attrs) {
  let attributes = merge({}, config.APP);
  attributes = merge(attributes, attrs); // use defaults, but you can override;

  return run(() => {
    let application = Application.create(attributes);
    application.setupForTesting();
    registerBasicDropdownHelpers();
    keyboardRegisterTestHelpers();
    application.injectTestHelpers();
    return application;
  });
}
