/*****************************************************************
    IDEJE:
* da se ne pojavljuju dva paradajza kada pogodi
* popraviti da paradajz gadja u centar
* klasa paradajz ili predmet
* nišan kao fokus, tri paradajza random pogađaju unutar kruga
* da menjaju sliku na pogodak
* napraviti energiju od mase 
* da nasumicno ispustaju parole
* paradajz pogadja
* uvodna animacija uvecavanje skupstina

    PROBLEMI:
* srediti proveru sudara, sada se oslanja samo na jednu tacku!
* kad je presirok ekran, sece pozadinu po visini !
* mozda klasa Prilagodjavac za pozadinu, slike, slova

    DOBRA PRAKSA:
* zaokruziti crtanje na pun piksel, bez decimala
********************************************************************/

// nazivi bitni, od njih pravi objekte
var slike = {
    pozadina: {
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

var ucitavac = new Ucitavac();                      // pravi karaktere
var vreme = new Vreme(30);          				// zadaje vreme igre
var scena = new Scena('platno', slike.pozadina.skupstina);
var mish = new Mish(scena);
var uvod = new Uvod(scena);
var kraj = new Kraj(scena);
var karakteri = scena.karakteri;

var paradajz = new Image();
paradajz.src = "slike/paradajz.png";
	
ucitavac.ucitajSlike(slike, uvod.pusti);
scena.platno.addEventListener('click', reagujNaKlik);
scena.platno.addEventListener('mousemove', mishSeMrda);


function mishSeMrda(event){
	mish.azuriraPoziciju(event)
}

/*************** GLAVNE FUNKCIJE ***************/

function postaviScenu(){
    scena.praviProzore(parametri_prozora);
    scena.praviKaraktere(slike.likovi); 
    //scena.praviPredmete(slike.predmeti); 	
    dacic.jauk = "Jaoj";
    vulin.jauk = "To boli!";
    toma.jauk = "Evropa nema alternativu!";
	scena.animacija = requestAnimationFrame(azuriraj); // krace igra
}   // kraj postaviScenu


function azuriraj(){

    // izvrsava svakih 16.6 milisekundi (60 herca/sekund)
    if(scena.ide){
		scena.crtajPozadinu();
		dacic.igraj(vreme, 30);
		vulin.igraj(vreme, 20);
		toma.igraj(vreme, 10);
				
		for(var i=0; i < karakteri.length; i++) {
			if(karakteri[i].igra) {	

				if(karakteri[i].neIzlaziNiPauzira()){
					karakteri[i].nadjiSlobodnoMesto(karakteri);	
					karakteri[i].odrediIzlaz(vreme, 2, 3);
			        karakteri[i].postaviMrdanje();	
				}
				if(karakteri[i].upravoIzlazi()) {
					karakteri[i].azurirajMrdanje();
					karakteri[i].crtajMrdanje();
					karakteri[i].kukaAkoJePogodjen(mish);
					karakteri[i].kadOdeResetujIzlaz(vreme);
					mish.crtaParadajzNaLiku(karakteri[i]);					
				}
				if(karakteri[i].neIzlaziNiPauzira()){
					karakteri[i].odrediPauzu(vreme, 1, 2);
				}
				if(karakteri[i].upravoPauzira()){
					karakteri[i].pogodjen = false
					karakteri[i].kadProdjeResetujPauzu(vreme);
				}

			} // kraj if karakter igra
		mish.crtaParadajzVanLika(karakteri[i]);
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
	mish.azuriraZapamcenuPoziciju(event); 
	
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
				mish.proveriPogodak(scena, karakteri[i]);
			}
		}
	}	// kraj ako igra
	
	if(kraj.ide){
		mish.crtaParadajz();
	 }
	 
}   // kraj reagujNaKlik
