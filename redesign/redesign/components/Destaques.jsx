// Destaques + Nossa História
const Destaques = () => {
  const imgs = window.AMT_DATA.DESTAQUES;
  // Triplicar para loop infinito
  const looped = [...imgs, ...imgs, ...imgs, ...imgs];

  return (
    <section className="destaques" data-screen-label="Destaques">
      <div className="wrap">
        <div className="destaques-head">
          <div className="section-eyebrow">002 · Da Equipe</div>
          <h2 className="destaques-title" style={{marginTop: 20}}>
            <em>Destaques</em>
          </h2>
        </div>
      </div>
      <div className="destaques-rail">
        <div className="destaques-track">
          {looped.map((src, i) => (
            <div key={i} className="destaque-card">
              <img src={src} alt={`Destaque AMT ${(i % imgs.length) + 1}`} loading="lazy" />
              <div className="destaque-overlay">
                <span className="destaque-num">/ {String((i % imgs.length) + 1).padStart(2, "0")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Historia = () => {
  const imgs = window.AMT_DATA.NOSSA_HISTORIA;
  const [idx1, setIdx1] = React.useState(0);
  const [idx2, setIdx2] = React.useState(1);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIdx1(p => (p + 2) % imgs.length);
      setIdx2(p => (p + 2) % imgs.length);
    }, 4000);
    return () => clearInterval(id);
  }, [imgs.length]);

  return (
    <section className="historia" data-screen-label="Historia">
      <div className="wrap">
        <div className="historia-grid">
          <div className="historia-text">
            <div className="section-eyebrow">003 · A Equipe AMT</div>
            <h2 className="historia-title">
              Nossa<br/><em>História</em>
            </h2>
            <div className="historia-body">
              <p>
                A Equipe AMT foi criada em <strong>4 de setembro de 2017</strong>.
                A grande força que impulsionou o nascimento da equipe era a de
                trazer o Muay Thai de forma <em>real e verdadeira</em> para a região.
              </p>
              <p>
                Tinha também a missão de quebrar o estereótipo da época, de que
                treinos e lutas eram degradantes, e levar o Muay Thai a todo o
                público — o que mantemos até hoje. O nome <strong>"Alliance"</strong>
                vem de uma aliança dos treinadores que migraram de outra equipe
                para a AMT com o intuito de evolução.
              </p>
              <p>
                Hoje, temos como líder o <strong>Kru Jefferson Erbas</strong>, que
                está desde a formação da equipe. Contamos também com mais 8
                krus/instrutores em atividade entre <strong>São José dos Campos</strong>
                e <strong>Caraguatatuba</strong>. Seguimos em constante evolução
                para ministrar as melhores aulas e repassar as informações mais
                atualizadas possíveis aos alunos.
              </p>
            </div>
            <div className="historia-meta">
              <div><span className="num">2017</span><span className="lbl">Fundação</span></div>
              <div><span className="num">09</span><span className="lbl">Krus / Instrutores</span></div>
              <div><span className="num">2</span><span className="lbl">Cidades</span></div>
            </div>
          </div>
          <div className="historia-images">
            <div className="historia-img-frame primary">
              <img src={imgs[idx1]} alt="História AMT" />
              <span className="frame-tag">/ EST. 2017</span>
            </div>
            <div className="historia-img-frame secondary">
              <img src={imgs[idx2]} alt="História AMT" />
              <span className="frame-tag gold">/ ALLIANCE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

window.Destaques = Destaques;
window.Historia = Historia;
