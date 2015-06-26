// mozda dodati praviKaraktere i praviPredmete
// napraviti vizuelizaciju ucitavanja

function Ucitavac() {
    this.sve_slike = 0;
    this.ucitane_slike = 0;
}   // kraj Ucitavac


Ucitavac.prototype.ucitajSlike = function(slike, povratnaRadnja){     // povratno pušta uvod
    var nazivi_grupa = Object.keys(slike)
    var ukupno_grupa = Object.keys(slike).length
    this.sve_slike = this.ukupnoSlika(slike)

    for(var i=0; i < ukupno_grupa; i++) {
        var naziv_grupe = nazivi_grupa[i];
        var ova_grupa = slike[naziv_grupe];
        for(var ime_slike in ova_grupa){
            var ova_slika = new Image()
            ova_slika.onload = this.proveriUcitano(povratnaRadnja);
            ova_slika.src = ova_grupa[ime_slike]
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

Ucitavac.prototype.proveriUcitano = function(povratnaRadnja){
    this.ucitane_slike++;
    if(this.ucitane_slike >= this.sve_slike) {
        povratnaRadnja();
    }
}	// proveriUcitano
