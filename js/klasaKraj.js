
function Kraj(scena) {

	this.STANDARNA_VELICINA_SLOVA = 48;
	this.velicina_slova = _prilagodiSlova(this.STANDARNA_VELICINA_SLOVA);


	this.pusti = function(){
		window.cancelAnimationFrame(scena.animacija_igre);
		scena.igranje = false;
		kraj.zavrsniEkran("Igra je završena!");
	}	// kraj pusti
	
	
	this.zavrsniEkran = function(poruka){
		scena.sadrzaj.fillRect(scena.sirina/4, scena.visina/4, scena.sirina/2, scena.visina/2);
		scena.sadrzaj.fillStyle="#000";
		scena.sadrzaj.font = this.velicina_slova + "px Verdana";
		scena.sadrzaj.fillText(poruka, scena.sirina/4 + scena.sirina/11, scena.visina/4 + scena.sirina/11);
	}	// kraj zavrsniEkran
	
	
	function _prilagodiSlova (standard){
		var nova_velicina = standard * (scena.sirina / scena.STANDARDNA_SIRINA);
		return nova_velicina;
	}

}
