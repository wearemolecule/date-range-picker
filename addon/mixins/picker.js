import Ember from 'ember';
import CancelableMixin from 'date-range-picker/mixins/cancelable';
import SafeMoment from 'date-range-picker/mixins/safe-moment';
import moment from 'moment';

const {
  Mixin,
} = Ember;

export default Mixin.create(CancelableMixin, SafeMoment,  {
  showInput: true,
  dateFormat: "MM/DD/YYYY",
  tabIndex: 1,
  showClear: true,
  startDate: moment().startOf('date'),
  endDate: moment().startOf('date'),
  startMonth: moment().startOf('month'),
  endMonth: moment().startOf('month'),
  defaultStart: 'date',
  defaultEnd: 'date',

  dropdownController: Ember.Object.create({
    isOpen: false,
  }),
  initiallyOpened: false,

  didReceiveAttrs() {
    this._super(...arguments);
    let startDate = this.get('startDate');

    if (typeof startDate === 'string') {
      startDate = this.set('startDate', moment(startDate));
    }

    let endDate = this.get('endDate');
    if (typeof endDate === 'string') {
      endDate = this.set('endDate', moment(endDate));
    }

    if (!this.get('initialStartDate')) {
      this.resetInitialValues();
    }

    this.updateStartAndEndMonth();
  },

  updateStartAndEndMonth: function() {
    this.setProperties({
      startMonth: this.safeClone('startDate', moment().startOf('month')),
      endMonth: this.safeClone('endDate', moment().startOf('month'))
    });
  },

  rangeFormatted: Ember.computed('startDate', 'endDate', 'dateFormat', {
    get() {
      let dateFormat = this.get('dateFormat');
      let startDate = this.get('startDate') ? this.get('startDate').format(dateFormat) : '';
      let endDate = this.get('endDate') ? this.get('endDate').format(dateFormat) : '';
      return `${startDate}—${endDate}`;
    },

    set(k, v) {
      let [ start, end ] = v.split('—');
      let dateFormat = this.get('dateFormat');
      let startMoment = moment(start, dateFormat);
      let endMoment = moment(end, dateFormat);

      if (this.get('hasDateParseOverride')) {
        startMoment = this.overrideStartDateParse(startMoment);
        endMoment = this.overrideEndDateParse(endMoment);
      }

      if (startMoment.isAfter(endMoment)) {
        [startMoment, endMoment] = [endMoment.clone(), startMoment.clone()];
      }

      if (startMoment && startMoment.isValid()) {
        this.set('startDate', startMoment);
      } else {
        this.set('startDate', null);
      }

      if (endMoment && endMoment.isValid()) {
        this.set('endDate', endMoment);
      } else {
        this.set('endDate', null);
      }

      this.updateStartAndEndMonth();

      return v;
    },
  }),

  focusOnInput() {
    this.$('.dp-date-input').first().focus().select();
  },

  actions: {
    registerAPI(context) {
      this.set('dropdownController', context);
      this.sendAction('dropdownContextChanged', context);
    },

    open() {
      let dropdown = this.get('dropdownController');
      if (dropdown) {
        dropdown.actions.open();
      }
    },

    apply() {
      this.resetInitialValues();

      let dropdown = this.get('dropdownController');
      if (dropdown) {
        dropdown.actions.close(null, false);
      }
      this.sendAction('apply', this.get('startDate'), this.get('endDate'));
    },

    onFocusInput(dropdown, e) {
      if (e && e.relatedTarget && e.relatedTarget.className && (e.relatedTarget.className.includes('dp-apply') ||
                                                                e.relatedTarget.className.includes('dp-cancel') ||
                                                                e.relatedTarget.className.includes('dp-date-input'))) {
        return true;
      }

      dropdown.actions.open(e);
      this.focusOnInput();
    },

    onFocusOut(dropdown, e) {
      if (e && e.relatedTarget && this.$() && this.$().get(0).contains(e.relatedTarget)) {
        return true;
      }

      this.send('apply');
    },

    handleKeydown(dropdown, e) {
      if (e.keyCode === 9 && dropdown.isOpen) { // Tab
        this.send('cancel');
      } else if (e.keyCode === 13) { //enter pressed when closed
        if (this.get('dropdownOpen')) {
          if (!this.get('datesSame')) {
            if (this.get('cancelSelected')) {
              this.send('cancel');
            } else {
              this.send('apply');
            }
          }
        } else {
          this.get('dropdownController').actions.toggle();
          if (this.get('dropdownOpen')) {
            this.focusOnInput();
          }
        }
      }
      return false;
    },
  }
});
