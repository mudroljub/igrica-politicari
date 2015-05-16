// napraviti

function Ucitavac() {



}


function ucitajSlike(likovi, povratnaRadnja) {
    var ucitaneSlike = 0;
    for (var ovaj_lik in likovi) {
        var ova_slika = new Image();                     // pravi globalnu varijablu sa nazivom slike !
        ova_slika.onload = function kadSveUcita() {
            ucitaneSlike++;
            if (ucitaneSlike >= brojSlika) {
                povratnaRadnja();
            }
        };  // kraj kadSveUcita()
        ova_slika.src = likovi[ovaj_lik];
    }
}


function praviKaraktere(likovi){
    for (var ovaj_lik in likovi){
        window[ovaj_lik] = new Karakter(likovi[ovaj_lik], nivo1);
        karakteri.push(window[ovaj_lik]);
    }   // kraj for
}   // kraj praviKaraktere()


