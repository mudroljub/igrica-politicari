// prilagodiPozadinu, uzeti u obzir sire i tanje ekrane

function Scena(id_platna, izvor_pozadine) {
    var ova_scena = this;       // hvata sebe, za niže funkcije
    this.ide = false;
	this.STANDARDNA_SIRINA = 1280;
	this.karakteri = [];		// popunjava ga funkcija praviKaraktere
	this.predmeti = [];			// popunjava ga funkcija praviPredmete	
    this.pozicije = []  // popunjava ga funkcija praviProzore
	this.animacija;		// identifikator animacije
	this.poeni = 0;
	this.platno = _razvuciPlatno(id_platna);
	this.sadrzaj = _postaviSadrzaj(this.platno);
	this.pozadina = _ucitajPozadinu(izvor_pozadine, ova_scena);		// dodati povratnu funkciju kao argument
	this.sirina = this.platno.width;
    this.visina = this.platno.height;


	/*************** POMOCNE FUNKCIJE ***************/

	function _razvuciPlatno(id_platna){
		var platno = document.getElementById(id_platna);        // ako nema platna, da sam stvara
		platno.width = window.innerWidth;
		platno.height = window.innerHeight;
		return platno;
	}
	
	function _postaviSadrzaj(platno) {
		var sadrzaj = platno.getContext('2d');
		sadrzaj.font = "30px Verdana";
		sadrzaj.fillStyle = "white";
		sadrzaj.strokeStyle = 'black';
		return sadrzaj;		
	}

    // pripojiti Ucitavacu
	function _ucitajPozadinu(izvor_pozadine, ova_scena){
		var pozadina = new Image();
		pozadina.onload = function kadUcita() {
			ova_scena.pozadina = _prilagodiPozadinu(pozadina, ova_scena);
		};
		pozadina.src = izvor_pozadine;		
	}
	
	function _prilagodiPozadinu(pozadina, ova_scena){
			pozadina.nova_visina = (ova_scena.sirina / pozadina.width) * pozadina.height;  // prilagodjava visinu pozadine
			return pozadina;
	}

}	// kraj Scena


Scena.prototype.praviProzore = function(ose_prozora){
    var gornji_red = this.pozadina.nova_visina / ose_prozora.gornji_red;
    var donji_red = this.pozadina.nova_visina / ose_prozora.donji_red;
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

Scena.prototype.crtajPozadinu = function(){
    this.sadrzaj.drawImage(this.pozadina, 0, 0, this.sirina, this.pozadina.nova_visina);
}

Scena.prototype.mrdajPozadinu = function(){
    // kad imamo vecu pozadinu da se pomera
}
