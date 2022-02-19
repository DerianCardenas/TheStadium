const rmChildsNodes = (parent)=>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}
document.getElementById("btnstandsearch").addEventListener("click",()=>{
    var liga = document.getElementById("leagueid").value;
    var temp = document.getElementById("season").value;
    if(liga!='' && temp!= ''){
        fetch("https://v3.football.api-sports.io/standings?league="+liga+"&season="+temp, {
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "v3.football.api-sports.io",
                            "x-rapidapi-key": "14f44082a9ec83a9b7546335315189b7"
                        }
                    })
                    .then(response => response.json())
                    .then(result => createstanding(result.response))
                    .catch(error => alert('error', error)); 
    }
    else{
        alert("Introduce the necessary parameters")
    }
})
function createstanding(liga){
    var contsupreme = document.getElementById("resultados");
    console.log(liga);
    rmChildsNodes(contsupreme);
    var contliga = document.createElement("div");
    contliga.className="contliga";
    var infoliga = liga[0].league.name + " - " + liga[0].league.country + " - ID: "+liga[0].league.id + "\n";
    var logoliga = document.createElement("img");
    logoliga.className="logoliga";
    logoliga.src = liga[0].league.logo;
    var logopais = document.createElement("img");
    logopais.className="logopais";
    logopais.src = liga[0].league.flag;
    var titulo =document.createElement("h3");
    titulo.innerText = infoliga;
    contliga.append(logoliga, logopais);
    contsupreme.append(titulo,contliga);
    for(let i = 0; i < liga[0].league.standings.length;i++){
        var grupo = document.createElement("h3");
        grupo.innerText=liga[0].league.standings[i][0].group;
        var tabla = liga[0].league.standings[i];
        var standing = document.createElement("div");
        standing.className="standing";
        standing.append(grupo);
        for( let j = 0; j < tabla.length;j++){
            /* VARIABLES Y CLASES */
            var equipocompleto = document.createElement("div");
            equipocompleto.className="equipocompleto";
            var infoequipo = document.createElement("div");
            infoequipo.className="infoequipo";
            var nombre = document.createElement("p");
            var equipologo = document.createElement("img");
            equipologo.className="equipologo"
            var flecha = document.createElement("i");
            var estado = tabla[j].status;
            var detallesequipo = document.createElement("div");
            detallesequipo.className="detallesequipo";
            /* ASIGNACIÓN */
            nombre.innerText ="Name: "+tabla[j].team.name+ " \nPos: "+tabla[j].rank;
            equipologo.src= tabla[j].team.logo;
            /* DATOS EQUIPOS */
            var played = document.createElement("div");
            played.innerText = tabla[j].all.played;
            var wins = document.createElement("div");
            wins.style.backgroundColor="green";
            wins.innerText = tabla[j].all.win;
            var draw = document.createElement("div");
            draw.style.backgroundColor="gray";
            draw.innerText = tabla[j].all.draw;
            var lose = document.createElement("div");
            lose.style.backgroundColor="red";
            lose.innerText = tabla[j].all.lose;
            var gf = document.createElement("div");
            gf.innerText = tabla[j].all.goals.for;
            var gc = document.createElement("div");
            gc.innerText = tabla[j].all.goals.against;
            var gdif = document.createElement("div");
            gdif.innerText = tabla[j].all.goals.for - tabla[j].all.goals.against;
            if(tabla[j].all.goals.for - tabla[j].all.goals.against>0)
                gdif.style.backgroundColor="green";
            else if(tabla[j].all.goals.for - tabla[j].all.goals.against<0)
                gdif.style.backgroundColor="red";
            else
                gdif.style.backgroundColor="gray";
            var pts = document.createElement("div");
            pts.innerHTML = tabla[j].points;
            /* FLECHAS */
            if(estado == 'up')
                flecha.className="fa-solid fa-square-up";
            else if(estado == 'down')
                flecha.className="fa-solid fa-square-down";
            else
                flecha.className="fa-solid fa-left-right"
            /* DETALLES FINALES */
            detallesequipo.append(played,wins,draw,lose,gf,gc,gdif,pts);
            infoequipo.append(nombre,equipologo,flecha);
            equipocompleto.append(infoequipo,detallesequipo);
            standing.append(equipocompleto);
        }   
        contsupreme.append(standing);
    }
}