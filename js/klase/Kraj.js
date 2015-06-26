function Kraj(scena) {

	this.ide = false;
	this.STANDARNA_VELICINA_SLOVA = 48;
	this.velicina_slova = _prilagodiSlova(this.STANDARNA_VELICINA_SLOVA);

	/*************** METODE ***************/

	this.pusti = function(){
		window.cancelAnimationFrame(scena.animacija);
		platno.style.cursor = 'crosshair';
		scena.ide = false;
		this.ide = true;
		this.zavrsniEkran("Igra je završena!");
		this.proveriRekord(scena.poeni);
	}	// kraj pusti

	this.zavrsniEkran = function(poruka){
		scena.sadrzaj.fillRect(scena.sirina/4, scena.visina/4, scena.sirina/2, scena.visina/2);
		scena.sadrzaj.fillStyle="#000";
		scena.sadrzaj.font = this.velicina_slova + "px Verdana";
		scena.sadrzaj.fillText(poruka, scena.sirina/4 + scena.sirina/11, scena.visina/4 + scena.sirina/11);
	}	// kraj zavrsniEkran

	this.proveriRekord = function(poeni) {
		var rekord = localStorage.getItem('rekord') || 0;
		if (poeni > rekord) {
			rekord = poeni;
			localStorage.setItem('rekord', poeni);
		}
		kazi("Najbolji rezultat je: " + rekord)
		// return rekord
	}	// kraj proveriRekord

	/*************** POMOCNE FUNKCIJE ***************/

	function _prilagodiSlova (standard){
		var nova_velicina = standard * (scena.sirina / scena.STANDARDNA_SIRINA);
		return nova_velicina;
	}	// kraj _prilagodiSlova

}	// kraj Kraja
