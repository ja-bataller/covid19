const search = document.querySelector("#search");

        
// FORMAT NUMBERS PUTTING A COMMA
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

$(".search-button").click(function () {
    $(this).parent().toggleClass("open");
  });

$(".search-icon").click(function () {

    const country = search.value;


    if(country == ""){
        return
    }
    
    fetch(`https://api.covid19api.com/live/country/${country}`)
    .then((res) => res.json())
    .then((data) => {

        const active = document.querySelector("#active");
        const death = document.querySelector("#death");
        const recovered = document.querySelector("#recovered");
        const countryTitle = document.querySelector("#country");

        active.innerHTML = '';
        death.innerHTML = '';
        recovered.innerHTML = '';
        countryTitle.innerHTML = '';

        if(data.message == "Not Found") {

            iziToast.error({
                title: "Country not found",
                position: "topCenter",
                timeout: 3000,
            });


        } else {
            let length = data.length;
            let index = length - 1;

            const active = document.querySelector("#active");
            const death = document.querySelector("#death");
            const recovered = document.querySelector("#recovered");
            const countryTitle = document.querySelector("#country");
            const countryCode = data[index].CountryCode;

            active.append(formatNumber(data[index].Confirmed));
            death.append(formatNumber(data[index].Deaths));
            recovered.append(formatNumber(data[index].Recovered));
            countryTitle.innerHTML = `<img src="https://www.countryflags.io/${countryCode}/flat/64.png"> `;
            countryTitle.append(data[index].Country + " COVID-19 Live Cases");

        }
    })

    .catch(err => {
        console.log(err)

        iziToast.error({
            title: "SERVER ERROR",
            position: "topCenter",
            timeout: 3000,
        })
    })

});

    fetch(`https://api.covid19api.com/summary`)
    .then((res) => res.json())
    .then((data) => {

        if(data.Message != "") {

            iziToast.error({
                title: "Caching in progress",
                position: "topCenter",
                timeout: 3000,
            });
        } else {
            const active = document.querySelector("#activeGlobal");
            const death = document.querySelector("#deathGlobal");
            const recovered = document.querySelector("#recoveredGlobal");
    
            active.append(formatNumber(data.Global.TotalConfirmed));
            death.append(formatNumber(data.Global.TotalDeaths));
            recovered.append(formatNumber(data.Global.TotalRecovered));
        }

       
    })

    fetch(`https://api.covid19api.com/live/country/Philippines`)
    .then((res) => res.json())
    .then((data) => {

        if(data.message == "Not Found") {

            iziToast.error({
                title: "Country not found",
                position: "topCenter",
                timeout: 3000,
            });
        } else {
            let length = data.length;
            let index = length - 1;

            const active = document.querySelector("#active");
            const death = document.querySelector("#death");
            const recovered = document.querySelector("#recovered");
            const countryTitle = document.querySelector("#country");

            active.append(formatNumber(data[index].Confirmed));
            death.append(formatNumber(data[index].Deaths));
            recovered.append(formatNumber(data[index].Recovered));
            countryTitle.append(data[index].Country + " COVID-19 Live Cases");

        }
    })

    .catch(err => {
        console.log(err)

        iziToast.error({
            title: "Country not found",
            position: "topCenter",
            timeout: 3000,
        });
    })


const countriesList = document.getElementById("slct");
let countries;

countriesList.addEventListener("change", newCountrySelection => {
    const selectedCountry = document.querySelector("#slct").value;
    console.log(selectedCountry);

    fetch(`https://api.covid19api.com/live/country/${selectedCountry}`)
    .then((res) => res.json())
    .then((data) => {

        const active = document.querySelector("#active");
        const death = document.querySelector("#death");
        const recovered = document.querySelector("#recovered");
        const countryTitle = document.querySelector("#country");

        active.innerHTML = '';
        death.innerHTML = '';
        recovered.innerHTML = '';
        countryTitle.innerHTML = '';

        if(data.message == "Not Found") {

            iziToast.error({
                title: "Country not found",
                position: "topCenter",
                timeout: 3000,
            });

        } else {
            let length = data.length;
            let index = length - 1;

            const active = document.querySelector("#active");
            const death = document.querySelector("#death");
            const recovered = document.querySelector("#recovered");
            const countryTitle = document.querySelector("#country");
            const countryCode = data[index].CountryCode;

            active.append(formatNumber(data[index].Confirmed));
            death.append(formatNumber(data[index].Deaths));
            recovered.append(formatNumber(data[index].Recovered));
            countryTitle.innerHTML = `<img src="https://www.countryflags.io/${countryCode}/flat/64.png"> `;
            countryTitle.append(data[index].Country + " COVID-19 Live Cases");

        }
    })

    .catch(err => {
        console.log(err)

        iziToast.error({
            title: "SERVER ERROR",
            position: "topCenter",
            timeout: 3000,
        })
    })
});


// GET COUNTRY - REST COUNTRY API
fetch("https://restcountries.eu/rest/v2/all")
.then(res => res.json())
.then(data => initialize(data))
.catch(err => console.log("Error:", err));

function initialize(countriesData) {
  countries = countriesData;
  let options = "";
    
  countries.forEach(country => options+=`<option value="${country.name}">${country.name}</option>`);
  countriesList.innerHTML = options;
  $("#slct option[value=Philippines]").prop("selected", true)

}



  
