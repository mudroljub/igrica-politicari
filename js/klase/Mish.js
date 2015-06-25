
function Mish(scena){
	var mish = this;
	mish.x = 0;				// od mousemove primaju trenutnu koordinatu
    mish.y = 0;
    mish.zapamcen_x = 0;	// od reagujNaKlik primaju trenutnu koordinatu
    mish.zapamcen_y = 0;
    

	/*************** METODE ***************/

	this.azuriraPoziciju = function(event){
		var rect = platno.getBoundingClientRect();
		mish.x = event.clientX - rect.left; 
		mish.y = event.clientY - rect.top;
	}
	// spojiti
	this.azuriraZapamcenuPoziciju = function(event){
		var rect = platno.getBoundingClientRect();
		mish.zapamcen_x = event.clientX - rect.left; 
		mish.zapamcen_y = event.clientY - rect.top;
	}	// azuriraZapamcenuPoziciju


	this.naKarakteru = function(karakter) {
		return (this.x > karakter.x && this.x < karakter.x + karakter.sirina) && (this.y > karakter.y && this.y < karakter.y + karakter.visina);
	}	// naKarakteru()
	
    this.proveriPogodak = function(scena, karakter) {
        if(this.naKarakteru(karakter)){ 
			karakter.pogodjen = true;
            scena.poeni++;
        }
    }   // kraj proveriPogodak

	this.crtaParadajzNaLiku = function(karakter){
		if(karakter.pogodjen){ 
			scena.sadrzaj.drawImage(paradajz, mish.zapamcen_x - (paradajz.width/2) - karakter.pomerenost_ulevo, mish.zapamcen_y -(paradajz.height/2) + karakter.spustenost );
		}
	}	// crtaParadajzNaLiku

	// da ne crta ako je na istom prozoru pogodjen političar
	this.crtaParadajzOkolo = function(karakter){
		if(!karakter.pogodjen && !this.naKarakteru(karakter)){
			this.crtaParadajz();
		}	
	}	// crtaParadajzOkolo

	this.crtaParadajz = function(){
		var centriranX = mish.zapamcen_x - (paradajz.width / 2);
		var centriranY = mish.zapamcen_y - (paradajz.height / 2);
		scena.sadrzaj.drawImage(paradajz, centriranX, centriranY);
	}	// crtaParadajz

}	// kraj Mish
