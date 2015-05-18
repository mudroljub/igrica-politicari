/*****************************************************************
    IDEJE:
// da ne izlaze uvek, nego da malo sacekaju
// da menjaju sliku na pogodak
// da nasumicno ispustaju parole
// lokalni i globalni hajskor
// grafiti na skupstini vucicu pederu
// paradajz pogadja
// uvodna animacija uvecavanje skupstina

    PROBLEMI:
// klikom detektuje karaktera i kad nije nacrtan. dodati uslov if nacrtan. 
// pozadina se crta prilagodjeno, a delove crta neprilagodjeno
// resenje: napraviti jedinstveno prilagodjavanje
// kad je presirok ekran, sece pozadinu po visini !
// na manjim ekranima prilagoditi slova (ide_uvod i kraj)
********************************************************************/


/*************** PODEŠAVANJA ***************/

var postavke_prozora = [4, 1.53, 5.9, 2.2, 1.35];
/******************************************************************
0. broj kojim se deli visina pozadine da dobijes gornju osu prozora
1. broj kojim se deli visina pozadine da dobijes donju osu prozora
2. broj kojim se deli sirina pozadine da dobijes prvi red prozora
3. broj kojim se deli sirina pozadine da dobijes drugi red prozora
4. broj kojim se deli sirina pozadine da dobijes trecí red prozora
skupstina ima dva reda prozora uspravno i tri vodoravno
*******************************************************************/

var likovi_za_ucitavanje = { // nazivi bitni, od njih pravi objekte
    vulin: 'slike/vulin.png',
    toma: 'slike/toma.png',
    dacic: 'slike/dacic.png'
}


/*************** LOGIKA IGRE ***************/

var scena = new Scena('platno', 'slike/skupstina2.png');
$("#platno").addEventListener('click', scena.reagujNaKlik);
scena.ucitajSlike(likovi_za_ucitavanje, scena.pustiUvod);


/*************** GLAVNE FUNKCIJE ***************/

function postaviScenu(){
    scena.izracunajPozicije(postavke_prozora);
    scena.praviLikove(likovi_za_ucitavanje);   	// pravi objekte od niza likova
    dacic.poruka = "Jaoj";			// dodaje jedinstvene poruke
    vulin.poruka = "To boli!";
    toma.poruka = "Evropa nema alternativu!";
	scena.animacija_igre = requestAnimationFrame(azuriraj); // krace igra
}


function azuriraj(){
    // ovo izvrsava na svaki frejm
    if(scena.igranje){
		dacic.igraj(30);
		vulin.igraj(20);
		toma.igraj(10);
        scena.crtajSlike();
        scena.pisiPoruke();
        scena.pisiPoene();
        scena.proveriKraj();

		// ovo izvrsava svake sekunde
        if(scena.vreme_poredjenje != new Date().getSeconds()) {
            scena.prestaniPoruke();
            scena.dodeliPozicije(scena.likovi);
            scena.vreme_igre--;
            scena.vreme_poredjenje = new Date().getSeconds();
        }	// kraj svaki sekund
		
        scena.animacija_igre = requestAnimationFrame(azuriraj);
    }	// kraj svaki frejm
}
