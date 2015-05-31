/*****************************************************************
- kad deliPozicije dodeljuje i spustenost 			// na svaki sekund
- kad crtaSve poziva proviruje() i crtajDizanje();	// na svakih 16.6 milisekundi

- odvojiti pozicije od spustenosti
- odvojiti crtaSve od crtaDizanje

    IDEJE:
// da izlaze sa strane
// da ne izlaze uvek, nego da malo sacekaju
// da menjaju sliku na pogodak
// da nasumicno ispustaju parole
// grafiti na skupstini vucicu pederu
// paradajz pogadja
// uvodna animacija uvecavanje skupstina

    PROBLEMI:
// kad je presirok ekran, sece pozadinu po visini !
// mozda klasa Prilagodjavac za pozadinu, slike, slova
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
    dacic.kuknjava = "Jaoj";								// dodaje jedinstvene poruke
    vulin.kuknjava = "To boli!";
    toma.kuknjava = "Evropa nema alternativu!";
	scena.animacija = requestAnimationFrame(azuriraj); // krace igra
}


function azuriraj(){
    // radi na svakih 16.6 milisekundi
    if(scena.ide){
		dacic.ulazi(30);
		vulin.ulazi(20);
		toma.ulazi(10);
        automat.crtaSve();
        automat.pisePoruke(mish);
        scena.prikazujePoene(vreme);
        vreme.daPustiKraj(kraj);

		// radi na svaki sekund
        if(vreme.proslaSekunda()) {
            automat.brisePoruke();
            automat.deliPozicije(scena.karakteri);
            vreme.smanjuje();
            vreme.azurira();
        }	// kraj svaki sekund
		
        scena.animacija = requestAnimationFrame(azuriraj);
    }	// kraj svaki frejm
}


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
