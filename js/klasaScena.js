
function Scena(platno_id, pozadina_src) {

    this.platno = document.getElementById(platno_id);
    this.platno.height = window.innerHeight;
    this.platno.width = window.innerWidth;

    this.sadrzaj = this.platno.getContext('2d');
    this.sadrzaj.font = "30px Verdana";
    this.sadrzaj.fillStyle = "white";
    this.sadrzaj.strokeStyle = 'black';
    var sadrzaj = this.sadrzaj;                 // proglašava varijablu da bi je poslao nižoj funkciji

    this.pozadina = new Image();
    this.pozadina.onload = function() {                                     // this je ovde scena
        this.nova_visina = (window.innerWidth / this.width) * this.height;  // this je ovde pozadina, prilagodjava visinu
        sadrzaj.drawImage(this, 0, 0, window.innerWidth, this.nova_visina);
    };
    this.pozadina.src = pozadina_src;
	
	
	this.ucitajSlike = function(slike, povratnaRadnja){
		var brojSlika = Object.keys(slike).length;
		var ucitaneSlike = 0;
		for (var kljuc in slike) {
			var ova_slika = new Image(); 
			ova_slika.onload = function kadSveUcita() {
				ucitaneSlike++;
				if (ucitaneSlike >= brojSlika) {
					povratnaRadnja();
				}
			};  // kraj kadSveUcita()
			ova_slika.src = slike[kljuc];
		}	// kraj for
	}	// kraj ucitajSlike
	
	/*
	this.uvodiLikove = function(likovi){
		// mozda vreme igre podeliti brojem likova, i na toliko uvoditi
		window[Object.keys(likovi)[0]].uveden_u_igru = true;	
		
		if(vreme_igre <= 20) {
			window[Object.keys(likovi)[1]].uveden_u_igru = true;
		}
		if(vreme_igre <= 10) {
			window[Object.keys(likovi)[2]].uveden_u_igru = true;
		}
	}	// kraj uvodiLikove
	*/
}


function uvodiLikove(){
	// prepraviti da ih hvata iz likovi, po redosledu, ne po imenu
    dacic.uveden_u_igru = true;

    if(vreme_igre <= 20) {
        vulin.uveden_u_igru = true;
    }
    if(vreme_igre <= 10) {
        toma.uveden_u_igru = true;
    }
}


// dodati Sceni
function crtajSlike(){
    nivo1.sadrzaj.drawImage(nivo1.pozadina, 0, 0, window.innerWidth, nivo1.pozadina.nova_visina);
    for(var i=0; i<karakteri.length; i++){
        if(karakteri[i].uveden_u_igru){
            karakteri[i].crtaj();
        }
    }
} // kraj crtajSlike

// dodati Sceni
function dodeliPozicije(){
    dacic.slucajnaPozicija();
    vulin.nadjiSlobodnuPoziciju(karakteri);
    toma.nadjiSlobodnuPoziciju(karakteri);
}


// dodati Sceni
function slucajniProzor(){
    var gornja_osa = nivo1.pozadina.nova_visina/4;
    var donja_osa = nivo1.pozadina.nova_visina/1.53;
    var slucajna_pozicija = Math.floor(Math.random() * 6);
    pozicije_prozora = [
        [window.innerWidth/5.9, gornja_osa],             // prvi prozor
        [window.innerWidth/2.2, gornja_osa],             // drugi prozor
        [window.innerWidth/1.35, gornja_osa],
        [window.innerWidth/5.9, donja_osa],
        [window.innerWidth/2.2, donja_osa],
        [window.innerWidth/1.35, donja_osa]
    ]
    return [pozicije_prozora[slucajna_pozicija][0], pozicije_prozora[slucajna_pozicija][1]];
}


// dodati Sceni
function prikaziPoene(){
    nivo1.sadrzaj.fillStyle="#000";
    nivo1.sadrzaj.fillRect(20,80,180,100);
    nivo1.sadrzaj.stroke();
    nivo1.sadrzaj.fillStyle="#FFF";
    nivo1.sadrzaj.font = "24px Verdana";
    nivo1.sadrzaj.fillText("Poeni: " + poeni, 30, 120);
    nivo1.sadrzaj.fillText("Vreme: " + vreme_igre, 30, 160);
}



// dodati Sceni
function pustiUvod(){
    // pravi uvodnu animaciju
    uvodna_spica = requestAnimationFrame(uvodnaSpica);
}


// dodati Sceni
function uvodnaSpica(){
    nivo1.sadrzaj.fillStyle = "black";
    nivo1.sadrzaj.fillRect(0, 0, window.innerWidth, window.innerHeight);
    nivo1.sadrzaj.fillStyle="#fff";
    nivo1.sadrzaj.font = "48px Verdana";
    nivo1.sadrzaj.fillText("Spremi se za obracun!", uvodna_slova_x += 5, uvodna_slova_y);
    if(uvodna_slova_x > innerWidth-100) {
        uvodna_slova_x = -100;
        uvodna_slova_y += 100;
    }
    if(uvodna_slova_y > innerHeight - 100) {
        uvodna_slova_y = 200;
    }
    uvodna_spica = requestAnimationFrame(uvodnaSpica);
}


// dodati Sceni
function reagujNaKlik(event){
    misX = event.clientX;
    misY = event.clientY;

    if(uvod){
        cancelAnimationFrame(uvodna_spica);
        postaviScenu();
        igranje = true;
        uvod = false;
    }

    if(igranje){
        proveriPogodak(dacic);
        proveriPogodak(toma);
        proveriPogodak(vulin);
        prikaziPoene();
    }
}


// dodati Sceni
function proveriKraj(){
    if(vreme_igre < 1) {
        cancelAnimationFrame(ovaAnimacija);
        nivo1.sadrzaj.fillRect(window.innerWidth/2 - window.innerWidth/4, window.innerHeight/2 - window.innerHeight/4, window.innerWidth/2, window.innerHeight/2);
        nivo1.sadrzaj.fillStyle="#000";
        nivo1.sadrzaj.font = "48px Verdana";
        nivo1.sadrzaj.fillText("Igra je završena!", window.innerWidth/2 - window.innerWidth/4 + 100, window.innerHeight/2 - window.innerHeight/4 + 100);
        igranje = false;
    }
}



// dodaje likove
function Scena2(pozadina, platno){
    this.sirina = window.innerWidth;
    this.visina = window.innerHeight;
    this.platno = $("#platno");     // ako nije dato platno, da ga sam dodaje
    this.platno.width = this.sirina;
    this.platno.height = this.visina;
    this.platno.style.backgroundColor = "black";
    this.sadrzaj = this.platno.getContext("2d");

    this.odrediDimenzije = function(){
        // ili prilagodiPozadinu() ili racunaProporcije() za sve
    }

    this.raspolozivePozicije = function(){
        //
    }

    this.crtaPozadinu = function(){

    }

    this.mrdaPozadinu = function(){

    }

    this.slucajniProzor = function(){
        // ili slobodan prozor
    }

    this.crtaLikove = function(){
        // ili crtaju sebe?
    }

    this.proveriJelNapustio = function(){
        //
    }

    this.brisi = function(){
        this.sadrzaj.clearRect(0, 0, this.sirina, this.visina);
    }

    this.promeniBoju = function(color){
        this.platno.style.backgroundColor = color;
    } // end this.setBG

    this.getMouseX = function(){
        //incorporate offset for canvas position
        return document.mouseX - this.left;
    }

    this.getMouseY = function(){
        //incorporate offset for canvas position
        return document.mouseY - this.top;
    }

    this.getMouseClicked = function(){
        return document.mouseClicked;
    }

}

