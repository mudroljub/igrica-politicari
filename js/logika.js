/*****************************************************************
    IDEJE:
* tri paradajza random pogađaju unutar kruga
* menjanje oruzja
* indikator ucitavanja, da ne moze da pocne pre nego ucita
* srediti proveru sudara, sada se oslanja samo na jednu tacku! 
* napraviti energiju od mase 
* praviti predmete
* uvodna animacija uvecavanje skupstina
* politicari nasumicno ispustaju parole

    PROBLEMI:
* prvi paradajz ne treba da puca
* da ne crta dva paradajza na istom (crtaParadajzOkolo)
* da crtaParadajzNaLiku ne napusta prozor
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

// mozda smesiti u azuriraj
function mishSeMrda(event){
	mish.azuriraPoziciju(event)
}

/*************** GLAVNE FUNKCIJE ***************/

function postaviScenu(){
	platno.style.cursor = 'none';
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
		scena.crtajPozadinu();
		dacic.igraj(vreme, 30);
		vulin.igraj(vreme, 20);
		toma.igraj(vreme, 10);
				
		for(var i=0; i < karakteri.length; i++) {
			mish.crtaParadajzOkolo(karakteri[i]);

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
		} // kraj for karakteri

		mish.crtaKrug()
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
