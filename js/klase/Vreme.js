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
	
	this.trajanjeSlucajno = function(min, max){
		//var slucaj = Math.random() * 3;
		//return slucaj;
		return Math.random() * (max - min) + min;
	}	// kraj trajanjeSlucajno
	
	this.azurira = function(){
		this.prethodna_sekunda = this.ovaSekunda();		
	}

}   // kraj Vreme
