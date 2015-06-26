
// ukinuti zavisnost klase od scene
function Karakter(ime, slika_src, scena){
	
	var ovaj = this;
    this.ime = ime.VelikoSlovo();
	this.slika = new Image();
    this.slika.src = slika_src;

    this.STANDARDNA_VISINA = 99;
    this.slika = _prilagodiSliku(this, this.slika);
    this.sirina = this.slika.width;
    this.visina = this.slika.height;
    this.x = 0;         	// dodeljuje slucajnaPozicija
    this.y = 0;
	this.zapamcen_x = 0;
	this.zapamcen_y = 0;    // dodeljuje postavljaMrdanje
	this.zapamcena_visina = this.visina;
	this.zapamcena_sirina = this.sirina;

    this.igra = false;
    this.pogodjen = false;
	this.pomerenost_ulevo = 0;
    this.spustenost = 0;
	this.pokret_levo_desno = false;
	this.pokret_dole_gore = false;
	this.traje_pauza = 0;
	this.traje_izlaz = 0;
	this.kraj_pauze; 
	this.kraj_izlaska; 	


	/*************** METODE ***************/

	this.igraj = function(vreme, trenutak_ulaska) {
		if(vreme.preostalo <= trenutak_ulaska) {
			this.igra = true;
		}
	}	// kraj igraj

    this.crtaj = function() {
		if (this.x >= 0 && this.y >= 0) {
			scena.sadrzaj.drawImage(this.slika, this.x, this.y, this.sirina, this.visina);
		}
	}   // kraj crtaj

    this.crtajMrdanje = function() {
		var odstupanje_x = this.pomerenost_ulevo * (this.slika.naturalWidth/this.slika.width);
		var odstupanje_y = this.spustenost * (this.slika.naturalHeight/this.slika.height);
		
        var slika = this.slika;
        var izvor_x = 0 + odstupanje_x;
        var izvor_y = 0;
        var izvor_sirina = this.slika.naturalWidth - odstupanje_x;
        var izvor_visina = this.slika.naturalHeight - odstupanje_y;
        var platno_x = this.x;
        var platno_y = this.y;
        var na_platnu_sirina = this.sirina; 
        var na_platnu_visina = this.visina;
		
		scena.sadrzaj.drawImage(slika, izvor_x, izvor_y, izvor_sirina, izvor_visina, platno_x, platno_y, na_platnu_sirina, na_platnu_visina);		
    }   // kraj crtajMrdanje

	/* POZICIJE */
	
    this.slucajnaPozicija = function(pozicije) {
		var slucajno = Math.floor (Math.random() * pozicije.length);		
        this.x = pozicije[slucajno][0];
        this.y = pozicije[slucajno][1];
    }   // kraj slucajnaPozicija
	
    this.nadjiSlobodnoMesto = function (karakteri) {
        this.slucajnaPozicija(scena.pozicije)
        while ( this.proveriSveSudare(karakteri) ) {
            this.slucajnaPozicija(scena.pozicije)
        }
    }   // kraj naSlobodnomCrtaj
	
    /* MRDANJE */

	this.postaviMrdanje = function(){	
		this.zapamcen_x = this.x;
		this.zapamcen_y = this.y;

		var slucaj = Math.floor((Math.random() * 2) + 1);
		switch(slucaj) {
			case 1:
				this.pomerenost_ulevo = 30;
				this.pokret_levo_desno = true
				break;
			case 2:
				this.spustenost = 30;
				this.pokret_dole_gore = true
				break;
			// napraviti treci slucaj kombinovano levo_desno_gore_dole
		}	// kraj switch		
	}

	this.azurirajMrdanje = function(){
		if(this.pokret_levo_desno) {
			this.resetujDoleGore()
			this.mrdajLevoDesno()
		}
		if(this.pokret_dole_gore) {
			this.resetujLevoDesno()
			this.mrdajDoleGore()
		}		
	}	// azurirajMrdanje()

	this.resetujDoleGore = function(){
			this.pokret_dole_gore = false	
			this.spustenost = 0;
			this.visina = this.zapamcena_visina;
			this.sirina = this.zapamcena_sirina;		
	} 

	this.resetujLevoDesno = function(){
		this.pokret_levo_desno = false
		this.pomerenost_ulevo = 0;	
	}

    this.mrdajDoleGore = function(){
        if(this.spustenost >= 30) {
            this.dizanje = true;
        }
        if (this.spustenost <= 0) {
            this.dizanje = false;
        }
        this.dizanje ? this.dizi() : this.spustaj();

        this.visina = this.zapamcena_visina - this.spustenost;
        this.y = this.zapamcen_y + this.spustenost;
    }	// kraj mrdajDoleGore

    this.mrdajLevoDesno = function(){
        if(this.pomerenost_ulevo >= 30) {
            this.mrdanje_desno = true;
        }
        if (this.pomerenost_ulevo <= 0) {
            this.mrdanje_desno = false;
        }
        this.mrdanje_desno ? this.mrdajDesno() : this.mrdajLevo();

        this.sirina = this.zapamcena_sirina - this.pomerenost_ulevo;
    }

	this.mrdajDesno = function(){
		this.pomerenost_ulevo -= 0.5
	}
	
	this.mrdajLevo = function(){
		this.pomerenost_ulevo += 0.5
	}

    this.dizi = function(){
		this.spustenost--
	}	// kraj dizi
	    
    this.spustaj = function(){
		this.spustenost++
	}	// kraj spustaj

	/* IZLAZ I PAUZA */

    this.odrediIzlaz = function(vreme, min, max){
		this.traje_izlaz = vreme.trajanjeSlucajno(min, max);
		this.kraj_izlaska = vreme.ovajTren() + this.traje_izlaz; 
	}	// kraj odrediIzlaz

	this.kadOdeResetujIzlaz = function(vreme){
		if(this.kraj_izlaska <= vreme.ovajTren()) {				
			this.traje_izlaz = 0;	
		}
	}	// kadOdeResetujIzlaz
	
    this.odrediPauzu = function(vreme, min, max){	
		this.traje_pauza = vreme.trajanjeSlucajno(min, max);
		this.kraj_pauze = vreme.ovajTren() + this.traje_pauza; 
	}	// kraj odrediPauzu
	
	this.kadProdjeResetujPauzu = function(vreme){
		if(this.kraj_pauze <= vreme.ovajTren()) {
			this.traje_pauza = 0;
		} 
	}	// kadProdjeResetujPauzu

	this.neIzlaziNiPauzira = function(){
		return !this.traje_izlaz && !this.traje_pauza;
	}
	
	this.upravoIzlazi = function(){
		return this.traje_izlaz && !this.traje_pauza
	}

	this.upravoPauzira = function(){
		return this.traje_pauza && !this.traje_izlaz
	}

    /*************** POMOCNE FUNKCIJE ***************/

    function _prilagodiSliku(ovaj, slika){
        // prilagodjava sliku standardnoj visini slike
        var nova_sirina = slika.width / (slika.height / ovaj.STANDARDNA_VISINA);
        var nova_visina = ovaj.STANDARDNA_VISINA;
        // prilagodjava sliku ovom ekranu
        slika.width = nova_sirina * (window.innerWidth / scena.STANDARDNA_SIRINA);
        slika.height = nova_visina * (window.innerWidth / scena.STANDARDNA_SIRINA);
        return slika;
    }

}   // kraj Karakter


