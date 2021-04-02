const search = document.querySelector("#search");


$(".search-button").click(function () {
    $(this).parent().toggleClass("open");
  });

$(".search-icon").click(function () {

    const country = search.value;


    if(country == ""){
        return
    }
    
    fetch(`https://api.covid19api.com/total/dayone/country/${country}`)
    .then((res) => res.json())
    .then((data) => {

        const active = document.querySelector("#active");
        const death = document.querySelector("#death");
        const recovered = document.querySelector("#recovered");
        const countryTitle = document.querySelector("#country");

        active.innerHTML = '';
        death.innerHTML = '';
        recovered.innerHTML = '';
        countryTitle.innerHTML = `<i class="fas fa-map-marker-alt globeIconColor"></i> `;

        if(data.message == "Not Found") {

            iziToast.error({
                title: "Country not found",
                position: "topCenter",
                timeout: 3000,
            });

            document.querySelector("#search").value = "";

        } else {
            let length = data.length;
            let index = length - 1;

            const active = document.querySelector("#active");
            const death = document.querySelector("#death");
            const recovered = document.querySelector("#recovered");
            const countryTitle = document.querySelector("#country");

            active.append(data[index].Confirmed);
            death.append(data[index].Deaths);
            recovered.append(data[index].Recovered);
            countryTitle.append(data[index].Country);

            document.querySelector("#search").value = "";
        }
    })

    .catch(err => {
        console.log(err)

        iziToast.error({
            title: "SERVER ERROR",
            position: "topCenter",
            timeout: 3000,
        });
        document.querySelector("#search").value = "";
    })

});

fetch(`https://api.covid19api.com/summary`)
    .then((res) => res.json())
    .then((data) => {

        if(data.Message != "") {

            iziToast.information({
                title: "Caching in progress",
                position: "topCenter",
                timeout: 3000,
            });
            document.querySelector("#search").value = "";
        } else {
            const active = document.querySelector("#activeGlobal");
            const death = document.querySelector("#deathGlobal");
            const recovered = document.querySelector("#recoveredGlobal");
    
            active.append(data.Global.TotalConfirmed);
            death.append(data.Global.TotalDeaths);
            recovered.append(data.Global.TotalRecovered);
        }

       
    })

    fetch(`https://api.covid19api.com/total/dayone/country/Philippines`)
    .then((res) => res.json())
    .then((data) => {

        if(data.message == "Not Found") {

            iziToast.error({
                title: "Country not found",
                position: "topCenter",
                timeout: 3000,
            });
            document.querySelector("#search").value = "";
        } else {
            let length = data.length;
            let index = length - 1;

            const active = document.querySelector("#active");
            const death = document.querySelector("#death");
            const recovered = document.querySelector("#recovered");
            const countryTitle = document.querySelector("#country");

            active.append(data[index].Confirmed);
            death.append(data[index].Deaths);
            recovered.append(data[index].Recovered);
            countryTitle.append(data[index].Country);

            document.querySelector("#search").value = "";
        }
    })

    .catch(err => {
        console.log(err)

        iziToast.error({
            title: "Country not found",
            position: "topCenter",
            timeout: 3000,
        });
        document.querySelector("#search").value = "";
    })



  
