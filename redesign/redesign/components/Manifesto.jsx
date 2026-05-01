// Manifesto + stats
const Manifesto = () => {
  const stats = window.AMT_DATA.STATS;
  return (
    <section className="manifesto wrap">
      <div className="manifesto-grid">
        <div className="manifesto-side">
          [ 002 ]<br/>
          Manifesto
          <div className="yantra-line" style={{marginTop: 16, width: 80}}></div>
        </div>
        <div className="manifesto-text">
          O Muay Thai não é apenas <em>luta</em>.<br/>
          É um caminho de <span className="gold">disciplina</span>,<br/>
          respeito e auto-superação.<br/>
          Aqui, formamos <em>guerreiros</em>.
        </div>
        <div>
          <div className="manifesto-side">Por trás dos números</div>
          <div className="manifesto-stats">
            {stats.map((s, i) => (
              <div key={i} className="manifesto-stat">
                <div className="num">{s.num}</div>
                <span className="lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

window.Manifesto = Manifesto;
