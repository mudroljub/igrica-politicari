

// nepotrebno stvara img objekte ? spojiti praviKaraktere i praviSlike (ovu prepraviti u ucitava slike, anonimno)
// mozda posebna klasa ucitavac ?
// da mrda objekat politicara nize, a ne sliku
// napraviti objekat scena, sa slikom pozadine i pozicijom prozora
// mozda i klasu ucitavac, da ucitava i pravi slike ?
// da ne izlaze uvek, nego da malo sacekaju
// da menjaju sliku na pogodak
// da nasumicno ispustaju parole
// lokalni i globalni hajskor
// grafiti na skupstini vucicu pederu
// paradajz pogadja
// uvodna animacija uvecavanje skupstina

// problem: pozadina se crta prilagodjeno, a delove crta neprilagodjeno
// resenje: napraviti jedinstveno prilagodjavanje
// problem: kad je presirok ekran, sece sliku po visini !

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

var platno = document.getElementById('platno');
platno.height = window.innerHeight;
platno.width = window.innerWidth;

var sadrzaj = platno.getContext('2d');
sadrzaj.font = "30px Verdana";
sadrzaj.fillStyle = "white";
sadrzaj.strokeStyle = 'black';

var pozadina = new Image();
pozadina.onload = function() {
    nova_visina_pozadine = (window.innerWidth / pozadina.width) * pozadina.height;  // prilagodjava pozadinu
    sadrzaj.drawImage(pozadina, 0, 0, window.innerWidth, nova_visina_pozadine);
};
pozadina.src = 'slike/skupstina2.png';

var slike = {                           // nazivi su bitni, od njih pravi objekte i slike !
    vulin: 'slike/vulin.png',
    toma: 'slike/toma.png',
    dacic: 'slike/dacic.png'
}
var brojSlika = Object.keys(slike).length;


/*************** POZIVI ***************/

praviSlike(slike, pustiUvod);


/*************** SLUSACI ***************/

platno.addEventListener('click', reagujNaKlik);


/*************** FUNKCIJE ***************/

