import assert from 'node:assert/strict'
import test from 'node:test'
import { decimalToParts, gapTo35, minuteRow, sumTimes, timeToDecimal } from './conversion.js'

test('7 h 45 = 7,75 et non 7,45', () => {
  const result = timeToDecimal(7, 45)
  assert.equal(result.fr, '7,75')
  assert.equal(result.dot, '7.75')
})

test('les minutes usuelles de paie', () => {
  assert.equal(timeToDecimal(0, 1).fr, '0,02')
  assert.equal(timeToDecimal(0, 6).fr, '0,10')
  assert.equal(timeToDecimal(0, 15).fr, '0,25')
  assert.equal(timeToDecimal(0, 20).fr, '0,33')
  assert.equal(timeToDecimal(0, 30).fr, '0,50')
  assert.equal(timeToDecimal(0, 40).fr, '0,67')
  assert.equal(timeToDecimal(0, 50).fr, '0,83')
  assert.equal(timeToDecimal(7, 0).fr, '7,00')
})

test('rejette une minute hors 0-59', () => {
  assert.equal(timeToDecimal(7, 60), null)
  assert.equal(timeToDecimal(7, -1), null)
})

test('retour centièmes vers heures et minutes', () => {
  assert.deepEqual(
    { hours: decimalToParts('7,75').hours, minutes: decimalToParts('7,75').minutes },
    { hours: '7', minutes: '45' },
  )
  assert.equal(decimalToParts('7.33').minutes, '20')
  assert.equal(decimalToParts('0,02').minutes, '1')
})

test('trois journées de 7 h 20 : 22,00 en une fois, 21,99 si chaque jour est arrondi', () => {
  const total = sumTimes([
    { hours: '7', minutes: '20' },
    { hours: '7', minutes: '20' },
    { hours: '7', minutes: '20' },
  ])
  assert.equal(total.label, '22 h 00 min')
  assert.equal(total.exact, '22,00')
  assert.equal(total.roundedSum, '21,99')
  assert.equal(total.gapHundredths, -1)
})

test('semaine de 5 × 7 h pile = 35,00 des deux façons', () => {
  const total = sumTimes(Array.from({ length: 5 }, () => ({ hours: '7', minutes: '0' })))
  assert.equal(total.exact, '35,00')
  assert.equal(total.roundedSum, '35,00')
  assert.equal(total.gapHundredths, 0)
})

test('écart à 35 heures', () => {
  assert.equal(gapTo35(38, 30).decimal, '38,50')
  assert.equal(gapTo35(38, 30).gap, '3,50')
  assert.equal(gapTo35(38, 30).direction, 'above')
  assert.equal(gapTo35(35, 0).direction, 'equal')
  assert.equal(gapTo35(28, 0).direction, 'below')
})

test('la colonne fausse minutes/100 diverge presque toujours', () => {
  assert.equal(minuteRow(30).mistaken, '0,30')
  assert.equal(minuteRow(30).correct, '0,50')
  assert.equal(minuteRow(30).same, false)
  assert.equal(minuteRow(0).same, true)
})
