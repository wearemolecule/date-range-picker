import Ember from 'ember';
import layout from './template';
import { range } from 'date-range-picker/helpers/range';

export default Ember.Component.extend({
  allMonths: range(1, 13),
  isExpanded: false,
  layout,
  tagName: "span",

  didRender() {
    if (this.get('isExpanded')) {
      Ember.run.next(this, () => {
        let $container = this.$('.dp-month-body');
        let month = this.get('month');
        if (!month) {
          return;
        }

        let $scrollTo = this.$(`button.dp-month-option:contains("${month.format('MMM')}")`);
        if ($container && $container.length && $scrollTo && $scrollTo.length) {
          $container.scrollTop(
            $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
          );
          $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
          }, 0);
        }
      });
    }
  },


  actions: {
    setMonth(month) {
      if (this.get('endOfMonth')) {
        this.set('month', this.get('month').clone().month(month).endOf('month'));
      } else {
        this.set('month', this.get('month').clone().month(month).startOf('month'));
      }

      if(this.get('monthWasSelected')) {
        this.sendAction('monthWasSelected');
      }
    },

    toggleIsExpanded() {
      this.toggleProperty('isExpanded');
    },
  },
});
