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

function log(bilo_sta){
    console.log(bilo_sta);
}

// radi samo za window objekt, napraviti jos da proverava kom objektu atribut pripada
function otkri(sadrzaj){
    var ime_varijable;
    for (var naziv_objekta in window) {
        if (window[naziv_objekta] == sadrzaj) ime_varijable = naziv_objekta;
    }
    console.log(ime_varijable + ": " + sadrzaj)
}   // kraj otkri

function otkriObjekt(atribut_objekta) {
    console.log(objekt);
}
