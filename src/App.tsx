import React, { useState } from 'react'
import snowman0 from './images/step_0.png'
import snowman1 from './images/step_1.png'
import snowman2 from './images/step_2.png'
import snowman3 from './images/step_3.png'
import snowman4 from './images/step_4.png'
import snowman5 from './images/step_5.png'
import snowman6 from './images/step_6.png'
import snowman7 from './images/step_7.png'

export function App() {
  const ALPHABET = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ]

  const [wordToGuess, setWordToGuess] = useState('')
  const [gameWord, setGameWord] = useState('')
  const [lettersGuessed, setLettersGuessed] = useState([''])
  const [numberOfCorrectLettersGuessed, setNumberOfCorrectLettersGuessed] =
    useState(0)

  async function handleNewGameClick() {
    setLettersGuessed([])
    setNumberOfCorrectLettersGuessed(0)
    const response = await fetch(
      'https://raw.githubusercontent.com/suncoast-devs/handbook/master/assignments/assets/words.json'
    )

    if (response.ok) {
      const json = await response.json()
      setWordToGuess(json[Math.floor(Math.random() * 1024)])
      setGameWord('_______')
    }
  }

  function handleClickOnLetterButton(letter: string) {
    setLettersGuessed([...lettersGuessed, letter])
    if (wordToGuess.includes(letter)) {
      setNumberOfCorrectLettersGuessed(numberOfCorrectLettersGuessed + 1)
      let newGameWord = ''
      for (let i = 0; i < gameWord.length; i++) {
        if (wordToGuess[i] === letter) {
          newGameWord = newGameWord.concat(letter)
        } else {
          newGameWord = newGameWord.concat(gameWord[i])
        }
      }
      console.log(`newGameWord is ${newGameWord}`)
      setGameWord(newGameWord)
      console.log(`gameWord is ${gameWord}`)
    } else {
      console.log(`No ${letter}`)
      return
    }
  }

  function getSnowmanPicture() {
    switch (numberOfCorrectLettersGuessed) {
      case 0:
        return snowman0
      case 1:
        return snowman1
      case 2:
        return snowman2
      case 3:
        return snowman3
      case 4:
        return snowman4
      case 5:
        return snowman5
      case 6:
        return snowman6
      case 7:
        return snowman7
    }
  }

  console.log(`wordToGuess is ${wordToGuess}`)
  return (
    <div>
      <img src={getSnowmanPicture()} width="500px" height="500px" />
      <p>{gameWord}</p>
      {ALPHABET.map((letter) => {
        return (
          <button
            key={letter}
            onClick={() => handleClickOnLetterButton(letter)}
            disabled={lettersGuessed.includes(letter)}
          >
            {letter}
          </button>
        )
      })}
      <button onClick={handleNewGameClick}>New Game</button>
    </div>
  )
}
