// energiju skida kada politicari bacaju parole
// 100 energije je 50 ljudi
function Igrac(scena) {
	this.energija = 10;
	this.standard = 50;	
	this.sadrzaj = scena.sadrzaj;
	this.ljudi = this.praviMasu();
	this.VISINA_MASE = 113;	
	this.sirinaPojedinca = window.innerWidth/this.energija;	
	this.dnoEkrana = window.innerHeight - this.VISINA_MASE;		// treba nova visina
}	// Igrac


Igrac.prototype.praviMasu = function() {
	var ljudi = [];
	for(var i = 0; i < this.energija; i++){
		var slikaPojedinca = new Image();
		slikaPojedinca.src = "slike/politicar.png";
		slikaPojedinca = prilagodiSliku(this.standard, slikaPojedinca)
		var slucaj = Math.random() * 60 - 30;
		ljudi.push({
			slika: slikaPojedinca, 
			slucajnoOdstupanje: slucaj
		})
	}
	return ljudi;
}	// praviMasu()


Igrac.prototype.crtaMasu = function() {	
	for(var i = 0; i < this.ljudi.length; i++){
		var polozajX = i * this.sirinaPojedinca + this.ljudi[i].slucajnoOdstupanje;
		this.sadrzaj.drawImage(this.ljudi[i].slika, polozajX, this.dnoEkrana)
	}	
}	// crtaMasu()
