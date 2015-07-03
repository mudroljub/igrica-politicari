
function Predmet(ime, slika_src, scena){

	this.ime = ime.VelikoSlovo();
	this.slika = new Image();
    this.slika.src = slika_src;
    
    this.slika = _prilagodiSliku(this, this.slika);
    this.sirina = this.slika.width;
    this.visina = this.slika.height;

    this.x = 0;         	// dodeljuje slucajnaPozicija
    this.y = 0;
    
}	// Predmet
