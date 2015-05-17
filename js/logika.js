/*****************************************************************
    REFORME:
// napraviti objekat scena, sa slikom pozadine i pozicijom prozora
// mozda posebna klasa ucitavac, da ucitava i pravi slike ?
// praviti likove sa imenom, dodati atibut ime

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

// koriste ih i Karakter i Scena
// pretvoriti u scena.misX
var misX;
var misY;


var ovaAnimacija;

// prabaciti u scenu
var uvodna_spica;
var uvodna_slova_x = -100;
var uvodna_slova_y = 200;

var BAZICNA_SIRINA_EKRANA = 1280;
var BAZICNA_VISINA_SLIKE = 118;

// pridruziti sceni
var vreme_igre = 30;
var poeni = 0;

var uvod = true;
var igranje = false;
var prosla_sekunda = 0;

var scena = new Scena('platno', 'slike/skupstina2.png');

// za ucitavac
var likovi = {                           // nazivi su bitni, od njih pravi objekte
    vulin: 'slike/vulin.png',
    toma: 'slike/toma.png',
    dacic: 'slike/dacic.png'
}

// delioci za polozaj prozora
var gornji_f = 4;		// za gornji red
var donji_f = 1.53;		// za donji red
var prvi_f = 5.9;		// za prvi prozor
var drugi_f = 2.2;
var treci_f = 1.35;


/*************** POZIVI ***************/

scena.ucitajSlike(likovi, pustiUvod);


/*************** SLUSACI ***************/


// pripojiti sceni
scena.platno.addEventListener('click', scena.reagujNaKlik);


/*************** FUNKCIJE ***************/

function postaviScenu(){
    ovaAnimacija = requestAnimationFrame(azuriraj);
    scena.izracunajPozicije();
    scena.praviLikove(likovi);   // pravi objekte od niza likova
    // dodaje jedinstvene poruke
    dacic.poruka = "Jaoj";
    vulin.poruka = "To boli!";
    toma.poruka = "Evropa nema alternativu!";
}


function azuriraj(){
    if(igranje){
        // ovo izvrsava na svaki frejm
        uvodiLikove();
        scena.crtajSlike();
        ispisujPoruke();
        scena.ispisiPoene(poeni, vreme_igre);
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


function uvodiLikove(){
    dacic.uveden_u_igru = true;
    if(vreme_igre <= 20) {
        vulin.uveden_u_igru = true;
    }
    if(vreme_igre <= 10) {
        toma.uveden_u_igru = true;
    }
}


// dodati Sceni
function dodeliPozicije(){
    dacic.slucajnaPozicija();
    vulin.nadjiSlobodnuPoziciju(scena.karakteri);
    toma.nadjiSlobodnuPoziciju(scena.karakteri);
}


function ispisujPoruke(){
    for(var i=0; i<scena.karakteri.length; i++){
        if(scena.karakteri[i].uveden_u_igru && scena.karakteri[i].ostaviti_poruku){
            scena.karakteri[i].ispisiPoruku();
        }
    }
}


function brisiPoruke(){
    for(var i=0; i<scena.karakteri.length; i++){
        scena.karakteri[i].ostaviti_poruku = false;
    }
}
