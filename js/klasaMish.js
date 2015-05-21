
function Mish(scena){
	this.misX = 0;				// na naKlik primaju trenutnu koordinatu
    this.misY = 0;
	
    this.proveriPogodak = function(karakter) { 
        if( (this.misX > karakter.x && this.misX < karakter.x + karakter.sirina) && (this.misY > karakter.y && this.misY < karakter.y + karakter.visina) ){ 
			karakter.vicem = true;
            scena.poeni++;
        }
    }   // proveriPogodak

	
}	// kraj Mish
