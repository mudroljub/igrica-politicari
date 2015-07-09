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


function piseSlova(nivo, tekst, slova_x, slova_y){
	nivo.sadrzaj.font = "48px Verdana";
	nivo.sadrzaj.fillStyle = "black";
	nivo.sadrzaj.fillRect(0, 0, nivo.platno.width, nivo.platno.height);
	nivo.sadrzaj.fillStyle="#fff";
	nivo.sadrzaj.fillText(tekst, slova_x, slova_y);
}	// _piseSlova


function mrdaSlova (nivo, brzinaX) {
	nivo.slova_x += brzinaX;
	if(nivo.slova_x > window.innerWidth-100) {
		nivo.slova_x = -100;
		nivo.slova_y += 100;
	}
	if(nivo.slova_y > window.innerHeight - 100) {
		nivo.slova_y = 200;
	}
}	// _mrdaSlova


function prilagodiPozadinu (slika_pozadine){
	return (window.innerWidth / slika_pozadine.width) * slika_pozadine.height; 
}	// prilagodiPozadinu


function prilagodiSlova (velicina){
	var nova_velicina = velicina * (scena.sirina / scena.STANDARDNA_SIRINA);
	return nova_velicina;
}	// kraj prilagodiSlova


function prilagodiSliku(STANDARDNA_VISINA, slika){
	var nova_sirina = slika.width / (slika.height / STANDARDNA_VISINA);
	var nova_visina = STANDARDNA_VISINA;
	// prilagodjava sliku ovom ekranu
	slika.width = nova_sirina * (window.innerWidth / scena.STANDARDNA_SIRINA);
	slika.height = nova_visina * (window.innerWidth / scena.STANDARDNA_SIRINA);
	return slika;
}	// prilagodiSliku


function proveriSudar(objekt1, objekt2){
	return (objekt1.x > objekt2.x && objekt1.x < objekt2.x + objekt2.sirina) && (objekt1.y > objekt2.y && objekt1.y < objekt2.y + objekt2.visina);
}	// proveriSudar
