"use strict";

window.$ = function(selector) {
    return document.querySelector(selector);
};

window.$$ = function(selector) {
    return document.querySelectorAll(selector);
};

Array.prototype.redom = function(ulazna_funkcija){
    for (var i = 0; i < this.length; i++) {
        ulazna_funkcija(this[i]);
    }
};

String.prototype.VelikoSlovo = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function uzmi(element){
    return document.getElementById(element);
}

function kazi(bilo_sta){
    console.log(bilo_sta);
}

// napraviti logiku za proveru koja uzima varijablu 
// i kaze njeno ime u struni + vrednost

function proveri(varijabla){
    console.log(varijabla);
}