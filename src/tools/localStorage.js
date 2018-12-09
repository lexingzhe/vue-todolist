/**
 * Created by Administrator on 2018/12/9.
 */
const Active = 'active';

export const Fetch = function () {
  return JSON.parse(localStorage.getItem(Active))?JSON.parse(localStorage.getItem(Active)):[];
}

export const Save = function (obj) {
  return localStorage.setItem(Active,JSON.stringify(obj));
}
