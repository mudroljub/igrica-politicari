// napraviti interfejs da menja varijable
// energiju skida kada politicari bacaju parole
// 100 energije je 50 ljudi
function Igrac(scena) {
	this.energija = 10;
	this.standard = 160;	
	this.sadrzaj = scena.sadrzaj;
	this.ljudi = this.praviMasu();
	this.sirinaPojedinca = window.innerWidth/this.energija;	
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
		var ovaSlika = this.ljudi[i].slika;
		var polozajX = i * this.sirinaPojedinca + this.ljudi[i].slucajnoOdstupanje;
		var dnoEkrana = window.innerHeight - ovaSlika.height;
		this.sadrzaj.drawImage(ovaSlika, polozajX, dnoEkrana, ovaSlika.width, ovaSlika.height)
	}
}	// crtaMasu()
