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
                var gameOver = false;
                var guessCount = 1;

                if(!val.allCountries.includes(inputValue)){
                    Swal.fire({
                        title: "Something doesn't look right!",
                        icon: "warning",
                        html: `<span style="color:#F8BB86; font-weight: bold; font-size: 13px;">it could be for the following reasons:</span><br>• Country not yet added to database<br>• You may have misspelt the country's name<br>• You may have misspelt the country's name<br>• You may have left the input field blank`,
                        confirmButtonText: "Understood!",
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        confirmButtonColor: "#8f745b",
                        customClass: 'customcss',
                    });
                }
                else{
                    console.log('2')
                }

            }
        });

    })
