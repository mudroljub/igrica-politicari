"use strict";

window.$ = function(selector) {
    return document.querySelector(selector);
};
window.$$ = function(selector) {
    return document.querySelectorAll(selector);
};

