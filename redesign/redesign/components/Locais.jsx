// Locais
const Locais = () => {
  const locais = window.AMT_DATA.LOCAIS;
  return (
    <section className="locais" id="locais" data-screen-label="Locais">
      <div className="wrap">
        <div className="locais-head">
          <div>
            <div className="section-eyebrow">004 · Onde Treinar</div>
            <h2 className="locais-title" style={{marginTop: 20}}>
              Locais de<br/><em>Treino</em>
            </h2>
          </div>
          <a className="btn btn-ghost" href="#">
            Ver no mapa <span className="btn-arrow">→</span>
          </a>
        </div>

        <div className="locais-grid">
          {locais.map((l, i) => (
            <div key={l.id} className="local-card">
              <div className="local-card-num">/ 0{i+1} — {l.cidade}</div>
              <div className="local-card-name">{l.nome}</div>
              <div className="local-card-meta">
                <span>{l.endereco}</span>
                <span>Treinador: <strong>{l.treinador}</strong></span>
              </div>
              <div className="local-card-horarios">
                {l.horarios.map((h, j) => (
                  <div key={j} className="row">
                    <span className="dia">{h.dia}</span>
                    <span className="horas">{h.horas}</span>
                  </div>
                ))}
              </div>
              <div className="local-card-cta">
                <a href="#">Abrir no Maps →</a>
                <a href="#contato">Visitar →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.Locais = Locais;
