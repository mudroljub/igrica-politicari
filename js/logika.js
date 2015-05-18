/*****************************************************************
    IDEJE:
// da ne izlaze uvek, nego da malo sacekaju
// da menjaju sliku na pogodak
// da nasumicno ispustaju parole
// lokalni i globalni hajskor
// grafiti na skupstini vucicu pederu
// paradajz pogadja
// uvodna animacija uvecavanje skupstina

    PROBLEMI:
// klikom detektuje karaktera i kad nije nacrtan. dodati uslov if nacrtan. 
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

// prabaciti u scenu
var pocetna_slova_x = -100;
var pocetna_slova_y = 200;
var BAZICNA_SIRINA_EKRANA = 1280;
var BAZICNA_VISINA_SLIKE = 118;

// pridruziti sceni
var poeni = 0;
var prethodna_sekunda = 0;

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

var scena = new Scena('platno', 'slike/skupstina2.png');

scena.ucitajSlike(likovi, pustiUvod);


/*************** SLUSACI ***************/

$("#platno").addEventListener('click', scena.reagujNaKlik);


/*************** FUNKCIJE ***************/

function postaviScenu(){
	scena.vreme_igre = 30;			// podešava dužinu igre
    scena.izracunajPozicije();
    scena.praviLikove(likovi);   	// pravi objekte od niza likova
    dacic.poruka = "Jaoj";			// dodaje jedinstvene poruke
    vulin.poruka = "To boli!";
    toma.poruka = "Evropa nema alternativu!";
	scena.animacija_igre = requestAnimationFrame(azuriraj); // krace igra
}


function azuriraj(){
    // ovo izvrsava na svaki frejm
    if(scena.igranje){
        uvodiLikove();
        scena.crtajSlike();
        ispisujPoruke();
        scena.ispisiPoene(poeni, scena.vreme_igre);
        scena.proveriKraj();

		// ovo izvrsava svake sekunde
        if(prethodna_sekunda != new Date().getSeconds()) {
            brisiPoruke();
            dodeliPozicije();
            scena.vreme_igre--;
            prethodna_sekunda = new Date().getSeconds();
        }	// kraj svaki sekund
		
        scena.animacija_igre = requestAnimationFrame(azuriraj);
    }	// kraj svaki frejm
}


function uvodiLikove(){
    dacic.uveden_u_igru = true;
    if(scena.vreme_igre <= 20) {
        vulin.uveden_u_igru = true;
    }
    if(scena.vreme_igre <= 10) {
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
