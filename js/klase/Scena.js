// prilagodiPozadinu, uzeti u obzir sire i tanje ekrane

function Scena(id_platna, izvor_pozadine) {
    var ova_scena = this;       // hvata sebe, za niže funkcije
    this.ide = false;
	this.STANDARDNA_SIRINA = 1280;
	this.karakteri = [];		// popunjava ga funkcija praviKaraktere
    this.pozicije = []  // popunjava ga funkcija praviProzore
	this.animacija;		// identifikator animacije
	this.poeni = 0;
	this.platno = _postaviPlatno(id_platna, ova_scena);
	this.sadrzaj = _postaviSadrzaj(this.platno);
	this.pozadina = _ucitajPozadinu(izvor_pozadine);		// dodati povratnu funkciju kao argument
	this.sirina = this.platno.width;
    this.visina = this.platno.height;


	/*************** METODE ***************/

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

    this.praviKaraktere = function (likovi){
        for (var lik in likovi){
            window[lik] = new Karakter(lik, likovi[lik], this);
            this.karakteri.push(window[lik]);
        }   // kraj for
    }   // kraj praviKaraktere()

    this.prikazujPoene = function(vreme){
        this.sadrzaj.fillStyle="#000";
        this.sadrzaj.fillRect(20,80,180,100);
        this.sadrzaj.stroke();
        this.sadrzaj.fillStyle="#FFF";
        this.sadrzaj.font = "24px Verdana";
        this.sadrzaj.fillText("Poeni: " + this.poeni, 30, 120);
        this.sadrzaj.fillText("Vreme: " + vreme.preostalo, 30, 160);
    }	// kraj prikazujPoene

    this.crtajPozadinu = function(){
		this.sadrzaj.drawImage(this.pozadina, 0, 0, this.sirina, this.pozadina.nova_visina);
    }

    this.mrdajPozadinu = function(){
		// kad imamo vecu pozadinu da se pomera
    }

	/*************** POMOCNE FUNKCIJE ***************/

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