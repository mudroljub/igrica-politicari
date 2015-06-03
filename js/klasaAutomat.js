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

	
	this.postavljaMrdanje = function(karakteri){
		for(var i=0; i < karakteri.length; i++){
			if(karakteri[i].igra){ 
				// slucajni broj od jedan do 3
				var slucajno = Math.floor((Math.random() * 3) + 1);
				
				switch(slucajno) {
					case 1:
						karakteri[i].pokret_levo_desno = true
						break;
					case 2:
						karakteri[i].pokret_dole_gore = true
						break;
					default:
						karakteri[i].pokret_levo_desno = true
				}	// kraj switch			
				
				karakteri[i].zapamcen_x = karakteri[i].x;
				karakteri[i].zapamcen_y = karakteri[i].y;
				karakteri[i].spustenost = 30;
				karakteri[i].pomerenost_ulevo = 30;
			}
		}	
	}	// kraj postavljaMrdanje

	
	this.azuriraMrdanje = function(karakteri) {
		for(var i=0; i < karakteri.length; i++){
			if(karakteri[i].igra){ 
				if(karakteri[i].pokret_levo_desno) {
					log(karakteri[i].ime)
					log("Ide levo desno")										
					karakteri[i].UlaziSLeva()
				}
				if(karakteri[i].pokret_dole_gore) {
					log(karakteri[i].ime)
					log("Ide gore dole")					
				}				
			}	// kraj ako su u igri
		}	
	}	// azuriraMrdanje
	
	
    this.crtaSve = function(){
        scena.sadrzaj.drawImage(scena.pozadina, 0, 0, scena.sirina, scena.pozadina.nova_visina);
        for(var i=0; i < scena.karakteri.length; i++){
            if(scena.karakteri[i].igra){
                //scena.karakteri[i].crtajDizanje();
				scena.karakteri[i].crtajUlazSleva();
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
