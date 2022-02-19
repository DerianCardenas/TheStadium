const rmChildsNodes = (parent)=>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}
document.getElementById("btnplayersearch").addEventListener("click",()=>{
    var busqteamid = document.getElementById("teamid").value;
    var busqname = document.getElementById("namep").value;
    var busqseason = document.getElementById("season").value;
    document.getElementById("teamid").value='';
    document.getElementById("namep").value='';
    document.getElementById("season").value='';
    if(busqname!=''&&busqseason!=''&&busqteamid!=''){
        console.log("Buscar al jugador "+busqname+" en la temporada "+busqseason+" con el equipo "+busqteamid);
        fetch("https://v3.football.api-sports.io/players?team="+busqteamid+"&search="+busqname+"&season="+busqseason, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "v3.football.api-sports.io",
                    "x-rapidapi-key": "14f44082a9ec83a9b7546335315189b7"
                }
            })
            .then(response => response.json())
            .then(result => crateplayers(result.response[0]))
            .catch(error => console.log('error', error)); 
    }
    else{
        alert("PLEASE FILL THE NECESARY PARAMS");
    }
})
function crateplayers  (jugador) {
    console.log(jugador);
    var containersupreme = document.getElementById("resultados");
    rmChildsNodes(containersupreme);
    var contplayer = document.createElement("div");
    contplayer.className="contplayer";
    var contprofile = document.createElement("div");
    let profileimg = document.createElement("img");
    profileimg.className="profileimg";
    var continfo = document.createElement("div");
    continfo.className="continfotxt";
    var infotext = document.createElement("p");
    var contstadistics = document.createElement("div");
    var info = "Name: "+jugador.player.firstname+" "+jugador.player.lastname+"\nID: "+jugador.player.id;
    info+="\n\nAge (Actual): "+jugador.player.age+" Height: "+jugador.player.height+" Weight: "+jugador.player.weight;
    info+="\n\nBirth City: "+jugador.player.birth.place+" \nDate: "+jugador.player.birth.date+" Country: "+jugador.player.birth.country;
    profileimg.src=jugador.player.photo;
    infotext.innerText=info;
    continfo.append(infotext);
    var stadistics = '';
    for(let i = 0; i < jugador.statistics.length; i++){
        let liga = jugador.statistics[i].league.name;
        let pais = jugador.statistics[i].league.country;
        let amarillas = jugador.statistics[i].cards.yellow;
        let rojas = jugador.statistics[i].cards.red;
        let amaroja = jugador.statistics[i].cards.yellowred;
        let goles = jugador.statistics[i].goals.total;
        let asistencias = jugador.statistics[i].goals.assists;
        let recibidos = jugador.statistics[i].goals.conceded;
        if (pais == null) pais = 'Unknown';
        if (rojas == null) rojas = 0;
        if (amarillas == null) amarillas = 0;
        if (amaroja == null) amaroja = 0;
        if (goles == null) goles = 0;
        if (asistencias == null) asistencias = 0;
        if (recibidos == null) recibidos = 0;
        stadistics+="Competition = "+liga+" -  Country = "+pais+"\n";
        stadistics+="\nCards = Y("+amarillas+") R("+rojas+") RY("+amaroja+")\n";
        stadistics+="\nGoals = "+goles+" Assist = "+asistencias+" Conceded = "+recibidos+"\n\n";
    }
    contstadistics.innerText=stadistics;
    contprofile.append(profileimg,continfo);
    contplayer.append(contprofile,contstadistics);
    containersupreme.append(contplayer);
}