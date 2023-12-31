function updateWeather() {
    navigator.geolocation.getCurrentPosition(showPosition);

    function showPosition(position) {
        console.log(position);
        const apiKey = '5a147778aba109dfd34507b1acd31ed5'; 
        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=' + apiKey;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                var temp = parseInt(data.main.temp - 273);
                var h1 = document.getElementById("weather");
                h1.innerHTML = `${temp}<sup>o</sup>C`;
                var datas  = document.getElementById("weatherdata");
                datas.innerHTML = data.weather[0].description;
                var location  = document.getElementById("location");
                location.innerHTML=data.name;
                updateImage(data.weather[0].id);
            })
            .catch(error => {
                var h1 = document.getElementById("weather");
                h1.innerHTML = 'Error!';
                var location  = document.getElementById("location");
                location.innerHTML = '';
                console.error('Error during fetch:', error.message);
            });
    }
}
function updateImage(id){
    var img = document.getElementById("wimg");
    if(id<600){
        img.setAttribute("src","./icons/thunderstorm.jpg");
    }else if(id<700){
        img.setAttribute("src","./icons/snow.jpg");
    }else if(id<800){
        img.setAttribute("src","./icons/atmosphere.jpg");
    }else if(id==800){
        img.setAttribute("src","./icons/sunny.jpg");
    }else{
        img.setAttribute("src","./icons/clouds.jpg");
    }
}
var input = document.querySelector("input");
        input.addEventListener("keyup", (e) => {
            if(e.key=="Enter"){
            var Location = input.value;
            const apiKey = '5a147778aba109dfd34507b1acd31ed5'; 
            const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+Location+'&appid=' + apiKey;

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    var temp = parseInt(data.main.temp - 273);
                    var h1 = document.getElementById("weather");
                    h1.innerHTML = `${temp}<sup>o</sup>C`;
                    var datas  = document.getElementById("weatherdata");
                    datas.innerHTML = data.weather[0].description;
                    var location  = document.getElementById("location");
                    location.innerHTML=input.value;
                    input.value="";
                    updateImage(data.weather[0].id);
                })
                .catch(error => {
                    var h1 =  document.getElementById("weather");
                    h1.innerHTML = 'Error!';
                    var location  = document.getElementById("location");
                    location.innerHTML = '';
                    console.error('Error during fetch:', error.message);
                });
            }
        });
var svg = document.querySelector("svg");
svg.addEventListener('click',updateWeather);
window.onload = updateWeather;