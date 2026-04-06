# Spiritual Calculations

All spiritual calculation logic lives in `src/modules/reading/spiritual.ts`. The single entry point is `computeSpiritualProfile({ dob })`.

## How It Works

Given a date of birth (ISO format like '1990-05-15'), the system calculates:

### 1. Zodiac Sign
Standard Western astrology date ranges. Each month has a boundary day - if the birth day is before the boundary, you get the previous sign.
- Example: May 15 -> boundary is day 21 -> 15 < 21 -> Taurus (not Gemini)
- Data: `zodiacBoundaries` array (12 entries, one per month)

### 2. Moon Sign
Simplified approximation: `(month + day) % 12` mapped to the 12 zodiac signs.
- This is NOT astronomically accurate (real moon sign requires ephemeris tables)
- Good enough for entertainment/spiritual purposes
- Data: `moonSigns` array

### 3. Life Path Number (Numerology)
Sum all digits of the DOB, then reduce to a single digit. Preserve master numbers (11, 22, 33).
- Example: 1990-05-15 -> 1+9+9+0+0+5+1+5 = 30 -> 3+0 = 3
- Example: 1990-11-29 -> 1+9+9+0+1+1+2+9 = 32 -> 3+2 = 5
- Master numbers 11, 22, 33 are NOT reduced further

### 4. Tarot Cards (3-card spread)
Birth month selects a pre-defined 3-card spread from the Major Arcana.
- Month 1 (January) -> The Magician, The High Priestess, The Empress
- Month 2 (February) -> The Emperor, The Hierophant, The Lovers
- etc.
- Data: `tarotSpreads` array (12 entries)

## Modifying Calculations

All data is in typed const arrays at the top of `spiritual.ts`. To change:
- Zodiac boundaries: edit `zodiacBoundaries` array
- Moon sign mapping: edit `moonSigns` array
- Tarot spreads: edit `tarotSpreads` array
- Life path rules: edit `masterNumbers` array and `getLifePathNumber` function

## Where Calculations Are Used

1. **Server-side** in `src/app/api/generate-reading/route.ts` - computes profile, includes in AI prompt
2. **Client-side** in `src/modules/reading/ReadingModal.tsx` - computes profile for display badges
3. **AI prompt** in `src/modules/reading/prompt.ts` - zodiac, moon, life path, tarot included in prompt text
4. **Email** in `src/modules/email/send-reading.ts` - spiritual profile shown in email header
5. **Display** in `src/modules/reading/ReadingDisplay.tsx` - badges showing all four values
