import type { SpiritualProfile } from './types'

const zodiacBoundaries = [
  [20, 'Aquarius'],
  [19, 'Pisces'],
  [20, 'Aries'],
  [20, 'Taurus'],
  [21, 'Gemini'],
  [21, 'Cancer'],
  [22, 'Leo'],
  [23, 'Virgo'],
  [23, 'Libra'],
  [23, 'Scorpio'],
  [22, 'Sagittarius'],
  [22, 'Capricorn'],
] as const

const zodiacFallbacks = [
  'Capricorn',
  'Aquarius',
  'Pisces',
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
] as const

const moonSigns = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
] as const

const tarotSpreads = [
  ['The Magician', 'The High Priestess', 'The Empress'],
  ['The Emperor', 'The Hierophant', 'The Lovers'],
  ['The Chariot', 'Strength', 'The Hermit'],
  ['Wheel of Fortune', 'Justice', 'The Hanged Man'],
  ['Death', 'Temperance', 'The Devil'],
  ['The Tower', 'The Star', 'The Moon'],
  ['The Sun', 'Judgement', 'The World'],
  ['The Fool', 'The Magician', 'The High Priestess'],
  ['The Empress', 'The Emperor', 'The Hierophant'],
  ['The Lovers', 'The Chariot', 'Strength'],
  ['The Hermit', 'Wheel of Fortune', 'Justice'],
  ['The Hanged Man', 'Death', 'Temperance'],
] as const

const defaultTarotSpread = ['The Fool', 'The Magician', 'The High Priestess'] as const

const masterNumbers: readonly number[] = [11, 22, 33]
const singleDigitThreshold = 10

type GetZodiacInput = { month: number; day: number }

const getZodiac = ({ month, day }: GetZodiacInput): string => {
  const boundary = zodiacBoundaries[month - 1]
  if (!boundary) return zodiacFallbacks[0]
  return day < boundary[0] ? zodiacFallbacks[month - 1] : boundary[1]
}

type GetMoonSignInput = { month: number; day: number }

const getMoonSign = ({ month, day }: GetMoonSignInput): string =>
  moonSigns[(month + day) % moonSigns.length]

const getLifePathNumber = (dob: string): number => {
  const digitSum = dob
    .replace(/-/g, '')
    .split('')
    .reduce((sum, digit) => sum + Number(digit), 0)

  let result = digitSum
  while (result >= singleDigitThreshold && !masterNumbers.includes(result)) {
    result = Math.floor(result / singleDigitThreshold) + (result % singleDigitThreshold)
  }
  return result
}

const getTarotCards = (month: number): readonly string[] =>
  tarotSpreads[month - 1] ?? defaultTarotSpread

type ComputeSpiritualProfileInput = { dob: string }

export const computeSpiritualProfile = ({ dob }: ComputeSpiritualProfileInput): SpiritualProfile => {
  const [, monthStr, dayStr] = dob.split('-')
  const month = Number(monthStr)
  const day = Number(dayStr)

  return {
    zodiacSign: getZodiac({ month, day }),
    moonSign: getMoonSign({ month, day }),
    lifePathNumber: getLifePathNumber(dob),
    tarotCards: getTarotCards(month),
  }
}
