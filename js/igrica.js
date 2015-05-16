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
var nova_visina_pozadine;
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

/* prima sliku i scenu, pravi novog lika */
function Karakter(slika_src, scena){
    this.uveden_u_igru = false;
    this.ostavlja_poruku = false;
    this.spust = 0;
    this.spustanje = false;

    /*
    // prepisano iz simple game, upotrebiti!
    this.scena = scena; // scenu proslediti kao argument
     this.visinaSveta = parseInt(this.platno.height);
     this.sirinaSveta = parseInt(this.platno.width);
*/

    this.platno = scena.platno;
    this.sadrzaj = scena.sadrzaj;
    // prepraviti da ide preko scene
    //this.platno = scena.platno;
    //this.sadrzaj = this.platno.getContext("2d");

    this.slika = new Image();
    this.slika.src = slika_src;
    // prilagodjava sliku bazicnoj velicini slike
    this.slika.width = this.slika.width / (this.slika.height / BAZICNA_VISINA_SLIKE);
    this.slika.height = BAZICNA_VISINA_SLIKE;
    // prilagodjava sliku trenutnom ekranu
    this.slika.width = this.slika.width * (window.innerWidth/BAZICNA_SIRINA_EKRANA);
    this.slika.height = this.slika.height * (window.innerWidth/BAZICNA_SIRINA_EKRANA);

    // prima visinu i sirinu od svoje slike
    this.sirina = this.slika.width;
    this.visina = this.slika.height;

    /* uzima slucajne koordinate i pripisuje sebi */
    this.slucajnaPozicija = function() {
        this.x = slucajniProzor()[0];
        this.y = slucajniProzor()[1];
    }   // slucajnaPozicija


    this.goreDole = function(){
        // lagano se spusta i dize
        if(this.spust >= 100) {
            this.spustanje = true;
        } else if (this.spust <= 0) {
            this.spustanje = false;
        }
        this.spustanje ? this.spust-- : this.spust++;
    }

    /* crta sebe na trenutnim ili zadatim koordinatama */
    this.crtaj = function() {
        this.sadrzaj.drawImage(this.slika, this.x, this.y, this.sirina, this.visina);
    }   // kraj crtaj


    /* proverava jel drugi karakter zauzeo njegovu poziciju */
    this.jelDrugiZauzeo = function(drugi_karakter){
        if(this.x == drugi_karakter.x && this.y == drugi_karakter.y){
            return true;
        } else return false;
    }   // kraj jelDrugiZauzeo


    /* prima niz likova, proverava dal su zauzeli njegovu poziciju, vraca jel slobodna */
    this.jelOvoSlobodno = function (ostali) {
        var index = ostali.indexOf(this);
        ostali.splice(index, 1);    // izbacuje sebe

        var slobodno = true;
        // ide redom kroz ostale i proverava sudar
        for (var i = 0; i < ostali.length; i++) {
            slobodno = slobodno & !this.jelDrugiZauzeo(ostali[i]);
        }
        ostali.push(this);          // vraca sebe
        return slobodno;
    }   // kraj jelOvoSlobodno


    /* uzima slucajnu poziciju, ako je zauzeta, uporno trazi slobodnu */
    this.nadjiSlobodnuPoziciju = function (ostali) {
        this.slucajnaPozicija();
        while ( !this.jelOvoSlobodno(ostali) ) {
            this.slucajnaPozicija();
        }
    }   // kraj naSlobodnomCrtaj

}   // kraj klase Karakter

