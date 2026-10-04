import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'
import { FAQ } from '../data/faq.js'
import { SITE_URL } from '../lib/site.js'

export default function Faq() {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'faq-jsonld'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    })
    document.head.appendChild(script)
    return () => script.remove()
  }, [])

  return (
    <article className="space-y-6">
      <PageMeta
        title="Questions fréquentes sur les centièmes d'heure"
        description="Réponses concrètes : 30 minutes = 0,50, arrondi du jour ou du mois, durée légale de 35 heures, et ce que le convertisseur ne calcule pas."
        path="/faq"
      />
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">FAQ</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Questions fréquentes</h1>
        <p className="leading-relaxed text-slate-600">
          Les réponses courtes renvoient vers le <Link className="font-semibold text-blue-700 hover:underline" to="/guide">guide</Link>, le <Link className="font-semibold text-blue-700 hover:underline" to="/tableau">tableau</Link> et le <Link className="font-semibold text-blue-700 hover:underline" to="/cumul">cumul</Link> quand le détail chiffré y est montré. Source des articles cités : {SITE_URL.replace('https://', '')} s’appuie sur le Code du travail publié par Légifrance.
        </p>
      </header>
      <div className="space-y-4">
        {FAQ.map((item) => (
          <section key={item.q} className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">{item.q}</h2>
            <p className="mt-2 leading-relaxed text-slate-700">{item.a}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
