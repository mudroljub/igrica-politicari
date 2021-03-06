function Uvod(platno_id){

	var uvod = this;       	// hvata sebe, za niže funkcije
	this.platno = razvuciPlatno(platno_id);
	this.sadrzaj = postaviSadrzaj(this.platno);	
	this.ide = true;       			// podrazumevano odma krece
	this.slova_x_pocetno = -100;	
	this.slova_y_pocetno = 100;		
	this.slova_x = -100;	
	this.slova_y = 100;
	this.animacija;					// identifikator animacije

	
	this.pusti = function(){ 		// this je unutra window!
		crnEkran(uvod)
		piseTekst(uvod.sadrzaj, "Spremi se za obračun!", uvod.slova_x, uvod.slova_y, "#fff", 60, 1000);
		mrdaSlova(uvod, 5);
		uvod.animacija = window.requestAnimationFrame(uvod.pusti);
	}	// pusti

}	// kraj Uvod
