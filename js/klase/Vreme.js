function Vreme(zadato) {

    this.preostalo = zadato || 30;		// podrazumevano vreme
    this.prethodna_sekunda = 0;

}   // kraj Vreme


Vreme.prototype.ovajTren = function(){
	var od_pocetka_sekunde = new Date().getTime() / 1000	// sekunde od 1. jan 1970
	return Math.round(od_pocetka_sekunde) 					// zaokruzuje decimale
}

Vreme.prototype.ovaSekunda = function(){
	return new Date().getSeconds();
}

Vreme.prototype.proveriKraj = function(kraj){
	if(vreme.preostalo < 1) kraj.pusti();
}	// kraj proveriKraj

Vreme.prototype.smanjuje = function(){
	this.preostalo--
}

Vreme.prototype.prodjeSekunda = function(){
	return this.ovaSekunda() != this.prethodna_sekunda
}

Vreme.prototype.trajanjeSlucajno = function(min, max){
	return Math.random() * (max - min) + min;
}	// kraj trajanjeSlucajno

Vreme.prototype.azurira = function(){
	this.prethodna_sekunda = this.ovaSekunda();
}
