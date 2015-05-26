
function Vreme(ukupno) {

    this.preostalo = ukupno || 30;		// podrazumevano vreme
    this.prethodna_sekunda = 0;
	
	this.ovaSekunda = function(){
		return new Date().getSeconds();
	}

	this.proveriKraj = function(kraj){
		if(vreme.preostalo < 1) {
			kraj.pusti();
		}	
	}	// kraj proveriKraj


}   // kraj Vreme
