import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('month-picker', 'Integration | Component | month picker', {
  integration: true
});

test('it renders', function(assert) {
  this.setProperties({
    startDate: moment('2015-06-07'),
    endDate: moment('2016-07-08'),
    showInput: true,
  });

  this.render(hbs`{{month-picker startDate=startDate
                                 endDate=endDate
                                 showInput=showInput}}`);

  assert.equal(this.$('input').length, 1, 'shows one input if showInput=true');
  assert.equal(this.$('input').val(), '06/2015 - 07/2016', 'populated the input correctly');

  this.set('showInput', false);

  assert.equal(this.$('input').length, 0, 'does not display input if showInput=false');
});
