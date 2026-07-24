import { useSiteEffects } from './hooks/useSiteEffects'
import { IconSprite } from './components/ui/Icon'
import { SiteDock } from './components/SiteDock'
import { Hero } from './components/Hero'
import { WhyAgentZ } from './components/WhyAgentZ'
import { PlatformArch } from './components/PlatformArch'
import { Stepper } from './components/Stepper'
import { SeeInAction } from './components/SeeInAction'
import { OrgChart } from './components/OrgChart'
import { Integrations } from './components/Integrations'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'

export default function App() {
  useSiteEffects()

  return (
    <>
      <IconSprite />

      <a className="brand-mark" href="#top" aria-label="AgentZ home">
        <img src="./assets/img/agentz-logo.svg" alt="AgentZ" />
        <span>AgentZ</span>
      </a>

      <div className="scrollbar" aria-hidden="true">
        <span id="scrollbar-fill"></span>
      </div>

      <main id="top">
        <Hero />
        <WhyAgentZ />
        <PlatformArch />
        <Stepper />
        <SeeInAction />
        <OrgChart />
        <Integrations />
        <FAQ />
        <Footer />
      </main>

      <SiteDock />
    </>
  )
}
