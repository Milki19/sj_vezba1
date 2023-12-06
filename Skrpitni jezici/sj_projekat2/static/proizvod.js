var id = null;

window.addEventListener("load", function(){

    var url = new URL( window.location.href );
    id = url.searchParams.get("id");
    console.log(id);

    fetch("http://localhost:9000/proizvod/" + id).then( resp=>resp.json() )
    .then( data=>{
        console.log(data);
        document.getElementById("naziv").value = data.naziv; 
        document.getElementById("opis").value = data.opis; 
        document.getElementById("boja").value = data.boja; 
        document.getElementById("cena").value = data.cena;
        document.getElementById("kategorija").value = data.kategorija_id;
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
        noviProizvod.naziv = document.getElementById("naziv").value;
        noviProizvod.opis = document.getElementById("opis").value;
        noviProizvod.boja = document.getElementById("boja").value;
        noviProizvod.cena = document.getElementById("cena").value;
        noviProizvod.kategorija_id = document.getElementById("kategorija").value;
    
        fetch("http://localhost:9000/proizvod/" + id, {
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
        dodajSastojak( id );
    });

    document.getElementById("obrisi").addEventListener("click", function(){
        if( confirm("Potvrdi brisanje") ){
            fetch("http://localhost:9000/proizvod/"+id, { method:"DELETE" })
            .then( resp=>resp.json()).then(data=>{
                alert("Obrisan je zapis "+data);
                location.href= "proizvodi.html";
            })
            .catch( err=>console.log(err));
        } else {
            return;
        }
    });



});

function dodajSastojak(id){
    document.querySelector(`#spisak-odece > option[value='${id}']`).disabled = true;
    document.getElementById("spisak-odece").selectedIndex = 0;
    var naziv = document.querySelector(`#spisak-odece > option[value='${id}']`).innerHTML;
    var span = document.createElement("span");
    span.classList.add("badge");
    span.classList.add("bg-secondary");
    span.dataset.id = id;
    span.innerHTML = naziv;
    var button = document.createElement("button");
    button.type="button";
    button.classList.add("btn");
    button.classList.add("btn-default");
    button.classList.add("btn-sm");
    button.innerHTML = "X";
    span.appendChild(button);
    document.getElementById("kombinacija").appendChild(span);
    document.getElementById("kombinacija").appendChild(document.createTextNode(" "));
    button.addEventListener("click", function(){
        var id = this.parentNode.dataset.id;
        this.parentNode.parentNode.removeChild( this.parentNode );
        document.querySelector(`#spisak-odece > option[value='${id}']`).disabled = false;

    });

}

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

