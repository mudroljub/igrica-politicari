"use strict";

window.$ = function(selector) {
    return document.querySelector(selector);
};

window.$$ = function(selector) {
    return document.querySelectorAll(selector);
};

function uzmi(element){
    return document.getElementById(element);
}

function kazi(bilo_sta){
    console.log(bilo_sta);
}

