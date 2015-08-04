// podeliti na klase Politicar i Karakter
// ukinuti zavisnost klase od scene?

function Karakter(ime, slika_src, scena){

	var karakter = this;
    this.ime = ime.VelikoSlovo();
	this.slika = new Image();
    this.slika.src = slika_src;

    this.slika = prilagodiSliku(STANDARDNA_VISINA_SLIKE, this.slika);
    this.sirina = this.slika.width;
    this.visina = this.slika.height;
    this.x = 0;         	// dodeljuje dodeliPoziciju
    this.y = 0;
	this.zapamcen_x = 0;
	this.zapamcen_y = 0;    // dodeljuje postavljaMrdanje
	this.zapamcena_visina = this.visina;
	this.zapamcena_sirina = this.sirina;

	this.vrstaAnimacije = 0;
    this.igra = false;
    this.pogodjen = false;
	this.pomerenost_ulevo = 0;
    this.spustenost = 0;
	this.pokret_levo_desno = false;
	this.pokret_dole_gore = false;
	this.trajanjePauze = 0;
	this.trajanjeIzlaska = 0;
	this.krajPauze = 0; 			// dodeliPauzu
	this.krajIzlaska = 0;			// dodeliIzlazak
	this.obrniSmer = false;
	
	this.parole = [
		"Mi branimo srpski narod!", 
		"Smanjićemo plate i penzije!", 
		"Privućemo investitore", 
		"Vlast narodu!",
		"Smanjićemo nezaposlenost!",
		"Izgradićemo svemirsku stanicu",
		"Donećemo novi ustav",
		"Raspisaćemo referendum",
		"Raspisaćemo izbore",
		"Dobićete po sto maraka",		
		"Dobićete po hiljadu eura"
	]
	this.parola = "Smrt sirotinji!"	// defaul

}   // kraj Karakter


Karakter.prototype.igraj = function(vreme, trenutak_ulaska) {
	if(vreme.preostalo <= trenutak_ulaska) {
		this.igra = true;
	}
}	// kraj igraj


/* CRTANJE */

Karakter.prototype.crtaj = function() {
	scena.sadrzaj.drawImage(this.slika, this.x, this.y, this.sirina, this.visina);	
}   // kraj crtaj


Karakter.prototype.crtajIzlazak = function() {
	if(this.trajanjeIzlaska) {
		scena.sadrzaj.drawImage(this.slika, this.x, this.y, this.sirina, this.visina);	
	}
}   // kraj crtaj


