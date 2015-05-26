
function Ucitavac() {

    var ovaj_ucitavac = this
    var sve_slike = 0;
    var ucitane_slike = 0;

    this.ucitajSlike = function(slike, povratnaRadnja){     // nakon učitavanja obično pušta uvod
        var glavni_kljucevi = Object.keys(slike)
        var ukupno_kljuceva = Object.keys(slike).length

        for(var i=0; i < ukupno_kljuceva; i++) {
            var grupe_slika = glavni_kljucevi[i];
            var ova_grupa = slike[grupe_slika];
            var slika_u_grupi = Object.keys(ova_grupa).length;
            sve_slike += slika_u_grupi

            for(var ime_slike in ova_grupa){
                var ova_slika = new Image()
                ova_slika.onload = function kadUcitaSliku (){
                    ovaj_ucitavac.proveriUcitano(povratnaRadnja);
                } // kraj kadUcitaSliku
                ova_slika.src = ova_grupa[ime_slike]
            } // kraj for in
        }	// kraj for
    }	// kraj ucitajSlike

    this.proveriUcitano = function(povratnaRadnja){
        ucitane_slike++;
        kazi("ucitane_slike: " + ucitane_slike)
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


