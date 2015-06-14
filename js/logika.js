/*****************************************************************
    IDEJE:
<<<<<<< HEAD
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
=======
>>>>>>> zadrzavanje
* da menjaju sliku na pogodak
* napraviti energiju od mase 
* da nasumicno ispustaju parole
* paradajz pogadja
* uvodna animacija uvecavanje skupstina

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
var scena = new Scena('platno', slike.pozadina.skupstina);
var mish = new Mish(scena);
var uvod = new Uvod(scena);
var kraj = new Kraj(scena);
var karakteri = scena.karakteri;
	
ucitavac.ucitajSlike(slike, uvod.pusti);
scena.platno.addEventListener('click', reagujNaKlik);


/*************** GLAVNE FUNKCIJE ***************/

function postaviScenu(){
    scena.praviProzore(parametri_prozora);
    scena.praviKaraktere(slike.likovi, vreme); 
    dacic.jauk = "Jaoj";
    vulin.jauk = "To boli!";
    toma.jauk = "Evropa nema alternativu!";
	scena.animacija = requestAnimationFrame(azuriraj); // krace igra
}   // kraj postaviScenu


function azuriraj(){

    // izvrsava svakih 16.6 milisekundi (60 herca/sekund)
    if(scena.ide){
		scena.crtajPozadinu();
		dacic.igraj(30);
		vulin.igraj(20);
		toma.igraj(10);
				
		for(var i=0; i < karakteri.length; i++) {
			if(karakteri[i].igra) {	

				if(karakteri[i].nemaNiPauzuNiIzlaz()){
					karakteri[i].nadjiSlobodnoMesto(karakteri);	
					karakteri[i].odrediIzlaz(vreme);
			        karakteri[i].postaviMrdanje();	
				}
				if(karakteri[i].iskljucivoIzlaz()) {
					karakteri[i].azurirajMrdanje();
					karakteri[i].crtajMrdanje();
					karakteri[i].kukaAkoJePogodjen(mish);
					karakteri[i].kadOdeResetujIzlaz(vreme);
				}
				if(karakteri[i].nemaNiPauzuNiIzlaz()){
					karakteri[i].odrediPauzu(vreme);
				}
				if(karakteri[i].iskljucivoPauza()){
					karakteri[i].pogodjen = false
					karakteri[i].kadProdjeResetujPauzu(vreme);
				}

			} // kraj if karakter igra
		} // kraj for karakteri

        scena.prikazujPoene(vreme);
        vreme.proveriKraj(kraj);
        scena.animacija = requestAnimationFrame(azuriraj);
    }	// kraj svaki frejm

    // izvrsava svaki sekund
    if(vreme.prodjeSekunda()) {
        vreme.smanjuje();
        vreme.azurira();
    }	// kraj svaki sekund

}   // kraj azuriraj


// nije u petlji, ovo je on click
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
		for(var i=0; i < karakteri.length; i++){
			karakteri[i].pogodjen = false;			// da ne pogadja nevidljive
			if(karakteri[i].iskljucivoIzlaz()) { 
				mish.proveriPogodak(scena, karakteri[i]);
			}
		}
	}	// kraj ako igra
}   // kraj reagujNaKlik
