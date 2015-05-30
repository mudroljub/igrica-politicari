
function Automat(scena) {

	
	this.deliPozicije = function(karakteri){			// prima niz karaktera
		for(var i=0; i < karakteri.length; i++){
			if(karakteri[i].igranje){
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
            if(scena.karakteri[i].igranje){
				scena.karakteri[i].proviruje();
                scena.karakteri[i].crtajDizanje();
            }
        }
    } // kraj crtajSve


}	// kraj Automat
