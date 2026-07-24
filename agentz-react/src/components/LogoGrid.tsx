const LOGOS = [
  { file: 'openai', name: 'OpenAI', mono: true },
  { file: 'anthropic', name: 'Anthropic', mono: true },
  { file: 'gemini', name: 'Google Gemini' },
  { file: 'aws', name: 'AWS', mono: true },
  { file: 'azure', name: 'Microsoft Azure' },
  { file: 'googlecloud', name: 'Google Cloud' },
  { file: 'slack', name: 'Slack' },
  { file: 'gmail', name: 'Gmail' },
  { file: 'microsoft', name: 'Microsoft 365' },
  { file: 'googleworkspace', name: 'Google Workspace' },
  { file: 'jira', name: 'Jira' },
  { file: 'confluence', name: 'Confluence' },
  { file: 'notion', name: 'Notion', mono: true },
  { file: 'github', name: 'GitHub', mono: true },
  { file: 'gitlab', name: 'GitLab' },
  { file: 'bitbucket', name: 'Bitbucket' },
]

/** Native grid of real brand SVGs (replaces the old logos.png board). */
export function LogoGrid() {
  return (
    <div className="logo-grid">
      {LOGOS.map((l) => (
        <div className="logo-tile" key={l.file}>
          <span className="logo-badge">
            <img
              className={l.mono ? 'logo-img logo-img--mono' : 'logo-img'}
              src={`./assets/img/logos/${l.file}.svg`}
              alt={l.name}
              loading="lazy"
              width={40}
              height={40}
            />
          </span>
          <span className="logo-name">{l.name}</span>
        </div>
      ))}
    </div>
  )
}
