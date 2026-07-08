import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, ChevronDown, Crown, Menu, Search, Shield, Swords, Target, X } from 'lucide-react'
import { demoFighters, divisions } from './data'

const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

function FighterSilhouette({ fighter, large = false }) {
  const initials = fighter.name.split(' ').map(n => n[0]).slice(0, 2).join('')
  return <div className={`silhouette ${large ? 'large' : ''}`} style={{ '--accent': fighter.accent }}>
    <div className="fighter-glow" /><div className="initials">{initials}</div>
  </div>
}

function App() {
  const [selectedDivision, setSelectedDivision] = useState('all')
  const [fighters, setFighters] = useState(demoFighters)
  const [selectedFighter, setSelectedFighter] = useState(null)
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    fetch(`${API}/fighters/`).then(r => r.ok ? r.json() : Promise.reject()).then(setFighters).catch(() => {})
  }, [])

  const visible = useMemo(() => fighters.filter(f =>
    (selectedDivision === 'all' || f.weight_class === selectedDivision) &&
    `${f.name} ${f.nickname}`.toLowerCase().includes(search.toLowerCase())
  ), [fighters, selectedDivision, search])

  const chooseDivision = slug => {
    setSelectedDivision(slug); setSelectedFighter(null)
    setTimeout(() => document.querySelector('#roster')?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  const activeName = divisions.find(d => d.slug === selectedDivision)?.name || 'All Divisions'

  return <div className="app">
    <header>
      <button className="brand" onClick={() => chooseDivision('all')}><span>F</span> FIGHT ATLAS</button>
      <nav className={menuOpen ? 'open' : ''}>
        <button onClick={() => chooseDivision('all')}>Divisions</button>
        <button onClick={() => document.querySelector('#roster')?.scrollIntoView({ behavior: 'smooth' })}>Rankings</button>
        <button>Champions</button>
      </nav>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main>
      <section className="hero">
        <div className="hero-noise" />
        <div className="eyebrow"><span /> THE FIGHTER INDEX</div>
        <h1>EVERY DIVISION.<br/><em>EVERY CONTENDER.</em></h1>
        <p>Explore the athletes, records, rankings and styles that define the world's premier mixed martial arts roster.</p>
        <button className="primary" onClick={() => chooseDivision('all')}>EXPLORE THE ROSTER <ArrowRight size={18}/></button>
        <div className="hero-stat"><b>8</b><span>MEN'S<br/>DIVISIONS</span></div>
        <div className="octagon-lines" />
      </section>

      <section className="division-section">
        <div className="section-heading"><div><span className="kicker">CHOOSE YOUR ARENA</span><h2>WEIGHT CLASSES</h2></div><p>From speed and precision to raw power. Select a division to meet its elite.</p></div>
        <div className="division-grid">
          {divisions.map((d, i) => <button key={d.slug} className={selectedDivision === d.slug ? 'division active' : 'division'} onClick={() => chooseDivision(d.slug)}>
            <span className="division-number">0{i + 1}</span><span className="division-icon"><Swords /></span>
            <span className="division-name">{d.name}</span><span className="limit">UP TO {d.limit_lbs} LBS</span><ArrowRight className="division-arrow" size={18}/>
          </button>)}
        </div>
      </section>

      <section className="roster" id="roster">
        <div className="roster-top">
          <div><span className="kicker">OFFICIAL ROSTER</span><h2>{activeName}</h2></div>
          <div className="tools"><label><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search fighters"/></label>
            <button className="select-button">{activeName}<ChevronDown size={16}/></button>
          </div>
        </div>
        <div className="fighter-grid">
          {visible.map(f => <button className="fighter-card" key={f.id} onClick={() => setSelectedFighter(f)}>
            <div className="card-top"><span className={f.is_champion ? 'rank champion' : 'rank'}>{f.is_champion ? <><Crown size={13}/> CHAMPION</> : `#${f.rank || 'NR'}`}</span><span>{f.country_code}</span></div>
            <FighterSilhouette fighter={f}/>
            <div className="card-info"><small>{f.nickname ? `“${f.nickname}”` : 'UFC CONTENDER'}</small><h3>{f.name}</h3><div className="record"><b>{f.record}</b><span>PRO RECORD</span></div></div>
            <div className="view-profile">VIEW PROFILE <ArrowRight size={15}/></div>
          </button>)}
        </div>
        {!visible.length && <div className="empty">No fighters found in this corner of the roster.</div>}
      </section>
    </main>

    <footer><div className="brand"><span>F</span> FIGHT ATLAS</div><p>Built for fight fans. Demo rankings are illustrative and not official.</p><span>© 2026</span></footer>

    {selectedFighter && <div className="modal-backdrop" onMouseDown={() => setSelectedFighter(null)}>
      <article className="fighter-modal" onMouseDown={e => e.stopPropagation()} style={{ '--accent': selectedFighter.accent }}>
        <button className="close" onClick={() => setSelectedFighter(null)}><X /></button>
        <div className="modal-visual"><FighterSilhouette fighter={selectedFighter} large/><div className="modal-rank">{selectedFighter.is_champion ? 'C' : `#${selectedFighter.rank}`}</div></div>
        <div className="modal-content">
          <span className="kicker">{selectedFighter.country} · {selectedFighter.weight_lbs} LBS</span>
          <h2>{selectedFighter.name}</h2><h4>{selectedFighter.nickname && `“${selectedFighter.nickname}”`}</h4>
          <div className="big-record"><b>{selectedFighter.record}</b><span>PROFESSIONAL RECORD</span></div>
          <div className="stats">
            <div><Target/><b>{selectedFighter.height}</b><span>HEIGHT</span></div><div><ArrowRight/><b>{selectedFighter.reach}</b><span>REACH</span></div>
            <div><Shield/><b>{selectedFighter.stance}</b><span>STANCE</span></div><div><Swords/><b>{selectedFighter.wins_by_ko}</b><span>KO WINS</span></div>
          </div>
          <button className="primary" onClick={() => setSelectedFighter(null)}><ArrowLeft size={17}/> BACK TO RANKINGS</button>
        </div>
      </article>
    </div>}
  </div>
}

export default App

