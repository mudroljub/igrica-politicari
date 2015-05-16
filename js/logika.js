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

var likovi = {                           // nazivi su bitni, od njih pravi objekte
    vulin: 'slike/vulin.png',
    toma: 'slike/toma.png',
    dacic: 'slike/dacic.png'
}
var brojSlika = Object.keys(likovi).length;


/*************** POZIVI ***************/

praviSlike(likovi, pustiUvod);


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

// za sad moram da ih pravim, dok ne sredim ucitavanje bez pravljenja img obj
function praviSlike(likovi, povratnaRadnja) {                            // ucitava i pravi img objekte sa nazivima
    var ucitaneSlike = 0;
    for (var ovaj_lik in likovi) {
        window[ovaj_lik + "_slika"] = new Image();                     // pravi globalnu varijablu sa nazivom slike !
        window[ovaj_lik + "_slika"].onload = function kadUcita() {
            ucitaneSlike++;
            if (ucitaneSlike >= brojSlika) {
                //prilagodiSlike(likovi);
                povratnaRadnja();
            }
        };  // kraj kadUcita()
        window[ovaj_lik + "_slika"].src = likovi[ovaj_lik];
    }
}


function praviKaraktere(likovi){
    for (var ovaj_lik in likovi){
        window[ovaj_lik] = new Karakter(likovi[ovaj_lik], nivo1);
        karakteri.push(window[ovaj_lik]);
    }   // kraj for
}   // kraj praviKaraktere()


function uvodiLikove(){
    dacic.uveden_u_igru = true;

    if(vreme_igre <= 20) {
        vulin.uveden_u_igru = true;
    }
    if(vreme_igre <= 10) {
        toma.uveden_u_igru = true;
    }
}


function proveriPogodak(ovaj_lik){
    if( (misX > ovaj_lik.x && misX < ovaj_lik.x + ovaj_lik.sirina) && (misY > ovaj_lik.y && misY < ovaj_lik.y + ovaj_lik.visina) ){
        ovaj_lik.ostavlja_poruku = true;
        poeni++;
    }
}


function ispisiPoruku(ovaj_lik){
    var poruka = ovaj_lik.poruka || "Jaoj";
    nivo1.sadrzaj.font = "30px Verdana";
    nivo1.sadrzaj.lineWidth = 1;
    nivo1.sadrzaj.fillText(poruka, misX+30, misY, 250);           // poslednji argument je maksimalna shirina teksta
    nivo1.sadrzaj.strokeText(poruka, misX+30, misY, 250);
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


/*************** KLASE ***************/

