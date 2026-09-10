import { useState, useEffect } from 'react';
import { Clock, Copy, Check, Calculator, HelpCircle, BookOpen } from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  const [hours, setHours] = useState('7');
  const [minutes, setMinutes] = useState('45');
  const [decimals, setDecimals] = useState('7.75');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = `${hours}h${minutes} min = ${decimals} centièmes | Convertisseur Paie`;
  }, [hours, minutes, decimals]);

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
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Header */}
          <header className="text-center space-y-2 pt-2">
            <div className="inline-flex items-center justify-center p-3 bg-blue-600 text-white rounded-2xl shadow-md mb-2">
              <Clock className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Convertisseur Heures en Centièmes
            </h1>
            <p className="text-slate-600 text-sm md:text-base max-w-lg mx-auto">
              Outil gratuit de conversion d'heures et minutes en centièmes (heures décimales) pour la paie et le suivi du temps.
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

          {/* Section SEO */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6 text-slate-700 leading-relaxed">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Comment convertir des heures et minutes en centièmes ?
            </h2>
            <p>
              Dans la gestion de la paie, la facturation d'honoraires ou le suivi de chantier, le temps de travail est exprimé en <strong>heures décimales (ou centièmes d'heure)</strong>. Un système horaire classique compte 60 minutes par heure, tandis que le système décimal découpe une heure en 100 centièmes.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-blue-600 font-mono text-sm">
              <strong>Formule de calcul :</strong><br />
              Centièmes = Minutes / 60
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-600" />
              Foire Aux Questions (FAQ)
            </h2>
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-semibold text-slate-900 text-base">Pourquoi utiliser les heures décimales en paie ?</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Les logiciels de paie multiplient le taux horaire par le temps travaillé en centièmes pour éviter les erreurs de calcul sexagésimales.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-base">À quoi correspondent 30 minutes en centièmes ?</h3>
                <p className="text-sm text-slate-600 mt-1">
                  30 minutes correspondent à <strong>0,50 heure</strong> (30 / 60 = 0,5).
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center text-xs text-slate-400 py-4">
            <p>© {new Date().getFullYear()} Convertisseur Heures en Centièmes - Outil gratuit RH & Paie</p>
          </footer>

        </div>
      </div>
  );
}