import React, { useState } from 'react'
import snowman0 from './images/step_0.png'

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

  async function handleStartGameClick() {
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

  console.log(`wordToGuess is ${wordToGuess}`)
  return (
    <div>
      <img src={snowman0} width="500px" height="500px" />
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
      <button onClick={handleStartGameClick}>Start Game</button>
    </div>
  )
}
