
/******	PODACI  *******/
var slike = {
    pozadina: 'slike/skupstina2.png',
    naziv_grupe: {      // nazivi bitni, od njih pravi objekte!
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

var sve_slike = 0
var ucitaneSlike = 0;


/******	POZIVI *******/
ucitajSlike(slike, function(){kazi("Sve učitano.")});


/******	FUNKCIJE  *******/
function ucitajSlike (slike, povratnaRadnja){   // povratno pušta uvod
    var nazivi_grupa = Object.keys(slike);
	var broj_grupa = Object.keys(slike).length;

	sve_slike++;
	// ucitajPozadinu(slike.pozadina, proveriUcitano)
	ucitaneSlike++;
	
	for(var i=1; i < broj_grupa; i++) { 
		var naziv_grupe = nazivi_grupa[i];
		var likovi = slike[naziv_grupe];
		var imena_likova = Object.keys(likovi);
		var broj_likova = Object.keys(likovi).length;
		sve_slike = sve_slike + broj_likova
		
		for(var ime_lika in likovi){
			var ova_slika = new Image()
			ova_slika.onload = function kadUcitaSliku (){
				ucitaneSlike++;
				proveriUcitano(povratnaRadnja);
			} // kraj kadUcitaSliku
			ova_slika.src = likovi[ime_lika]	
		} // kraj for in
	}	// kraj for < broj_grupa
}	// kraj ucitajSlike

function proveriUcitano(povratnaRadnja){
	if(ucitaneSlike >= sve_slike) {
		kazi("ucitaneSlike: "+ucitaneSlike)
		povratnaRadnja();
	}	
}	// proveriUcitano
				
function ucitajPozadinu(izvor_pozadine, povratnaRadnja){
	sve_slike++;
	var pozadina = new Image();
	pozadina.onload = function kadUcita() {
		ucitaneSlike++;
		povratnaRadnja();
	};
	pozadina.src = izvor_pozadine;		
}

function jelSveUcitano(povratnaRadnja){	// povratno da pusti uvod
	if(ucitaneSlike >= sve_slike) {
		povratnaRadnja();
	}	
}	// kraj jelSveUcitano
