
function Kursor(scena){
	var kursor = this;
	kursor.x = 0;				// od mousemove primaju trenutnu koordinatu
    kursor.y = 0;
    kursor.zapamcen_x = 0;	// od reagujNaKlik primaju trenutnu koordinatu
    kursor.zapamcen_y = 0;

}	// kraj Kursor


Kursor.prototype.azuriraPoziciju = function(event){
	var rect = platno.getBoundingClientRect();
	kursor.x = event.clientX - rect.left;
	kursor.y = event.clientY - rect.top;
}
// spojiti
Kursor.prototype.azuriraZapamcenuPoziciju = function(event){
	var rect = platno.getBoundingClientRect();
	kursor.zapamcen_x = event.clientX - rect.left;
	kursor.zapamcen_y = event.clientY - rect.top;
}	// azuriraZapamcenuPoziciju


Kursor.prototype.naKarakteru = function(karakter) {
	return (this.x > karakter.x && this.x < karakter.x + karakter.sirina) && (this.y > karakter.y && this.y < karakter.y + karakter.visina);
}	// naKarakteru()

Kursor.prototype.proveriPogodak = function(scena, karakter) {
	if(this.naKarakteru(karakter)){
		karakter.pogodjen = true;
		scena.poeni++;
	}
}   // kraj proveriPogodak

Kursor.prototype.crtaParadajzNaLiku = function(karakter){
	if(karakter.pogodjen){
		scena.sadrzaj.drawImage(paradajz, kursor.zapamcen_x - (paradajz.width/2) - karakter.pomerenost_ulevo, kursor.zapamcen_y -(paradajz.height/2) + karakter.spustenost );
	}
}	// crtaParadajzNaLiku
// spojiti
// da ne crta ako je na istom prozoru pogodjen političar
Kursor.prototype.crtaParadajzOkolo = function(karakter){
	if(!karakter.pogodjen && !this.naKarakteru(karakter)){
		this.crtaParadajz();
	}
}	// crtaParadajzOkolo

Kursor.prototype.crtaParadajz = function(){
	var centriranX = kursor.zapamcen_x - (paradajz.width / 2);
	var centriranY = kursor.zapamcen_y - (paradajz.height / 2);
	scena.sadrzaj.drawImage(paradajz, centriranX, centriranY);
}	// crtaParadajz

Kursor.prototype.crtaKrug = function(){
	var krug = new Path2D();
	krug.arc(kursor.x, kursor.y, 25, 0, 2 * Math.PI);
	scena.sadrzaj.fillStyle = "rgba(255, 255, 255, 0.2)";
	scena.sadrzaj.fill(krug);
}
