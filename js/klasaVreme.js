function Vreme(zadato) {

    this.preostalo = zadato || 30;		// podrazumevano vreme
    this.prethodna_sekunda = 0;
    this.prethodno_nasumicno = 0;
	
	this.ovaSekunda = function(){
		return new Date().getSeconds();
	}

	this.proveriKraj = function(kraj){
		if(vreme.preostalo < 1) {
			kraj.pusti();
		}	
	}	// kraj proveriKraj

	this.smanjuje = function(){
		this.preostalo--
	}
	
	this.prodjeSekunda = function(){
		return this.ovaSekunda() != this.prethodna_sekunda
	}
	
	this.prodjeNasumicno = function(){
		var slucaj = Math.random() * 2;
		return slucaj;
	}	// kraj prodjeNasumicno
	
	this.azurira = function(){
		this.prethodna_sekunda = this.ovaSekunda();		
	}


}   // kraj Vreme
