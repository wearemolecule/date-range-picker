import { getKeyCode } from 'ember-keyboard';
import { run } from '@ember/runloop';

export function nativeClick(selector, options = {}) {
  let mousedown = new window.Event('mousedown', { bubbles: true, cancelable: true, view: window });
  let mouseup = new window.Event('mouseup', { bubbles: true, cancelable: true, view: window });
  let click = new window.Event('click', { bubbles: true, cancelable: true, view: window });
  Object.keys(options).forEach(key => {
    mousedown[key] = options[key];
    mouseup[key] = options[key];
    click[key] = options[key];
  });
  let element = document.querySelector(selector);
  run(() => element.dispatchEvent(mousedown));
  (options.context || this).$(element).focus();
  run(() => element.dispatchEvent(mouseup));
  run(() => element.dispatchEvent(click));
}

export function clickTrigger(scope, options = {}) {
  let selector = '.ember-basic-dropdown-trigger';
  if (scope) {
    selector = scope + ' ' + selector;
  }
  nativeClick(selector, options);
}

export function nativeKeyDown(key, selector) {
  var event = document.createEvent('Event');
  event.keyCode = getKeyCode(key);
  event.initEvent('keydown');
  var element = selector ? document.querySelector(selector) : document.activeElement;
  run(() => element.dispatchEvent(event));
}
