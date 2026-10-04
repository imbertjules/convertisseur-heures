import { useMemo, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { decimalToParts, timeToDecimal } from '../lib/conversion.js'

export default function Converter({ initialHours = '7', initialMinutes = '45' }) {
  const [hours, setHours] = useState(initialHours)
  const [minutes, setMinutes] = useState(initialMinutes)
  const [decimals, setDecimals] = useState(() => timeToDecimal(initialHours, initialMinutes)?.fr ?? '')
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => timeToDecimal(hours, minutes), [hours, minutes])
  const minutesInvalid = minutes !== '' && result === null && Number(String(minutes).replace(',', '.')) >= 60

  const onTime = (nextHours, nextMinutes) => {
    setHours(nextHours)
    setMinutes(nextMinutes)
    const next = timeToDecimal(nextHours === '' ? '0' : nextHours, nextMinutes === '' ? '0' : nextMinutes)
    if (next) setDecimals(next.fr)
  }

  const onDecimal = (value) => {
    setDecimals(value)
    const parts = decimalToParts(value)
    if (!parts) return
    setHours(parts.hours)
    setMinutes(parts.minutes)
  }

  const copy = async () => {
    const text = result?.fr ?? decimals
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const shown = result?.fr ?? '—'

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-2">
        <div className="space-y-2 text-left">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500" htmlFor="heures">
            Temps réel (heures et minutes)
          </label>
          <div className="flex items-center gap-2">
            <input
              id="heures"
              type="number"
              min="0"
              inputMode="decimal"
              value={hours}
              onChange={(event) => onTime(event.target.value, minutes)}
              aria-label="Heures"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 text-center text-2xl font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-2xl font-bold text-slate-400" aria-hidden="true">:</span>
            <input
              id="minutes"
              type="number"
              min="0"
              max="59"
              inputMode="decimal"
              value={minutes}
              onChange={(event) => onTime(hours, event.target.value)}
              aria-label="Minutes"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 text-center text-2xl font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="space-y-2 text-left">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500" htmlFor="centiemes">
            Heures décimales (centièmes)
          </label>
          <div className="relative">
            <input
              id="centiemes"
              type="text"
              inputMode="decimal"
              value={decimals}
              onChange={(event) => onDecimal(event.target.value)}
              className="w-full rounded-xl border border-blue-200 bg-blue-50/50 py-3 text-center text-2xl font-bold text-blue-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={copy}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:text-blue-700"
              title="Copier le résultat avec une virgule"
            >
              {copied ? <Check className="h-5 w-5 text-green-600" aria-hidden="true" /> : <Copy className="h-5 w-5" aria-hidden="true" />}
              <span className="sr-only">Copier le résultat</span>
            </button>
          </div>
        </div>
      </div>
      {minutesInvalid && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm text-amber-900">
          Les minutes vont de 0 à 59. Au-delà, reportez une heure : 60 minutes = 1,00 heure.
        </p>
      )}
      <p className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-4 text-center">
        <span className="text-sm text-slate-600">Équivalence : </span>
        <strong className="text-slate-900">
          {hours || 0} h {minutes || 0} min = {shown} centièmes
        </strong>
        {result && <span className="mt-1 block text-xs text-slate-500">Écriture logicielle avec point : {result.dot}</span>}
      </p>
    </div>
  )
}
