
function Karakter(ime, slika_src, scena, vreme){
    this.ime = ime.VelikoSlovo();
	this.slika = new Image();
    this.slika.src = slika_src;

    this.STANDARDNA_VISINA = 118;
    this.slika = _prilagodiSliku(this, this.slika);
    this.sirina = this.slika.width;
    this.visina = this.slika.height;

    this.igram = false;
    this.vicem = false;
    this.spustam = false;
    this.spusten = 0;


	/*************** FUNKCIJE ***************/

	this.igraj = function(trenutak_ulaska) {
		if(vreme.preostalo <= trenutak_ulaska) {
		this.igram = true;
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

    /* uzima slucajnu poziciju, ako je zauzeta, uporno trazi slobodnu */
    this.nadjiSlobodnoMesto = function (karakteri) {
        this.slucajnaPozicija(scena.pozicije);
        while ( this.proveriSveSudare(karakteri) ) {
            this.slucajnaPozicija(scena.pozicije);
        }
    }   // kraj naSlobodnomCrtaj

    this.ispisiPoruku = function(){
        var poruka = this.poruka || "Jaoj";
        scena.sadrzaj.font = "30px Verdana";
        scena.sadrzaj.lineWidth = 1;
        scena.sadrzaj.fillText(poruka, scena.misX+30, scena.misY, 250);           // poslednji argument je maksimalna shirina teksta
        scena.sadrzaj.strokeText(poruka, scena.misX+30, scena.misY, 250);
    }   // ispisiPoruku

    // varijable sceni!
    this.proveriPogodak = function (){
        if( (scena.misX > this.x && scena.misX < this.x + this.sirina) && (scena.misY > this.y && scena.misY < this.y + this.visina) ){
            this.vicem = true;
            scena.poeni++;
        }
    }   // proveriPogodak

    this.goreDole = function(){
        // lagano se spusta i dize
        if(this.spusten >= 100) {
            this.spustam = true;
        } else if (this.spusten <= 0) {
            this.spustam = false;
        }
        this.spustam ? this.spusten-- : this.spusten++;
    }

    this.jelNapustio = function(scena){
        // da li je ovaj_lik jos u sceni
		// ako je napustio, radi nesto, unistava ga, pamti
    }

    function _prilagodiSliku(ovaj_karakter, slika){
        // prilagodjava sliku standardnoj velicini slike
        var nova_sirina = slika.width / (slika.height / ovaj_karakter.STANDARDNA_VISINA);
        var nova_visina = ovaj_karakter.STANDARDNA_VISINA;
        // prilagodjava sliku ovom ekranu
        slika.width = nova_sirina * (window.innerWidth / scena.STANDARDNA_SIRINA);
        slika.height = nova_visina * (window.innerWidth / scena.STANDARDNA_SIRINA);
        return slika;
    }


}   // kraj Karakter
