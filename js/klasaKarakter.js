
function proveriPogodak(ovaj_lik){
    if( (misX > ovaj_lik.x && misX < ovaj_lik.x + ovaj_lik.sirina) && (misY > ovaj_lik.y && misY < ovaj_lik.y + ovaj_lik.visina) ){
        ovaj_lik.ostavlja_poruku = true;
        poeni++;
    }
}


function ispisiPoruku(ovaj_lik){
    var poruka = ovaj_lik.poruka || "Jaoj";
    scena.sadrzaj.font = "30px Verdana";
    scena.sadrzaj.lineWidth = 1;
    scena.sadrzaj.fillText(poruka, misX+30, misY, 250);           // poslednji argument je maksimalna shirina teksta
    scena.sadrzaj.strokeText(poruka, misX+30, misY, 250);
}


/* prima sliku i scenu, pravi novog lika */
function Karakter(slika_src, scena){
	//this.scena = scena; 
    this.uveden_u_igru = false;
    this.ostavlja_poruku = false;
    this.spust = 0;
    this.spustanje = false;

    /*
     // prepisano iz simple game, upotrebiti!
     this.visinaSveta = parseInt(this.platno.height);
     this.sirinaSveta = parseInt(this.platno.width);
     */
    
    this.platno = scena.platno;
    this.sadrzaj = scena.sadrzaj;
    // prepraviti da ide preko scene
    //this.platno = scena.platno;
    //this.sadrzaj = this.platno.getContext("2d");

    this.slika = new Image();
    this.slika.src = slika_src;
    // prilagodjava sliku bazicnoj velicini slike
    this.slika.width = this.slika.width / (this.slika.height / BAZICNA_VISINA_SLIKE);
    this.slika.height = BAZICNA_VISINA_SLIKE;
    // prilagodjava sliku trenutnom ekranu
    this.slika.width = this.slika.width * (window.innerWidth/BAZICNA_SIRINA_EKRANA);
    this.slika.height = this.slika.height * (window.innerWidth/BAZICNA_SIRINA_EKRANA);

    // prima visinu i sirinu od svoje slike
    this.sirina = this.slika.width;
    this.visina = this.slika.height;

    /* uzima slucajne koordinate i pripisuje sebi */
    this.slucajnaPozicija = function() {
        this.x = scena.slucajniProzor()[0];
        this.y = scena.slucajniProzor()[1];
    }   // slucajnaPozicija


    this.goreDole = function(){
        // lagano se spusta i dize
        if(this.spust >= 100) {
            this.spustanje = true;
        } else if (this.spust <= 0) {
            this.spustanje = false;
        }
        this.spustanje ? this.spust-- : this.spust++;
    }

    /* crta sebe na trenutnim ili zadatim koordinatama */
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
        var index = ostali.indexOf(this);
        ostali.splice(index, 1);    // izbacuje sebe

        var slobodno = true;
        // ide redom kroz ostale i proverava sudar
        for (var i = 0; i < ostali.length; i++) {
            slobodno = slobodno & !this.jelDrugiZauzeo(ostali[i]);
        }
        ostali.push(this);          // vraca sebe
        return slobodno;
    }   // kraj jelOvoSlobodno


    /* uzima slucajnu poziciju, ako je zauzeta, uporno trazi slobodnu */
    this.nadjiSlobodnuPoziciju = function (ostali) {
        this.slucajnaPozicija();
        while ( !this.jelOvoSlobodno(ostali) ) {
            this.slucajnaPozicija();
        }
    }   // kraj naSlobodnomCrtaj

}   // kraj klase Karakter

