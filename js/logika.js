/*****************************************************************
// zameniti for petlje sa provrti
    IDEJE:
// da ne izlaze uvek, nego da malo sacekaju
// da menjaju sliku na pogodak
// da nasumicno ispustaju parole
// lokalni i globalni hajskor
// grafiti na skupstini vucicu pederu
// paradajz pogadja
// uvodna animacija uvecavanje skupstina

    PROBLEMI:
// deo sekunde su u igri, a nisu nacrtani, dodati varijablu nacrtani radi provere
// klikom pogadjam i one kojih nema	
// klikom detektuje karaktera i kad nije nacrtan. dodati uslov if nacrtan. 
// pozadina se crta prilagodjeno, a delove crta neprilagodjeno
// resenje: napraviti jedinstveno prilagodjavanje
// kad je presirok ekran, sece pozadinu po visini !
// na manjim ekranima prilagoditi slova (ide i kraj)
********************************************************************/

var likovi = { // nazivi bitni, od njih pravi objekte!
    vulin: 'slike/vulin.png',
    toma: 'slike/toma.png',
    dacic: 'slike/dacic.png'
}

/*************** LOGIKA IGRE ***************/

var postavke = new Postavke();      				// racuna pozicije prozora
var vreme = new Vreme(30);          				// prosledjuje vreme igre
var scena = new Scena('platno', 'slike/skupstina2.png', vreme);
var mish = new Mish(scena); 
var uvod = new Uvod(scena);

scena.ucitajSlike(likovi, uvod.pusti);
$("#platno").addEventListener('click', naKlik);


/*************** GLAVNE FUNKCIJE ***************/

function postaviScenu(){
    scena.praviProzore(postavke.ose_prozora);
    praviKaraktere(likovi);   	// pravi objekte od niza likova
    dacic.kuknjava = "Jaoj";						// dodaje jedinstvene poruke
    vulin.kuknjava = "To boli!";
    toma.kuknjava = "Evropa nema alternativu!";
	scena.animacija_igre = requestAnimationFrame(azuriraj); // krace igra
}


function azuriraj(){
    // ovo izvrsava na svaki frejm
    if(scena.igranje){
		dacic.igraj(30);
		vulin.igraj(20);
		toma.igraj(10);
        scena.crtajSve();
        scena.pisiPoruke();
        scena.pisiPoene();
        scena.proveriKraj();

		// ovo izvrsava svake sekunde
        if(vreme.prethodna_sekunda != vreme.ovaSekunda()) {
            scena.brisiPoruke();
            scena.dodeliPozicije(scena.karakteri);
            vreme.preostalo--;
            vreme.prethodna_sekunda = vreme.ovaSekunda();
        }	// kraj svaki sekund
		
        scena.animacija_igre = requestAnimationFrame(azuriraj);
    }	// kraj svaki frejm
}


function naKlik(klik){
	mish.x = klik.clientX;   
	mish.y = klik.clientY;
	
	if(uvod.ide){
		uvod.ide = false;
		window.cancelAnimationFrame(uvod.animacija);
		postaviScenu();
		scena.igranje = true;
	}	// kraj ako ide

	if(scena.igranje){
		for(var i=0; i < scena.karakteri.length; i++){
			// ako je karakter u igri
			if(scena.karakteri[i].igram) {
				mish.proveriPogodak(scena.karakteri[i]);
			}
		}
	}	// kraj ako igranje
}   // kraj naKlik


praviKaraktere = function(likovi){
	for (var lik in likovi){
		window[lik] = new Karakter(lik, likovi[lik], scena, vreme, mish);
		scena.karakteri.push(window[lik]);
	}   // kraj for
}   // kraj praviKaraktere()
