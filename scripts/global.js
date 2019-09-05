"use strict";

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key));
};

const myFavorites = () => {
  return localStorage.getObj("favorites") === null
    ? []
    : localStorage.getObj("favorites");
};

const isFav = link => {
  return myFavorites().some(e => e.href === link);
};

const getCurrentPage = () => {
  return parseInt(localStorage.getItem("currentPage"));
};
