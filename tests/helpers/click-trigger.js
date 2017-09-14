import Ember from 'ember';
import { getKeyCode } from 'ember-keyboard';

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
  Ember.run(() => element.dispatchEvent(mousedown));
  (options.context || this).$(element).focus();
  Ember.run(() => element.dispatchEvent(mouseup));
  Ember.run(() => element.dispatchEvent(click));
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
  Ember.run(() => element.dispatchEvent(event));
}
