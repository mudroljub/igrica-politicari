// napraviti uvodu sopstveno platno, da bude nezavisan od scene

function Uvod(platno_id){
	
	var uvod = this;       	// hvata sebe, za niže funkcije
	this.platno = razvuciPlatno(platno_id);
	this.sadrzaj = postaviSadrzaj(this.platno);	
	this.ide = true;       			// podrazumevano odma krece
	this.slova_x = -100;	
	this.slova_y = 200;
	this.animacija;					// identifikator animacije

	// this je unutra window!
	this.pusti = function(){ 
		piseSlova(uvod, "Spremi se za obračun!", uvod.slova_x, uvod.slova_y);
		mrdaSlova(uvod, 5);
		uvod.animacija = window.requestAnimationFrame(uvod.pusti);
	}	// pusti

}	// kraj Uvod
