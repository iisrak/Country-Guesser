var input = document.getElementById("guess");
var guessList = [];
var guessCount = 1;
var gameWon = false;

function comingsoon(){
    Swal.fire({
        title: 'Feature coming soon!',
        confirmButtonText: "Gocha!",
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: "#8f745b",
        customClass: 'customcss',
    });
}

async function loadData() {
    const response = await fetch('countryList.json');
    const data = await response.json();
    const countries = Object.keys(data);
    const randomIndex = Math.floor(Math.random() * countries.length);
    const randomCountry = countries[randomIndex];
    const countryArray = Object.keys(data);

    console.log(randomCountry);

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

                const sassyPhrases = [
                    "A+ in creative thinking, but I'm afraid we're grading on reality here.",
                    "Gold star for imagination, but we're aiming for correctness, not fantasy.",
                    "Nice attempt, but we're looking for answers that exist outside of daydreams.",
                    "If effort was a currency, you'd be a billionaire. Unfortunately, we deal in correct answers.",
                    "You're in a league of your own... unfortunately, it's the wrong league.",
                    "The creativity is off the charts, but the accuracy seems to be lost in translation.",
                    "Your guess was so original; I almost forgot we were looking for the right answer.",
                    "The effort is so palpable; I can almost taste it. Too bad it doesn't taste like correctness.",
                    "You're charting new territories in guessing. Unfortunately, we're staying on the map.",
                    "Bravo on the imagination! Pity we're seeking factual correctness, not fiction.",
                    "In a world of accuracy, you're the Picasso of incorrectness.",
                    "I appreciate the boldness of your guess. Unfortunately, boldness isn't on the answer key.",
                    "You're on a roll... just not the correct answer kind of roll.",
                    "I see you've unlocked the secret level of creativity. Unfortunately, we're still on level one of correctness.",
                    "Your answer is so far from the mark; I think it's on vacation.",
                    "A round of applause for thinking outside the box. Now, let's get back inside the realm of right answers.",
                    "Your guess is like a shooting star—bright, brief, and nowhere close to Earth.",
                    "I didn't know we were playing 20 Questions, but I appreciate the effort in the wrong direction.",
                    "If guessing incorrectly were an Olympic sport, you'd be a gold medalist.",
                    "Your answer is so unique; I'm starting to wonder if we're even playing the same game.",
                    "Congratulations on winning the award for the most unexpected response. Too bad it's not the correct award.",
                    "You've got a gift for surprises; too bad we were hoping for the predictable kind of correctness.",
                    "Your guess is like a rare vintage—valuable to collectors, but not in the realm of correctness."
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
                        html: `<span style="color:#F8BB86; font-weight: bold; font-size: 13px;">it could be for the following reasons:</span><br>• Country not yet added to database<br>• You may have misspelt the country's name<br>• You may have left the input field blank`,
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
                            html: randomSassyPhrase,
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
                    else{
                        Swal.fire({
                            title: "Well done!",
                            icon: "success",
                            html: 'The country was: ' + val.randomCountry +  '<br>Guesses: ' + guessCount,
                            confirmButtonText: "New Game",
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            confirmButtonColor: "#8f745b",
                            customClass: 'customcss',
                        }).then(function() {
                            location.reload();
                        });
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
                if(guessCount == 8 & gameWon == false){
                    Swal.fire({
                        title: "Yikes!",
                        icon: "error",
                        html: 'The country was: ' + val.randomCountry + '<br>Better luck next time buddy <3',
                        confirmButtonText: "New Game",
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        confirmButtonColor: "#8f745b",
                        customClass: 'customcss',
                    }).then(function() {
                        location.reload();
                    });
                }
            
            }
        });

    })
