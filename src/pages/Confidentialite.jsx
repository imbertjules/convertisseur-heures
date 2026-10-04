import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'
import { UPDATED } from '../lib/site.js'

export default function Confidentialite() {
  return (
    <article className="space-y-6">
      <PageMeta
        title="Politique de confidentialité"
        description="Les durées saisies dans le convertisseur restent dans le navigateur. Cookies publicitaires Google AdSense et mesure d'audience Vercel."
        path="/confidentialite"
      />
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Confidentialité</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Politique de confidentialité</h1>
        <p className="text-sm text-slate-500">Dernière mise à jour : {UPDATED}</p>
      </header>
      <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 leading-relaxed text-slate-700 md:p-8">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">1. Ce que le calculateur traite</h2>
          <p>
            Les heures et les minutes sont converties dans votre navigateur. Elles ne sont pas envoyées à un serveur du site, pas associées à un compte, et pas conservées après la fermeture de la page. Il n’existe pas d’espace membre.
          </p>
          <p>
            Cette politique concerne la navigation sur convertisseur-heures-paie.fr : pages de calcul, guide, tableau, exemples, cumul, méthode, questions fréquentes, page à propos et mentions légales.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">2. Publicité Google AdSense</h2>
          <p>
            Le site peut afficher des annonces Google AdSense (Google LLC). Google et ses partenaires déposent des cookies pour mesurer et, selon vos réglages, personnaliser ces annonces à partir de vos visites sur ce site et d’autres sites.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Vous pouvez refuser la personnalisation dans les <a className="font-semibold text-blue-700 hover:underline" href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">paramètres des annonces Google</a>.</li>
            <li>Vous pouvez aussi gérer les cookies de partenaires via <a className="font-semibold text-blue-700 hover:underline" href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">aboutads.info</a> ou les réglages de votre navigateur.</li>
          </ul>
          <p>
            Les annonces accompagnent des pages qui ont un contenu propre : mode d’emploi, formule, tableaux et exemples. Elles ne sont pas la seule matière de ces pages.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">3. Mesure d’audience</h2>
          <p>
            Vercel Analytics et Vercel Speed Insights mesurent la fréquentation et les performances de façon agrégée. Cette mesure sert à savoir quelles explications sont lues et si les pages restent rapides. Elle ne reconstitue pas les durées que vous convertissez.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">4. Vos droits</h2>
          <p>
            Le règlement général sur la protection des données reconnaît un droit d’accès, de rectification et d’opposition. Comme le site ne conserve pas les saisies du calculateur, il n’existe pas de dossier de durées à transmettre ou à effacer de ce côté. Pour les cookies publicitaires, les réglages Google et ceux du navigateur sont le levier efficace.
          </p>
          <p>
            Le rôle du site et l’hébergement sont décrits dans les <Link className="font-semibold text-blue-700 hover:underline" to="/mentions-legales">mentions légales</Link>.
          </p>
        </div>
      </section>
    </article>
  )
}
