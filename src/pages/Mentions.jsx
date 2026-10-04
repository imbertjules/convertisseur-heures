import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'
import { UPDATED } from '../lib/site.js'

export default function Mentions() {
  return (
    <article className="space-y-6">
      <PageMeta
        title="Mentions légales"
        description="Nature du site convertisseur-heures-paie.fr, limite de responsabilité sur les calculs de durée, hébergement et propriété des explications."
        path="/mentions-legales"
      />
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Mentions légales</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Mentions légales</h1>
        <p className="text-sm text-slate-500">Dernière mise à jour : {UPDATED}</p>
      </header>
      <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 leading-relaxed text-slate-700 md:p-8">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Éditeur et objet</h2>
          <p>
            Le site convertisseur-heures-paie.fr publie un convertisseur de durées et des explications sur les centièmes d’heure utilisés en paie. Il est édité par l’exploitant de ce nom de domaine. Il ne s’agit ni d’un cabinet, ni d’un éditeur de logiciel de paie, ni d’un service qui établit des bulletins pour le compte d’un employeur.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Hébergement et mesure d’audience</h2>
          <p>
            L’hébergement des pages et la mesure d’audience technique sont assurés par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. Les durées tapées dans les outils ne font pas partie de cette mesure : elles sont calculées localement dans le navigateur.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Limite des calculs</h2>
          <p>
            Les résultats suivent la méthode publiée sur la page <Link className="font-semibold text-blue-700 hover:underline" to="/methode">méthode d’arrondi</Link> : division par 60, arrondi au centième le plus proche. Un logiciel de paie peut tronquer, garder davantage de décimales, ou appliquer d’abord une règle de pointage propre à l’entreprise. En cas d’écart, c’est le bulletin et la règle interne qui tranchent, pas cette page.
          </p>
          <p>
            Les rappels au Code du travail (durée légale de 35 heures, définition et majorations de droit commun des heures supplémentaires) renvoient aux articles en vigueur sur Légifrance. Ils ne tiennent pas compte de la convention, de l’accord d’entreprise ou du contrat applicable à une personne précise.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Propriété des contenus</h2>
          <p>
            Les textes, exemples et tableaux originaux de ce site ne peuvent pas être recopiés tels quels sur un autre site. Les liens vers une page, avec mention de la source, sont les bienvenus. Les articles de loi cités appartiennent au domaine public législatif et restent consultables sur legifrance.gouv.fr.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Données personnelles</h2>
          <p>
            Le détail des cookies publicitaires et de la mesure d’audience est dans la <Link className="font-semibold text-blue-700 hover:underline" to="/confidentialite">politique de confidentialité</Link>.
          </p>
        </div>
      </section>
    </article>
  )
}
