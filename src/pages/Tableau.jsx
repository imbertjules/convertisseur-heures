import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'
import { minuteRow } from '../lib/conversion.js'

const ROWS = Array.from({ length: 60 }, (_, index) => minuteRow(index))

export default function Tableau() {
  return (
    <article className="space-y-6">
      <PageMeta
        title="Tableau minutes en centièmes d'heure"
        description="Les 60 minutes converties en centièmes d'heure, à côté de l'écriture fausse minutes/100. 20 min = 0,33 et non 0,20."
        path="/tableau"
      />
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Référence</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Tableau des minutes en centièmes</h1>
        <p className="leading-relaxed text-slate-600">
          Chaque ligne arrondit <strong>minutes ÷ 60</strong> au centième le plus proche. La colonne de droite est l’erreur classique : recopier les minutes derrière la virgule. Seule la minute 0 donne le même chiffre des deux façons. Une ligne ouvre le convertisseur sur une journée de 7 heures avec ces minutes.
        </p>
      </header>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <caption className="sr-only">Conversion de 0 à 59 minutes en centièmes d’heure</caption>
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Minutes</th>
              <th className="px-4 py-3 font-semibold">Centièmes justes</th>
              <th className="px-4 py-3 font-semibold">Écriture fausse</th>
              <th className="px-4 py-3 font-semibold">Ouvrir</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.minutes} className="border-t border-slate-100">
                <td className="px-4 py-2 font-semibold text-slate-900">{String(row.minutes).padStart(2, '0')} min</td>
                <td className="px-4 py-2 font-bold text-blue-900">{row.correct} h</td>
                <td className="px-4 py-2 text-rose-700">{row.same ? 'identique' : `${row.mistaken} h`}</td>
                <td className="px-4 py-2">
                  <Link className="font-semibold text-blue-700 hover:underline" to={`/?h=7&m=${row.minutes}`}>
                    7 h {String(row.minutes).padStart(2, '0')}
                  </Link>
                </td>
              </tr>
            ))}
            <tr className="border-t border-slate-100 bg-slate-50">
              <td className="px-4 py-2 font-semibold">60 min</td>
              <td className="px-4 py-2 font-bold text-blue-900">1,00 h</td>
              <td className="px-4 py-2 text-rose-700">0,60 h</td>
              <td className="px-4 py-2 text-slate-500">reportez 1 heure et 0 minute</td>
            </tr>
          </tbody>
        </table>
      </div>
      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 leading-relaxed text-slate-700">
        <h2 className="text-xl font-bold text-slate-900">Comment lire un arrondi qui ne tombe pas juste</h2>
        <p>
          20 minutes font 0,3333… heure. Le centième le plus proche est 0,33, pas 0,34 : le chiffre suivant est 3, inférieur à 5. 40 minutes font 0,6666…, dont le plus proche est 0,67. 1 minute fait 0,01666…, donc 0,02. 2 minutes font 0,03333…, donc 0,03. Ces bascules sont exactement celles du tableau.
        </p>
        <p>
          Soixante minutes ne sont pas 0,60 heure. Elles font une heure entière, à reporter dans la colonne des heures. Le convertisseur refuse une saisie de 60 minutes pour éviter de laisser passer cette confusion.
        </p>
      </section>
    </article>
  )
}
