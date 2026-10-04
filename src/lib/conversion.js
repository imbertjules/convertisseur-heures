/** Durée exprimée en centièmes d'heure, arrondie au plus proche. */

export function parseDuration(hours, minutes) {
  const h = typeof hours === 'string' ? Number(hours.replace(',', '.')) : Number(hours)
  const m = typeof minutes === 'string' ? Number(minutes.replace(',', '.')) : Number(minutes)
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null
  if (h < 0 || m < 0 || m >= 60) return null
  return { hours: h, minutes: m }
}

export function toHundredths(hours, minutes) {
  return Math.round(hours * 100 + (minutes * 100) / 60)
}

export function formatHundredths(hundredths) {
  const sign = hundredths < 0 ? '-' : ''
  const abs = Math.abs(hundredths)
  const whole = Math.floor(abs / 100)
  const frac = String(abs % 100).padStart(2, '0')
  return `${sign}${whole},${frac}`
}

export function formatDot(hundredths) {
  const abs = Math.abs(hundredths)
  const sign = hundredths < 0 ? '-' : ''
  const whole = Math.floor(abs / 100)
  const frac = String(abs % 100).padStart(2, '0')
  return `${sign}${whole}.${frac}`
}

export function timeToDecimal(hours, minutes) {
  const parsed = parseDuration(hours, minutes)
  if (!parsed) return null
  const hundredths = toHundredths(parsed.hours, parsed.minutes)
  return {
    hundredths,
    fr: formatHundredths(hundredths),
    dot: formatDot(hundredths),
  }
}

export function decimalToParts(raw) {
  if (raw === null || raw === undefined) return null
  const normalized = String(raw).trim().replace(',', '.')
  if (normalized === '' || normalized === '.') return null
  const value = Number(normalized)
  if (!Number.isFinite(value) || value < 0) return null
  const hundredths = Math.round(value * 100 + Number.EPSILON)
  const hours = Math.floor(hundredths / 100)
  const minutes = Math.round(((hundredths % 100) * 60) / 100)
  return {
    hours: String(hours),
    minutes: String(minutes),
    fr: formatHundredths(hundredths),
    dot: formatDot(hundredths),
  }
}

export function formatHm(totalMinutes) {
  const sign = totalMinutes < 0 ? '-' : ''
  const abs = Math.abs(totalMinutes)
  const h = Math.floor(abs / 60)
  const m = abs - h * 60
  const rounded = Math.round(m)
  const minutesText = Math.abs(m - rounded) < 1e-9 ? String(rounded).padStart(2, '0') : m.toFixed(1).replace('.', ',')
  return `${sign}${h} h ${minutesText} min`
}

export function sumTimes(entries) {
  let totalMinutes = 0
  let roundedHundredths = 0
  let count = 0
  for (const entry of entries) {
    const parsed = parseDuration(entry.hours, entry.minutes)
    if (!parsed) continue
    count += 1
    totalMinutes += parsed.hours * 60 + parsed.minutes
    roundedHundredths += toHundredths(parsed.hours, parsed.minutes)
  }
  const exactHundredths = Math.round((totalMinutes * 100) / 60)
  return {
    count,
    totalMinutes,
    label: formatHm(totalMinutes),
    exact: formatHundredths(exactHundredths),
    roundedSum: formatHundredths(roundedHundredths),
    gapHundredths: roundedHundredths - exactHundredths,
  }
}

export function gapTo35(hours, minutes) {
  const parsed = timeToDecimal(hours, minutes)
  if (!parsed) return null
  const gap = parsed.hundredths - 3500
  return {
    decimal: parsed.fr,
    gap: formatHundredths(gap),
    direction: gap === 0 ? 'equal' : gap > 0 ? 'above' : 'below',
  }
}

export function minuteRow(minutes) {
  const correct = timeToDecimal(0, minutes)
  const mistaken = (minutes / 100).toFixed(2).replace('.', ',')
  return {
    minutes,
    correct: correct.fr,
    mistaken,
    same: correct.fr === mistaken,
  }
}

export const COMMON_MINUTES = [5, 10, 15, 20, 30, 40, 45, 50]
