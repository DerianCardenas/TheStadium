const main = ()=>{
        var container = document.getElementById("resultados");
        const rmChildsNodes = (parent)=>{
            while(!parent.firstChild){
                console.log(parent.firstChild);
                parent.removeChild(parent.firstChild);
            }
        }
        document.getElementById("searchbtn").addEventListener("click",()=>{
            var busqueda = document.getElementById("searchbar").value;
            if(busqueda=='')
                alert("Introduzca un nombre de liga");
            else{
                document.getElementById("searchbar").value ='';
                rmChildsNodes(container);
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

                function displayligas(resultados){
                    for(let i = 0; i < resultados.length;i++){
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
            }
        })

    }

    document.addEventListener('DOMContentLoaded',main);