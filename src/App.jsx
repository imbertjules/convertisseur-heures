import { useState, useEffect } from 'react';
import { Clock, Copy, Check, Calculator, HelpCircle, BookOpen, Shield, ArrowLeft } from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const [view, setView] = useState('converter'); // 'converter' ou 'privacy'
  const [hours, setHours] = useState('7');
  const [minutes, setMinutes] = useState('45');
  const [decimals, setDecimals] = useState('7.75');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (view === 'converter') {
      document.title = `${hours}h${minutes} min = ${decimals} centièmes | Convertisseur Heures Paie`;
    } else {
      document.title = `Politique de Confidentialité | Convertisseur Heures Paie`;
    }
    window.scrollTo(0, 0);
  }, [view, hours, minutes, decimals]);

  const handleTimeChange = (newHours, newMinutes) => {
    setHours(newHours);
    setMinutes(newMinutes);
    const h = parseFloat(newHours) || 0;
    const m = parseFloat(newMinutes) || 0;
    if (m >= 0 && m < 60) {
      const dec = h + m / 60;
      setDecimals(dec.toFixed(2));
    }
  };

  const handleDecimalChange = (newDecimals) => {
    setDecimals(newDecimals);
    const dec = parseFloat(newDecimals);
    if (!isNaN(dec) && dec >= 0) {
      const h = Math.floor(dec);
      const m = Math.round((dec - h) * 60);
      setHours(h.toString());
      setMinutes(m < 10 ? `0${m}` : m.toString());
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fullTable = Array.from({ length: 12 }, (_, i) => {
    const min = (i + 1) * 5;
    const cent = (min / 60).toFixed(2);
    return { min: min < 10 ? `0${min}` : `${min}`, cent };
  });

  return (
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8 pb-16">
        <SpeedInsights />
        <Analytics />
        <div className="max-w-3xl mx-auto space-y-6">

          {view === 'converter' ? (
              <>
                {/* Header */}
                <header className="text-center space-y-2 pt-2">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-600 text-white rounded-2xl shadow-md mb-2">
                    <Clock className="w-8 h-8" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                    Convertisseur Heures en Centièmes (Paie)
                  </h1>
                  <p className="text-slate-600 text-sm md:text-base max-w-lg mx-auto">
                    Outil gratuit de conversion d'heures et minutes en centièmes (heures décimales) indispensable pour l'établissement des bulletins de paie et le suivi du temps de travail.
                  </p>
                </header>

                {/* Bloc Calculateur */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

                    {/* Saisie Temps Réel */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Temps réel (HH : MM)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                            type="number"
                            min="0"
                            value={hours}
                            onChange={(e) => handleTimeChange(e.target.value, minutes)}
                            placeholder="0"
                            className="w-full text-center text-2xl font-bold bg-slate-50 border border-slate-300 rounded-xl py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        />
                        <span className="text-2xl font-bold text-slate-400">:</span>
                        <input
                            type="number"
                            min="0"
                            max="59"
                            value={minutes}
                            onChange={(e) => handleTimeChange(hours, e.target.value)}
                            placeholder="00"
                            className="w-full text-center text-2xl font-bold bg-slate-50 border border-slate-300 rounded-xl py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Saisie Décimale */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Heures décimales (Centièmes)
                      </label>
                      <div className="relative">
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={decimals}
                            onChange={(e) => handleDecimalChange(e.target.value)}
                            placeholder="0.00"
                            className="w-full text-center text-2xl font-bold bg-blue-50/50 border border-blue-200 text-blue-900 rounded-xl py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        />
                        <button
                            onClick={() => copyToClipboard(decimals)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-blue-600"
                            title="Copier le résultat"
                        >
                          {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                    <span className="text-slate-600 text-sm">Équivalence : </span>
                    <span className="font-semibold text-slate-900">
                  {hours || 0} h {minutes || 0} min = {decimals} centièmes
                </span>
                  </div>
                </div>

                {/* Tableau complet */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-blue-600" />
                    Tableau de conversion Minutes en Centièmes
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {fullTable.map((item) => (
                        <div
                            key={item.min}
                            onClick={() => handleTimeChange(hours, item.min)}
                            className="cursor-pointer bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-200 rounded-xl p-3 text-center transition-all"
                        >
                          <div className="text-xs text-slate-500">{item.min} min</div>
                          <div className="text-base font-bold text-slate-800">{item.cent} h</div>
                        </div>
                    ))}
                  </div>
                </div>

                {/* Section SEO enrichie */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6 text-slate-700 leading-relaxed">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    Comment convertir des heures et minutes en centièmes pour la paie ?
                  </h2>
                  <p>
                    Dans la gestion des ressources humaines, de la comptabilité ou de la paie, le temps de travail effectif d'un salarié ne s'exprime pas sous un format classique en minutes (ex: 7h45), mais en <strong>heures décimales (centièmes d'heure)</strong>.
                  </p>
                  <p>
                    Cette conversion est indispensable car les logiciels de paie et les grilles salariales calculent les rémunérations en multipliant le taux horaire par un nombre décimal. Une heure étant divisée en 60 minutes, il est nécessaire de transformer chaque fraction d'heure sur une base de 100.
                  </p>

                  <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-blue-600 font-mono text-sm space-y-1">
                    <strong>Formule mathématique de calcul :</strong><br />
                    <span>Centièmes = Heures pleines + (Minutes / 60)</span><br />
                    <span className="text-xs text-slate-500">Exemple pour 45 minutes : 45 / 60 = 0,75</span>
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-blue-600" />
                    Foire Aux Questions (FAQ)
                  </h2>
                  <div className="space-y-4">
                    <div className="border-b border-slate-100 pb-4">
                      <h3 className="font-semibold text-slate-900 text-base">Pourquoi utiliser les heures décimales en gestion de paie ?</h3>
                      <p className="text-sm text-slate-600 mt-1">
                        Les logiciels de paie multiplient le taux horaire brut par le temps de travail en centièmes pour éviter les erreurs de calcul dues au système sexagésimal (base 60). Cela simplifie grandement la comptabilisation des heures supplémentaires et des absences.
                      </p>
                    </div>
                    <div className="border-b border-slate-100 pb-4">
                      <h3 className="font-semibold text-slate-900 text-base">À quoi correspondent 30 minutes en centièmes d'heure ?</h3>
                      <p className="text-sm text-slate-600 mt-1">
                        30 minutes correspondent exactement à <strong>0,50 heure</strong> (car 30 divisé par 60 donne 0,5). De même, 15 minutes équivalent à 0,25 h et 45 minutes à 0,75 h.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-base">Comment arrondir les heures pour un bulletin de salaire ?</h3>
                      <p className="text-sm text-slate-600 mt-1">
                        Le résultat de la conversion est généralement arrondi à deux chiffres après la virgule (les centièmes) conformément aux exigences légales des logiciels de comptabilité et de paie en France.
                      </p>
                    </div>
                  </div>
                </div>
              </>
          ) : (
              <>
                {/* Bouton de retour */}
                <div>
                  <button
                      onClick={() => setView('converter')}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Retour au convertisseur
                  </button>
                </div>

                {/* Header Politique */}
                <header className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-3 text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-600 text-white rounded-2xl shadow-md mb-2">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                    Politique de Confidentialité
                  </h1>
                  <p className="text-slate-600 text-sm">
                    Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </header>

                {/* Contenu Politique */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6 text-slate-700 leading-relaxed text-sm md:text-base">
                  <section className="space-y-3">
                    <h2 className="text-lg font-bold text-slate-900">1. Introduction et transparence</h2>
                    <p>
                      Bienvenue sur <strong>convertisseur-heures-paie.fr</strong>. La protection de votre vie privée est une priorité absolue. La présente politique de confidentialité vous informe de la manière dont nous traitons les informations et données lors de votre navigation sur notre site web.
                    </p>
                    <p>
                      Notre outil de calcul fonctionne entièrement en local (côté client) dans votre navigateur web : les données numériques que vous saisissez (heures, minutes, centièmes) ne sont ni stockées, ni enregistrées, ni transmises sur nos serveurs.
                    </p>
                  </section>

                  <hr className="border-slate-100" />

                  <section className="space-y-3">
                    <h2 className="text-lg font-bold text-slate-900">2. Utilisation de cookies et Google AdSense</h2>
                    <p>
                      Notre site utilise des services publicitaires fournis par <strong>Google LLC</strong>, notamment <strong>Google AdSense</strong>. Pour diffuser des annonces adaptées à vos centres d'intérêt, Google et ses partenaires publicitaires utilisent des cookies pour collecter des informations sur vos visites sur ce site et d'autres sites Internet.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                      <li><strong>Cookies tiers :</strong> Google utilise des cookies pour diffuser des annonces basées sur les visites antérieures des utilisateurs sur notre site web.</li>
                      <li><strong>Annonces personnalisées :</strong> Grâce aux cookies publicitaires, Google et ses partenaires peuvent diffuser des annonces auprès de nos utilisateurs en fonction de leur navigation.</li>
                      <li>Vous pouvez refuser l'utilisation des cookies publicitaires personnalisés dans les <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">Paramètres des annonces Google</a>.</li>
                    </ul>
                  </section>

                  <hr className="border-slate-100" />

                  <section className="space-y-3">
                    <h2 className="text-lg font-bold text-slate-900">3. Mesure d'audience et performances</h2>
                    <p>
                      Nous utilisons des outils d'analyse de performance (Vercel Analytics et Vercel Speed Insights) afin d'optimiser l'expérience utilisateur et de mesurer le trafic global de façon totalement anonymisée.
                    </p>
                  </section>

                  <hr className="border-slate-100" />

                  <section className="space-y-3">
                    <h2 className="text-lg font-bold text-slate-900">4. Vos droits (RGPD)</h2>
                    <p>
                      Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Étant donné que le site ne conserve aucune donnée nominative ou de calcul, aucune donnée personnelle n'est stockée par nos soins.
                    </p>
                  </section>
                </div>
              </>
          )}

          {/* Footer unique avec le lien légal exigé par AdSense */}
          <footer className="text-center text-xs text-slate-400 py-4 space-y-2">
            <p>© {new Date().getFullYear()} Convertisseur Heures en Centièmes - Outil gratuit RH & Paie</p>
            <div>
              <button
                  onClick={() => setView(view === 'converter' ? 'privacy' : 'converter')}
                  className="text-blue-600 hover:underline bg-transparent border-none cursor-pointer text-xs font-medium"
              >
                {view === 'converter' ? 'Politique de confidentialité & Mentions légales' : "Retourner à l'outil de calcul"}
              </button>
            </div>
          </footer>

        </div>
      </div>
  );
}