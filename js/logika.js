/*****************************************************************
    IDEJE:
// klasu Automat
// da ne izlaze uvek, nego da malo sacekaju
// da menjaju sliku na pogodak
// da nasumicno ispustaju parole
// grafiti na skupstini vucicu pederu
// paradajz pogadja
// uvodna animacija uvecavanje skupstina

    PROBLEMI:
// izlaze sekund ranije
// kad je presirok ekran, sece pozadinu po visini !
// mozda klasa Prilagodjavac za pozadinu, slike, slova
********************************************************************/

// od naziva pravi objekte !
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
    scena.praviProzore(ose_prozora);
    ucitavac.praviKaraktere(slike.likovi, scena, vreme);   	// pravi objekte od niza likova
    dacic.kuknjava = "Jaoj";								// dodaje jedinstvene poruke
    vulin.kuknjava = "To boli!";
    toma.kuknjava = "Evropa nema alternativu!";
	scena.animacija_igre = requestAnimationFrame(azuriraj); // krace igra
}


function azuriraj(){
    // radi na svakih 16.6 milisekundi
    if(scena.igra){
		dacic.ulazi(30);
		vulin.ulazi(20);
		toma.ulazi(10);
        automat.crtajSve();
        automat.pisiPoruke(mish);
        scena.prikazujPoene(vreme);
        vreme.proveriKraj(kraj);

		// radi na svaki sekund
        if(vreme.promenilaSekunda()) {
            automat.brisiPoruke();
            automat.deliPozicije(scena.karakteri);
            vreme.tece();
            vreme.prethodna_sekunda = vreme.ovaSekunda();
        }	// kraj svaki sekund
		
        scena.animacija_igre = requestAnimationFrame(azuriraj);
    }	// kraj svaki frejm
}


function reagujNaKlik(klik){
	mish.x = klik.clientX;   
	mish.y = klik.clientY;
	
	if(uvod.ide){
		uvod.ide = false;
		window.cancelAnimationFrame(uvod.animacija);
		postaviScenu();
		scena.igra = true;
	}	// kraj ako ide

	if(scena.igra){
		for(var i=0; i < scena.karakteri.length; i++){
			if(scena.karakteri[i].igra) {
				mish.proveriPogodak(scena, scena.karakteri[i]);
			}
		}
	}	// kraj ako igra
}   // kraj reagujNaKlik
