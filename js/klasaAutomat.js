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

	this.zaustavljaMrdanje = function(karakteri){			// prima niz karaktera
		for(var i=0; i < karakteri.length; i++){
			if(karakteri[i].igra){
				karakteri[i].pokret_levo_desno = false
				karakteri[i].pokret_dole_gore = false
				karakteri[i].spustenost = 0;
				karakteri[i].pomerenost_ulevo = 0;
				karakteri[i].visina = karakteri[i].zapamcena_visina;
				karakteri[i].sirina = karakteri[i].zapamcena_sirina;
			}
		}
	} // kraj deliPozicije
	
	this.postavljaMrdanje = function(karakteri){
		for(var i=0; i < karakteri.length; i++){
			if(karakteri[i].igra){
				karakteri[i].zapamcen_x = karakteri[i].x;
				karakteri[i].zapamcen_y = karakteri[i].y;

				var slucajno = Math.floor((Math.random() * 3) + 1);
				switch(1) {
					case 1:
						karakteri[i].pomerenost_ulevo = 30;
						karakteri[i].pokret_levo_desno = true
						break;
					case 2:
						karakteri[i].spustenost = 30;
						karakteri[i].pokret_dole_gore = true
						break;
					default:
						// nista
				}	// kraj switch
			}	// kraj if igra
		}	
	}	// kraj postavljaMrdanje

	this.azuriraMrdanje = function(karakteri) {
		for(var i=0; i < karakteri.length; i++){
			if(karakteri[i].igra){ 
				if(karakteri[i].pokret_levo_desno) {
					karakteri[i].mrdajLevoDesno()
				}
				if(karakteri[i].pokret_dole_gore) {
					karakteri[i].mrdajDoleGore()
				}				
			}	// kraj ako su u igri
		}	
	}	// azuriraMrdanje

    this.crtaSve = function(scena, karakteri){
        scena.sadrzaj.drawImage(scena.pozadina, 0, 0, scena.sirina, scena.pozadina.nova_visina);
        for(var i=0; i < karakteri.length; i++){
            if(karakteri[i].igra){
				//karakteri[i].crtaj();
				//karakteri[i].crtajDizanje();
				karakteri[i].crtajUlazSleva();
            }
        }	// kraj for
    }	// kraj crtaSve

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
