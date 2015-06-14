/*****************************************************************
    IDEJE:
<<<<<<< HEAD
* da ne izlaze odma, nego da malo sacekaju
=======
>>>>>>> e3beefb9b2c31c18702d01b2ca07f1bce0b4d1b6
* da ne odlaze odma, nego da malo sacekaju
	- kad izadju, dobiju vreme ostanka i igraj
	- crtaj
	- kad prodje ostanak, aktivirati im pauzu
	- iskljuciti im igranje na period pauze
	- kad prodje pauza, ponovo iz pocetka (odredi duzinu ostanka, igraj)
* da menjaju sliku na pogodak
* da nasumicno ispustaju parole
* grafiti na skupstini vucicu pederu
* paradajz pogadja
* uvodna animacija uvecavanje skupstina
* napraviti energiju od mase 

    PROBLEMI:
* kad je presirok ekran, sece pozadinu po visini !
* mozda klasa Prilagodjavac za pozadinu, slike, slova

    DOBRA PRAKSA:
* zaokruziti crtanje na pun piksel, bez decimala
********************************************************************/

// nazivi bitni, od njih pravi objekte
var slike = {
    pozadina: {
        skupstina: 'slike/skupstina2.png'
    },
    likovi: {
        vulin: 'slike/vulin.png',
        toma: 'slike/toma.png',
        dacic: 'slike/dacic.png'
    },
    predmeti: {
        paradajz: "slike/politicar.png",
        jaje: "slike/politicar.png",
        krpa: "slike/politicar.png"
    }
}


/*************** LOGIKA IGRE ***************/

var ucitavac = new Ucitavac();                      // pravi karaktere
var vreme = new Vreme(30);          				// zadaje vreme igre
var mish = new Mish();
var scena = new Scena('platno', slike.pozadina.skupstina);
var automat = new Automat(scena);                   // obavlja masovne radnje
var uvod = new Uvod(scena);
var kraj = new Kraj(scena);

ucitavac.ucitajSlike(slike, uvod.pusti);
scena.platno.addEventListener('click', reagujNaKlik);


/*************** GLAVNE FUNKCIJE ***************/

function postaviScenu(){
    scena.praviProzore(parametri_prozora);
    automat.praviKaraktere(slike.likovi, scena, vreme);   	// pravi objekte od niza likova
    dacic.jauk = "Jaoj";								// dodaje jedinstvene poruke
    vulin.jauk = "To boli!";
    toma.jauk = "Evropa nema alternativu!";
    automat.deliPozicije(scena.karakteri);
	scena.animacija = requestAnimationFrame(azuriraj); // krace igra
}   // kraj postaviScenu


function azuriraj(){

    // izvrsava svakih 16.6 milisekundi (60 herca/sekund)
    if(scena.ide){
		automat.azuriraMrdanje(scena.karakteri);
		automat.jesuProslePauze(scena.karakteri)
        automat.crtaSve(scena, scena.karakteri);
        automat.pisePoruke(mish);
        scena.prikazujePoene(vreme);
        vreme.proveriKraj(kraj);
        scena.animacija = requestAnimationFrame(azuriraj);
    }	// kraj svaki frejm

    // napraviti drukciju logiku koja ne zavisi od sekunde
    // vec od stanja svakog karaktera, jel igra ili ne
    // if(karakter.igra) crtaj, pisiporuke, itd
    // mozda odvojiti azuriranje od crtanja?

    // izvrsava svaki sekund
    if(vreme.prodjeSekunda()) {
	    dacic.igraj(30);
		vulin.igraj(20);
		toma.igraj(10);
        automat.brisePoruke();
        automat.zaustavljaMrdanje(scena.karakteri);
        automat.deliPozicije(scena.karakteri);
        automat.odrediPauzuSvima(scena.karakteri);
        automat.postavljaMrdanje(scena.karakteri);
        vreme.smanjuje();
        vreme.azurira();
    }	// kraj svaki sekund

}   // kraj azuriraj


function reagujNaKlik(event){
	mish.x = event.clientX;   
	mish.y = event.clientY;
	
	if(uvod.ide){
		uvod.ide = false;	// prekida uvod
		window.cancelAnimationFrame(uvod.animacija);
		postaviScenu();
		scena.ide = true;
	}	// kraj ako ide

	if(scena.ide){
		for(var i=0; i < scena.karakteri.length; i++){
			if(scena.karakteri[i].igra) {
				mish.proveriPogodak(scena, scena.karakteri[i]);
			}
		}
	}	// kraj ako igra
}   // kraj reagujNaKlik
