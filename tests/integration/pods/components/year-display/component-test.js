import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('year-display', 'Integration | Component | year display', {
  integration: true
});

test('it renders', function(assert) {
  this.setProperties({
    startDate: moment('2016-01-01'),
    endDate: moment('2016-12-30'),
  });

  this.render(hbs`{{year-display startDate=startDate
                                 endDate=endDate}}`);

  assert.equal(this.$().text().trim(), '2016', 'displays the correct placeholder year');
});
