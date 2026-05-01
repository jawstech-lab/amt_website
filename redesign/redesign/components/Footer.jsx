// Footer
const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <div className="footer-brand-mark">
              AMT<em>.</em>
            </div>
            <div className="footer-tag">
              Alliance Muay Thai · Forjando Campeões<br/>
              SJC · Caraguatatuba · Vale do Paraíba
            </div>
          </div>
          <div className="footer-col">
            <h4>Navegar</h4>
            <ul>
              <li><a href="#equipe">Equipe</a></li>
              <li><a href="#locais">Locais</a></li>
              <li><a href="#calendario">Calendário</a></li>
              <li><a href="#contato">Contato</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Membros</h4>
            <ul>
              <li><a href="#">Mural</a></li>
              <li><a href="#">Apostila</a></li>
              <li><a href="#">Login</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Social</h4>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">WhatsApp</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AMT — Todos os direitos reservados</span>
          <span>Desenvolvido por JawsTech</span>
        </div>
      </div>
    </footer>
  );
};

window.Footer = Footer;
