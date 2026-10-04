import { Link } from 'react-router-dom'
import CumulTool from '../components/CumulTool.jsx'
import PageMeta from '../components/PageMeta.jsx'

export default function CumulPage() {
  return (
    <article className="space-y-6">
      <PageMeta
        title="Cumul d'heures : total réel et total arrondi"
        description="Additionnez des journées en heures et minutes. Comparez la conversion unique du total et la somme des centièmes déjà arrondis."
        path="/cumul"
      />
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Cumul</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Additionner des journées sans perdre un centième</h1>
        <p className="leading-relaxed text-slate-600">
          Un relevé se tient en heures et minutes. Le bulletin, lui, additionne souvent des centièmes. Si chaque journée est arrondie avant l’addition, le total peut s’écarter d’un centième du total des minutes. L’exemple chargé au départ le montre : trois fois 7 h 20.
        </p>
      </header>
      <CumulTool />
      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 leading-relaxed text-slate-700">
        <h2 className="text-xl font-bold text-slate-900">Lequel des deux totaux utiliser ?</h2>
        <p>
          La conversion unique du total des minutes est la durée réelle, arrondie une seule fois à la fin. La somme des journées arrondies reproduit un logiciel qui stocke déjà 7,33 pour chaque 7 h 20. Aucune des deux n’est une « erreur de frappe ». Ce sont deux règles. Il faut suivre celle du logiciel qui établira le bulletin, et ne pas en mélanger une troisième au milieu du mois.
        </p>
        <p>
          Le détail de l’arrondi au plus proche est sur la page <Link className="font-semibold text-blue-700 hover:underline" to="/methode">méthode</Link>. Pour situer ensuite le total par rapport à 35,00 heures, ouvrez les <Link className="font-semibold text-blue-700 hover:underline" to="/exemples">exemples</Link>.
        </p>
      </section>
    </article>
  )
}
