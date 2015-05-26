
/******	PODACI  *******/
// po nazivima pravi objekte, pozadina mora pozadina
var slike = {
    pozadina: {
		skupstina: 'slike/skupstina2.png'
	},
    ova_grupa: {      
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
var ucitane_slike = 0;


/******	POZIVI *******/
ucitajSlike(slike, pustiUvod);


/******	FUNKCIJE  *******/
function ucitajSlike (slike, povratnaRadnja){ 	// pustiUvod
    var glavni_kljucevi = Object.keys(slike)
	var ukupno_grupa = Object.keys(slike).length

	for(var i=0; i < ukupno_grupa; i++) { 
		var grupe_slika = glavni_kljucevi[i];
		var ova_grupa = slike[grupe_slika];
		var slika_u_grupi = Object.keys(ova_grupa).length;
		sve_slike += slika_u_grupi

		for(var ime_slike in ova_grupa){
			var ova_slika = new Image()
			ova_slika.onload = function kadUcitaSliku (){
				proveriUcitano(povratnaRadnja);
			} // kraj kadUcitaSliku
			ova_slika.src = ova_grupa[ime_slike]	
		} // kraj for in
	}	// kraj for 
	
}	// kraj ucitajSlike

function proveriUcitano(povratnaRadnja){
	ucitane_slike++;
	kazi("ucitane_slike: " + ucitane_slike)
	if(ucitane_slike >= sve_slike) {
		povratnaRadnja();
	}	
}	// proveriUcitano

function pustiUvod(){
	kazi("Pusten uvod.")
}