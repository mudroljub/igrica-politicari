
// primiti sirinu i visinu scene od window, nadalje koristiti to
// prilagodiPozadinu, uzeti u obzir sire i tanje ekrane

function Scena(naziv_platna, izvor_pozadine, vreme) {
    var ova_scena = this;       // hvata sebe, za niže funkcije
    this.igranje = false;
	this.STANDARDNA_SIRINA = 1280;

	this.karakteri = [];		// popunjava ga funkcija praviKaraktere
    this.pozicije_prozora = []  // popunjava ga funkcija praviProzore
	this.animacija_igre;		// identifikator animacije
    this.misX = 0;				// koordinate misha
    this.misY = 0;
	this.poeni = 0;

	this.platno = _postaviPlatno(naziv_platna, ova_scena);
	this.sadrzaj = _postaviSadrzaj(this.platno);
	this.pozadina = _ucitajPozadinu(izvor_pozadine);		// dodati povratnu funkciju kao argument
	this.sirina = this.platno.width;
    this.visina = this.platno.height;	
	
	
	/*************** FUNKCIJE ***************/

	this.ucitajSlike = function(slike, povratnoPustaUvod){		
		var brojSlika = Object.keys(slike).length;
		var ucitaneSlike = 0;
		for (var kljuc in slike) {
			var ova_slika = new Image(); 
			ova_slika.onload = function kadSveUcita() {
				ucitaneSlike++;
				if (ucitaneSlike >= brojSlika) {
					povratnoPustaUvod();
				}
			};  // kraj kadSveUcita()
			ova_slika.src = slike[kljuc];
		}	// kraj for
	}	// kraj ucitajSlike

    // uzima niz likova, pretvara ih u karaktere i ređa u niz karaktera
	this.praviKaraktere = function(likovi){
		for (var ovaj_lik in likovi){
			window[ovaj_lik] = new Karakter(ovaj_lik, likovi[ovaj_lik], this, vreme);
			this.karakteri.push(window[ovaj_lik]);
		}   // kraj for
	}   // kraj praviKaraktere()

	// iscrtava pozadinu i aktivne karaktere
	this.crtajSve = function(){
		this.sadrzaj.drawImage(this.pozadina, 0, 0, this.sirina, this.pozadina.nova_visina);
		
		for(var i=0; i < this.karakteri.length; i++){
			if(this.karakteri[i].igram){
				this.karakteri[i].crtajSebe();
			}
		}

	} // kraj crtajSve

    this.praviProzore = function(faktori){
        var gornji_red = this.pozadina.nova_visina / faktori[0];
        var donji_red = this.pozadina.nova_visina / faktori[1];
        var prvi_prozor = this.sirina / faktori[2];			// promeniti u scena.sirina
        var drugi_prozor = this.sirina / faktori[3];
        var treci_prozor = this.sirina / faktori[4];

        this.pozicije_prozora = [
            [prvi_prozor, gornji_red], [drugi_prozor, gornji_red], [treci_prozor, gornji_red],
            [prvi_prozor, donji_red], [drugi_prozor, donji_red], [treci_prozor, donji_red]
        ]
    }   // kraj praviProzore

	this.slucajniProzor = function(){
		var slucajna_pozicija = Math.floor(Math.random() * this.pozicije_prozora.length);
		return [this.pozicije_prozora[slucajna_pozicija][0], this.pozicije_prozora[slucajna_pozicija][1]];
	}	// kraj slucajniProzor
	
	this.dodeliPozicije = function(karakteri){
		for(var i=0; i < karakteri.length; i++){
			if(karakteri[i].igram){
				karakteri[i].nadjiSlobodnuPoziciju(karakteri);
			}
		}
	} // kraj dodeliPozicije
	

    this.pisiPoene = function(){
        this.sadrzaj.fillStyle="#000";
        this.sadrzaj.fillRect(20,80,180,100);
        this.sadrzaj.stroke();
        this.sadrzaj.fillStyle="#FFF";
        this.sadrzaj.font = "24px Verdana";
        this.sadrzaj.fillText("Poeni: " + this.poeni, 30, 120);
        this.sadrzaj.fillText("Vreme: " + vreme.preostalo, 30, 160);
    }	// kraj pisiPoene

	this.pisiPoruke = function(){
		for(var i=0; i < this.karakteri.length; i++){
			if(this.karakteri[i].igram && this.karakteri[i].vicem){
				this.karakteri[i].ispisiPoruku();
			}
		}
	}	// kraj pisiPoruke

	this.brisiPoruke = function(){
		for(var i=0; i < this.karakteri.length; i++){
			this.karakteri[i].vicem = false;
		}
	}	// kraj brisiPoruke

	this.proveriKraj = function(){
		if(vreme.preostalo < 1) {
			window.cancelAnimationFrame(this.animacija_igre);
			this.sadrzaj.fillRect(this.sirina/2 - this.sirina/4, this.visina/2 - this.visina/4, this.sirina/2, this.visina/2);
			this.sadrzaj.fillStyle="#000";
			this.sadrzaj.font = "48px Verdana";
			this.sadrzaj.fillText("Igra je završena!", this.sirina/2 - this.sirina/4 + 100, this.visina/2 - this.visina/4 + 100);
			this.igranje = false;
		}
	}	// kraj proveriKraj

    this.mrdaPozadinu = function(){
		// kad imamo vecu pozadinu da se pomera
    }
	
	function _postaviPlatno(naziv_platna, ova_scena){
		var platno = document.getElementById(naziv_platna);        // ako nema platna, da sam stvara
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
	
	function _ucitajPozadinu(izvor_pozadine){
		var pozadina = new Image();
		pozadina.onload = function povratno() {                                     // this je izvan scena
			ova_scena.pozadina = _prilagodiPozadinu(pozadina);
		};
		pozadina.src = izvor_pozadine;		
	}
	
	function _prilagodiPozadinu(pozadina){
			pozadina.nova_visina = (ova_scena.sirina / pozadina.width) * pozadina.height;  // this je unutra pozadina, prilagodjava visinu pozadine
			return pozadina;
	}


}	// kraj Scena
