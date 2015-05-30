
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

	this.tece = function(){
		this.preostalo--
	}
	
	this.promenilaSekunda = function(){
		return this.prethodna_sekunda != this.ovaSekunda()	
	}


}   // kraj Vreme
