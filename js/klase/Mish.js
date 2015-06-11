
function Mish(){
	this.x = 0;				// na reagujNaKlik primaju trenutnu koordinatu
    this.y = 0;

    this.proveriPogodak = function(scena, karakter) {
		var mishNaKarakteru = (this.x > karakter.x && this.x < karakter.x + karakter.sirina) && (this.y > karakter.y && this.y < karakter.y + karakter.visina)
        if(mishNaKarakteru){ 
			karakter.kukanje = true;
            scena.poeni++;
        }
    }   // kraj proveriPogodak

}	// kraj Mish
