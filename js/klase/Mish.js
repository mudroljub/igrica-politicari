
function Mish(scena){
	this.x = 0;				// na reagujNaKlik primaju trenutnu koordinatu
    this.y = 0;

	/*************** METODE ***************/

	this.naKarakteru = function(karakter) {
		return (this.x > karakter.x && this.x < karakter.x + karakter.sirina) && (this.y > karakter.y && this.y < karakter.y + karakter.visina);
	}	// naKarakteru()
	
    this.proveriPogodak = function(scena, karakter) {
        if(this.naKarakteru(karakter)){ 
			karakter.kukanje = true;
            scena.poeni++;
        }
    }   // kraj proveriPogodak

}	// kraj Mish
