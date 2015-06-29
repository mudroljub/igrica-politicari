
function Kursor(){
	this.x = 0;				// na mousemove primaju trenutnu koordinatu
    this.y = 0;
	this.poluprecnik = 25;	
    this.kliknut_x = 0;		// od reagujNaKlik primaju trenutnu koordinatu
    this.kliknut_y = 0;
	
	this.pozicijeProjektila = {
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
		x3: 0,
		y3: 0
	}
}	// kraj Kursor


Kursor.prototype.trenutnaPozicija = function(event) {
	var rect = platno.getBoundingClientRect();
	var trenutnoX = event.clientX - rect.left;
	var trenutnoY = event.clientY - rect.top;
	return {
		x: trenutnoX,
		y: trenutnoY
	}
}	// trenutnaPozicija

Kursor.prototype.azuriraPoziciju = function(event){
	var trenutno = this.trenutnaPozicija(event)
	this.x = trenutno.x;
	this.y = trenutno.y;
}
// azuriraPoziciju

Kursor.prototype.pamtiKliknutuPoziciju = function(event){
	var trenutno = this.trenutnaPozicija(event)
	this.kliknut_x = trenutno.x;
	this.kliknut_y = trenutno.y;
}	// pamtiKliknutuPoziciju


Kursor.prototype.slucajnoOdstupanje = function(){
	return (Math.random() * this.poluprecnik * 2) - this.poluprecnik;
}

Kursor.prototype.dodeliPozicijeProjektila = function(slika){
	var centriran = this.centriraProjektil(slika);
	var pozicije = {
		x1: centriran.x + this.slucajnoOdstupanje(),
		y1: centriran.y + this.slucajnoOdstupanje(),
		x2: centriran.x + this.slucajnoOdstupanje(),
		y2: centriran.y + this.slucajnoOdstupanje(),
		x3: centriran.x + this.slucajnoOdstupanje(),
		y3: centriran.y + this.slucajnoOdstupanje()	
	}
	this.pozicijeProjektila = pozicije;
}	// dodeliPozicijeProjektila


Kursor.prototype.naKarakteru = function(karakter) {
	return (this.x > karakter.x && this.x < karakter.x + karakter.sirina) && (this.y > karakter.y && this.y < karakter.y + karakter.visina);
}	// naKarakteru()

Kursor.prototype.proveriPogodak = function(scena, karakter) {
	if(this.naKarakteru(karakter)){
		karakter.pogodjen = true;
		scena.poeni++;
	}
}   // kraj proveriPogodak

Kursor.prototype.crtaProjektilNaLiku = function(scena, karakter, slika){
	if(karakter.pogodjen){
		var centriran = this.centriraProjektil(slika)
		scena.sadrzaj.drawImage(slika, centriran.x - karakter.pomerenost_ulevo, centriran.y + karakter.spustenost );
	}
}	// crtaProjektilNaLiku

// da ne crta ako je na istom prozoru pogodjen političar
Kursor.prototype.crtaTriProjektile = function(scena, slika){
	var pozicije = this.pozicijeProjektila;
	scena.sadrzaj.drawImage(slika, pozicije.x1, pozicije.y1);
	scena.sadrzaj.drawImage(slika, pozicije.x2, pozicije.y2);
	scena.sadrzaj.drawImage(slika, pozicije.x3, pozicije.y3);
}	// crtaTriProjektile

Kursor.prototype.crtaProjektil = function(scena, slika){
	var centriran = this.centriraProjektil(slika)
	scena.sadrzaj.drawImage(slika, centriran.x, centriran.y);
}	// crtaProjektil

Kursor.prototype.centriraProjektil = function(slika){
	var centriranX = this.kliknut_x - (slika.width / 2);
	var centriranY = this.kliknut_y - (slika.height / 2);
	return {
		x: centriranX, 
		y: centriranY
	}
}	// centriraProjektil

Kursor.prototype.crtaKrug = function(scena){
	var krug = new Path2D();
	krug.arc(this.x, this.y, this.poluprecnik, 0, 2*Math.PI);
	scena.sadrzaj.fillStyle = "rgba(255, 255, 255, 0.2)";
	scena.sadrzaj.fill(krug);
}
