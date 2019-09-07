"use strict";

// Some functions/methods required by almost all the other files
Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key));
};

const myFavorites = () => {
  // if favorites doesn't exist yet in the local storage,
  // return an empty array, to ensure array iteration methods don't throw errors
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
