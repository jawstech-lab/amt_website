// Navbar
const Navbar = () => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "equipe", label: "Equipe", num: "01" },
    { id: "locais", label: "Treinos", num: "02" },
    { id: "calendario", label: "Calendário", num: "03" },
    { id: "contato", label: "Contato", num: "04" },
  ];

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a className="nav-brand" href="#home">
        <span className="nav-brand-mark">
          <svg viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="#d2042d" strokeWidth="1"/>
            <circle cx="20" cy="20" r="11" stroke="#ffd700" strokeWidth="0.8" opacity="0.6"/>
            <path d="M20 6 L20 34 M6 20 L34 20" stroke="#d2042d" strokeWidth="0.6" opacity="0.5"/>
            <path d="M10 10 L30 30 M30 10 L10 30" stroke="#ffd700" strokeWidth="0.4" opacity="0.4"/>
            <text x="20" y="24" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Anton" letterSpacing="1">AMT</text>
          </svg>
        </span>
        <span>AMT</span>
      </a>
      <div className="nav-links">
        {links.map(l => (
          <a key={l.id} className="nav-link" href={`#${l.id}`}>
            <span className="nav-link-num">{l.num}</span>
            {l.label}
          </a>
        ))}
        <a className="nav-cta" href="#contato">Fale Conosco →</a>
      </div>
    </nav>
  );
};

window.Navbar = Navbar;
