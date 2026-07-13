export default function Boot() {
  return (
    <div className="boot" data-boot="">
      <div className="boot-lines">
        <div data-bl="">
          <span className="acc">&gt;</span> <span className="white">boot</span> vance-portfolio{' '}
          <span className="acc">v2.0</span>
        </div>
        <div data-bl="">
          <span className="acc">&gt;</span> loading modules ........ <span className="ok">ok</span>
        </div>
        <div data-bl="">
          <span className="acc">&gt;</span> rendering ui ........... <span className="ok">ok</span>
        </div>
        <div data-bl="">
          <span className="acc">&gt;</span> login: <span className="white" data-bt="vance" />
        </div>
        <div data-bl="">
          <span className="acc">&gt;</span> password: <span data-bt="********" />
        </div>
        <div data-bl="">
          <span className="acc">&gt;</span> <span className="ok">access granted ✓</span>{' '}
          <span className="white">welcome.</span> <span className="boot-caret" />
        </div>
      </div>
    </div>
  )
}
