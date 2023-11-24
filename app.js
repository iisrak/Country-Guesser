var input = document.getElementById("guess");

async function loadData() {
    const response = await fetch('countryList.json');
    const data = await response.json();
    const countries = Object.keys(data);
    const randomIndex = Math.floor(Math.random() * countries.length);
    const randomCountry = countries[randomIndex];
    const countryArray = Object.keys(data);

    return {
        randomCountry: randomCountry,
        population: data[randomCountry].population,
        hemisphere: data[randomCountry].hemisphere,
        continent: data[randomCountry].continent,
        averageTemperature: data[randomCountry].average_temperature,
        nationalDish: data[randomCountry].national_dish,
        allCountries: countryArray
    };
}


loadData()
    .then(val => {

        input.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                var inputElement = document.getElementById("guess");
                var inputValue = inputElement.value;
                console.log(inputValue);

                if (val.allCountries.includes(inputValue)){
                    console.log('there');
                }
                else{
                    console.log('not there');
                }
            }
        });

    })
