/*****************************************************************
    REFORME:
// napraviti objekat scena, sa slikom pozadine i pozicijom prozora
// mozda posebna klasa ucitavac, da ucitava i pravi slike ?

    IDEJE:
 // da ne izlaze uvek, nego da malo sacekaju
 // da menjaju sliku na pogodak
 // da nasumicno ispustaju parole
 // lokalni i globalni hajskor
 // grafiti na skupstini vucicu pederu
 // paradajz pogadja
 // uvodna animacija uvecavanje skupstina

    PROBLEMI:
 // pozadina se crta prilagodjeno, a delove crta neprilagodjeno
 // resenje: napraviti jedinstveno prilagodjavanje
 // kad je presirok ekran, sece pozadinu po visini !
 // na manjim ekranima prilagoditi slova (uvod i kraj)
********************************************************************/

"use strict";
window.$ = function(selector) {
    return document.querySelector(selector);
};
window.$$ = function(selector) {
    return document.querySelectorAll(selector);
};


/*************** VARIJABLE ***************/
var pozicije_prozora;
var misX;
var misY;
var ovaAnimacija;
var uvodna_spica;
var uvodna_slova_x = -100;
var uvodna_slova_y = 200;

var BAZICNA_SIRINA_EKRANA = 1280;
var BAZICNA_VISINA_SLIKE = 118;
var vreme_igre = 30;
var poeni = 0;
var uvod = true;
var igranje = false;
var prosla_sekunda = 0;
var karakteri = [];

var nivo1 = new Scena('platno');

// za ucitavac
var likovi = {                           // nazivi su bitni, od njih pravi objekte
    vulin: 'slike/vulin.png',
    toma: 'slike/toma.png',
    dacic: 'slike/dacic.png'
}
var brojSlika = Object.keys(likovi).length;


/*************** POZIVI ***************/

ucitajSlike(likovi, pustiUvod);


/*************** SLUSACI ***************/

nivo1.platno.addEventListener('click', reagujNaKlik);


/*************** FUNKCIJE ***************/

function postaviScenu(){
    ovaAnimacija = requestAnimationFrame(azuriraj);
    praviKaraktere(likovi);   // pravi karaktere od niza likova
    // dodaje jedinstvene poruke
    dacic.poruka = "Jaoj";
    vulin.poruka = "To boli!";
    toma.poruka = "Evropa nema alternativu!";
    crtajSlike();
    prikaziPoene();
}


function azuriraj(){
    if(igranje){
        // ovo izvrsava na svaki frejm
        uvodiLikove();
        crtajSlike();
        ispisujPoruke();
        prikaziPoene();
        proveriKraj();

        if(prosla_sekunda != new Date().getSeconds()) {
            // ovo izvrsava svake sekunde
            brisiPoruke();
            dodeliPozicije();
            vreme_igre--;
            prosla_sekunda = new Date().getSeconds();
        }
        ovaAnimacija = requestAnimationFrame(azuriraj);
    }
}



function ispisujPoruke(){
    for(var i=0; i<karakteri.length; i++){
        if(karakteri[i].uveden_u_igru && karakteri[i].ostavlja_poruku){
            ispisiPoruku(karakteri[i]);
        }
    }
}


function brisiPoruke(){
    for(var i=0; i<karakteri.length; i++){
        karakteri[i].ostavlja_poruku = false;
    }
}
