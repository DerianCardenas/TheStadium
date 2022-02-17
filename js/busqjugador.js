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
    var containersupreme = document.getElementById("resultados");
    rmChildsNodes(containersupreme);
    var contplayer = document.createElement("div");
    contplayer.className="contplayer";
    var contprofile = document.createElement("div");
    let profileimg = document.createElement("img");
    profileimg.className="profileimg";
    var continfo = document.createElement("div");
    var infotext = document.createElement("p");
    infotext.className="infotext";
    var contstadistics = document.createElement("div");
    var info = "Name: "+jugador.player.firstname+" "+jugador.player.lastname+" ID: "+jugador.player.id;
    info+="\n\nAge (Actual):"+jugador.player.age+" Height: "+jugador.player.height+" Weight:"+jugador.player.weight;
    info+="\n\nBirth Info\nCity: "+jugador.player.birth.place+" Date: "+jugador.player.birth.date+" Country";
    profileimg.src=jugador.player.photo;
    infotext.append(info);
    continfo.append(infotext);
    contprofile.append(profileimg);
    var stadistics = '';
    for(let i = 0; i < jugador.statistics.length; i++){
        stadistics+="Competition = "+jugador.statistics[i].league.name+" Country = "+jugador.statistics[i].league.country+"\n";
        stadistics+="\nCards = Y("+jugador.statistics[i].cards.yellow+") R("+jugador.statistics[i].cards.red+") RY("+jugador.statistics[i].cards.yellowred+")\n";
        stadistics+="\nGoals = "+jugador.statistics[i].goals.total+" Assist = "+jugador.statistics[i].goals.assists+" Conceded = "+jugador.statistics[i].goals.conceded+"\n";
    }
    contstadistics.innerText=stadistics;
    contprofile.append(continfo);
    contplayer.append(contprofile,contstadistics);
    containersupreme.append(contplayer);
}