// App root with Tweaks
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "cinematic",
  "palette": "classic",
  "fontPair": "anton-inter",
  "showMarquee": true,
  "showManifesto": true
}/*EDITMODE-END*/;

const PALETTES = {
  classic:    { red: "#d2042d", gold: "#ffd700", bg: "#0a0a0a", bg2: "#141414" },
  blood:      { red: "#9d0822", gold: "#e8c547", bg: "#080808", bg2: "#121212" },
  ivory:      { red: "#c8102e", gold: "#d4af37", bg: "#0d0c0a", bg2: "#1a1813" },
  sayant:     { red: "#bb1f2c", gold: "#f0c419", bg: "#0c0a08", bg2: "#171410" },
};
const FONTS = {
  "anton-inter":   { display: "'Anton', Impact, sans-serif", condensed: "'Oswald', sans-serif" },
  "bebas-inter":   { display: "'Bebas Neue', Impact, sans-serif", condensed: "'Oswald', sans-serif" },
  "oswald-only":   { display: "'Oswald', Impact, sans-serif", condensed: "'Oswald', sans-serif" },
};

const App = () => {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement;
    const p = PALETTES[tweaks.palette] || PALETTES.classic;
    const f = FONTS[tweaks.fontPair] || FONTS["anton-inter"];
    root.style.setProperty("--red", p.red);
    root.style.setProperty("--gold", p.gold);
    root.style.setProperty("--bg", p.bg);
    root.style.setProperty("--bg-2", p.bg2);
    root.style.setProperty("--f-display", f.display);
    root.style.setProperty("--f-condensed", f.condensed);
  }, [tweaks.palette, tweaks.fontPair]);

  // Scroll-driven in-view
  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); });
    }, { threshold: 0.12 });
    document.querySelectorAll(".manifesto-text, .equipe-title, .locais-title, .cal-title, .contato-title, .fighter-card, .local-card, .cal-item")
      .forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [tweaks.heroVariant]);

  const { TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakToggle } = window;

  return (
    <>
      <div className="app-bg"></div>
      <div className="grain"></div>
      <Navbar />
      <Hero variant={tweaks.heroVariant} key={tweaks.heroVariant} />
      {tweaks.showMarquee && <Marquee />}
      <Destaques />
      <Historia />
      {tweaks.showManifesto && <Manifesto />}
      <Equipe />
      <Locais />
      <Calendario />
      <Contato />
      <Footer />

      <TweaksPanel title="Tweaks · AMT">
        <TweakSection title="Hero">
          <TweakRadio
            label="Variação do título"
            value={tweaks.heroVariant}
            onChange={(v) => setTweak("heroVariant", v)}
            options={[
              { value: "cinematic", label: "Cinematic" },
              { value: "declarative", label: "Declarativo" },
              { value: "minimal", label: "Minimal" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Paleta">
          <TweakRadio
            label="Cor base"
            value={tweaks.palette}
            onChange={(v) => setTweak("palette", v)}
            options={[
              { value: "classic", label: "Classic" },
              { value: "blood", label: "Blood" },
              { value: "ivory", label: "Ivory" },
              { value: "sayant", label: "Sak Yant" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Tipografia">
          <TweakSelect
            label="Pareamento"
            value={tweaks.fontPair}
            onChange={(v) => setTweak("fontPair", v)}
            options={[
              { value: "anton-inter", label: "Anton + Inter (atual)" },
              { value: "bebas-inter", label: "Bebas Neue + Inter" },
              { value: "oswald-only", label: "Oswald (mais sóbrio)" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Seções">
          <TweakToggle
            label="Marquee de slogans"
            value={tweaks.showMarquee}
            onChange={(v) => setTweak("showMarquee", v)}
          />
          <TweakToggle
            label="Manifesto + stats"
            value={tweaks.showManifesto}
            onChange={(v) => setTweak("showManifesto", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
