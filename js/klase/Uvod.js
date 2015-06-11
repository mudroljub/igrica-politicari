
function Uvod(scena){
	var ovaj_uvod = this;       	// hvata sebe, za niže funkcije
	this.ide = true;       	// podrazumevano odma krece
	this.slova_x = -100;	
	this.slova_y = 200;
	this.animacija;			// identifikator animacije
	scena.sadrzaj.font = "48px Verdana";
	
	
	/*************** FUNKCIJE ***************/
	
	this.pusti = function(){            // this je unutra window
		scena.sadrzaj.fillStyle = "black";
		scena.sadrzaj.fillRect(0, 0, scena.sirina, scena.visina);
		scena.sadrzaj.fillStyle="#fff";
		scena.sadrzaj.fillText("Spremi se za obracun!", ovaj_uvod.slova_x += 5, ovaj_uvod.slova_y);			
		if(ovaj_uvod.slova_x > innerWidth-100) {
			ovaj_uvod.slova_x = -100;
			ovaj_uvod.slova_y += 100;
		}
		if(ovaj_uvod.slova_y > innerHeight - 100) {
			ovaj_uvod.slova_y = 200;
		}
		ovaj_uvod.animacija = window.requestAnimationFrame(ovaj_uvod.pusti);
	}	// kraj pusti
	

}	// kraj Uvod
