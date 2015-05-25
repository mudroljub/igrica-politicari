
/******	PODACI  *******/
// po nazivima pravi objekte, pozadina mora pozadina
var slike = {
    pozadina: 'slike/skupstina2.png',
    ova_grupa_slika: {      
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
ucitajSlike(slike, pustiUvod);


/******	FUNKCIJE  *******/
function ucitajSlike (slike, povratnaRadnja){ 	// pustiUvod
    var glavni_kljucevi = Object.keys(slike)
	var broj_grupa_slika = Object.keys(slike).length
	ucitajPozadinu(slike.pozadina, proveriUcitano) // zameniti varijablu indexom

	for(var i=1; i < broj_grupa_slika; i++) { 
		var grupe_slika = glavni_kljucevi[i];
		var ova_grupa_slika = slike[grupe_slika];
		var broj_ovih_slika = Object.keys(ova_grupa_slika).length;
		sve_slike += broj_ovih_slika

		for(var ime_slike in ova_grupa_slika){
			var ova_slika = new Image()
			ova_slika.onload = function kadUcitaSliku (){
				ucitaneSlike++;
				proveriUcitano(povratnaRadnja);
			} // kraj kadUcitaSliku
			ova_slika.src = ova_grupa_slika[ime_slike]	
		} // kraj for in
	}	// kraj for 
}	// kraj ucitajSlike

function ucitajPozadinu(izvor_pozadine, proveriUcitano){
	sve_slike++;
	var pozadina = new Image();
	pozadina.onload = function kadUcita() {
		ucitaneSlike++;
		proveriUcitano();
	};
	pozadina.src = izvor_pozadine;		
}

function proveriUcitano(povratnaRadnja){
	kazi("ucitaneSlike: " + ucitaneSlike)
	if(ucitaneSlike >= sve_slike) {
		povratnaRadnja();
	}	
}	// proveriUcitano

function pustiUvod(){
	kazi("Pusten uvod.")
}