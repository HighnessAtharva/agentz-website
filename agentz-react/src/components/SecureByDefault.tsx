import { Icon } from './ui/Icon'
import { BentoGrid, BentoGridItem } from './ui/aceternity/BentoGrid'

const CARDS = [
  { n: '01', icon: 'key', h: 'Credentials, handled', p: 'Secrets stay in the vault. Agents get scoped access at the moment they need it, and never see the key.', span: 'md:col-span-2' },
  { n: '02', icon: 'shield', h: 'Just-enough access', p: 'Every skill runs with the narrowest permissions that get the job done. No standing cloud roles.', span: '' },
  { n: '03', icon: 'eye', h: 'Runtime you can see', p: 'Every action, tool call, and decision is visible in one place, in real time.', span: '' },
  { n: '04', icon: 'audit', h: 'Audit, out of the box', p: 'A signed trace for every run. SOC and compliance reviews stop being a project.', span: 'md:col-span-2' },
]

export function SecureByDefault() {
  return (
    <section className="feature alt" id="secure">
      <div className="wrap">
        <div className="fhead center">
          <h2 className="fhead-h">
            Secure by default, so you never have to <span className="hl hl-a">bolt it on later</span>.
          </h2>
          <p className="fhead-p">
            You focus on <span className="hl hl-a">skills</span> and <span className="hl hl-b">workflows</span>. AgentZ
            quietly handles the four things that usually turn an agent demo into a production incident.
          </p>
        </div>
        <BentoGrid className="md:auto-rows-[15rem]">
          {CARDS.map((c) => (
            <BentoGridItem
              key={c.n}
              className={c.span}
              icon={<span className="dcard-ico"><Icon name={c.icon} /></span>}
              title={c.h}
              description={c.p}
              header={
                <div className="bento-head">
                  <span className="bento-num">{c.n}</span>
                </div>
              }
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
