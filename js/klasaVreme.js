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
	
	this.prodjeSlucajno = function(){
		// return ovaj_trenutak == zapamceno_vreme + trajanjeSlucajno()
	}
	
	this.trajanjeSlucajno = function(){
		var slucaj = Math.random() * 2;
		slucaj = Math.round(slucaj * 100) / 100
		return slucaj;
	}	// kraj trajanjeSlucajno
	
	this.azurira = function(){
		this.prethodna_sekunda = this.ovaSekunda();		
	}


}   // kraj Vreme