/* KOLIZIJA */

Karakter.prototype.sudar = function(karakter){
	if(this.x == karakter.x && this.y == karakter.y){
		return true
	} else return false
}   // kraj sudar

Karakter.prototype.proveriSveSudare = function (karakteri) {
	var sudari = false
	for (var i = 0; i < karakteri.length; i++) {
		if( i == karakteri.indexOf(this) ) continue;		// preskoci sebe
		sudari = sudari || this.sudar(karakteri[i])
	}  // kraj petlje
	return sudari;
}   // kraj proveriSveSudare

/* GOVOR */

Karakter.prototype.crtaKukanje = function(mish){
	var jauk = this.jauk || "Jaoj, to boli!";
	var max_sirina_teksta = 250;
	scena.sadrzaj.font = "30px Verdana";
	scena.sadrzaj.lineWidth = 1;
	scena.sadrzaj.fillText(jauk, mish.zapamcen_x+30, mish.zapamcen_y, max_sirina_teksta);
	scena.sadrzaj.strokeText(jauk, mish.zapamcen_x+30, mish.zapamcen_y, max_sirina_teksta);
}   // kraj crtaKukanje

Karakter.prototype.kukaAkoJePogodjen = function(mish){
	if(this.pogodjen) {
		this.crtaKukanje(mish);
	}		
}

Karakter.prototype.bacaParole = function(){
	var parola = this.parola || "Mi branimo srpski narod!";
	// bacaParole koje ti skidaju energiju
}   // kraj bacaParole
