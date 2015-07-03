// prilagodiPozadinu, uzeti u obzir sire i tanje ekrane

function Ucitavac(slike) {
    this.ucitane_slike = 0;	
	this.sve_slike = this.ukupnoSlika(slike)
	this.sirinaUcitavaca = window.innerWidth / 2;
	this.sirinaPodeoka = this.sirinaUcitavaca / this.sve_slike;	
}   // kraj Ucitavac


Ucitavac.prototype.ukupnoSlika = function(slike){
    var ukupno = 0;
    for(var grupa in slike) {
        for(var slika in slike[grupa]) {
            ukupno++
        }
    }
    return ukupno;
}   // ukupnoSlika

Ucitavac.prototype.ucitajSlike = function(slike, povratnaRadnja){     // povratno pušta uvod
    var nazivi_grupa = Object.keys(slike)
    var ukupno_grupa = Object.keys(slike).length

    for(var i=0; i < ukupno_grupa; i++) {
        var naziv_grupe = nazivi_grupa[i];
        var ova_grupa = slike[naziv_grupe];
        for(var ime_slike in ova_grupa){
			window[ime_slike + "_slika"] = new Image()
			window[ime_slike + "_slika"].onload  = this.proveriUcitano(ime_slike, povratnaRadnja);
			//window[ime_slike + "_slika"].onerror = this.javiGresku(ime_slike);
			window[ime_slike + "_slika"].src = ova_grupa[ime_slike]
        } // kraj for in
    }	// kraj for
}	// ucitajSlike

Ucitavac.prototype.proveriUcitano = function(ime_slike, povratnaRadnja){
    this.ucitane_slike++;
	this.crtajProgres(this.sve_slike, this.ucitane_slike)	
    if(this.ucitane_slike >= this.sve_slike) {
        povratnaRadnja();
    }
}	// proveriUcitano

Ucitavac.prototype.crtajProgres = function(sve_slike, ucitane_slike) {
	var platno = document.getElementById("platno");
	var sadrzaj = platno.getContext("2d");
	sadrzaj.fillStyle="#FF0000";
	sadrzaj.fillRect(
		window.innerWidth / 4, 
		window.innerHeight / 4, 
		this.sirinaPodeoka * ucitane_slike, 
		20); 		
}

Ucitavac.prototype.nadjiPozadinu  = function(){
	var nazivi_grupa = Object.keys(slike);
	var kljuc_pozadine = nazivi_grupa[0];
	var pozadina_objekt = slike[kljuc_pozadine];
	var sve_pozadine = Object.keys(pozadina_objekt);
	var prva_pozadina = sve_pozadine[0];
	var prva_pozadina_slika = window[prva_pozadina + "_slika"];	
	return prva_pozadina_slika;
}	// nadjiPozadinu

Ucitavac.prototype.javiGresku = function(ime_slike){
	console.log("Slika " + ime_slike + " je slomljena.")
}