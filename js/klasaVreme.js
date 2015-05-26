
function Vreme(ukupno) {

    this.preostalo = ukupno || 30;		// podrazumevano vreme
    this.prethodna_sekunda = 0;
	
	this.ovaSekunda = function(){
		return new Date().getSeconds();
	}

	this.proveriKraj = function(scena){
		if(vreme.preostalo < 1) {
			window.cancelAnimationFrame(scena.animacija_igre);
			scena.igranje = false;
			scena.odjavnaSlova("Igra je završena!");
		}	
	}	// kraj proveriKraj


}   // kraj Vreme
