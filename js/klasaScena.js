
// primiti sirinu i visinu scene od window, nadalje koristiti to
// prilagodiPozadinu, uzeti u obzir sire i tanje ekrane

function Scena(naziv_platna, izvor_pozadine, vreme) {
    var ova_scena = this;       // hvata sebe, za niže funkcije
    this.ide_uvod = true;       // podrazumevano krece ide_uvod
    this.igranje = false;
	this.STANDARDNA_SIRINA = 1280;

	this.likovi = [];			// popunjava ga funkcija praviLikove
    this.pozicije_prozora = []  // popunjava ga funkcija praviProzore
	this.uvodna_animacija;		// prazne animacije
	this.animacija_igre;	
    this.misX = 0;				// koordinate misha
    this.misY = 0;
	this.poeni = 0;
	this.krecu_slova_x = -100;	// podrazumevano
	this.krecu_slova_y = 200;

	this.platno = _postaviPlatno(naziv_platna, ova_scena);
	this.sadrzaj = _postaviSadrzaj(this.platno);
	this.pozadina = _ucitajPozadinu(izvor_pozadine);		// dodati povratnu funkciju kao argument
	this.sirina = this.platno.width;
    this.visina = this.platno.height;	
	
	
	/*************** FUNKCIJE ***************/

	this.ucitajSlike = function(slike, povratnaRadnja){
		var brojSlika = Object.keys(slike).length;
		var ucitaneSlike = 0;
		for (var kljuc in slike) {
			var ova_slika = new Image(); 
			ova_slika.onload = function kadSveUcita() {
				ucitaneSlike++;
				if (ucitaneSlike >= brojSlika) {
					povratnaRadnja();
				}
			};  // kraj kadSveUcita()
			ova_slika.src = slike[kljuc];
		}	// kraj for
	}	// kraj ucitajSlike

    // uzima niz likova, pretvara ih u karaktere i ređa u niz karaktera
	this.praviLikove = function(likovi_za_ucitati){
		for (var ovaj_lik in likovi_za_ucitati){
			window[ovaj_lik] = new Karakter(ovaj_lik, likovi_za_ucitati[ovaj_lik], this, vreme);
			this.likovi.push(window[ovaj_lik]);
		}   // kraj for
	}   // kraj praviLikove()

	this.pustiUvod = function(){            // this je iz nekog razloga window
		ova_scena.sadrzaj.fillStyle = "black";
		ova_scena.sadrzaj.fillRect(0, 0, window.innerWidth, window.innerHeight);
		ova_scena.sadrzaj.fillStyle="#fff";
		ova_scena.sadrzaj.font = "48px Verdana";
		ova_scena.sadrzaj.fillText("Spremi se za obracun!", ova_scena.krecu_slova_x += 5, ova_scena.krecu_slova_y);
		if(ova_scena.krecu_slova_x > innerWidth-100) {
			ova_scena.krecu_slova_x = -100;
			ova_scena.krecu_slova_y += 100;
		}
		if(ova_scena.krecu_slova_y > innerHeight - 100) {
			ova_scena.krecu_slova_y = 200;
		}
		ova_scena.uvodna_animacija = requestAnimationFrame(ova_scena.pustiUvod);
	}	// kraj pustiUvod
	
	// iscrtava pozadinu i aktivne karaktere
	this.crtajSve = function(){
		this.sadrzaj.drawImage(this.pozadina, 0, 0, window.innerWidth, this.pozadina.nova_visina);
		for(var i=0; i < this.likovi.length; i++){
			if(this.likovi[i].igram){
				this.likovi[i].crtajSebe();
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
	
	this.dodeliPozicije = function(likovi){
		for(var i=0; i < likovi.length; i++){
			if(likovi[i].igram){
				likovi[i].nadjiSlobodnuPoziciju(likovi);
			}
		}
	} // kraj dodeliPozicije
	
	// this je unutar funkcije platno !
    this.reagujNaKlik = function(event){
        ova_scena.misX = event.clientX;   
        ova_scena.misY = event.clientY;

        if(ova_scena.ide_uvod){
            ova_scena.ide_uvod = false;
            window.cancelAnimationFrame(ova_scena.uvodna_animacija);
            postaviScenu();
            ova_scena.igranje = true;
        }	// kraj if ide_uvod

        if(ova_scena.igranje){
            for(var i=0; i < ova_scena.likovi.length; i++){
                ova_scena.likovi[i].proveriPogodak();
             }
        }	// kraj if igranje
    }   // kraj reagujNaKlik

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
		for(var i=0; i < this.likovi.length; i++){
			if(this.likovi[i].igram && this.likovi[i].vicem){
				this.likovi[i].ispisiPoruku();
			}
		}
	}	// kraj pisiPoruke

	this.prestaniPoruke = function(){
		for(var i=0; i < this.likovi.length; i++){
			this.likovi[i].vicem = false;
		}
	}	// kraj prestaniPoruke

	this.proveriKraj = function(){
		if(vreme.preostalo < 1) {
			window.cancelAnimationFrame(this.animacija_igre);
			this.sadrzaj.fillRect(window.innerWidth/2 - window.innerWidth/4, window.innerHeight/2 - window.innerHeight/4, window.innerWidth/2, window.innerHeight/2);
			this.sadrzaj.fillStyle="#000";
			this.sadrzaj.font = "48px Verdana";
			this.sadrzaj.fillText("Igra je završena!", window.innerWidth/2 - window.innerWidth/4 + 100, window.innerHeight/2 - window.innerHeight/4 + 100);
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
