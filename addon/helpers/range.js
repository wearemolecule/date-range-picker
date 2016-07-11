import Ember from 'ember';

export function range(begin, end) {
  let res = [];

  if (end === undefined) {
    end = begin;
    begin = 0;
  }

  let asc = begin < end;

  for (let cur=begin, i=0; asc ? cur < end : cur > end; asc ? cur++ : cur--, i++) {
    res[i] = cur;
  }

  return res;
}

export default Ember.Helper.helper(range);
