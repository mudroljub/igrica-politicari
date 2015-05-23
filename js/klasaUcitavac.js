
function Ucitavac() {

    
    this.ucitajSlike = function(slike, povratnaRadnja){
        var brojSlika = Object.keys(slike).length;
        var ucitaneSlike = 0;
        for (var kljuc in slike) {
            var ova_slika = new Image();
            ova_slika.onload = function kadSveUcita() {
                ucitaneSlike++;
                if (ucitaneSlike >= brojSlika) {
                    povratnaRadnja();
                }
            };  // kraj kadSveUcita()
            ova_slika.src = slike[kljuc];
        }	// kraj for
    }	// kraj ucitajSlike


}   // kraj Ucitavac


