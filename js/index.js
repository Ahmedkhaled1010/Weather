
var days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementById("search").addEventListener("keydown",function(eInfo)
{
    getWeather(eInfo.target.value);
})
function getWeather(location)
{
    var myHttp = new XMLHttpRequest();
    myHttp.open("GET",`https://api.weatherapi.com/v1/forecast.json?key=edb6f398f1024405987212704241206&q=${location}&days=3`);
    myHttp.send();
    myHttp.addEventListener("load",function()
    {
     var res =JSON.parse(myHttp.response);
     var currentdate = new Date(res.current.last_updated.replace(" ", "T"));
     var nextDate =new Date(res.forecast.forecastday[1].date.replace(" ", "T"));
     var next1Date =new Date(res.forecast.forecastday[2].date.replace(" ", "T"));

     console.log(res);
     document.getElementById("location").innerHTML =`${res.location.name}`;
     document.getElementById("currentDegree").innerHTML=`${res.current.temp_c}`+"C";
    document.getElementById("currentStatus").innerHTML =`${res.current.condition.text}`;
    document.getElementById("currentIcon").setAttribute("src","http:" +res.current.condition.icon);
    document.getElementById("nextDegree").innerHTML =`${res.forecast.forecastday[1].day.maxtemp_c}`+"C";
    document.getElementById("nextMinDegree").innerHTML =`${res.forecast.forecastday[1].day.mintemp_c}`+"C";
    document.getElementById("nextStatus").innerHTML =`${res.forecast.forecastday[1].day.condition.text}`;
    
    document.getElementById("nextIcon").setAttribute("src","http:" +res.forecast.forecastday[1].day.condition.icon)
    
    document.getElementById("next1Degree").innerHTML =`${res.forecast.forecastday[2].day.maxtemp_c}`+"C";
    document.getElementById("next1MinDegree").innerHTML =`${res.forecast.forecastday[2].day.mintemp_c}`+"C";
    document.getElementById("next1Status").innerHTML =`${res.forecast.forecastday[2].day.condition.text}`;
    
    document.getElementById("next1Icon").setAttribute("src","http:" +res.forecast.forecastday[2].day.condition.icon)
    document.getElementById("currentDay").innerHTML = days[currentdate.getDay()];
    document.getElementById("currentDate").innerHTML = `${currentdate.getDate() +month[currentdate.getMonth()]}`
    document.getElementById("nextDay").innerHTML =days[nextDate.getDay()];
    document.getElementById("next1Day").innerHTML =days[next1Date.getDay()];
    
    });
    
}
var latitude;
var longitude;
const successCallback = (position) => {

    latitude = position.coords.latitude;
     longitude = position.coords.longitude;
     console.log(latitude);
     console.log(longitude);
     get();
    
};


navigator.geolocation.getCurrentPosition(successCallback);



function get() {
    var location = new XMLHttpRequest();
location.open("GET",`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=666ba236e5714278697019ncsf77cf4`);
location.send();
location.addEventListener("load",function () {
    var loc =JSON.parse(location.response);
    
    getWeather(loc.address.city);
})

}
