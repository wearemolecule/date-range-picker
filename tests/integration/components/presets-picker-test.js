import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('presets-picker', 'Integration | Component | presets picker', {
  integration: true
});

const presets = [
  {
    name: 'Tomorrow',
    startDate: moment().add(1, 'day').startOf('day'),
    endDate: moment().add(1, 'day').startOf('day'),
  },
  {
    name: 'This Month',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month').startOf('day'),
  },
  {
    name: 'This Year',
    startDate: moment().startOf('year'),
    endDate: moment().endOf('year').startOf('day'),
  },
  {
    name: 'Next Year',
    startDate: moment().add(1, 'year').startOf('year'),
    endDate: moment().add(1, 'year').endOf('year').startOf('day'),
  }
];

test('it renders', function(assert) {
  this.set('presets', presets);

  this.render(hbs`{{presets-picker presets=presets}}`);

  assert.equal(this.$('button').length, 4, 'Renders a button for each preset');
});
