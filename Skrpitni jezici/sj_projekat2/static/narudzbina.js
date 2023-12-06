var id = null;

window.addEventListener("load", function(){

    var url = new URL( window.location.href );
    id = url.searchParams.get("id");
    console.log(id);

    fetch("http://localhost:9000/narudzbina/" + id).then( resp=>resp.json() )
    .then( data=>{
        console.log(data);
        document.getElementById("zakazanoVreme").value = data.zakazanoVreme; 
        document.getElementById("status").value = data.status; 
        document.getElementById("cena").value = data.cena; 
        document.getElementById("adresa").value = data.adresa;
        document.getElementById("razlogDolaska").value = data.razlogDolaska;
    })
    .catch(err=>console.log(err));  

    document.getElementById("forma").addEventListener("submit", function(){
        event.preventDefault();	
        var validno = validacija();
        if(!validno){ 
            sacuvaj();
            return;
        }	
    
        var noviProizvod = {};
        noviProizvod.naziv = document.getElementById("zakazanoVreme").value;
        noviProizvod.opis = document.getElementById("status").value;
        noviProizvod.boja = document.getElementById("cena").value;
        noviProizvod.cena = document.getElementById("adresa").value;
        noviProizvod.kategorija_id = document.getElementById("razlogDolaska").value;
    
        fetch("http://localhost:9000/narudzbina/" + id, {
            method:"PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(noviProizvod)
        })
        .then( response=>response.json() )
        .catch( err=>{
            alert("Desila se greska");
            console.log(err);
        });	
    
        return;
    });


	document.getElementById("naziv").addEventListener("keypress", function(){
		this.classList.remove('success'); 
        this.classList.remove('error'); 
    });



    document.getElementById("forma").addEventListener("submit", function(){
        if( document.getElementById("naziv").value.length < 3 ){
            validno=false;
            document.getElementById("naziv").classList.add("error");
            document.getElementById("naziv").classList.remove("success");
        
        }else {
            document.getElementById("naziv").classList.remove("error");
            document.getElementById("naziv").classList.add("success");
        
        }

        var spanovi = document.querySelectorAll("#spisak-odece > span.badge");
        var niz = [];
        for(let i=0; i<spanovi.length; i++){
            niz.push(spanovi[i].dataset.id);
        }
        
        return validacija()
    });

    document.getElementById("dodaj-kombinaciju").addEventListener("click", function(){
        var id = document.getElementById("spisak-odece").value;
        
        if(!id){
            alert("Izaberi sastojak");
            return;
        }
        dodajSastojak(id);
    });

    document.getElementById("obrisi").addEventListener("click", function(){
        if( confirm("Potvrdi brisanje") ){
            fetch("http://localhost:9000/narudzbina/"+id, { method:"DELETE" })
            .then( resp=>resp.json()).then(data=>{
                alert("Obrisan je zapis "+data);
                location.href= "narudzbina.html";
            })
            .catch( err=>console.log(err));
        } else {
            return;
        }
    });



});

function validacija(){
    var validno = true;
    if(document.getElementById("naziv").value.length < 3){
        validno = false;
        document.getElementById("naziv").classList.add("error");
        document.getElementById("naziv").classList.remove("success");
    }
    else{
        document.getElementById("naziv").classList.add("success");
        document.getElementById("naziv").classList.remove("error");
    }

    return validno;
}

