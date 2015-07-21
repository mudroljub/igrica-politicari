function Scena(platno_id, slika_pozadine, prilagodjena_visina) {
    var ova_scena = this;       // hvata sebe, za niže funkcije
    this.ide = false;
	this.karakteri = [];		// popunjava ga funkcija praviKaraktere
	this.predmeti = [];			// popunjava ga funkcija praviPredmete	
    this.pozicije = []  // popunjava ga funkcija praviProzore
	this.animacija;		// identifikator animacije
	this.poeni = 0;
	this.platno = razvuciPlatno(platno_id);
	this.sadrzaj = postaviSadrzaj(this.platno);
	this.pozadina = slika_pozadine;
	this.prilagodjena_visina = prilagodjena_visina;
	this.sirina = this.platno.width;
    this.visina = this.platno.height;

}	// kraj Scena


Scena.prototype.praviProzore = function(ose_prozora){
    var gornji_red = this.prilagodjena_visina / ose_prozora.gornji_red;
    var donji_red = this.prilagodjena_visina / ose_prozora.donji_red;
    var prvi_niz = this.sirina / ose_prozora.prvi_niz;			// promeniti u scena.sirina
    var drugi_niz = this.sirina / ose_prozora.drugi_niz;
    var treci_niz = this.sirina / ose_prozora.treci_niz;
    var cetvrti_niz = this.sirina / ose_prozora.cetvrti_niz;

    this.pozicije = [
        [prvi_niz, gornji_red], [drugi_niz, gornji_red], [treci_niz, gornji_red], [cetvrti_niz, gornji_red],
        [prvi_niz, donji_red], [drugi_niz, donji_red], [treci_niz, donji_red], [cetvrti_niz, donji_red]
    ]
}   // praviProzore

Scena.prototype.praviKaraktere = function (likovi){
    for (var lik in likovi){
        window[lik] = new Karakter(lik, likovi[lik], this);
        this.karakteri.push(window[lik]);
    }   // kraj for
}   // praviKaraktere()

Scena.prototype.praviPredmete = function (predmeti){
    for (var predmet in predmeti){
        window[predmet] = new Image(predmeti[predmet]);
        //this.predmeti.push(window[predmet]);
    }   // kraj for
}   // praviPredmete()

Scena.prototype.prikazujPoene = function(vreme){
    this.sadrzaj.fillStyle="#000";
    this.sadrzaj.fillRect(20,80,180,100);
    this.sadrzaj.stroke();
    this.sadrzaj.fillStyle="#FFF";
    this.sadrzaj.font = "24px Verdana";
    this.sadrzaj.fillText("Poeni: " + this.poeni, 30, 120);
    this.sadrzaj.fillText("Vreme: " + vreme.preostalo, 30, 160);
}	// prikazujPoene

Scena.prototype.crtaPozadinu = function(){
    this.sadrzaj.drawImage(this.pozadina, 0, 0, this.sirina, this.prilagodjena_visina);
}

Scena.prototype.crtaIzaPozadine = function(){
    this.sadrzaj.drawImage(iza_prozora_slika, 0, 0, this.sirina, this.prilagodjena_visina);
}

Scena.prototype.mrdaPozadinu = function(){
    // kad imamo vecu pozadinu da se pomera
}
