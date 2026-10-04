import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'
import { UPDATED } from '../lib/site.js'

export default function Methode() {
  return (
    <article className="space-y-6">
      <PageMeta
        title="Méthode d'arrondi des centièmes d'heure"
        description="Comment ce site arrondit une durée au centième le plus proche, et pourquoi l'ordre des arrondis change un total mensuel."
        path="/methode"
      />
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Méthode</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Comment les durées sont arrondies</h1>
        <p className="text-sm text-slate-500">Règle utilisée par les outils du site, au {UPDATED}.</p>
      </header>
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 leading-relaxed text-slate-700 md:p-8">
        <h2 className="text-xl font-bold text-slate-900">Au centième le plus proche</h2>
        <p>
          Les minutes sont converties en centièmes par le calcul (minutes × 100) ÷ 60, puis arrondies à l’entier le plus proche. À égale distance, l’arrondi s’éloigne de zéro : 0,5 centième devient le centième supérieur. Une minute donne 1,666… centième, retenu comme 2, donc 0,02 heure. Deux minutes donnent 3,333…, retenus comme 3, donc 0,03 heure.
        </p>
        <p>
          Les heures entières sont ajoutées ensuite, en centièmes elles aussi. 7 h 20 deviennent 700 centièmes d’heure plus 33, soit 733 centièmes, affichés 7,33. Le même calcul sert au convertisseur, au tableau, au cumul et à l’écart avec 35 heures. Il n’y a pas une règle par page.
        </p>
        <h2 className="pt-2 text-xl font-bold text-slate-900">Pourquoi l’ordre compte</h2>
        <p>
          Arrondir est une perte d’information. La faire tôt ou tard ne donne pas toujours le même total.
        </p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Convertir chaque journée, arrondir, puis additionner les centièmes.</li>
          <li>Additionner d’abord toutes les minutes, puis arrondir une seule fois.</li>
        </ol>
        <p>
          Pour trois journées de 7 h 20, la première méthode fait 7,33 + 7,33 + 7,33 = 21,99. La seconde fait 22 h 00 min = 22,00. L’écart est un centième d’heure, soit 36 secondes. Sur un mois de pointages irréguliers, plusieurs centièmes peuvent s’accumuler, ou se compenser. La page <Link className="font-semibold text-blue-700 hover:underline" to="/cumul">Cumul</Link> affiche les deux totaux pour les lignes que vous saisissez.
        </p>
        <h2 className="pt-2 text-xl font-bold text-slate-900">Ce que la méthode ne couvre pas</h2>
        <p>
          Certains logiciels tronquent au lieu d’arrondir, ou gardent trois décimales jusqu’au bulletin. D’autres arrondissent à la demi-heure ou au quart d’heure avant même la conversion, parce qu’un accord de pointage le prévoit. Si votre consigne est « toute présence entamée compte pour 15 minutes », il faut d’abord appliquer cette consigne sur les minutes, puis seulement convertir. Ce site ne devine pas la consigne.
        </p>
        <p>
          Les secondes ne sont pas saisies. Si vous devez les garder, ramenez-les d’abord en fraction de minute selon la règle de l’employeur, puis utilisez le convertisseur. Inventer un troisième arrondi « à la seconde » ici ajouterait une règle que votre bulletin n’utilise pas.
        </p>
        <p>
          Le <Link className="font-semibold text-blue-700 hover:underline" to="/tableau">tableau</Link> permet de vérifier une minute isolée. Le <Link className="font-semibold text-blue-700 hover:underline" to="/guide">guide</Link> rappelle à quoi sert ensuite cette durée dans un calcul de paie, sans le faire à votre place.
        </p>
      </section>
    </article>
  )
}
