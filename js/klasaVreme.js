
function Vreme(preostalo) {

    this.preostalo = preostalo || 30;		// podrazumevano vreme
    this.prethodna_sekunda = 0;
	
	this.ovaSekunda = function(){
		return new Date().getSeconds();
	}

}   // kraj Vreme