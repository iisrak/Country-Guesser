var input = document.getElementById("guess");
var guessList = [];
var guessCount = 1;

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
                var inputValue = (inputElement.value).toLowerCase();
                var gameOver = false;

                if(guessCount == 8){
                    gameOver = true;
                }
                else{
                    gameOver = false;
                }

                if (inputValue == val.randomCountry){
                    gameOver = true;
                }
                else{
                    gameOver = false
                }

                const sassyPhrases = [
                    "A for effort, F for accuracy.",
                    "Close, but no intellectual cigar.",
                    "That guess is a scenic route to wrong.",
                    "Strike one! But at least you swung.",
                    "Nope, not even in the same universe.",
                    "Bless your heart, but it's a miss.",
                    "Incorrect, but nice fiction attempt.",
                    "Your guess is lost in translation.",
                    "Wrong answer, right spirit animal.",
                    "Nice try, but GPS rerouting needed.",
                    "Air ball! Swing and a wild miss – classic.",
                    "Incorrect, but creativity points awarded.",
                    "Strike two! Swing and a cosmic miss, astronaut.",
                    "Bless your heart, wrong ballpark.",
                    "Nope, your compass is drunk.",
                    "Wrong answer, right vibe though.",
                    "Incorrect, but applause for confidence.",
                    "Strike three! Swing and a miss, but stylish swing.",
                    "Bless your heart, but off the mark.",
                    "Wrong answer, right comedy material.",
                    "Nice try, but not even warm.",
                    "Incorrect, but applause for trying.",
                    "Whiff! Swing and a miss, but stylish miss.",
                    "Wrong answer, but entertaining effort.",
                    "Bless your heart, but not even close.",
                    "Incorrect, but nice robot dance attempt.",
                    "Strike four! Swing and a cosmic miss – out of orbit.",
                    "Wrong answer, but vintage attempt.",
                    "Nice try, but puzzle piece mismatch.",
                    "Bless your heart, square peg issue.",
                    "Incorrect, but applause for trying.",
                    "Strike five! Swing and a miss, detective.",
                    "Wrong answer, wrong treasure hunt.",
                    "Nice try, but puzzle piece mismatch.",
                    "Incorrect, parallel parking fail.",
                    "Whiff! Swing and a miss, spaceship edition.",
                    "Wrong answer, different wavelength.",
                    "Bless your heart, checkers in chess.",
                    "Incorrect, cake recipe mishap.",
                    "Strike six! Swing and a miss, emoji spotting.",
                    "Wrong answer, missing plot twist.",
                    "Nice try, but Pacific pool noodle fail.",
                    "Incorrect, unicorn-catching fail.",
                    "Strike seven! Swing and a miss, giraffe vs. Fiat.",
                    "Wrong answer, quantum goldfish fail.",
                    "Nice try, but needle night vision needed.",
                    "Whiff! Swing and a miss, limbo under the bar of correctness.",
                    "Wrong answer, solo performance struggle.",
                    "Bless your heart, maze blindfold fail."
                  ];

                function getRandomSassyPhrase() {
                    const randomIndex = Math.floor(Math.random() * sassyPhrases.length);
                    return sassyPhrases[randomIndex];
                }

                const randomSassyPhrase = getRandomSassyPhrase();


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
                    document.getElementById('guess').value = '';
                }
                else if(!guessList.includes(inputValue)){
                    if(inputValue != val.randomCountry ){
                        Swal.fire({
                            title: randomSassyPhrase,
                            confirmButtonText: "Try again!",
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            confirmButtonColor: "#8f745b",
                            customClass: 'customcss',
                        });
                        document.getElementById('guess').value = '';
                        guessCount += 1;
                        const ul = document.querySelector('.prevGuesses');
                        const li = document.createElement('li');
                        li.innerText = inputValue;
                        ul.appendChild(li);
                        guessList.push(inputValue);
                        console.log(guessList);
                        if (guessCount > 1){
                            document.getElementById("clueContainer").setAttribute("style","opacity:1; -moz-opacity:1; filter:alpha(opacity=100)");
                            document.getElementById("prev").setAttribute("style","opacity:1; -moz-opacity:1; filter:alpha(opacity=100)");
                            console.log('works')
                        }
                        if (guessCount == 2){
                            const ul = document.querySelector('.clues');
                            const li = document.createElement('li');
                            li.innerText = 'Population: ' + val.population;
                            ul.appendChild(li);
                        }
                        if (guessCount == 3){
                            const ul = document.querySelector('.clues');
                            const li = document.createElement('li');
                            li.innerText = val.hemisphere;
                            ul.appendChild(li);
                        }
                        if (guessCount == 4){
                            const ul = document.querySelector('.clues');
                            const li = document.createElement('li');
                            li.innerText = 'Continent: ' + val.continent;
                            ul.appendChild(li);
                        }
                        if (guessCount == 5){
                            const ul = document.querySelector('.clues');
                            const li = document.createElement('li');
                            li.innerText = 'Average Temp: ' + val.averageTemperature;
                            ul.appendChild(li);
                        }
                        if (guessCount == 6){
                            const ul = document.querySelector('.clues');
                            const li = document.createElement('li');
                            li.innerText = 'National Dish: ' + val.nationalDish;
                            ul.appendChild(li);
                        }
                    }
                }
                else{
                    Swal.fire({
                        title: 'Already guessed ' + inputValue,
                        confirmButtonText: "Try again!",
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        confirmButtonColor: "#8f745b",
                        customClass: 'customcss',
                    });
                    document.getElementById('guess').value = '';
                }
            
            }
        });

    })
