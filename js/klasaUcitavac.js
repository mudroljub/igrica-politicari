
function Ucitavac() {

    var ovaj_ucitavac = this
    var sve_slike = 0;
    var ucitane_slike = 0;


    this.ucitajSlike = function(slike, povratnaRadnja){     // nakon učitavanja obično pušta uvod
        var nazivi_grupa = Object.keys(slike)
        var ukupno_grupa = Object.keys(slike).length

        for(var i=0; i < ukupno_grupa; i++) {
            var naziv_grupe = nazivi_grupa[i];
            var ova_grupa = slike[naziv_grupe];
            var broj_slika_u_grupi = Object.keys(ova_grupa).length;
            sve_slike += broj_slika_u_grupi

            for(var ime_slike in ova_grupa){
                var ova_slika = new Image()
                ova_slika.onload = function kadUcitaSliku (){
                    ovaj_ucitavac.proveriUcitano(povratnaRadnja);
                } 
                ova_slika.src = ova_grupa[ime_slike]
            } // kraj for in
        }	// kraj for
    }	// kraj ucitajSlike


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