Karakter.prototype.crtajMrdanje = function() {
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

Karakter.prototype.dodeliPoziciju = function(pozicije) {
	var slucajno = Math.floor (Math.random() * pozicije.length);
	this.x = pozicije[slucajno][0];
	this.y = pozicije[slucajno][1];
	//log(this.x, this.y)
}   // kraj dodeliPoziciju


Karakter.prototype.nadjiSlobodnoMesto = function (karakteri) {
	this.dodeliPoziciju(scena.pozicije)
	while ( this.proveriSveSudare(karakteri) ) {
		this.dodeliPoziciju(scena.pozicije)
	}
}   // kraj naSlobodnomCrtaj


/* IZLAZ I PAUZA */

Karakter.prototype.dodeliIzlazak = function(vreme, min, max){
	if(this.nemaStanja()) { 
		this.odrediDuzinuIzlaska(vreme, min, max)
		this.dodeliPoziciju(scena.pozicije)
	}
}	// kraj dodeliIzlazak


Karakter.prototype.odrediDuzinuIzlaska = function(vreme, min, max){
	this.trajanjeIzlaska = vreme.trajanjeSlucajno(min, max);
	this.krajIzlaska = vreme.sadasnje() + this.trajanjeIzlaska;	
}	// odrediDuzinuIzlaska


Karakter.prototype.proveravajIzlazak = function(vreme){
	if(this.krajIzlaska <= vreme.sadasnje()) {
		this.trajanjeIzlaska = 0;
		this.vrstaAnimacije = 0;
		// zapocniPauzu
	}
}	// proveravajIzlazak


Karakter.prototype.dodeliPauzu = function(vreme, min, max){
	if(!this.trajanjeIzlaska && !this.trajanjePauze){
		this.trajanjePauze = vreme.trajanjeSlucajno(min, max);
		this.krajPauze = vreme.sadasnje() + this.trajanjePauze;
	}
}	// kraj dodeliPauzu


Karakter.prototype.proveravajPauzu = function(vreme){
	if(this.krajPauze <= vreme.sadasnje()) {
		this.trajanjePauze = 0;
	}
}	// proveravajPauzu


/* MRDANJE */

Karakter.prototype.dodeliAnimaciju = function(){
	if(this.upravoIzlazi() && !this.vrstaAnimacije) {
		this.vrstaAnimacije = Math.floor((Math.random() * 2) + 1);
		this.zapamcen_x = this.x;
		this.zapamcen_y = this.y;
		switch(this.vrstaAnimacije) {
			case 1:
				this.y += 20;	// startna pozicija
				break;
			case 2:
				this.x -= 20;	// startna pozicija
				break;
		}	// switch
	}
}	// dodeliAnimaciju


Karakter.prototype.azurirajAnimaciju = function(){
	if(this.upravoIzlazi()) {
		switch(this.vrstaAnimacije) {
			case 1:
				this.mrdajGore()
				break;
			case 2:
				this.mrdajDesno()
				break;
		}	// switch
	}
}	// azurirajAnimaciju()


Karakter.prototype.mrdajGore = function(){
	if(!this.obrniSmer) {
		this.y--;
	}
	if(this.obrniSmer) {
		this.y++;
	}
	if(this.y < this.zapamcen_y) {
		this.obrniSmer = true;
	}
	if(this.y > this.zapamcen_y + 40) {
		this.obrniSmer = false;
	}
}	// mrdajGore

Karakter.prototype.mrdajDesno = function(){
	if(!this.obrniSmer) {
		this.x++;	
	}
	if(this.obrniSmer) {
		this.x--;
	}	
	
	if(this.x > this.zapamcen_x + 100) {
		this.obrniSmer = true;
	}
	if(this.x < this.zapamcen_x - 100) {
		this.obrniSmer = false;
	}	
	
}	// mrdajDesno


/* KOLIZIJA */

// preimenovati u proveriSudar
Karakter.prototype.sudar = function(karakter){
	return proveriSudar(this, karakter)
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

// ne radi crtaKukanje!
Karakter.prototype.crtaKukanje = function(kursor){
	var jauk = this.jauk || "Jaoj, to boli!";
	var max_sirina_teksta = 250;
	scena.sadrzaj.font = "30px Verdana";	
	scena.sadrzaj.lineWidth = 1;
	scena.sadrzaj.fillText(jauk, kursor.zapamcen_x+30, kursor.zapamcen_y, max_sirina_teksta);
	scena.sadrzaj.strokeText(jauk, kursor.zapamcen_x+30, kursor.zapamcen_y, max_sirina_teksta);
}   // kraj crtaKukanje


/*
Karakter.prototype.kukaPogodjen = function(kursor){
	if(this.pogodjen) {
		this.crtaKukanje(kursor);
	}		
}
*/

Karakter.prototype.dodeliParolu = function(){
	// ako nema parolu
	if(this.nemaStanja()) {
		var slucaj = Math.floor( Math.random() * this.parole.length )
		this.parola = this.parole[slucaj];		
	}
}	// dodeliParolu


Karakter.prototype.bacaParole = function(){
	if(this.upravoIzlazi()) {
		var maxSirina = 200;
		crtaBalonce(
			scena.sadrzaj, 						// podloga
			this.zapamcen_x * 0.96, 			// x
			this.zapamcen_y - this.visina * 1.2, // y
			maxSirina * 1.2, 					// sirina
			70, 								// visina
			30
		)	// crtaBalonce
		piseTekst(
			scena.sadrzaj, 						// podloga
			this.parola, 						// tekst
			this.zapamcen_x, 					// x
			this.zapamcen_y - this.visina * 0.7, // y 
			"#000", 							// boja teksta
			30, 								// visina
			maxSirina							// sirina
		)	// piseTekst
	}
}   // kraj bacaParole


/* POMOĆNE */

Karakter.prototype.nemaStanja = function(){
	return !this.trajanjeIzlaska && !this.trajanjePauze;
}	// nemaStanja


Karakter.prototype.upravoIzlazi = function(){
	return this.trajanjeIzlaska && !this.trajanjePauze
}	// upravoIzlazi


Karakter.prototype.upravoPauzira = function(){
	return this.trajanjePauze && !this.trajanjeIzlaska
}	// upravoPauzira

