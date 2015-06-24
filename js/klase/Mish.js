
function Mish(scena){
	var mish = this;
	mish.x = 0;				// od mousemove primaju trenutnu koordinatu
    mish.y = 0;
    mish.zapamcen_x = 0;	// od reagujNaKlik primaju trenutnu koordinatu
    mish.zapamcen_y = 0;
    

	/*************** METODE ***************/

	this.azurirajPoziciju = function(event){
		mish.x = event.clientX;   
		mish.y = event.clientY;
	}

	this.azurirajZapamcenuPoziciju = function(event){
		mish.zapamcen_x = event.clientX;   
		mish.zapamcen_y = event.clientY;
	}

	this.naKarakteru = function(karakter) {
		return (this.x > karakter.x && this.x < karakter.x + karakter.sirina) && (this.y > karakter.y && this.y < karakter.y + karakter.visina);
	}	// naKarakteru()
	
    this.proveriPogodak = function(scena, karakter) {
        if(this.naKarakteru(karakter)){ 
			karakter.pogodjen = true;
            scena.poeni++;
        }
    }   // kraj proveriPogodak

	this.paradajzNaLiku = function(karakter){
		if(karakter.pogodjen){ 
			scena.sadrzaj.drawImage(paradajz, mish.zapamcen_x - karakter.pomerenost_ulevo, mish.zapamcen_y + karakter.spustenost - 20);
		}
	}	// paradajzNaLiku
	
	this.crtaParadajz = function(){
		scena.sadrzaj.drawImage(paradajz, this.x, this.y);
	}	// crtaParadajz
	
}	// kraj Mish
