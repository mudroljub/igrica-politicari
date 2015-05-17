
// primiti sirinu i visinu scene od prozora, nadalje koristiti to

function Scena(naziv_platna, izvor_pozadine) {
    var ova_scena = this;       // hvata sebe, za niže funkcije
	this.karakteri = [];		// popunjava funkcija praviLikove
    this.pozicije_prozora = []  // popunjava funkcija izracunajPozicije
    this.misX;
    this.misY;

    // napraviti ako nema platna da ga pravi
    this.platno = document.getElementById(naziv_platna);
    this.platno.height = window.innerHeight;
    this.platno.width = window.innerWidth;

    this.sadrzaj = this.platno.getContext('2d');
    this.sadrzaj.font = "30px Verdana";
    this.sadrzaj.fillStyle = "white";
    this.sadrzaj.strokeStyle = 'black';

    this.pozadina = new Image();
    this.pozadina.onload = function() {                                     // this je izvan scena
        this.nova_visina = (window.innerWidth / this.width) * this.height;  // this je unutra pozadina, prilagodjava visinu
    };
    this.pozadina.src = izvor_pozadine;

	
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


    // uzima niz likova, pretvara ih u karaktere i ređa u niz karaktera
	this.praviLikove = function(likovi){
		for (var ovaj_lik in likovi){
			window[ovaj_lik] = new Karakter(likovi[ovaj_lik], this);
			this.karakteri.push(window[ovaj_lik]);
		}   // kraj for
	}   // kraj praviLikove()


	// iscrtava pozadinu i aktivne karaktere
	this.crtajSlike = function(){
		this.sadrzaj.drawImage(this.pozadina, 0, 0, window.innerWidth, this.pozadina.nova_visina);
		for(var i=0; i < this.karakteri.length; i++){
			if(this.karakteri[i].uveden_u_igru){
				this.karakteri[i].crtaj();
			}
		}
	} // kraj crtajSlike


    this.izracunajPozicije = function(){
        var gornji_red = this.pozadina.nova_visina / gornji_f;
        var donji_red = this.pozadina.nova_visina / donji_f;
        var prvi_prozor = window.innerWidth / prvi_f;			// promeniti u scena.sirina
        var drugi_prozor = window.innerWidth / drugi_f;
        var treci_prozor = window.innerWidth / treci_f;

        this.pozicije_prozora = [
            [prvi_prozor, gornji_red],             // prvi prozor
            [drugi_prozor, gornji_red],             // drugi prozor
            [treci_prozor, gornji_red],
            [prvi_prozor, donji_red],
            [drugi_prozor, donji_red],
            [treci_prozor, donji_red]
        ]
    }   // kraj izracunajPozicije


	this.slucajniProzor = function(){
		var slucajna_pozicija = Math.floor(Math.random() * this.pozicije_prozora.length);
		return [this.pozicije_prozora[slucajna_pozicija][0], this.pozicije_prozora[slucajna_pozicija][1]];
	}	// kraj slucajniProzor


    this.ispisiPoene = function(poeni, vreme_igre){
        this.sadrzaj.fillStyle="#000";
        this.sadrzaj.fillRect(20,80,180,100);
        this.sadrzaj.stroke();
        this.sadrzaj.fillStyle="#FFF";
        this.sadrzaj.font = "24px Verdana";
        this.sadrzaj.fillText("Poeni: " + poeni, 30, 120);
        this.sadrzaj.fillText("Vreme: " + vreme_igre, 30, 160);        
    }


    // this je unutar funkcije platno, jer je na njega prikazen okidač !
    this.reagujNaKlik = function(event){
        ova_scena.misX = event.clientX;
        ova_scena.misY = event.clientY;

        if(uvod){
            cancelAnimationFrame(uvodna_spica);
            postaviScenu();
            igranje = true;
            uvod = false;
        }

        if(igranje){
            for(var i=0; i < ova_scena.karakteri.length; i++){
                ova_scena.karakteri[i].proveriPogodak();
             }
        }
    }   // kraj reagujNaKlik

}


// dodati Sceni
function proveriKraj(){
    if(vreme_igre < 1) {
        cancelAnimationFrame(ovaAnimacija);
        scena.sadrzaj.fillRect(window.innerWidth/2 - window.innerWidth/4, window.innerHeight/2 - window.innerHeight/4, window.innerWidth/2, window.innerHeight/2);
        scena.sadrzaj.fillStyle="#000";
        scena.sadrzaj.font = "48px Verdana";
        scena.sadrzaj.fillText("Igra je završena!", window.innerWidth/2 - window.innerWidth/4 + 100, window.innerHeight/2 - window.innerHeight/4 + 100);
        igranje = false;
    }
}



// dodati Sceni
function pustiUvod(){
    // pravi uvodnu animaciju
    scena.sadrzaj.fillStyle = "black";
    scena.sadrzaj.fillRect(0, 0, window.innerWidth, window.innerHeight);
    scena.sadrzaj.fillStyle="#fff";
    scena.sadrzaj.font = "48px Verdana";
    scena.sadrzaj.fillText("Spremi se za obracun!", uvodna_slova_x += 5, uvodna_slova_y);
    if(uvodna_slova_x > innerWidth-100) {
        uvodna_slova_x = -100;
        uvodna_slova_y += 100;
    }
    if(uvodna_slova_y > innerHeight - 100) {
        uvodna_slova_y = 200;
    }
    uvodna_spica = requestAnimationFrame(pustiUvod);
}


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

    this.mrdaPozadinu = function(){

    }

    this.proveriJelNapustio = function(){
        //
    }

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
