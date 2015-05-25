
// prilagodiPozadinu, uzeti u obzir sire i tanje ekrane

function Scena(id_platna, izvor_pozadine) {
    var ova_scena = this;       // hvata sebe, za niže funkcije
    this.igranje = false;
	this.STANDARDNA_SIRINA = 1280;

	this.karakteri = [];		// popunjava ga funkcija praviKaraktere
    this.pozicije = []  // popunjava ga funkcija praviProzore
	this.animacija_igre;		// identifikator animacije
	this.poeni = 0;

	this.platno = _postaviPlatno(id_platna, ova_scena);
	this.sadrzaj = _postaviSadrzaj(this.platno);
	this.pozadina = _ucitajPozadinu(izvor_pozadine);		// dodati povratnu funkciju kao argument
	this.sirina = this.platno.width;
    this.visina = this.platno.height;	
	
	
	/*************** FUNKCIJE ***************/

    this.praviProzore = function(ose_prozora){
        var gornji_red = this.pozadina.nova_visina / ose_prozora.gornja_horizontala;
        var donji_red = this.pozadina.nova_visina / ose_prozora.donja_horizontala;
        var prvi_prozor = this.sirina / ose_prozora.prva_vertikala;			// promeniti u scena.sirina
        var drugi_prozor = this.sirina / ose_prozora.druga_vertikala;
        var treci_prozor = this.sirina / ose_prozora.treca_vertikala;

        this.pozicije = [
            [prvi_prozor, gornji_red], [drugi_prozor, gornji_red], [treci_prozor, gornji_red],
            [prvi_prozor, donji_red], [drugi_prozor, donji_red], [treci_prozor, donji_red]
        ]
    }   // kraj praviProzore
	
	this.dodeliPozicije = function(karakteri){
		for(var i=0; i < karakteri.length; i++){
			if(karakteri[i].igranje){
				karakteri[i].nadjiSlobodnoMesto(karakteri);
			}
		}
	} // kraj dodeliPozicije

    this.crtajSve = function(){
        this.sadrzaj.drawImage(this.pozadina, 0, 0, this.sirina, this.pozadina.nova_visina);

        for(var i=0; i < this.karakteri.length; i++){
            if(this.karakteri[i].igranje){
                this.karakteri[i].crtaj();
            }
        }
    } // kraj crtajSve

    this.pisiPoene = function(vreme){
        this.sadrzaj.fillStyle="#000";
        this.sadrzaj.fillRect(20,80,180,100);
        this.sadrzaj.stroke();
        this.sadrzaj.fillStyle="#FFF";
        this.sadrzaj.font = "24px Verdana";
        this.sadrzaj.fillText("Poeni: " + this.poeni, 30, 120);
        this.sadrzaj.fillText("Vreme: " + vreme.preostalo, 30, 160);
    }	// kraj pisiPoene

	this.pisiPoruke = function(mish){
		for(var i=0; i < this.karakteri.length; i++){
			if(this.karakteri[i].igranje && this.karakteri[i].kukanje){
				this.karakteri[i].kuka(mish);
			}
		}
	}	// kraj pisiPoruke

	this.brisiPoruke = function(){
		for(var i=0; i < this.karakteri.length; i++){
			this.karakteri[i].kukanje = false;
		}
	}	// kraj brisiPoruke

	this.proveriKraj = function(vreme){
		if(vreme.preostalo < 1) {
			window.cancelAnimationFrame(this.animacija_igre);
			this.igranje = false;
			this.odjavnaSlova();
		}	
	}	// kraj proveriKraj

	this.odjavnaSlova = function(){
			this.sadrzaj.fillRect(this.sirina/2 - this.sirina/4, this.visina/2 - this.visina/4, this.sirina/2, this.visina/2);
			this.sadrzaj.fillStyle="#000";
			this.sadrzaj.font = "48px Verdana";
			this.sadrzaj.fillText("Igra je završena!", this.sirina/2 - this.sirina/4 + 100, this.visina/2 - this.visina/4 + 100);		
	}	// kraj odjavnaSlova

    this.mrdaPozadinu = function(){
		// kad imamo vecu pozadinu da se pomera
    }
	
	function _postaviPlatno(id_platna, ova_scena){
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
	
	function _ucitajPozadinu(izvor_pozadine){
		var pozadina = new Image();
		pozadina.onload = function kadUcita() {
			ova_scena.pozadina = _prilagodiPozadinu(pozadina);
		};
		pozadina.src = izvor_pozadine;		
	}
	
	function _prilagodiPozadinu(pozadina){
			pozadina.nova_visina = (ova_scena.sirina / pozadina.width) * pozadina.height;  // prilagodjava visinu pozadine
			return pozadina;
	}


}	// kraj Scena
