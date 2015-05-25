
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
function ucitajSlike (slike, povratnoUvod){   // povratno pušta uvod
    var nazivi_grupa = Object.keys(slike);
	var broj_grupa = Object.keys(slike).length;

	ucitajPozadinu(slike.pozadina, proveriUcitano)	// proveriUcitano
	
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
				proveriUcitano(povratnoUvod);
			} // kraj kadUcitaSliku
			ova_slika.src = likovi[ime_lika]	
		} // kraj for in
	}	// kraj for < broj_grupa
}	// kraj ucitajSlike

function proveriUcitano(povratnoUvod){
	kazi("sve_slike: " + sve_slike)
	kazi("ucitaneSlike: " + ucitaneSlike)
	if(ucitaneSlike >= sve_slike) {
		povratnoUvod();
	}	
}	// proveriUcitano

function ucitajPozadinu(izvor_pozadine, jelSveUcitano){
	sve_slike++;
	var pozadina = new Image();
	pozadina.onload = function kadUcita() {
		ucitaneSlike++;
		jelSveUcitano();
	};
	pozadina.src = izvor_pozadine;		
}

function jelSveUcitano(povratnoUvod){		// povratno da pusti uvod
	if(ucitaneSlike >= sve_slike) {
		povratnoUvod();
	}	
}	// kraj jelSveUcitano
