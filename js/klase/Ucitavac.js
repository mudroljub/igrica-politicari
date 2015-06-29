// prilagodiPozadinu, uzeti u obzir sire i tanje ekrane

function Ucitavac(slike) {
	
    this.sve_slike = 0;
    this.ucitane_slike = 0;
	this.prilagodjena_visina = 0;
	
}   // kraj Ucitavac


Ucitavac.prototype.ucitajSlike = function(slike, povratnaRadnja){     // povratno pušta uvod
    var nazivi_grupa = Object.keys(slike)
    var ukupno_grupa = Object.keys(slike).length
    this.sve_slike = this.ukupnoSlika(slike)

    for(var i=0; i < ukupno_grupa; i++) {
        var naziv_grupe = nazivi_grupa[i];
        var ova_grupa = slike[naziv_grupe];
        for(var ime_slike in ova_grupa){
			window[ime_slike + "_slika"] = new Image()
			window[ime_slike + "_slika"].onload  = this.kadUcitasPusti(povratnaRadnja);
			window[ime_slike + "_slika"].src = ova_grupa[ime_slike]
        } // kraj for in
    }	// kraj for
}	// ucitajSlike

Ucitavac.prototype.ukupnoSlika = function(slike){
    var ukupno = 0;
    for(var grupa in slike) {
        for(var slika in slike[grupa]) {
            ukupno++
        }
    }
    return ukupno;
}   // ukupnoSlika

Ucitavac.prototype.kadUcitasPusti = function(povratnaRadnja){
    this.ucitane_slike++;
    if(this.ucitane_slike >= this.sve_slike) {
		var slika_pozadine = this.dajPrvuPozadinu();
		this.prilagodjena_visina = this.prilagodiPozadinu(slika_pozadine); 
        povratnaRadnja();
    }
}	// kadUcitasPusti

Ucitavac.prototype.prilagodiPozadinu  = function(slika_pozadine){
	return (window.innerWidth / slika_pozadine.width) * slika_pozadine.height; 
}	// prilagodiPozadinu

Ucitavac.prototype.dajPrvuPozadinu  = function(){
	var nazivi_grupa = Object.keys(slike);
	var kljuc_pozadine = nazivi_grupa[0];
	var pozadina_objekt = slike[kljuc_pozadine];
	var sve_pozadine = Object.keys(pozadina_objekt);
	var prva_pozadina = sve_pozadine[0];
	var prva_pozadina_slika = window[prva_pozadina + "_slika"];	
	return prva_pozadina_slika;
}	// dajPrvuPozadinu