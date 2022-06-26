const search = document.querySelector("#searchInput");
const botao = document.querySelector("button");

botao.addEventListener("click", buscarEndereco);

async function buscarEndereco(event){

    event.preventDefault();

    if (search.value !== ""){

        let req = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
            ${encodeURI(search.value)}&units=metric&lang=pt_br&appid=d06cdb298fafc83c520d5ab677fc477e`);

        let json = await req.json();


        if (json.cod === 200){

            showWarning("Carregando...")
            showWarning("");

            document.querySelector(".aviso").style.display = "none";

            document.querySelector(".resultado").style.display = "block";

            objeto({

                name: json.name,
                country: json.sys.country,
                weather: json.weather[0].icon,
                temp: json.main.temp,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg

            });

            
        }

        else{

            document.querySelector(".aviso").style.display = "block";
            showWarning("Carregando...");
            cleanWarning();
            showWarning("O local digitado não foi encontrado!");

        }

    }

}


function showWarning(msg){

    document.querySelector(".aviso").innerHTML = msg;
}

function cleanWarning(){

    showWarning("")
    document.querySelector(".resultado").style.display = "none";
    
}

function objeto(obj){

    document.querySelector(".titulo").innerHTML = `${obj.name}, ${obj.country}`;
    document.querySelector(".tempInfo").innerHTML = `${obj.temp.toFixed()} <sup>ºC<sup>`;
    document.querySelector(".temp img").setAttribute("src", `http://openweathermap.org/img/wn/${obj.weather}@2x.png`);
    document.querySelector(".ventoInfo").innerHTML = `${obj.windSpeed.toFixed(1)} <span>km/h</span>`;
    document.querySelector(".ventoPonto").style.transform = `rotate(${obj.windAngle-90}deg)`;
}

