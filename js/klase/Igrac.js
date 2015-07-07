// energiju skida kada politicari bacaju parole
// 100 energije je 50 ljudi

function Igrac(scena) {
	this.energija = 10;
	this.sadrzaj = scena.sadrzaj;
	this.masa = this.praviMasu();
	this.VISINA_MASE = 113;	
	this.sirinaPojedinca = window.innerWidth/this.energija;
	this.dnoEkrana = window.innerHeight - this.VISINA_MASE;
}	// Igrac


Igrac.prototype.crtaEnergiju = function() {	
	for(var i = 0; i < this.masa.length; i++){

		this.sadrzaj.drawImage(this.masa[i].slika, i * this.sirinaPojedinca + this.masa[i].odstupanje, this.dnoEkrana);
	}
}	// crtaEnergiju()


Igrac.prototype.praviMasu = function() {
	var masa = [];
	for(var i = 0; i < this.energija; i++){
		var pojedinac = new Image();
		pojedinac.src = "slike/politicar.png";
		// prilagodi sliku
		var odstupanje = Math.random() * 60 - 30;
		masa.push({slika: pojedinac, odstupanje: odstupanje})
	}
	return masa;
}	// crtaEnergiju()

