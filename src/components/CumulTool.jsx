import { useMemo, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { sumTimes } from '../lib/conversion.js'

const WEEK = [
  ['Lundi', '7', '20'],
  ['Mardi', '7', '20'],
  ['Mercredi', '7', '20'],
]

const FULL_WEEK = [
  ['Lundi', '7', '0'],
  ['Mardi', '7', '0'],
  ['Mercredi', '7', '0'],
  ['Jeudi', '7', '0'],
  ['Vendredi', '7', '0'],
]

let nextId = 1
const toRows = (preset) => preset.map(([label, hours, minutes]) => ({ id: nextId++, label, hours, minutes }))

export default function CumulTool() {
  const [rows, setRows] = useState(() => toRows(WEEK))
  const total = useMemo(() => sumTimes(rows), [rows])
  const gap = Math.abs(total.gapHundredths) / 100

  const update = (id, field, value) => {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, [field]: value } : row)))
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-wrap gap-2">
        <button type="button" className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white" onClick={() => setRows(toRows(WEEK))}>
          Exemple 3 × 7 h 20
        </button>
        <button type="button" className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700" onClick={() => setRows(toRows(FULL_WEEK))}>
          Semaine 5 × 7 h 00
        </button>
      </div>
      <div className="space-y-3">
        {rows.map((row, index) => (
          <div key={row.id} className="rounded-xl border border-slate-200 p-3">
            <div className="mb-2 flex items-center gap-2">
              <input
                aria-label={`Libellé de la ligne ${index + 1}`}
                value={row.label}
                onChange={(event) => update(row.id, 'label', event.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
              <button
                type="button"
                aria-label={`Retirer ${row.label || `la ligne ${index + 1}`}`}
                className="shrink-0 rounded-lg p-2 text-slate-400 hover:text-red-600"
                onClick={() => setRows((current) => current.filter((item) => item.id !== row.id))}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="text-xs font-semibold text-slate-500">
                Heures
                <input
                  aria-label={`Heures, ${row.label || `ligne ${index + 1}`}`}
                  type="number"
                  min="0"
                  value={row.hours}
                  onChange={(event) => update(row.id, 'hours', event.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-2 text-center text-sm font-semibold"
                />
              </label>
              <label className="text-xs font-semibold text-slate-500">
                Minutes
                <input
                  aria-label={`Minutes, ${row.label || `ligne ${index + 1}`}`}
                  type="number"
                  min="0"
                  max="59"
                  value={row.minutes}
                  onChange={(event) => update(row.id, 'minutes', event.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-2 text-center text-sm font-semibold"
                />
              </label>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700"
        onClick={() => setRows((current) => [...current, { id: nextId++, label: '', hours: '0', minutes: '0' }])}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Ajouter une ligne
      </button>
      <div className="grid gap-3 text-left sm:grid-cols-3">
        <Result label="Durée réelle additionnée" value={total.count ? total.label : '—'} />
        <Result label="Une seule conversion du total" value={total.count ? `${total.exact} h` : '—'} />
        <Result label="Somme des journées déjà arrondies" value={total.count ? `${total.roundedSum} h` : '—'} />
      </div>
      {total.count > 0 && total.gapHundredths !== 0 && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm text-amber-950">
          Écart de {gap.toFixed(2).replace('.', ',')} heure. Additionner des centièmes déjà arrondis ({total.roundedSum}) ne donne pas le même résultat que convertir le total des minutes ({total.exact}). Un logiciel de paie qui arrondit chaque jour peut donc afficher un centième de plus ou de moins.
        </p>
      )}
      {total.count > 0 && total.gapHundredths === 0 && (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-left text-sm text-emerald-950">
          Ici, les deux méthodes tombent sur le même total : {total.exact} heure{total.exact === '1,00' ? '' : 's'}.
        </p>
      )}
    </div>
  )
}

function Result({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-lg font-bold text-slate-900">{value}</div>
    </div>
  )
}
