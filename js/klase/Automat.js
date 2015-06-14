// mozda preimenovati u klasa SviKarakteri, Vrteska ili Karakteri ili jednostavno vratiti u funkcije
// preseliti uslovnu logiku na jedno mesto, u Automat ili u Karakter

function Automat(scena) {

    this.praviKaraktere = function (likovi, scena, vreme){
        for (var lik in likovi){
            window[lik] = new Karakter(lik, likovi[lik], scena, vreme);
            scena.karakteri.push(window[lik]);
        }   // kraj for
    }   // kraj praviKaraktere()

	this.crtaSve = function(scena, karakteri){
		scena.sadrzaj.drawImage(scena.pozadina, 0, 0, scena.sirina, scena.pozadina.nova_visina);
		for(var i=0; i < karakteri.length; i++){
			if(karakteri[i].izlaz && !karakteri[i].pauza){
				//karakteri[i].crtaj();
				karakteri[i].crtajMrdanje();
			}
		}	// kraj for
	}	// kraj crtaSve

	/* OSTANCI I PAUZE (ne mogu istovremeno) */
	
	this.deliPozicije = function(karakteri){
		for(var i=0; i < karakteri.length; i++){
			if(karakteri[i].igra && !karakteri[i].izlaz){
				karakteri[i].nadjiSlobodnoMesto(karakteri);		
			}
		}	
	}	// deliPozicije

	this.odrediOstanke = function(karakteri){
		for(var i=0; i < karakteri.length; i++){
			if(karakteri[i].igra && !karakteri[i].izlaz && !karakteri[i].pauza){
				karakteri[i].odrediIzlazak(vreme);				
			}
		}	
	}	// odrediOstanke	
	
	this.jesuProsliOstanci = function(karakteri){
		for(var i=0; i < karakteri.length; i++){
			if(karakteri[i].izlaz) {
				if(karakteri[i].igra){
					karakteri[i].kadProdjeIzlazResetuj(vreme);
				}
			}
		}			
	}	// jesuProsliOstanci

	this.odrediPauzuSvima = function(karakteri){
		for(var i=0; i < karakteri.length; i++){
			if(!karakteri[i].izlaz && !karakteri[i].pauza){
				if(karakteri[i].igra){
					karakteri[i].odrediPauzu(vreme);
				}				
			}
		}			
	}	// odrediPauzuSvima

	this.jesuProslePauze = function(karakteri){
		for(var i=0; i < karakteri.length; i++){
			if(karakteri[i].igra){
				karakteri[i].kadProdjePauzaResetuj(vreme);
			}
		}			
	}	// jesuProslePauze

	/* MRDANJE */

	this.zaustavljaMrdanje = function(karakteri){ 
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

				var slucaj = Math.floor((Math.random() * 2) + 1);
				switch(slucaj) {
					case 1:
						karakteri[i].pomerenost_ulevo = 30;
						karakteri[i].pokret_levo_desno = true
						break;
					case 2:
						karakteri[i].spustenost = 30;
						karakteri[i].pokret_dole_gore = true
						break;
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

	/* PORUKE */

	this.ostavljaPoruke = function(mish){
		for(var i=0; i < scena.karakteri.length; i++){	
			if(scena.karakteri[i].igra){ 
				if(mish.naKarakteru(scena.karakteri[i])) {
					scena.karakteri[i].crtaKukanje(mish);
				}
			}
		}
	}	// kraj ostavljaPoruke

	
}	// kraj Automat
