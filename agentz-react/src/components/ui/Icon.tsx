import { ICON_SPRITE } from '../../data/svg'

/** Renders the shared inline SVG sprite once, near the top of <body>. */
export function IconSprite() {
  return <div aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICON_SPRITE }} />
}

type IconProps = {
  name: string
  className?: string
}

/** <Icon name="skills" /> === <svg class="ico"><use href="#i-skills"/></svg> */
export function Icon({ name, className }: IconProps) {
  return (
    <svg className={className ? `ico ${className}` : 'ico'}>
      <use href={`#i-${name}`} />
    </svg>
  )
}
