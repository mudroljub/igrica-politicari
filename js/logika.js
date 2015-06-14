/*****************************************************************
    IDEJE:
* da menjaju sliku na pogodak
* da nasumicno ispustaju parole
* grafiti na skupstini vucicu pederu
* paradajz pogadja
* uvodna animacija uvecavanje skupstina
* napraviti energiju od mase 

    PROBLEMI:
* pogadja ga i kad je na pauzi
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
var automat = new Automat(scena);                   // obavlja masovne radnje
var uvod = new Uvod(scena);
var kraj = new Kraj(scena);

ucitavac.ucitajSlike(slike, uvod.pusti);
scena.platno.addEventListener('click', reagujNaKlik);


/*************** GLAVNE FUNKCIJE ***************/

function postaviScenu(){
    scena.praviProzore(parametri_prozora);
    automat.praviKaraktere(slike.likovi, scena, vreme); 
    dacic.jauk = "Jaoj";
    vulin.jauk = "To boli!";
    toma.jauk = "Evropa nema alternativu!";
	scena.animacija = requestAnimationFrame(azuriraj); // krace igra
}   // kraj postaviScenu


function azuriraj(){
	var karakteri = scena.karakteri;

    // izvrsava svakih 16.6 milisekundi (60 herca/sekund)
    if(scena.ide){
		dacic.igraj(30);
		vulin.igraj(20);
		toma.igraj(10);
		scena.sadrzaj.drawImage(scena.pozadina, 0, 0, scena.sirina, scena.pozadina.nova_visina);
				
		for(var i=0; i < karakteri.length; i++) {
			if(karakteri[i].igra) {	

				if(karakteri[i].niIzlazNiPauza()){
					karakteri[i].nadjiSlobodnoMesto(karakteri);	
					karakteri[i].odrediIzlazak(vreme);				
				}
				if(karakteri[i].izlaz) {
					karakteri[i].dalProlaziIzlaz(vreme);
				}
				if(karakteri[i].niIzlazNiPauza()){
					karakteri[i].odrediPauzu(vreme);
				}
				if(karakteri[i].pauza){
					karakteri[i].dalProlaziPauza(vreme);					
				}
				if(karakteri[i].izlaz){
					karakteri[i].crtajMrdanje();
				}
				if(mish.naKarakteru(karakteri[i])) {
					karakteri[i].crtaKukanje(mish);
				}
				
			} // kraj ako karakter igra
		} // kraj petlje karaktera
		
        // nakon odrediIzlazak
        //automat.postavljaMrdanje(scena.karakteri);			
		//automat.azuriraMrdanje(scena.karakteri);
        //automat.zaustavljaMrdanje(scena.karakteri);
		
        scena.prikazujePoene(vreme);
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
		for(var i=0; i < scena.karakteri.length; i++){
			if(scena.karakteri[i].igra && scena.karakteri[i].izlaz) { 
				mish.proveriPogodak(scena, scena.karakteri[i]);
			}
		}
	}	// kraj ako igra
}   // kraj reagujNaKlik
