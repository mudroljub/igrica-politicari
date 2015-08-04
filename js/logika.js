/*****************************************************************
    URADITI:
* ubaciti sirinu i visinu ekrana medju parametre, da se ne uzima window.innerHeight tokom igre
	* prvo mora da ucita pozadinu da bi prilagodio
* da crtabalon posle paradajza
// parola da skida energiju
// bacaParolu malo nakon izlaska, a nekad ne baca
// politicar izadje, malo odstoji, pa ode
* da crta balon posle paradajza, kao masu
* menjanje oruzja
* uvodna animacija uvecavanje skupstina
* prikazati najbolji rezultat u tabeli (napraviti upisivanje)
* prilagodiPozadinu, uzeti u obzir sire i tanje ekrane
* izdvojiti klasu Politicar
* prilagoditi tablu s poenima
* smanjiti paradajz
* balonce odlece

    PROBLEMI:
* parole se preklapaju jer izadje po jedna za svakog politicara
* prvi paradajz ne treba da puca
* da crtaProjektilNaLiku ne napusta prozor, a crtaParadajzOkolo ne ulazu u zauzet prozor
* kad je presirok ekran, sece pozadinu po visini !
* balonce se raspadne kad se smanji visina

    DOBRA PRAKSA:
* zaokruziti crtanje na pun piksel, bez decimala
* prikaciti varijable i funkcije za igrica objekat, ne zagadjivati globalno
********************************************************************/

/*
// izdvojiti osnovne stvari iz scene - platno, sadrzaj, visina, sirina, rezolucija i sl
var igra = {
  sadrzaj: platno.getContext('2d')
};
*/

// prevesti u json
var slike = {
    pozadine: {
        "skupstina": 'slike/pozadina_bez_prozora.png',
        "iza_prozora": 'slike/pozadina_iza_prozora.png'
    },
    likovi: {
        "vulin": 'slike/vulin.png',
        "toma": 'slike/toma.png',
        "dacic": 'slike/dacic.png'
    },
    predmeti: {
        "paradajz": "slike/paradajz.png",
        "jaje": "slike/politicar.png",
        "krpa": "slike/politicar.png"
    }
}


/*************** LOGIKA IGRE ***************/

var ucitavac = new Ucitavac(slike);                      // pravi karaktere
var vreme = new Vreme(30);          				// zadaje vreme igre
var uvod = new Uvod('platno');
var kursor = new Kursor();
var scena, karakteri, igrac, kraj;
ucitavac.ucitajSlike(slike, pripremiScenu);	

		// praviPredmete
		var paradajz = new Image();
		paradajz.src = "slike/paradajz.png";

$("#platno").addEventListener('click', reagujNaKlik);
$("#platno").addEventListener('mousemove', reagujNaPokret);

/*************** GLAVNE FUNKCIJE ***************/


function pripremiScenu(){
	var slika_pozadine = ucitavac.nadjiPozadinu();
	var prilagodjena_visina = prilagodiPozadinu(slika_pozadine); 
	scena = new Scena('platno', slika_pozadine, prilagodjena_visina);	
	uvod.pusti()
}	// pripremiScenu


function postaviScenu(){			// postavlja je reagujNaKlik()
	karakteri = scena.karakteri;
	igrac = new Igrac(scena);
	kraj = new Kraj(scena);
	$("#platno").style.cursor = 'none';
    scena.praviProzore(parametri_prozora);
    scena.praviKaraktere(slike.likovi);
    //scena.praviPredmete(slike.predmeti); 	
    dacic.jauk = "Jaoj";
    vulin.jauk = "To boli!";
    toma.jauk = "Evropa nema alternativu!";
	scena.animacija = requestAnimationFrame(glavniLup); // startuje animaciju
}   // kraj postaviScenu


// Ukrug
// izvrsava svaki frejm na 16.6 milisekundi (60 herca/sekund)
function glavniLup(trenutnoVremeAnimacije){
	scena.animacija = requestAnimationFrame(glavniLup);		// zakazuje povratnu funkciju, izvršava je prilikom osvežavanja	
	azuriraj();
    crtaj();
}   // kraj glavniLup


function azuriraj(){
    azurirajSekundu()
	//dacic.igraj(vreme, 30);
	//vulin.igraj(vreme, 20);
	//toma.igraj(vreme, 10);

	dacic.dodeliParolu();
	dacic.dodeliIzlazak(vreme, 2, 3);
	dacic.dodeliAnimaciju()	
	dacic.azurirajAnimaciju()	
	
	dacic.proveravajIzlazak(vreme);
	dacic.dodeliPauzu(vreme, 1, 2);
	dacic.proveravajPauzu(vreme);

	for(var i=0; i < karakteri.length; i++) {
		// karakteri[i].nadjiSlobodnoMesto(karakteri);		
		// karakteri[i].pogodjen = false
	}	// karakteri

	//scena.prikazujPoene(vreme);		// racunaPoene() i pisePoene()
	//vreme.proveriKraj(kraj);
}	// azuriraj


function crtaj(){
	scena.crtaPodlogu();
	crtajKaraktere()
 	scena.crtaPozadinu();
	dacic.bacaParole();
 		
	kursor.crtaReflektor(scena)
	kursor.crtaProjektil(scena, paradajz);				// crtaProjektil2 ili crtaProjektilNaLiku je bolji
	igrac.crtaMasu();
	
}	// crtaj


function crtajKaraktere(){
	dacic.crtajIzlazak();
	
	for(var i=0; i < karakteri.length; i++) {	
		//karakteri[i].crtajIzlazak();
		//karakteri[i].crtaKukanje(kursor);
	}
}	// crtajKaraktere


function azurirajSekundu(){
    if(vreme.prodjeSekunda()) {
        vreme.smanjuje();
        vreme.azurira();
    }	// kraj svaki sekund	
}

function reagujNaKlik(event){
	kursor.pamtiKliknutuPoziciju(event);			// koristi da crtaProjektil

	if(uvod.ide){
		uvod.ide = false;	// prekida uvod
		window.cancelAnimationFrame(uvod.animacija);
		postaviScenu();
		scena.ide = true;
	}	// kraj ako ide

	if(scena.ide){	
		for(var i=0; i < karakteri.length; i++){
			karakteri[i].pogodjen = false;	
			if(karakteri[i].upravoIzlazi()) { 			// da ne pogadja nevidljive
				kursor.proveriPogodak(scena, karakteri[i]);
			}
		}
	}	// kraj ako igra
	
	if(kraj.ide){
		kursor.crtaProjektil(scena, paradajz);
	 }
	 
}   // kraj reagujNaKlik


function reagujNaPokret(event){
	kursor.azuriraPoziciju(event)
}
