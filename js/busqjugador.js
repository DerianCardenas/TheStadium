const rmChildsNodes = (parent)=>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}
document.getElementById("btnplayersearch").addEventListener("click",()=>{
    var busqplayerid = document.getElementById("playerid").value;
    var busqteamid = document.getElementById("teamid").value;
    var busqleagueid = document.getElementById("leagueid").value;
    var busqseason = document.getElementById("season").value;
    document.getElementById("playerid").value='';
    document.getElementById("teamid").value='';
    document.getElementById("leagueid").value='';
    document.getElementById("season").value='';
    if(busqplayerid!=''&&busqseason!=''){
        console.log("Buscar al ID "+busqplayerid+" en la temporada "+busqseason);
        fetch("https://v3.football.api-sports.io/players?id="+busqplayerid+"&season="+busqseason, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "v3.football.api-sports.io",
                    "x-rapidapi-key": "14f44082a9ec83a9b7546335315189b7"
                }
            })
            .then(response => response.json())
            .then(result => crateplayers(result.response))
            .catch(error => console.log('error', error)); 
    }
    else if(busqteamid!=''&&busqseason!=''){
        console.log("Buscar por el equipo "+busqteamid+" en la temporada "+busqseason);
        fetch("https://v3.football.api-sports.io/players?team="+busqteamid+"&season="+busqseason, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "v3.football.api-sports.io",
                    "x-rapidapi-key": "14f44082a9ec83a9b7546335315189b7"
                }
            })
            .then(response => response.json())
            .then(result => crateplayers(result.response))
            .catch(error => console.log('error', error)); 
    }
    else if(busqleagueid!=''&&busqseason!=''){
        console.log("Buscar la liga "+busqleagueid+" en la temporada "+busqseason);
        fetch("https://v3.football.api-sports.io/players?league="+busqleagueid+"&season="+busqseason, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "v3.football.api-sports.io",
                    "x-rapidapi-key": "14f44082a9ec83a9b7546335315189b7"
                }
            })
            .then(response => response.json())
            .then(result => crateplayers(result.response))
            .catch(error => console.log('error', error)); 
    }
    else{
        alert("PLEASE FILL THE NECESARY PARAMS");
    }
})
function crateplayers  (listado) {
    var containersupreme = document.getElementById("resultados");
    rmChildsNodes(containersupreme);
    for(let i = 0; i < listado.length; i++){
        let contplayer = document.createElement("div");
        contplayer.className="contplayer";
        let contimg = document.createElement("div");
        contimg.className="contimg";
        let photo = document.createElement("img");
        photo.src=listado[i].player.photo;
        let infofast = document.createElement("div");
        infofast.className="infofast";
        infofast.innerText=listado[i].player.name+" - Age: "+listado[i].player.age+" ID - "+listado[i].player.id;
        contimg.append(photo,infofast);
        let infodet = document.createElement("div");
        infodet.className="infodet";
        let text = document.createElement("p");
        let detalles='';
        detalles="First Name: "+listado[i].player.firstname+"\nLast Name: "+listado[i].player.lastname+"\nWeight: "+listado[i].player.weight+" Height: "+listado[i].player.height;
        detalles+="\nNationality: "+listado[i].player.birth.country+"\nBirth PLace: "+listado[i].player.birth.place+" Date: "+listado[i].player.birth.date;
        infodet.innerText=detalles;
        contplayer.append(contimg,infodet);
        containersupreme.append(contplayer);
    }
}
