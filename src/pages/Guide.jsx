import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'
import { UPDATED } from '../lib/site.js'

export default function Guide() {
  return (
    <article className="space-y-6">
      <PageMeta
        title="Guide : centièmes d'heure en paie"
        description="Pourquoi la paie compte les heures en centièmes, comment passer de 7 h 45 à 7,75, et ce que la conversion ne décide pas."
        path="/guide"
      />
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Guide</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Comprendre les centièmes d’heure</h1>
        <p className="text-sm text-slate-500">Mis à jour le {UPDATED}</p>
      </header>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 leading-relaxed text-slate-700 md:p-8">
        <p>
          En paie, une durée se présente sous deux écritures. L’écriture réelle sépare les heures et les minutes : 7 h 30. L’écriture décimale, dite en centièmes, met tout sur une base de 100 : 7,50. Les logiciels multiplient ensuite cette durée par un taux horaire. Si la durée est fausse, le brut l’est aussi, même quand le taux est juste.
        </p>
        <p>
          Le mot « centième » prête à confusion. Il ne veut pas dire « j’écris les minutes après la virgule ». Il veut dire « je découpe l’heure en 100 parts égales ». Une part vaut 36 secondes. Trente minutes occupent la moitié de l’heure, donc 50 parts, pas 30.
        </p>

        <h2 className="pt-2 text-xl font-bold text-slate-900">La formule, sans détour</h2>
        <p className="rounded-xl border-l-4 border-blue-600 bg-slate-50 p-4 font-mono text-sm text-slate-800">
          heures décimales = heures entières + (minutes ÷ 60)
        </p>
        <p>
          Pour 7 h 45 : 45 ÷ 60 = 0,75, donc 7,75. Pour 7 h 20 : 20 ÷ 60 = 0,3333…, arrondi au centième le plus proche, donc 7,33. Pour 7 h 40 : 40 ÷ 60 = 0,6666…, donc 7,67. Le sens inverse consiste à multiplier la seule partie décimale par 60. 0,75 × 60 = 45 minutes.
        </p>
        <p>
          Le <Link className="font-semibold text-blue-700 hover:underline" to="/tableau">tableau des 60 minutes</Link> donne chaque valeur déjà arrondie, à côté de l’écriture fausse « minutes ÷ 100 ». C’est cette deuxième colonne que l’on retrouve quand 7 h 30 a été saisi 7,30.
        </p>

        <h2 className="pt-2 text-xl font-bold text-slate-900">Ce que représente un centième sur un bulletin</h2>
        <p>
          Un centième d’heure vaut 0,6 minute, soit 36 secondes. Sur un taux horaire de 15,00 €, un centième représente 0,15 € de brut. L’écart paraît petit sur une journée. Il ne l’est plus si la même confusion, 0,20 heure de trop ou de trop peu, se répète chaque jour : 0,20 × 15,00 € = 3,00 € par jour, avant les cotisations.
        </p>
        <p>
          Exemple volontairement simple, qui n’est pas un bulletin : 7,75 heures × 15,00 € = 116,25 €. La même plage saisie par erreur en 7,45 heures donnerait 111,75 €. Il manque 4,50 €, soit exactement 0,30 heure × 15,00 €, c’est-à-dire les 18 minutes perdues entre 0,75 et 0,45. Le site s’arrête à la durée. L’arrondi monétaire au centime appartient au logiciel de paie.
        </p>

        <h2 className="pt-2 text-xl font-bold text-slate-900">Le repère des 35 heures</h2>
        <p>
          La durée légale de travail effectif des salariés à temps complet est de 35 heures par semaine (Code du travail, <a className="font-semibold text-blue-700 hover:underline" href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033020376" target="_blank" rel="noopener noreferrer">article L3121-27</a>). Cinq journées de 7 h 00 font 35,00 heures, sans reste. Une semaine pointée 38 h 30 fait 38,50 heures, donc 3,50 heures au-dessus de ce repère.
        </p>
        <p>
          Toute heure accomplie au-delà de la durée légale, ou de la durée considérée comme équivalente, est en principe une heure supplémentaire (<a className="font-semibold text-blue-700 hover:underline" href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033020373" target="_blank" rel="noopener noreferrer">article L3121-28</a>). À défaut d’accord, les huit premières sont majorées de 25 % et les suivantes de 50 % (<a className="font-semibold text-blue-700 hover:underline" href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033020341" target="_blank" rel="noopener noreferrer">article L3121-36</a>). Un accord d’entreprise ou de branche peut fixer d’autres taux, sans aller en dessous de 10 %.
        </p>
        <p>
          Convertir 3,50 heures ne dit donc pas quel taux appliquer, ni si un accord de repos, un forfait ou un aménagement du temps absorbe cette durée. Les <Link className="font-semibold text-blue-700 hover:underline" to="/exemples">exemples chiffrés</Link> montrent l’écart arithmétique, et s’arrêtent là.
        </p>

        <h2 className="pt-2 text-xl font-bold text-slate-900">Ce qu’il ne faut pas convertir trop tôt</h2>
        <p>
          Une pause, un trajet ou un temps d’habillage ne devient pas du travail effectif parce qu’on sait le mettre en centièmes. On décide d’abord, avec le contrat et la convention, quelle plage est retenue. Ensuite seulement on la convertit. L’ordre inverse produit un chiffre précis pour une durée qui n’aurait pas dû entrer dans le total.
        </p>
        <p>
          Autre piège : additionner des nombres déjà arrondis. 7 h 20 devient 7,33. Trois fois 7,33 font 21,99. Les mêmes trois journées totalisent 22 h 00 minutes, soit 22,00 heures si l’on convertit une seule fois. La page <Link className="font-semibold text-blue-700 hover:underline" to="/cumul">Cumul</Link> calcule les deux totaux à partir de vos lignes, et la <Link className="font-semibold text-blue-700 hover:underline" to="/methode">méthode d’arrondi</Link> explique lequel choisir.
        </p>
      </section>
    </article>
  )
}
