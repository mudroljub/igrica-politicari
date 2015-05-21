
function Karakter(ime, slika_src, scena, vreme){
    this.ime = ime.prvoSlovo();
    this.scena = scena;
    this.sadrzaj = scena.sadrzaj;
	this.slika = new Image();
    this.slika.src = slika_src;

    this.STANDARDNA_VISINA = 118;
    prilagodiSliku(this, this.slika);
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

    /* uzima slucajne koordinate i pripisuje sebi */
    this.slucajnaPozicija = function() {
        this.x = scena.slucajniProzor()[0];
        this.y = scena.slucajniProzor()[1];
    }   // kraj slucajnaPozicija


    this.goreDole = function(){
        // lagano se spusta i dize
        if(this.spusten >= 100) {
            this.spustam = true;
        } else if (this.spusten <= 0) {
            this.spustam = false;
        }
        this.spustam ? this.spusten-- : this.spusten++;
    }


    /* crta sebe na trenutnim koordinatama */
    this.crtaj = function() {
        this.sadrzaj.drawImage(this.slika, this.x, this.y, this.sirina, this.visina);
    }   // kraj crtaj


    /* proverava jel drugi karakter zauzeo njegovu poziciju */
    this.jelDrugiZauzeo = function(drugi_karakter){
        if(this.x == drugi_karakter.x && this.y == drugi_karakter.y){
            return true;
        } else return false;
    }   // kraj jelDrugiZauzeo


    /* prima niz likova, proverava dal su zauzeli njegovu poziciju, vraca jel slobodna */
    this.jelOvoSlobodno = function (ostali) {
        var slobodno = true;
        var izbaci_me = ostali.indexOf(this);       // traži sebe
        ostali.splice(izbaci_me, 1);                // izbacuje sebe
        // ide redom kroz ostale i proverava sudar
        for (var i = 0; i < ostali.length; i++) {
            slobodno = slobodno & !this.jelDrugiZauzeo(ostali[i]);
        }
        ostali.push(this);                          // vraca sebe
        return slobodno;
    }   // kraj jelOvoSlobodno


    /* uzima slucajnu poziciju, ako je zauzeta, uporno trazi slobodnu */
    this.nadjiSlobodnuPoziciju = function (ostali) {
        this.slucajnaPozicija();
        while ( !this.jelOvoSlobodno(ostali) ) {
            this.slucajnaPozicija();
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

	
    this.jelNapustio = function(scena){
        // da li je ovaj_lik jos u sceni
		// ako je napustio, radi nesto, unistava ga, pamti
    }


    function prilagodiSliku(ovaj_karakter, slika){
        // prilagodjava sliku standardnoj velicini slike
        var nova_sirina = slika.width / (slika.height / ovaj_karakter.STANDARDNA_VISINA);
        var nova_visina = ovaj_karakter.STANDARDNA_VISINA;
        // prilagodjava sliku ovom ekranu
        slika.width = nova_sirina * (window.innerWidth / scena.STANDARDNA_SIRINA);
        slika.height = nova_visina * (window.innerWidth / scena.STANDARDNA_SIRINA);
        return slika;
    }

}   // kraj Karakter
