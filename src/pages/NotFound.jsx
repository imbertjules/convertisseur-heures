import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'
import { NAV } from '../lib/site.js'

export default function NotFound() {
  return (
    <article className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <PageMeta
        title="Page introuvable"
        description="Cette adresse ne correspond à aucune page du convertisseur d'heures en centièmes."
        path="/introuvable"
      />
      <h1 className="text-3xl font-extrabold text-slate-900">Cette page n’existe pas</h1>
      <p className="leading-relaxed text-slate-700">
        L’adresse demandée ne correspond ni au convertisseur, ni à un guide. Les durées déjà saisies sur une autre page ne sont pas conservées. Reprenez depuis l’une des pages ci-dessous.
      </p>
      <ul className="list-disc space-y-2 pl-5 text-slate-700">
        {NAV.map((item) => (
          <li key={item.to}>
            <Link className="font-semibold text-blue-700 hover:underline" to={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
