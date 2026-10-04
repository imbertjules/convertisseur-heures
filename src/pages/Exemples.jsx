import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'
import { gapTo35, timeToDecimal } from '../lib/conversion.js'

const CASES = [
  {
    title: 'Journée de 7 h 00',
    text: '7 h 00 = 7,00 heures. Cinq journées identiques font 35,00 heures, la durée légale d’un temps complet, sans minute restante.',
  },
  {
    title: 'Journée de 7 h 30',
    text: '30 ÷ 60 = 0,50. La journée vaut 7,50 heures. La saisie 7,30 correspondrait à 7 h 18, parce que 0,30 × 60 = 18 minutes.',
  },
  {
    title: 'Journée de 7 h 45',
    text: '45 ÷ 60 = 0,75. La journée vaut 7,75 heures. Quatre journées font 31,00 heures. Il manque alors 4,00 heures pour atteindre 35,00.',
  },
  {
    title: 'Journée de 8 h 12',
    text: '12 ÷ 60 = 0,20 exactement. La journée vaut 8,20 heures. L’écriture fausse 8,12 sous-estime la durée de 0,08 heure, soit environ 5 minutes. Le chiffre 0,20 ne tombe juste que parce que 12 minutes sont un cinquième d’heure, pas parce que les minutes se recopient après la virgule.',
  },
  {
    title: 'Retard ou absence de 12 minutes',
    text: 'Une absence de 12 minutes vaut 0,20 heure. Sur un taux de 15,00 €, cela représente 3,00 € de brut. Le site ne dit pas si ce retard est retenu : il donne seulement la durée.',
  },
  {
    title: 'Semaine de 39 h 00',
    text: '39,00 − 35,00 = 4,00 heures au-dessus de la durée légale. Selon le contrat et l’accord applicable, ces 4,00 heures peuvent être des heures supplémentaires ou être organisées autrement, par exemple avec un repos. La conversion ne choisit pas.',
  },
]

export default function Exemples() {
  const [hours, setHours] = useState('38')
  const [minutes, setMinutes] = useState('30')
  const gap = useMemo(() => gapTo35(hours === '' ? '0' : hours, minutes === '' ? '0' : minutes), [hours, minutes])
  const check = timeToDecimal(8, 12)

  return (
    <article className="space-y-6">
      <PageMeta
        title="Exemples d'heures converties en centièmes"
        description="Exemples commentés : 7 h 30 = 7,50, 8 h 12 = 8,20, et l'écart d'une semaine par rapport à 35,00 heures."
        path="/exemples"
      />
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Exemples</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Des durées de relevé, déjà commentées</h1>
        <p className="leading-relaxed text-slate-600">
          Chaque cas part d’une écriture en heures et minutes, donne les centièmes, puis dit ce que le chiffre ne permet pas de conclure. Le contrôle 8 h 12 du texte vaut {check.fr} heure dans le même calcul que le convertisseur.
        </p>
      </header>
      <div className="grid gap-4">
        {CASES.map((item) => (
          <section key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">{item.title}</h2>
            <p className="mt-2 leading-relaxed text-slate-700">{item.text}</p>
          </section>
        ))}
      </div>
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-900">Écart d’une semaine avec 35,00 heures</h2>
        <p className="leading-relaxed text-slate-700">
          Saisissez la durée totale de la semaine, déjà en heures et minutes. Le résultat est un écart de durée. Il ne dit pas si les heures au-dessus de 35 sont dues, majorées ou remplacées par un repos. Les taux par défaut sont rappelés dans le <Link className="font-semibold text-blue-700 hover:underline" to="/guide">guide</Link>.
        </p>
        <div className="flex flex-wrap items-end gap-3">
          <label className="text-sm font-semibold text-slate-600">
            Heures
            <input className="mt-1 block w-28 rounded-lg border border-slate-300 px-3 py-2 text-lg font-bold" type="number" min="0" value={hours} onChange={(event) => setHours(event.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-600">
            Minutes
            <input className="mt-1 block w-28 rounded-lg border border-slate-300 px-3 py-2 text-lg font-bold" type="number" min="0" max="59" value={minutes} onChange={(event) => setMinutes(event.target.value)} />
          </label>
        </div>
        {gap ? (
          <p className="rounded-xl bg-slate-50 px-4 py-3 leading-relaxed text-slate-800">
            Cette semaine vaut <strong>{gap.decimal} heures</strong>.{' '}
            {gap.direction === 'equal' && 'Elle est exactement sur le repère de 35,00 heures.'}
            {gap.direction === 'above' && <>Elle dépasse 35,00 heures de <strong>{gap.gap} heures</strong>.</>}
            {gap.direction === 'below' && <>Elle est en dessous de 35,00 heures de <strong>{gap.gap.replace('-', '')} heures</strong>. Cela ne qualifie pas à lui seul un temps partiel : le temps partiel est une durée contractuelle.</>}
          </p>
        ) : (
          <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-950">Indiquez des minutes entre 0 et 59.</p>
        )}
        <p className="text-sm text-slate-600">
          Pour additionner plusieurs journées avant cette comparaison, passez par le <Link className="font-semibold text-blue-700 hover:underline" to="/cumul">cumul</Link>.
        </p>
      </section>
    </article>
  )
}
