
function Automat(scena) {

	
	this.deliPozicije = function(karakteri){			// prima niz karaktera
		for(var i=0; i < karakteri.length; i++){
			if(karakteri[i].igra){
				karakteri[i].nadjiSlobodnoMesto(karakteri);
				
				// postavlja polazne pozicije za proviruje
				// napraviti uslov ako viri
				karakteri[i].spustenost = 30;
				karakteri[i].zapamcen_y = karakteri[i].y;
				
			}
		}
	} // kraj deliPozicije


    this.crtajSve = function(){
        scena.sadrzaj.drawImage(scena.pozadina, 0, 0, scena.sirina, scena.pozadina.nova_visina);
        for(var i=0; i < scena.karakteri.length; i++){
            if(scena.karakteri[i].igra){
				scena.karakteri[i].proviruje();
                scena.karakteri[i].crtajDizanje();
            }
        }
    } // kraj crtajSve

	this.pisiPoruke = function(mish){
		for(var i=0; i < scena.karakteri.length; i++){
			if(scena.karakteri[i].igra && scena.karakteri[i].kukanje){
				scena.karakteri[i].kuka(mish);
			}
		}
	}	// kraj pisiPoruke


	this.brisiPoruke = function(){
		for(var i=0; i < scena.karakteri.length; i++){
			scena.karakteri[i].kukanje = false;
		}
	}	// kraj brisiPoruke


}	// kraj Automat
