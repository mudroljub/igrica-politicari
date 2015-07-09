// energiju skida kada politicari bacaju parole
// 100 energije je 50 ljudi

function Igrac(scena) {
	this.energija = 10;
	this.sadrzaj = scena.sadrzaj;
	this.ljudi = this.praviMasu();
	this.VISINA_MASE = 113;	
	this.sirinaPojedinca = window.innerWidth/this.energija;
	this.dnoEkrana = window.innerHeight - this.VISINA_MASE;
}	// Igrac


Igrac.prototype.crtaMasu = function() {	
	for(var i = 0; i < this.ljudi.length; i++){
		var polozajX = i * this.sirinaPojedinca + this.ljudi[i].slucajnoOdstupanje;
		this.sadrzaj.drawImage(this.ljudi[i].slika, polozajX, this.dnoEkrana)
	}	
}	// crtaMasu()


Igrac.prototype.praviMasu = function() {
	var ljudi = [];
	for(var i = 0; i < this.energija; i++){
		var pojedinac = new Image();
		pojedinac.src = "slike/politicar.png";
		// prilagodi sliku
		var slucaj = Math.random() * 60 - 30;
		ljudi.push( {slika: pojedinac, slucajnoOdstupanje: slucaj} )
	}
	return ljudi;
}	// praviMasu()

