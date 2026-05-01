// Hero
const Hero = ({ variant = "cinematic" }) => {
  const titleParts = {
    cinematic: ["Forjando", { red: "Campeões" }],
    declarative: [{ red: "Tradição." }, "Disciplina.", { gold: "Glória." }],
    minimal: ["Muay", { red: "Thai" }, "Real."],
  }[variant];

  return (
    <section className="hero" id="home" data-screen-label="Hero">
      <div className="hero-bg">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster=""
        >
          <source src="https://raw.githubusercontent.com/jawstech-lab/amt_website/master/public/video/logo-animado.webm" type="video/webm" />
        </video>
        <div className="hero-video-overlay"></div>
        <div className="hero-stripes"></div>
      </div>

      <div className="hero-content">
        <div>
          <div className="hero-eyebrow-row">
            <span className="dot"></span>
            <span>AMT — Alliance Muay Thai · Vale do Paraíba</span>
            <span style={{opacity: 0.5}}>EST. 2017</span>
          </div>
          <h1 className="hero-title">
            {titleParts.map((p, i) => {
              if (typeof p === "string") return <span key={i} className="word">{p}</span>;
              if (p.red) return <span key={i} className="word red">{p.red}</span>;
              if (p.gold) return <span key={i} className="word gold" style={{color: "var(--gold)", fontStyle: "italic"}}>{p.gold}</span>;
              return null;
            })}
          </h1>
        </div>

        <div className="hero-meta">
          <div className="hero-meta-block">
            Sede principal
            <strong>SJC · Caraguá</strong>
          </div>
          <div className="hero-meta-block">
            Liderança
            <strong>Kru Jefferson</strong>
          </div>
        </div>
      </div>

      <div className="hero-bottom">
        <p className="hero-tagline">
          A equipe que mais cresce e gera campeões no Vale do Paraíba.
          Tradição tailandesa, treinamento de alto nível e a essência real do Muay Thai.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#equipe">
            Conheça a Equipe <span className="btn-arrow">→</span>
          </a>
          <a className="btn btn-ghost" href="#locais">Locais de Treino</a>
        </div>
        <div style={{fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-muted)"}}>
          Scroll ↓
        </div>
      </div>
    </section>
  );
};

const Marquee = () => (
  <div className="marquee">
    <div className="marquee-track">
      {Array.from({length: 4}).map((_, i) => (
        <React.Fragment key={i}>
          <span>Forjando Campeões</span>
          <span className="dot">●</span>
          <span className="gold">Sawasdee Krap</span>
          <span className="dot">●</span>
          <span>Tradição · Disciplina · Glória</span>
          <span className="dot">●</span>
          <span className="gold">Wai Khru Ram Muay</span>
          <span className="dot">●</span>
        </React.Fragment>
      ))}
    </div>
  </div>
);

window.Hero = Hero;
window.Marquee = Marquee;
