import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import APropos from './pages/APropos.jsx'
import Confidentialite from './pages/Confidentialite.jsx'
import CumulPage from './pages/CumulPage.jsx'
import Exemples from './pages/Exemples.jsx'
import Faq from './pages/Faq.jsx'
import Guide from './pages/Guide.jsx'
import Home from './pages/Home.jsx'
import Mentions from './pages/Mentions.jsx'
import Methode from './pages/Methode.jsx'
import NotFound from './pages/NotFound.jsx'
import Tableau from './pages/Tableau.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="guide" element={<Guide />} />
          <Route path="tableau" element={<Tableau />} />
          <Route path="exemples" element={<Exemples />} />
          <Route path="cumul" element={<CumulPage />} />
          <Route path="methode" element={<Methode />} />
          <Route path="faq" element={<Faq />} />
          <Route path="a-propos" element={<APropos />} />
          <Route path="confidentialite" element={<Confidentialite />} />
          <Route path="mentions-legales" element={<Mentions />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
