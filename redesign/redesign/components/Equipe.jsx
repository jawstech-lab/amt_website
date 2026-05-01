// Equipe — treinadores + lutadores em rail horizontal com cartel
const Equipe = () => {
  const [tab, setTab] = React.useState("lutadores");
  const railRef = React.useRef(null);

  const list = tab === "treinadores" ? window.AMT_DATA.TREINADORES : window.AMT_DATA.LUTADORES;

  const scroll = (dir) => {
    if (railRef.current) {
      railRef.current.scrollBy({ left: dir * 360, behavior: "smooth" });
    }
  };

  return (
    <section className="equipe" id="equipe" data-screen-label="Equipe">
      <div className="wrap">
        <div className="equipe-head">
          <div>
            <div className="section-eyebrow">003 · A Equipe</div>
            <h2 className="equipe-title" style={{marginTop: 20}}>
              Nossos<br/><em>Guerreiros</em>
            </h2>
          </div>
          <div className="equipe-tabs">
            <button className={`equipe-tab ${tab === "lutadores" ? "active" : ""}`} onClick={() => setTab("lutadores")}>
              Lutadores ({window.AMT_DATA.LUTADORES.length})
            </button>
            <button className={`equipe-tab ${tab === "treinadores" ? "active" : ""}`} onClick={() => setTab("treinadores")}>
              Treinadores ({window.AMT_DATA.TREINADORES.length})
            </button>
          </div>
        </div>
      </div>

      <div className="equipe-rail" ref={railRef}>
        {list.map((p, i) => (
          <article key={p.id} className="fighter-card">
            <div className="fighter-img" style={{backgroundImage: `url('${p.img}')`}}></div>
            <span className="fighter-num">/ {String(i+1).padStart(2,"0")}</span>
            {tab === "lutadores" && p.categoria && (
              <span className="fighter-tag">{p.categoria}</span>
            )}
            <div className="fighter-info">
              <div className="fighter-name">{p.nome}</div>
              {p.apelido && <div className="fighter-alias">"{p.apelido}"</div>}
              <div className="fighter-meta">
                <div className="grau">
                  {tab === "lutadores" ? `${p.peso}` : p.grau}
                  <br/>
                  <span style={{opacity: 0.6}}>
                    {tab === "lutadores" ? p.categoria : (p.locais || "").split(",")[0]}
                  </span>
                </div>
                {tab === "lutadores" ? (
                  <div className="fighter-record">
                    <div className="v"><span className="num">{p.vitorias}</span><span className="lbl">V</span></div>
                    <div className="d"><span className="num">{p.derrotas}</span><span className="lbl">D</span></div>
                    <div className="e"><span className="num">{p.empates}</span><span className="lbl">E</span></div>
                  </div>
                ) : (
                  <div style={{fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.16em", color: "var(--gold)"}}>
                    KRU
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="wrap">
        <div className="rail-controls">
          <button className="rail-btn" onClick={() => scroll(-1)}>←</button>
          <button className="rail-btn" onClick={() => scroll(1)}>→</button>
        </div>
      </div>
    </section>
  );
};

window.Equipe = Equipe;
