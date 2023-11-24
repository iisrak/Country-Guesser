import os
import random
import time
import json

def clear():
    os.system('cls' if os.name == 'nt' else 'clear')
def gscheck():
    if guessCount == 2:
        print("the name is " + str(len(random_country)) + " letters long")
    elif guessCount == 3:
        print("the name is " + str(len(random_country)) + " letters long")
        print("Country population:", country_data[random_country]['population'])
    elif guessCount == 4:
        print("the name is " + str(len(random_country)) + " letters long")
        print("Country population:", country_data[random_country]['population'])
        print("Country hemisphere:", country_data[random_country]['hemisphere'])
    elif guessCount == 5:
        print("the name is " + str(len(random_country)) + " letters long")
        print("Country population:", country_data[random_country]['population'])
        print("Country hemisphere:", country_data[random_country]['hemisphere'])
        print("Country continent:", country_data[random_country]['continent'])
    elif guessCount == 6:
        print("the name is " + str(len(random_country)) + " letters long")
        print("Country population:", country_data[random_country]['population'])
        print("Country hemisphere:", country_data[random_country]['hemisphere'])
        print("Country continent:", country_data[random_country]['continent'])
        print("Country average temperature:", country_data[random_country]['average_temperature'])
    elif guessCount >= 7:
        print("the name is " + str(len(random_country)) + " letters long")
        print("Country population:", country_data[random_country]['population'])
        print("Country hemisphere:", country_data[random_country]['hemisphere'])
        print("Country continent:", country_data[random_country]['continent'])
        print("Country average temperature:", country_data[random_country]['average_temperature'])
        print("Country national dish:", country_data[random_country]['national_dish'])
    

guessCount = 1
correctGuess = False
gameOver = False

with open('countryList.json', 'r') as file:
    countryies = file.read()

country_data =  json.loads(countryies)

guessedCountries = []
no = [
    "Nice try, but nope!",
    "Seriously? That's not it.",
    "Nope, that's not how it's done.",
    "Not even close, try again.",
    "Sweet attempt, but wrong!",
    "You might want to rethink that one.",
    "Oh dear, incorrect!",
    "Close, but not close enough.",
    "Wrong answer, try a little harder.",
    "Are you sure about that choice? Because it's wrong.",
    "Not today, incorrect!",
    "Wrong! Better luck next time.",
    "Wrong guess, but keep the confidence up!",
    "Oh no, that's not the right answer.",
    "Honey, that's just not right.",
    "You might need a hint, that's incorrect.",
    "Nope, not the answer we're looking for.",
    "Wrong choice, but don't give up!",
    "Bless your heart, but that's wrong.",
    "Incorrect, but nice effort!",
    "Not quite genius level, try again.",
    "You've got to be kidding. Incorrect.",
    "Wrong answer, but stay positive!",
    "Sorry, that's a big nope.",
    "No, and it's not getting any better.",
    "Not even in the ballpark of right!",
    "Incorrect, but you're entertaining.",
    "Wrong choice! Are you even trying?",
    "Oh no, that's just not correct."
]
acceptableValues = ['checkdone', 'imnotworthyandiwillneversucceed']

clear()

input('''
                                WELCOME TO CGSR!
              
You will be given some basic information about a country, this includes the following:
              
    +  Length of country name (including spaces if any*)
    +  Country Population
    +  Hemisphere of country
    +  Continent of country
    +  Country's average Temperature
    +  Country National Dish
              
However, you only get more and more information about the country as you make more guesses.
You have 7 Guesses.
              
You may at any point in time check what countries you have guessed already by typing 'checkdone'.
If your rage has gotten the best of you you may also type 'imnotworthyandiwillneversucceed' to check the answer.

GOOD LUCK!!!
      
press 'enter' to continue ''')

random_country = random.choice(list(country_data.keys()))

while gameOver == False:

    clear()
    if guessCount > 7 and correctGuess != True:
        clear()
        print('well done you lost!\nthe country was:\n' + random_country)
        gameOver = True
    elif guessCount <= 7 and correctGuess == True:
        clear()
        print('well done you won')
        gameOver = True
    else:
        gleft = 7 - int(guessCount)
        if gleft > 0:
            print('you have ' + str(gleft+1) + ' guesses left')
        else:
            print('LAST GUESS!')
        # print(random_country)
        gscheck()
        guess = input('Guess a country:\n').casefold()
        if guess == random_country and guessCount == 1:
            print('That was crazy. dont be doing that. its a bit scary you got that first try...')
            gameOver = True
        elif guess == random_country and guessCount > 0:
            print('WELL DONE! the country was ' + str(random_country) + ' and you guessed it in ' + str(guessCount) + ' guesses!!')
            gameOver = True
        if guess == '':
            continue
        else:
            if guess != random_country and guess not in acceptableValues:
                clear()
                guessCount += 1
                guessedCountries.append(guess)
                print('*' + random.choice(no) + '*')
                time.sleep(2)
                continue
            elif guess == 'checkdone':
                clear()
                print("press 'enter' to continue")
                input(guessedCountries)
            elif guess == 'imnotworthyandiwillneversucceed':
                clear()
                print('sucks to suck\nthe country was ' + str(random_country) + '\ntry again nerd.')
                gameOver = True
            else:
                continue