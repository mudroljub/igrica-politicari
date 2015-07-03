/*****************************************************************
    URADITI:
* vratiti jedan paradajz, puca random
* menjanje oruzja
* srediti proveru sudara, sada se oslanja samo na jednu tacku! 
* napraviti energiju od mase 
* uvodna animacija uvecavanje skupstina
* prikazati najbolji rezultat u tabeli (napraviti upisivanje)
* funkcije za prilagodjavanje pozadine, slike, slova

    PROBLEMI:
* prvi paradajz ne treba da puca
* da crtaProjektilNaLiku ne napusta prozor, a crtaParadajzOkolo ne ulazu u zauzet prozor
* kad je presirok ekran, sece pozadinu po visini !

    DOBRA PRAKSA:
* zaokruziti crtanje na pun piksel, bez decimala
********************************************************************/

// nazivi bitni, od njih pravi objekte
var slike = {
    pozadine: {
        skupstina: 'slike/skupstina3d.png'
    },
    likovi: {
        vulin: 'slike/vulin.png',
        toma: 'slike/toma.png',
        dacic: 'slike/dacic.png'
    },
    predmeti: {
        paradajz: "slike/paradajz.png",
        jaje: "slike/politicar.png",
        krpa: "slike/politicar.png"
    }
}


/*************** LOGIKA IGRE ***************/

var ucitavac = new Ucitavac(slike);                      // pravi karaktere
var vreme = new Vreme(30);          				// zadaje vreme igre
var uvod = new Uvod('platno');
var kursor = new Kursor();
var scena, karakteri, kraj;
ucitavac.ucitajSlike(slike, uvod.pusti);	

		// praviPredmete
		var paradajz = new Image();
		paradajz.src = "slike/paradajz.png";

$("#platno").addEventListener('click', reagujNaKlik);
$("#platno").addEventListener('mousemove', reagujNaPokret);

/*************** GLAVNE FUNKCIJE ***************/

function postaviScenu(){
	var slika_pozadine = ucitavac.nadjiPozadinu();
	var prilagodjena_visina = prilagodiPozadinu(slika_pozadine); 
	scena = new Scena('platno', slika_pozadine, prilagodjena_visina);
	karakteri = scena.karakteri;
	kraj = new Kraj(scena);
	$("#platno").style.cursor = 'none';
    scena.praviProzore(parametri_prozora);
    scena.praviKaraktere(slike.likovi);
    //scena.praviPredmete(slike.predmeti); 	
    dacic.jauk = "Jaoj";
    vulin.jauk = "To boli!";
    toma.jauk = "Evropa nema alternativu!";
	scena.animacija = requestAnimationFrame(azuriraj); // krace igra
}   // kraj postaviScenu


function azuriraj(){

    // izvrsava svaki frejm, tj. 16.6 milisekundi (60 herca/sekund)
    if(scena.ide){
		scena.crtaPozadinu();
		dacic.igraj(vreme, 30);
		vulin.igraj(vreme, 20);
		toma.igraj(vreme, 10);
				
		for(var i=0; i < karakteri.length; i++) {
			kursor.crtaTriProjektile(scena, paradajz);

			if(karakteri[i].igra) {	

				if(karakteri[i].neIzlaziNiPauzira()){
					karakteri[i].nadjiSlobodnoMesto(karakteri);	
					karakteri[i].odrediIzlaz(vreme, 2, 3);
			        karakteri[i].postaviMrdanje();	
				}
				if(karakteri[i].upravoIzlazi()) {
					karakteri[i].azurirajMrdanje();
					karakteri[i].crtajMrdanje();
					karakteri[i].kukaAkoJePogodjen(kursor);
					karakteri[i].kadOdeResetujIzlaz(vreme);
					kursor.crtaProjektilNaLiku(scena, karakteri[i], paradajz);
				}
				if(karakteri[i].neIzlaziNiPauzira()){
					karakteri[i].odrediPauzu(vreme, 1, 2);
				}
				if(karakteri[i].upravoPauzira()){
					karakteri[i].pogodjen = false
					karakteri[i].kadProdjeResetujPauzu(vreme);
				}

			} // kraj if karakter igra		
		} // kraj for karakteri

		kursor.crtaKrug(scena)
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


function reagujNaKlik(event){
	kursor.pamtiKliknutuPoziciju(event);			// koristi da crtaProjektil
	kursor.dodeliPozicijeProjektila(paradajz);

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