"use strict";

window.$ = function(selector) {
    return document.querySelector(selector);
};

window.$$ = function(selector) {
    return document.querySelectorAll(selector);
};

Array.prototype.provrti = function(neka_funkcija){
    for ( var i = 0; i < this.length; i++ ) {
        neka_funkcija(this[i]);
    }
};

String.prototype.prvoSlovo = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function uzmi(element){
    return document.getElementById(element);
}

function kazi(bilo_sta){
    console.log(bilo_sta);
}