function postaviScenu(){
    ovaAnimacija = requestAnimationFrame(azuriraj);
    praviKaraktere(slike);   // pravi karaktere od datih slika
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


function praviSlike(slike, povratnaRadnja) {                            // ucitava i pravi img objekte sa nazivima
    var ucitaneSlike = 0;
    for (var ova_slika in slike) {
        window[ova_slika + "_slika"] = new Image();                     // pravi globalnu varijablu sa nazivom slike !
        window[ova_slika + "_slika"].onload = function kadUcita() {
            ucitaneSlike++;
            if (ucitaneSlike >= brojSlika) {
                prilagodiSlike(slike);
                povratnaRadnja();
            }
        };  // kraj kadUcita()
        window[ova_slika + "_slika"].src = slike[ova_slika];
    }
}


function praviKaraktere(slike){
    for (var ovaj_lik in slike){
        window[ovaj_lik] = new Karakter(window[ovaj_lik + "_slika"]);
        karakteri.push(window[ovaj_lik]);
    }   // kraj for
}   // kraj praviKaraktere()


// dodati Sceni
// reforma: slike bi se pravile u okviru Karaktera
// objekt bi bio vulin.slika ili dacic.slika
function prilagodiSlike(slike){
    for (var ova_slika in slike) {
        // prilagodjava sliku standardnoj velicini slike
        window[ova_slika + "_slika"].width = window[ova_slika + "_slika"].width / (window[ova_slika + "_slika"].height / BAZICNA_VISINA_SLIKE);
        window[ova_slika + "_slika"].height = BAZICNA_VISINA_SLIKE;
        // prilagodjava sliku za razne ekrane
        window[ova_slika + "_slika"].width = window[ova_slika + "_slika"].width * (window.innerWidth/BAZICNA_SIRINA_EKRANA);
        window[ova_slika + "_slika"].height = window[ova_slika + "_slika"].height * (window.innerWidth/BAZICNA_SIRINA_EKRANA);
    }
}


// dodati Sceni
function dodeliPozicije(){
    dacic.slucajnaPozicija();
    vulin.nadjiSlobodnuPoziciju(karakteri);
    toma.nadjiSlobodnuPoziciju(karakteri);
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


function crtajSlike(){
    sadrzaj.drawImage(pozadina, 0, 0, window.innerWidth, nova_visina_pozadine);
    for(var i=0; i<karakteri.length; i++){
        if(karakteri[i].uveden_u_igru){
            karakteri[i].crtaj();
        }
    }
} // kraj crtajSlike


// dodati Sceni
function slucajniProzor(){
    var gornja_osa = nova_visina_pozadine/4;
    var donja_osa = nova_visina_pozadine/1.53;
    var slucajna_pozicija = Math.floor(Math.random() * 6);
    pozicije_prozora = [
        [window.innerWidth/5.9, gornja_osa],             // prvi prozor
        [window.innerWidth/2.2, gornja_osa],             // drugi prozor
        [window.innerWidth/1.35, gornja_osa],
        [window.innerWidth/5.9, donja_osa],
        [window.innerWidth/2.2, donja_osa],
        [window.innerWidth/1.35, donja_osa]
    ]
    return [pozicije_prozora[slucajna_pozicija][0], pozicije_prozora[slucajna_pozicija][1]];
}


// dodati Sceni
function prikaziPoene(){
    sadrzaj.fillStyle="#000";
    sadrzaj.fillRect(20,80,180,100);
    sadrzaj.stroke();
    sadrzaj.fillStyle="#FFF";
    sadrzaj.font = "24px Verdana";
    sadrzaj.fillText("Poeni: " + poeni, 30, 120);
    sadrzaj.fillText("Vreme: " + vreme_igre, 30, 160);
}


function proveriPogodak(ovaj_lik){
    if( (misX > ovaj_lik.x && misX < ovaj_lik.x + ovaj_lik.sirina) && (misY > ovaj_lik.y && misY < ovaj_lik.y + ovaj_lik.visina) ){
        ovaj_lik.ostavlja_poruku = true;
        //ispisiPoruku(ovaj_lik);
        poeni++;
    }
}


function ispisiPoruku(ovaj_lik){
    var poruka = ovaj_lik.poruka || "Jaoj";
    sadrzaj.font = "30px Verdana";
    sadrzaj.lineWidth = 1;
    sadrzaj.fillText(poruka, misX+30, misY, 250);           // poslednji argument je maksimalna shirina teksta
    sadrzaj.strokeText(poruka, misX+30, misY, 250);         // poslednji argument je maksimalna shirina teksta
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


// dodati Sceni
function pustiUvod(){
    // pravi uvodnu animaciju
    uvodna_spica = requestAnimationFrame(uvodnaSpica);
}


// dodati Sceni
function uvodnaSpica(){
    sadrzaj.fillStyle = "black";
    sadrzaj.fillRect(0, 0, window.innerWidth, window.innerHeight);
    sadrzaj.fillStyle="#fff";
    sadrzaj.font = "48px Verdana";
    sadrzaj.fillText("Spremi se za obracun!", uvodna_slova_x += 5, uvodna_slova_y);
    if(uvodna_slova_x > innerWidth-100) {
        uvodna_slova_x = -100;
        uvodna_slova_y += 100;
    }
    if(uvodna_slova_y > innerHeight - 100) {
        uvodna_slova_y = 200;
    }
    uvodna_spica = requestAnimationFrame(uvodnaSpica);
}


// dodati Sceni
function reagujNaKlik(event){
    misX = event.clientX;
    misY = event.clientY;

    if(uvod){
        cancelAnimationFrame(uvodna_spica);
        postaviScenu();
        igranje = true;
        uvod = false;
    }

    if(igranje){
        proveriPogodak(dacic);
        proveriPogodak(toma);
        proveriPogodak(vulin);
        prikaziPoene();
    }
}


// dodati Sceni
function proveriKraj(){
    if(vreme_igre < 1) {
        cancelAnimationFrame(ovaAnimacija);
        sadrzaj.fillRect(window.innerWidth/2 - window.innerWidth/4, window.innerHeight/2 - window.innerHeight/4, window.innerWidth/2, window.innerHeight/2);
        sadrzaj.fillStyle="#000";
        sadrzaj.font = "48px Verdana";
        sadrzaj.fillText("Igra je završena!", window.innerWidth/2 - window.innerWidth/4 + 100, window.innerHeight/2 - window.innerHeight/4 + 100);
        igranje = false;
    }
}


/*************** KLASE ***************/


/* prima sliku pozadine i naziv platna */

// dodaje likove
function Scena(pozadina, platno){
    this.sirina = window.innerWidth;
    this.visina = window.innerHeight;
    this.platno = $("#platno");     // ako nije dato platno, da ga sam dodaje
    this.platno.width = this.sirina;
    this.platno.height = this.visina;
    this.platno.style.backgroundColor = "black";
    this.sadrzaj = this.platno.getContext("2d");

    this.odrediDimenzije = function(){
        // ili prilagodiPozadinu() ili racunaProporcije() za sve
    }

    this.raspolozivePozicije() = function(){
        //
    }

    this.crtaPozadinu() = function(){

    }

    this.mrdaPozadinu() = function(){

    }

    this.slucajniProzor() = function(){
        // ili slobodan prozor
    }

    this.crtaLikove() = function(){
        // ili crtaju sebe?
    }

    this.proveriJelNapustio() = function(){
        //
    }

    this.brisi = function(){
        this.sadrzaj.clearRect(0, 0, this.sirina, this.visina);
    }

    this.promeniBoju = function(color){
        this.platno.style.backgroundColor = color;
    } // end this.setBG

    this.getMouseX = function(){
        //incorporate offset for canvas position
        return document.mouseX - this.left;
    }

    this.getMouseY = function(){
        //incorporate offset for canvas position
        return document.mouseY - this.top;
    }

    this.getMouseClicked = function(){
        return document.mouseClicked;
    }

}


/* prepraviti da prima slika_url umesto slika i pravi this.slika objekat */
function Karakter(slika, scena){
    this.uveden_u_igru = false;
    this.ostavlja_poruku = false;
    this.spust = 0;
    this.spustanje = false;

    // prepisano iz simple game, upotrebiti!
    this.scena = scena;
    this.platno = scena.platno;
    this.sadrzaj = this.platno.getContext("2d");

    this.slika = new Image();   // pravi objekat od slike koju primi
    this.slika.src = slika_url;

    // prima visinu i sirinu od svoje slike
    this.sirina = slika.width;
    this.visina = slika.height;
    // prepraviti u
    //this.sirina = this.slika.width;
    //this.visina = this.slika.height;

    this.visinaSveta = parseInt(this.platno.height);
    this.sirinaSveta = parseInt(this.platno.width);

    /* uzima slucajne koordinate i pripisuje sebi */
    this.slucajnaPozicija = function() {
        this.x = slucajniProzor()[0];
        this.y = slucajniProzor()[1];
    }   // slucajnaPozicija


    /* crta sebe na trenutnim ili zadatim koordinatama */
    this.crtaj = function() {
        // lagano se spusta i dize
        if(this.spust >= 100) {
            this.spustanje = true;
        } else if (this.spust <= 0) {
            this.spustanje = false;
        }
        this.spustanje ? this.spust-- : this.spust++;

        sadrzaj.drawImage(slika, 0, 0, slika.naturalWidth, slika.naturalHeight - (this.spust * (slika.naturalHeight/slika.height)), this.x, this.y + this.spust, this.sirina, this.visina - this.spust);
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
