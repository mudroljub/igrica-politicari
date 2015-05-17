
/* prima sliku i scenu, pravi novog lika */
function Karakter(slika_src, scena){
    this.uveden_u_igru = false;
    this.ostaviti_poruku = false;
    this.spustanje = false;
    this.spust = 0;

    this.scena = scena;
    this.platno = scena.platno;
    this.sadrzaj = scena.sadrzaj;
    /*
     this.visinaSveta = parseInt(this.platno.height);   // ili scena.visina
     this.sirinaSveta = parseInt(this.platno.width);
     */

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
            this.ostaviti_poruku = true;
            poeni++;
        }
    }   // proveriPogodak

}   // kraj klase Karakter
