function Vreme(zadato) {

    this.preostalo = zadato || 30;		// podrazumevano vreme
    this.prethodna_sekunda = 0;

	
	/*************** METODE ***************/

	this.ovajTren = function(){
		var od_pocetka_sekunde = new Date().getTime() / 1000	// sekunde od 1. jan 1970
		return Math.round(od_pocetka_sekunde) 					// zaokruzuje decimale
	}
	
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
	
	this.trajanjeSlucajno = function(){
		var slucaj = Math.random() * 3;
		slucaj = Math.round(slucaj * 10) / 10
		return slucaj;
	}	// kraj trajanjeSlucajno
	
	this.azurira = function(){
		this.prethodna_sekunda = this.ovaSekunda();		
	}

}   // kraj Vreme
