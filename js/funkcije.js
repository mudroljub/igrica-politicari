function razvuciPlatno(platno_id){
	var platno = document.getElementById(platno_id);        // ako nema platna, da sam stvara
	platno.width = window.innerWidth;
	platno.height = window.innerHeight;
	return platno;
}	// razvuciPlatno


function postaviSadrzaj(platno) {
	var sadrzaj = platno.getContext('2d');
	sadrzaj.font = "30px Verdana";
	sadrzaj.fillStyle = "white";
	sadrzaj.strokeStyle = 'black';
	return sadrzaj;		
}	// postaviSadrzaj


function mrdaSlova (nivo, brzinaX) {
	nivo.slova_x += brzinaX;
	if(nivo.slova_x > window.innerWidth - 100) {
		nivo.slova_x = nivo.slova_x_pocetno; 
		nivo.slova_y += nivo.slova_y_pocetno;
	}
	if(nivo.slova_y > window.innerHeight - 100) {
		nivo.slova_y = nivo.slova_y_pocetno;
	}
}	// _mrdaSlova


function prilagodiPozadinu (slika_pozadine){
	return (window.innerWidth / slika_pozadine.width) * slika_pozadine.height; 
}	// prilagodiPozadinu


function prilagodiSlova (velicina){
	var nova_velicina = velicina * (window.innerWidth / STANDARDNA_SIRINA_EKRANA);
	return nova_velicina;
}	// kraj prilagodiSlova


function prilagodiSliku(STANDARDNA_VISINA, slika){
	var nova_sirina = slika.width / (slika.height / STANDARDNA_VISINA);
	var nova_visina = STANDARDNA_VISINA;
	// prilagodjava sliku ekranu
	slika.width = nova_sirina * (window.innerWidth / scena.STANDARDNA_SIRINA);
	slika.height = nova_visina * (window.innerWidth / scena.STANDARDNA_SIRINA);
	return slika;
}	// prilagodiSliku


function proveriSudar(objekt1, objekt2){
	return (objekt1.x > objekt2.x && objekt1.x < objekt2.x + objekt2.sirina) && (objekt1.y > objekt2.y && objekt1.y < objekt2.y + objekt2.visina);
}	// proveriSudar


function crnEkran(nivo){
	nivo.sadrzaj.fillStyle = "#000";
	nivo.sadrzaj.fillRect(0, 0, nivo.platno.width, nivo.platno.height);
}	// crnEkran


function piseTekst(sadrzaj, tekst, x, y, boja, velicina, maxSirina){
	if(!maxSirina) maxSirina = 250;
	if(!boja) boja = "#000";
	if(!velicina) velicina = 30;
    var velicinaSlova = prilagodiSlova(velicina)
    sadrzaj.fillStyle = boja;
	sadrzaj.font = velicinaSlova + "px Verdana";
	sadrzaj.fillText(tekst, x, y, maxSirina);	
}	// piseTekst


function crtaBaloncic(sadrzaj, startX, startY, sirina, visina, radius) {
	var krajX = startX + sirina;
	var krajY = startY + visina;
	var putanja = new Path2D();
	
	putanja.moveTo(startX+radius, startY);
	putanja.lineTo(startX+radius*2, startY);
	putanja.lineTo(krajX-radius, startY);
	putanja.quadraticCurveTo(krajX, startY, krajX, startY+radius);
	putanja.lineTo(krajX, startY+visina-radius);
	putanja.quadraticCurveTo(krajX, krajY, krajX-radius, krajY);
	putanja.lineTo(startX+sirina/2, krajY);
	putanja.lineTo(startX+radius, krajY+radius/2);		// špic
	putanja.lineTo(startX+radius+10, krajY);
	putanja.quadraticCurveTo(startX, krajY, startX, krajY-radius);
	putanja.lineTo(startX, startY+radius);
	putanja.quadraticCurveTo(startX, startY, startX+radius, startY);
	
	sadrzaj.strokeStyle = "black";
	sadrzaj.lineWidth = "2";
	sadrzaj.stroke(putanja);
	sadrzaj.fillStyle="#fff";
	sadrzaj.fill(putanja);
}	// crtaBaloncic
