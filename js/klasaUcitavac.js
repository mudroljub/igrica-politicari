
function Ucitavac() {

    var ovaj_ucitavac = this
    var sve_slike = 0;
    var ucitane_slike = 0;


    this.ucitajSlike = function(slike, povratnaRadnja){     // obično posle pušta uvod
        var nazivi_grupa = Object.keys(slike)
        var ukupno_grupa = Object.keys(slike).length
		sve_slike = ovaj_ucitavac.ukupnoSlika(slike)

        for(var i=0; i < ukupno_grupa; i++) {
            var naziv_grupe = nazivi_grupa[i];
            var ova_grupa = slike[naziv_grupe];
            
            for(var ime_slike in ova_grupa){
                var ova_slika = new Image()
                ova_slika.onload = ovaj_ucitavac.proveriUcitano(povratnaRadnja);
                ova_slika.src = ova_grupa[ime_slike]
            } // kraj for in
        }	// kraj for
    }	// kraj ucitajSlike


	this.ukupnoSlika = function(slike){
		var sve_slike = 0;
		for(var grupa in slike) {
			for(var slika in slike[grupa]) {
				sve_slike++
			}
		}
		return sve_slike;
	}


    this.proveriUcitano = function(povratnaRadnja){
        ucitane_slike++;
        if(ucitane_slike >= sve_slike) {
            povratnaRadnja();
        }
    }	// proveriUcitano


    this.praviKaraktere = function (likovi, scena, vreme){
        for (var lik in likovi){
            window[lik] = new Karakter(lik, likovi[lik], scena, vreme);
            scena.karakteri.push(window[lik]);
        }   // kraj for
    }   // kraj praviKaraktere()


}   // kraj Ucitavac


