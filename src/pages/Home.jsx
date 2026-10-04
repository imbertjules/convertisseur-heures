import { Link, useSearchParams } from 'react-router-dom'
import { BookOpen, Calculator } from 'lucide-react'
import Converter from '../components/Converter.jsx'
import PageMeta from '../components/PageMeta.jsx'
import { FAQ } from '../data/faq.js'
import { COMMON_MINUTES, minuteRow } from '../lib/conversion.js'
import { UPDATED } from '../lib/site.js'

export default function Home() {
  const [params] = useSearchParams()
  const hours = params.get('h') ?? '7'
  const minutes = params.get('m') ?? '45'

  return (
    <article className="space-y-6">
      <PageMeta
        title="Convertisseur heures en centièmes pour la paie"
        description="Convertissez des heures et des minutes en centièmes d'heure, avec la formule, les arrondis et des exemples de relevé. 7 h 30 = 7,50, pas 7,30."
        path="/"
      />
      <header className="space-y-3 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Convertisseur d’heures en centièmes pour la paie
        </h1>
        <p className="mx-auto max-w-2xl text-left text-slate-600 md:text-center">
          Un bulletin ne multiplie pas un taux horaire par « 7 h 45 ». Il attend une durée décimale. Sept heures et quarante-cinq minutes font <strong>7,75 heures</strong>, parce que 45 ÷ 60 = 0,75. Écrire 7,45 compte seulement 27 minutes et fausse le salaire.
        </p>
        <p className="mx-auto max-w-2xl text-left text-slate-600 md:text-center">
          L’outil ci-dessous convertit dans les deux sens. Le reste du site explique la formule, le tableau minute par minute, l’écart d’arrondi entre une journée et un mois, et le repère des 35 heures. Mise à jour du {UPDATED}.
        </p>
      </header>

      <Converter key={`${hours}-${minutes}`} initialHours={hours} initialMinutes={minutes} />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
          <Calculator className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Minutes fréquentes, et l’erreur minutes ÷ 100
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-slate-600">
          La colonne juste divise les minutes par 60 puis arrondit au centième. La colonne fausse écrit les minutes telles quelles derrière la virgule. Cliquez une ligne pour la charger dans le convertisseur.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {COMMON_MINUTES.map((value) => {
            const row = minuteRow(value)
            return (
              <Link
                key={value}
                to={`/?h=7&m=${value}`}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="text-xs text-slate-500">{value} min</div>
                <div className="text-base font-bold text-slate-900">{row.correct} h</div>
                <div className="text-xs text-rose-700">pas {row.mistaken}</div>
              </Link>
            )
          })}
        </div>
        <p className="mt-4 text-sm">
          <Link className="font-semibold text-blue-700 hover:underline" to="/tableau">Voir les 60 minutes</Link>
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Info title="La formule" to="/guide">
          Centièmes = heures + (minutes ÷ 60), arrondis au plus proche. Une minute vaut 0,02 heure, pas 0,01.
        </Info>
        <Info title="Additionner une semaine" to="/cumul">
          Trois jours de 7 h 20 font 22,00 heures d’un bloc, mais 21,99 si chaque jour est arrondi avant l’addition.
        </Info>
        <Info title="Au-dessus de 35 heures" to="/exemples">
          38 h 30 = 38,50 heures, soit 3,50 heures au-delà de la durée légale. Le site ne décide pas si elles sont majorées.
        </Info>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-slate-900">
          <BookOpen className="h-5 w-5 text-blue-600" aria-hidden="true" />
          À lire avant de ressaisir un relevé
        </h2>
        <div className="space-y-3 leading-relaxed text-slate-700">
          <p>
            Partez des heures et des minutes réellement retenues, pas d’un nombre déjà « à virgule » recopié sans vérification. Si le relevé indique 7 h 20, la durée décimale est 7,33. Si quelqu’un a déjà écrit 7,20, il manque 0,13 heure, soit environ 8 minutes.
          </p>
          <p>
            Gardez la même règle d’arrondi sur tout le bulletin. Mélanger des journées arrondies et un total recalculé à partir des minutes produit des écarts d’un centième. Ce n’est pas une erreur de saisie : c’est l’ordre des opérations. La page <Link className="font-semibold text-blue-700 hover:underline" to="/methode">méthode d’arrondi</Link> détaille les deux ordres.
          </p>
          <p>
            Le convertisseur ne remplace pas le logiciel de paie. Il sert à contrôler une durée avant de l’y reporter, ou à comprendre un chiffre déjà imprimé sur un bulletin.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="mb-4 text-lg font-bold text-slate-900">Questions qui reviennent</h2>
        <div className="space-y-4">
          {FAQ.slice(0, 3).map((item) => (
            <div key={item.q} className="border-b border-slate-100 pb-4 last:border-0">
              <h3 className="font-semibold text-slate-900">{item.q}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>
        <Link className="mt-2 inline-block font-semibold text-blue-700 hover:underline" to="/faq">Toute la foire aux questions</Link>
      </section>
    </article>
  )
}

function Info({ title, to, children }) {
  return (
    <Link to={to} className="block rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-200">
      <h2 className="font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{children}</p>
    </Link>
  )
}
