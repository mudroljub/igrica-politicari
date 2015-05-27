// izdojiti klasu Politicar iz Karaktera
// specificnost bacaParole

function Karakter(ime, slika_src, scena, vreme){
    this.ime = ime.VelikoSlovo();
	this.slika = new Image();
    this.slika.src = slika_src;

    this.STANDARDNA_VISINA = 118;
    this.slika = _prilagodiSliku(this, this.slika);
    this.sirina = this.slika.width;
    this.visina = this.slika.height;
    this.x = 0;         // dodeljuje slucajnaPozicija
    this.y = 0;
	this.zapamcen_y = 0;

    this.igranje = false;
    this.kukanje = false;
    this.spustanje = false;
    this.spustenost = 50;


	/*************** FUNKCIJE ***************/

	this.igraj = function(trenutak_ulaska) {
		if(vreme.preostalo <= trenutak_ulaska) {
		this.igranje = true;
		}
	}	// kraj igraj

    this.slucajnaPozicija = function(pozicije) {
		var slucajno = Math.floor (Math.random() * pozicije.length);		
        this.x = pozicije[slucajno][0];
        this.y = pozicije[slucajno][1];
    }   // kraj slucajnaPozicija

    this.crtaj = function() {
        scena.sadrzaj.drawImage(this.slika, this.x, this.y, this.sirina, this.visina);
    }   // kraj crtaj

    this.sudar = function(karakter){
        if(this.x == karakter.x && this.y == karakter.y){
            return true;
        } else return false;
    }   // kraj sudar

    this.proveriSveSudare = function (karakteri) {
        var sudari = false;        
        for (var i = 0; i < karakteri.length; i++) {
			if( i == karakteri.indexOf(this) ) continue;		// preskoci sebe
            sudari = sudari || this.sudar(karakteri[i]);
        }  // kraj petlje
		return sudari;
    }   // kraj proveriSveSudare

    this.nadjiSlobodnoMesto = function (karakteri) {
        this.slucajnaPozicija(scena.pozicije);
        while ( this.proveriSveSudare(karakteri) ) {
            this.slucajnaPozicija(scena.pozicije);
        }
    }   // kraj naSlobodnomCrtaj

    this.kuka = function(mish){
        var kuknjava = this.kuknjava || "Jaoj, to boli!";
        scena.sadrzaj.font = "30px Verdana";
        scena.sadrzaj.lineWidth = 1;
        scena.sadrzaj.fillText(kuknjava, mish.x+30, mish.y, 250);           // poslednji argument je maksimalna shirina teksta
        scena.sadrzaj.strokeText(kuknjava, mish.x+30, mish.y, 250);
    }   // kraj kuka

	this.bacaParole = function(){
        var parola = this.parola || "Mi branimo srpski narod!";
		// bacaParole koje ti skidaju energiju
    }   // kraj bacaParole


    // this.y se resetuje, spustenost se ne resetuje !
	// zapamtiti prethodni_y izvan funkcije
	// this.y = zapamcen_y + spustenost
	// pamti novi prilikom svake dodele pozicije

    this.goreDole = function(){
        kazi(this.spustenost)

        if(this.spustenost >= 50) {
            this.spustanje = false;
        }

        if (this.spustenost <= 0) {
            this.spustanje = true;
        }

        if(this.spustanje){
            this.spustenost++
        } else {
            this.spustenost--;
        }
		
		this.y = this.zapamcen_y + this.spustenost
		
        //this.y += this.spustenost;
        //this.spustanje ? this.y++ : this.y--;

    }

    this.jelNapustio = function(scena){
        // da li je ovaj_lik jos u sceni
		// ako je napustio, radi nesto, unistava ga, pamti
    }

    function _prilagodiSliku(ovaj_karakter, slika){
        // prilagodjava sliku standardnoj visini slike
        var nova_sirina = slika.width / (slika.height / ovaj_karakter.STANDARDNA_VISINA);
        var nova_visina = ovaj_karakter.STANDARDNA_VISINA;
        // prilagodjava sliku ovom ekranu
        slika.width = nova_sirina * (window.innerWidth / scena.STANDARDNA_SIRINA);
        slika.height = nova_visina * (window.innerWidth / scena.STANDARDNA_SIRINA);
        return slika;
    }


}   // kraj Karakter
