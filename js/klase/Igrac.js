// energiju skida kada politicari bacaju parole
// 100 energije je 50 ljudi

function Igrac(scena) {
	this.energija = 10;
	this.sadrzaj = scena.sadrzaj;
}


Igrac.prototype.crtaEnergiju = function() {
	var pojedinac = new Image();
	pojedinac.src = "slike/politicar.png";
	var sirinaPodeoka = window.innerWidth/this.energija;
	var dnoStrane = window.innerHeight-pojedinac.height;
		
	for(var i = 0; i < this.energija; i++){
		this.sadrzaj.drawImage(pojedinac, i * sirinaPodeoka, dnoStrane);		
	}
}	// crtaEnergiju()

