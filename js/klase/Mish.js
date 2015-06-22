
function Mish(scena){
	this.x = 0;				// od reagujNaKlik primaju trenutnu koordinatu
    this.y = 0;

	/*************** METODE ***************/

	this.naKarakteru = function(karakter) {
		return (this.x > karakter.x && this.x < karakter.x + karakter.sirina) && (this.y > karakter.y && this.y < karakter.y + karakter.visina);
	}	// naKarakteru()
	
    this.proveriPogodak = function(scena, karakter) {
        if(this.naKarakteru(karakter)){ 
			karakter.pogodjen = true;
            scena.poeni++;
        }
    }   // kraj proveriPogodak

	this.crtaParadajz = function(){
		scena.sadrzaj.drawImage(paradajz, this.x, this.y);
	}
	
}	// kraj Mish
