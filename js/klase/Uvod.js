
function Uvod(scena){

	var uvod = this;       	// hvata sebe, za niže funkcije
	this.ide = true;       			// podrazumevano odma krece
	this.slova_x = -100;	
	this.slova_y = 200;
	this.animacija;					// identifikator animacije


	this.pusti = function(){            // this je unutra window (mozda ga okida neki dogadjaj?)
		//log(this)
		_piseSlova(scena, "Spremi se za obračun!", uvod.slova_x, uvod.slova_y);
		_mrdaSlova(5);
		uvod.animacija = window.requestAnimationFrame(uvod.pusti);
	}	// kraj pusti


	/*************** POMOCNE FUNKCIJE ***************/

	// pripojiti sceni?
	function _piseSlova(scena, tekst, slova_x, slova_y){
		scena.sadrzaj.font = "48px Verdana";
		scena.sadrzaj.fillStyle = "black";
		scena.sadrzaj.fillRect(0, 0, scena.sirina, scena.visina);
		scena.sadrzaj.fillStyle="#fff";
		scena.sadrzaj.fillText(tekst, slova_x, slova_y);
	}	// _piseSlova

	function _mrdaSlova(brzinaX){
		uvod.slova_x += brzinaX;
		if(uvod.slova_x > window.innerWidth-100) {
			uvod.slova_x = -100;
			uvod.slova_y += 100;
		}
		if(uvod.slova_y > window.innerHeight - 100) {
			uvod.slova_y = 200;
		}
	}	// _mrdaSlova

}	// kraj Uvod
