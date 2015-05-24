
function Ucitavac() {

    
    this.ucitajSlike = function(slike, povratnaRadnja){     // nakon učitavanja obično pušta uvod
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


    this.praviKaraktere = function (likovi, scena, vreme){
        for (var lik in likovi){
            window[lik] = new Karakter(lik, likovi[lik], scena, vreme);
            scena.karakteri.push(window[lik]);
        }   // kraj for
    }   // kraj praviKaraktere()


}   // kraj Ucitavac


