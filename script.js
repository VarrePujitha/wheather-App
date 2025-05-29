let key = "0e22752f845c45a99d040603252605"
async function getForcast() 
{
    let enteredcityidEle = document.getElementById("enteredcityid");
    let enteredcity = enteredcityidEle.value;
    console.log(enteredcity)
    let API=`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${enteredcity}&days=7&aqi=yes`;
    let res=await axios.get(API);
    let data=res.data;
    getforecastdetails(data);
    weekdays(data);
    displayair(data);

    let currentIdEle=document.getElementById("currentId");
    let presentDetails=`
        <div class="col content-center">
            <h1>${enteredcity}</h1>
            <h6>${data.location.country}</h6>
            <h1>${data.current.temp_c} <sup>o</sup> C</h1>
        </div>
        <div class="col img-center">
            <img src="${data.current.condition.icon}">
        </div>
    `
    currentIdEle.innerHTML=presentDetails; 
}

function getforecastdetails(data)
{
    let hours = data.forecast.forecastday[0].hour;
    let forecastIdEle = document.getElementById("forecastId");
    let returnval = hours.reduce(function(acc,obj,ind){
        if(ind==6||ind==9||ind==12||ind==15||ind==18||ind==21)
        {
            let time=ind;
            if(time>12)
            {
                time=time-12;
            }
            acc+=`
                <div>
                    <h6 >${time}:00 ${ind<12?"AM": "PM"}</h6>
                    <img src=${obj.condition.icon}>
                    <h3>${obj.temp_c}</h3>
                </div>
            `
        }
        return acc;
    },"")
    forecastIdEle.innerHTML=returnval;
}

function weekdays(data)
{
    let days = data.forecast.forecastday;
    let sevendaysidele = document.getElementById("sevendays");
    let weeks = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let returnval="";
    for (let i = 0; i < days.length; i++) {
        let day = days[i];
        let date = new Date(day.date);
        let weekday;

        if (i === 0) {
            weekday = "Today";
        } else {
            weekday = weeks[date.getDay()];
        }
        returnval+=`
            <div class="day-row">
                <h6>${weekday}</h6>
                <h6>${day.day.condition.text}</h6>
                <img src="${day.day.condition.icon}">
            </div>
        
        `;
    }
    sevendaysidele.innerHTML=returnval;
}

function displayair(data){
    let airs = data;
    let airidele = document.getElementById("Airconditions");
    let returnval="";
    returnval+=`
                <div class="air-header">
                    <h5>Air Conditions</h5>
                    <button class="see-more-btn">See More</button>
                </div>
                <div class="air-details" >
                    <div>
                        <h6><i class="fas fa-wind"></i> Wind Speed</h6>
                        <p>${data.current.wind_kph} kmph</p>
                        <h6><i class="fas fa-sun"></i> Uv Index</h6>
                        <p>${data.current.uv}</p>
                    </div>
                    <div>
                        <h6><i class="fas fa-temperature-high"></i> Real Feel</h6>
                        <p>${data.current.feelslike_c}<sup>o</sup></p>
                        <h6><i class="fas fa-cloud-rain"></i> Chance Of Rain</h6>
                        <p>${data.forecast.forecastday[0].day.daily_chance_of_rain}</p>
                    </div>
                </div>
        `;
    airidele.innerHTML=returnval;
}
