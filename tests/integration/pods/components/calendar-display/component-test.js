import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('calendar-display', 'Integration | Component | calendar display', {
  integration: true,

  beforeEach() {
    this.set('today', moment());
  },
});

test('it renders', function(assert) {
  this.render(hbs`{{calendar-display startDate=today}}`);
  assert.ok(this.$());
});

test('actions - daySelected', function(assert) {
  assert.expect(1);

  this.set('daySelected', day => {
    assert.equal(day.date(), 10, 'the selected day is sent as an argument');
  });

  this.render(hbs`{{calendar-display isExpanded=true
                                     startDate=today
                                     daySelected=(action daySelected)}}`);

  let $tenthDay = this.$(".dp-day:contains('10')");

  $tenthDay.click();
});

test('actions - toggleMonthPicker', function(assert) {
  this.render(hbs`{{calendar-display startDate=today
                                     isExpanded=true}}`);

  assert.equal(this.$('.dp-month').length, 0, 'month picker buttons are not exposed by default');

  this.$('.dp-btn-month').click();

  assert.equal(this.$('.dp-month-body').length, 1, 'month picker buttons are exposed');
});

test('actions - prevMonth & nextMonth', function(assert) {
  let january = moment('01/01/2016', 'MM/DD/YYYY');

  let prevMonthCount = 0;

  let nextMonthCount = 0;

  this.set('month', january);

  this.set('prevMonth', () => prevMonthCount++);

  this.set('nextMonth', () => nextMonthCount++);

  this.render(hbs`{{calendar-display isExpanded=true
                                     month=month
                                     prevMonth=(action prevMonth)
                                     nextMonth=(action nextMonth)}}`);

  this.$('.dp-previous-month').click();

  assert.equal(prevMonthCount, 1, 'prevMonth is called once');
  assert.equal(nextMonthCount, 0, 'nextMonth is not called with prevMonth is called');

  this.$('.dp-next-month').click();

  assert.equal(prevMonthCount, 1, 'prevMonth is not called again when nextMonth is called');
  assert.equal(nextMonthCount, 1, 'nextMonth is called once');
});

test('month and year visibility is togglable', function(assert) {
  let startDateString = '2016-01-01';
  let dateStringFormat = 'YYYY-MM-DD';

  this.setProperties({
    start: moment(startDateString, dateStringFormat),
    end: moment(startDateString, dateStringFormat).clone().add(5, 'days')
  });

  this.render(hbs`{{calendar-display isExpanded=true
                                     selectionStart=start
                                     selectionEnd=end
                                     month=start}}`);

  assert.equal(this.$('.dp-month-body').length, 0, 'months not visible by default');
  assert.equal(this.$('.dp-year-body').length, 0, 'years not visible by default');

  this.$('.dp-btn-month').click();

  assert.equal(this.$('.dp-month-body').length, 1, 'months are now visible after clicking month btn');
  assert.equal(this.$('.dp-year-body').length, 0, 'years should not be visible after clicking month btn');

  this.$('.dp-btn-year').click();

  assert.equal(this.$('.dp-month-body').length, 0, 'months should not be visible after clicking year btn');
  assert.equal(this.$('.dp-year-body').length, 1, 'years should be visible after clicking year btn');
});
