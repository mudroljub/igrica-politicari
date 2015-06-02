function Automat(scena) {

    this.praviKaraktere = function (likovi, scena, vreme){
        for (var lik in likovi){
            window[lik] = new Karakter(lik, likovi[lik], scena, vreme);
            scena.karakteri.push(window[lik]);
        }   // kraj for
    }   // kraj praviKaraktere()


	this.deliPozicije = function(karakteri){			// prima niz karaktera
		for(var i=0; i < karakteri.length; i++){
			if(karakteri[i].igra){
				karakteri[i].nadjiSlobodnoMesto(karakteri);
			}
		}
	} // kraj deliPozicije

	
	this.postaviMrdanje = function(karakteri){
		for(var i=0; i < karakteri.length; i++){
			if(karakteri[i].igra){ 
				karakteri[i].zapamcen_x = karakteri[i].x;
				karakteri[i].zapamcen_y = karakteri[i].y;
				// da svakom dodeljuje nasumicno odstupanje
				karakteri[i].spustenost = 30;
				karakteri[i].pomerenost_ulevo = 30;
			}
		}	
	}	// kraj postaviMrdanje

	
	function dajOdstupanje(karakteri, i){	
		return karakteri[i].proviruje();
	}
	

	
	
	this.azuriraMrdanje = function(karakteri) {
		for(var i=0; i < karakteri.length; i++){
			if(karakteri[i].igra){ 
				// da menja i ostale pravce
				// dajOdstupanje(karakteri, i);
				karakteri[i].izlaziSLeva()
			}
		}	
	}	// azuriraMrdanje
	
	
    this.crtaSve = function(){
        scena.sadrzaj.drawImage(scena.pozadina, 0, 0, scena.sirina, scena.pozadina.nova_visina);
        for(var i=0; i < scena.karakteri.length; i++){
            if(scena.karakteri[i].igra){
                //scena.karakteri[i].crtajDizanje();
				scena.karakteri[i].crtaUlazSleva();
            }
        }
    } // kraj crtaSve

	this.pisePoruke = function(mish){
		for(var i=0; i < scena.karakteri.length; i++){
			if(scena.karakteri[i].igra && scena.karakteri[i].kukanje){
				scena.karakteri[i].kuka(mish);
			}
		}
	}	// kraj pisePoruke


	this.brisePoruke = function(){
		for(var i=0; i < scena.karakteri.length; i++){
			scena.karakteri[i].kukanje = false;
		}
	}	// kraj brisePoruke


}	// kraj Automat
