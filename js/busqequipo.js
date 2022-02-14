const rmChildsNodes = (parent)=>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}
document.getElementById("searchteambtn").addEventListener("click",()=>{
    var busqueda = document.getElementById("searchteambar").value;
    var searchcases = document.getElementById("searchcases");
    if(busqueda==''){
        alert("Put something...");
    }
    else{
        document.getElementById("searchteambar").value='';
        /* SEARCH BY NAME */
        if(searchcases.selectedIndex==0){
            fetch("https://v3.football.api-sports.io/teams?search="+busqueda, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "v3.football.api-sports.io",
                    "x-rapidapi-key": "14f44082a9ec83a9b7546335315189b7"
                }
            })
            .then(response => response.json())
            .then(result => displayteams(result.response))
            .catch(error => console.log('error', error)); 
        }
        /* SEARCH BY ID */
        else if(searchcases.selectedIndex==1){
            fetch("https://v3.football.api-sports.io/teams?id="+busqueda, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "v3.football.api-sports.io",
                    "x-rapidapi-key": "14f44082a9ec83a9b7546335315189b7"
                }
            })
            .then(response => response.json())
            .then(result => displayteams(result.response))
            .catch(error => console.log('error', error)); 
        }
        /* SEARCH BY COUNTRY */
        else{
            fetch("https://v3.football.api-sports.io/teams?country="+busqueda, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "v3.football.api-sports.io",
                    "x-rapidapi-key": "14f44082a9ec83a9b7546335315189b7"
                }
            })
            .then(response => response.json())
            .then(result => displayteams(result.response))
            .catch(error => console.log('error', error)); 
        }
    }
})
function displayteams (datos){
    var containersupreme  = document.getElementById("teamscontainer");
    rmChildsNodes(containersupreme);
    if(datos.length>50);
    console.log("Changing length: "+datos.length+" to: "+50);
    for(let i = 0; i < datos.length;i++){
        var equipo = datos[i];
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
        containersupreme.append(contequipo);
    }
}