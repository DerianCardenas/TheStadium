const rmChildsNodes = (parent)=>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}
document.getElementById("searchbtn").addEventListener("click",()=>{
    var busqueda = document.getElementById("searchbar").value;
    if(busqueda=='')
        alert("Introduzca un nombre de liga");
    else{
        document.getElementById("searchbar").value ='';
        fetch("https://v3.football.api-sports.io/leagues?search="+busqueda, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "14f44082a9ec83a9b7546335315189b7"
            }
        })
        .then(response => response.json())
        .then(result => displayligas(result.response))
        .catch(error => console.log('error', error)); 
    }
})
function displayligas(resultados){
    var container = document.getElementById("resultados");
    container.style.display="grid";
    rmChildsNodes(container);
    for(let i = 0; i < resultados.length;i++){
        console.log(liga);
        var liga = resultados[i];
        let contliga = document.createElement("div");
        contliga.className="card";
        let continfo = document.createElement("div");
        continfo.className="info";
        let nombre = document.createElement("h1");
        nombre.className="title";
        let info = document.createElement("div");
        let band = document.createElement("img");
        let texto = document.createElement("p");
        info.className="description"
        contliga.style.backgroundImage="url('"+liga.league.logo+"')";
        nombre.innerText=liga.league.name;
        texto.innerText="The "+liga.league.name+" is a "+liga.league.type+" competition in "+liga.country.name+"\nYou can search more about this league with his id: "+liga.league.id;
        band.src=liga.country.flag;
        info.append(texto,band);
        continfo.append(nombre,info);
        contliga.append(continfo);
        container.appendChild(contliga);
    }
}
document.getElementById("searchbtnid").addEventListener("click",()=>{
    let ident = document.getElementById("searchbarid").value;
    if(ident=='')
        alert("Introduzca un ID de liga");
    else{
        document.getElementById("searchbarid").value ='';
        console.log("Buscar id: "+ident)
        fetch("https://v3.football.api-sports.io/leagues?id="+ident, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "14f44082a9ec83a9b7546335315189b7"
            }
        })
        .then(response => response.json())
        .then(result => displayliga(result.response))
        .catch(error => console.log('error', error)); 
    }
})
function displayliga(resultado){
    var container = document.getElementById("resultados");
    container.style.display="block";
    rmChildsNodes(container);
    var liga = resultado[0];
    let cardunit = document.createElement("div");
    cardunit.className="cardunit";
    let logocont = document.createElement("div");
    logocont.className="logocont";
    let imglogo = document.createElement("img");
    imglogo.className="ligalogo";
    let infocont = document.createElement("div");
    infocont.className="infocont";
    let infounit = document.createElement("p");
    infounit.className="infounit";
    imglogo.src=liga.league.logo;
    infounit.innerText="The "+liga.league.name+" is a "+liga.league.type+" competition in "+liga.country.name+"\nThis year, the teams that clash are these";
    fetch("https://v3.football.api-sports.io/teams?league="+liga.league.id+"&season=2021", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "14f44082a9ec83a9b7546335315189b7"
            }
        })
        .then(response => response.json())
        .then(result => displayteamsbyleague(result.response, container))
        .catch(error => console.log('error', error)); 
    logocont.append(imglogo);
    infocont.appendChild(infounit);
    cardunit.append(logocont,infocont);
    container.appendChild(cardunit);
}
function displayteamsbyleague(equipos, container){
    let contteams = document.createElement("div");
    contteams.className="contteams";
    for(let i = 0; i < equipos.length; i++){
        var equipo = equipos[i];
        console.log(equipo);
        let contequipo = document.createElement("div");
        contequipo.className="contequipo";
        let contlogo = document.createElement("div");
        let logoequipo = document.createElement("img");
        let contdet = document.createElement("div");
        let nombreeq = document.createElement("h4");
        let infoeq = document.createElement("p");
        let estadioeq = document.createElement("img");
        logoequipo.src=equipo.team.logo;
        nombreeq.innerText = equipo.team.code+" - "+equipo.team.name;
        infoeq.innerText = "Foundation date: "+equipo.team.founded+".\nStadium: "+equipo.venue.name+".\nCapacity: "+equipo.venue.capacity+".\nCity: "+equipo.venue.city;
        estadioeq.src=equipo.team.image;
        contdet.append(nombreeq,infoeq);
        contlogo.append(logoequipo);
        contequipo.append(contlogo,contdet);
        contteams.append(contequipo);
        console.log(contequipo);
    }
    container.append(contteams);
}
document.getElementById("searchbtncountry").addEventListener("click",()=>{
    let pais = document.getElementById("searchbarcountry").value;
    if(pais=='')
        alert("Introduzca un pais de liga");
    else{
        document.getElementById("searchbarcountry").value ='';
        console.log("Buscar pais: "+pais)
        fetch("https://v3.football.api-sports.io/leagues?country="+pais, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "14f44082a9ec83a9b7546335315189b7"
            }
        })
        .then(response => response.json())
        .then(result => console.log(result.response))
        .catch(error => console.log('error', error)); 
    }
})