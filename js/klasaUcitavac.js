// napraviti

function Ucitavac() {



}


function praviKaraktere(likovi){
    for (var ovaj_lik in likovi){
        window[ovaj_lik] = new Karakter(likovi[ovaj_lik], nivo1);
        karakteri.push(window[ovaj_lik]);
    }   // kraj for
}   // kraj praviKaraktere()


