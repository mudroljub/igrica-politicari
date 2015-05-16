

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

    this.raspolozivePozicije = function(){
        //
    }

    this.crtaPozadinu = function(){

    }

    this.mrdaPozadinu = function(){

    }

    this.slucajniProzor = function(){
        // ili slobodan prozor
    }

    this.crtaLikove = function(){
        // ili crtaju sebe?
    }

    this.proveriJelNapustio = function(){
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

