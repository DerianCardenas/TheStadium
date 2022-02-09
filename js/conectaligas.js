function premier(){
    fetch("https://v3.football.api-sports.io/leagues?search=premier league", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "14f44082a9ec83a9b7546335315189b7"
        }
    })
    .then(response => response.json())
    .then(result => creapremier(result.response[0]))
    .catch(error => console.log('error', error));     
}
function lfp(){
    fetch("https://v3.football.api-sports.io/leagues?search=la liga", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "14f44082a9ec83a9b7546335315189b7"
        }
    })
    .then(response => response.json())
    .then(result => crealfp(result.response[0]))
    .catch(error => console.log('error', error));     
}
function seriea(){
    fetch("https://v3.football.api-sports.io/leagues?search=serie a", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "14f44082a9ec83a9b7546335315189b7"
        }
    })
    .then(response => response.json())
    .then(result => creaseriea(result.response[1]))
    .catch(error => console.log('error', error));     
}
function bundes(){
    fetch("https://v3.football.api-sports.io/leagues?search=bundesliga 1", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "14f44082a9ec83a9b7546335315189b7"
        }
    })
    .then(response => response.json())
    .then(result => creabundes(result.response[0]))
    .catch(error => console.log('error', error));     
}
function ligue(){
    fetch("https://v3.football.api-sports.io/leagues?search=ligue 1", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "14f44082a9ec83a9b7546335315189b7"
        }
    })
    .then(response => response.json())
    .then(result => crealigue(result.response[0]))
    .catch(error => console.log('error', error));     
}
function creapremier(premierleague){
    console.log(premierleague);
    let premier = document.getElementById("premier");
    let imgcont = document.createElement("div");
    let logo = document.createElement("img");
    logo.src=premierleague.league.logo;
    let conttext = document.createElement("div");
    let name = document.createElement("h3");
    name.innerText = premierleague.league.name;
    let texto = document.createElement("p");
    texto.innerText="Started at: "+premierleague.seasons[11].start+", possible end at: "+premierleague.seasons[11].end;
    imgcont.append(logo);
    imgcont.className="imgcont";
    conttext.append(name,texto);
    premier.append(imgcont,conttext);
}
function crealfp(laliga){
    console.log(laliga);
    let lfp = document.getElementById("lfp");
    let imgcont = document.createElement("div");
    let logo = document.createElement("img");
    logo.src=laliga.league.logo;
    let conttext = document.createElement("div");
    let name = document.createElement("h3");
    name.innerText = laliga.league.name;
    let texto = document.createElement("p");
    texto.innerText="Started at: "+laliga.seasons[11].start+", possible end at: "+laliga.seasons[11].end;
    imgcont.append(logo);
    imgcont.className="imgcont";
    conttext.append(name,texto);
    lfp.append(imgcont,conttext);
}
function creaseriea(seriea){
    console.log(seriea);
    let atim = document.getElementById("atim");
    let imgcont = document.createElement("div");
    let logo = document.createElement("img");
    logo.src=seriea.league.logo;
    let conttext = document.createElement("div");
    let name = document.createElement("h3");
    name.innerText = seriea.league.name;
    let texto = document.createElement("p");
    texto.innerText="Started at: "+seriea.seasons[11].start+", possible end at: "+seriea.seasons[11].end;
    imgcont.append(logo);
    imgcont.className="imgcont";
    conttext.append(name,texto);
    atim.append(imgcont,conttext);
}
function creabundes(bundesliga){
    console.log(bundesliga);
    let bundes = document.getElementById("bundes");
    let imgcont = document.createElement("div");
    let logo = document.createElement("img");
    logo.src=bundesliga.league.logo;
    let conttext = document.createElement("div");
    let name = document.createElement("h3");
    name.innerText = bundesliga.league.name;
    let texto = document.createElement("p");
    texto.innerText="Started at: "+bundesliga.seasons[11].start+", possible end at: "+bundesliga.seasons[11].end;
    imgcont.append(logo);
    imgcont.className="imgcont";
    conttext.append(name,texto);
    bundes.append(imgcont,conttext);
}
function crealigue(ligueone){
    console.log(ligueone);
    let ligue1 = document.getElementById("ligue1");
    let imgcont = document.createElement("div");
    let logo = document.createElement("img");
    logo.src=ligueone.league.logo;
    let conttext = document.createElement("div");
    let name = document.createElement("h3");
    name.innerText = ligueone.league.name;
    let texto = document.createElement("p");
    texto.innerText="Started at: "+ligueone.seasons[11].start+", possible end at: "+ligueone.seasons[11].end;
    imgcont.append(logo);
    imgcont.className="imgcont";
    conttext.append(name,texto);
    ligue1.append(imgcont,conttext);
}
function conneclig(){
    premier();
    lfp();
    seriea();
    bundes();
    ligue();
}
conneclig();