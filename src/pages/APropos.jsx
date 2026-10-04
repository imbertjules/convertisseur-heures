import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'
import { UPDATED } from '../lib/site.js'

export default function APropos() {
  return (
    <article className="space-y-6">
      <PageMeta
        title="À propos du convertisseur d'heures"
        description="À qui sert ce convertisseur d'heures en centièmes, ce qu'il calcule dans le navigateur, et ce qu'il laisse au logiciel de paie."
        path="/a-propos"
      />
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">À propos</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Un outil de contrôle, pas un logiciel de paie</h1>
        <p className="text-sm text-slate-500">Contenu revu le {UPDATED}.</p>
      </header>
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 leading-relaxed text-slate-700 md:p-8">
        <p>
          Ce site s’adresse aux personnes qui préparent ou relisent un relevé d’heures : gestionnaire de paie, responsable d’équipe, salarié qui veut comprendre un chiffre de son bulletin. Le besoin de départ est étroit et concret. Une durée écrite « 7 h 45 » doit devenir 7,75 avant d’être multipliée par un taux. Beaucoup de relevés font l’opération inverse, et le brut s’en ressent.
        </p>
        <p>
          Autour du convertisseur, les pages expliquent la formule, listent les 60 minutes, comparent deux façons d’arrondir un cumul, et situent une semaine par rapport à 35,00 heures. Elles ne produisent pas de bulletin, n’appliquent pas de convention collective et ne stockent pas les durées saisies. Le calcul reste dans le navigateur.
        </p>
        <h2 className="pt-2 text-xl font-bold text-slate-900">Ce que vous trouvez sur le site</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li><Link className="font-semibold text-blue-700 hover:underline" to="/">Le convertisseur</Link>, dans les deux sens, avec copie du résultat.</li>
          <li><Link className="font-semibold text-blue-700 hover:underline" to="/guide">Le guide</Link>, pour la formule et le cadre des 35 heures.</li>
          <li><Link className="font-semibold text-blue-700 hover:underline" to="/tableau">Le tableau</Link>, minute par minute, avec l’écriture fausse en regard.</li>
          <li><Link className="font-semibold text-blue-700 hover:underline" to="/exemples">Les exemples</Link>, y compris l’écart avec 35,00 heures.</li>
          <li><Link className="font-semibold text-blue-700 hover:underline" to="/cumul">Le cumul</Link>, pour voir l’écart entre arrondi du jour et arrondi du total.</li>
          <li><Link className="font-semibold text-blue-700 hover:underline" to="/methode">La méthode</Link>, qui fixe la règle d’arrondi commune à ces outils.</li>
        </ul>
        <p>
          Les textes citent les articles du Code du travail lorsqu’ils donnent un repère légal, et ils disent explicitement quand un accord collectif peut écarter le taux par défaut. Pour une situation individuelle, le contrat, la convention et le gestionnaire de paie priment sur une page générale.
        </p>
        <p>
          La <Link className="font-semibold text-blue-700 hover:underline" to="/confidentialite">politique de confidentialité</Link> décrit les cookies publicitaires et la mesure d’audience. Les <Link className="font-semibold text-blue-700 hover:underline" to="/mentions-legales">mentions légales</Link> précisent le rôle du site.
        </p>
      </section>
    </article>
  )
}
