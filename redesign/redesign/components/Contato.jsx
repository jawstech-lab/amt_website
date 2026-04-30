// Contato
const Contato = () => {
  return (
    <section className="contato wrap" id="contato" data-screen-label="Contato">
      <div className="contato-grid">
        <div>
          <div className="section-eyebrow">006 · Vem treinar</div>
          <h2 className="contato-title" style={{marginTop: 20}}>
            Entre em<br/><em>contato</em>
          </h2>
          <p className="contato-sub">
            Tire suas dúvidas, conheça os horários e locais ou nos chame
            no WhatsApp. Estamos sempre prontos para receber você.
          </p>

          <div className="contato-channels">
            <a className="channel" href="#">
              <div className="channel-icon">IG</div>
              <div className="channel-name">@amt.muaythai<small>Instagram · acompanhe</small></div>
              <div className="channel-go">Seguir →</div>
            </a>
            <a className="channel" href="#">
              <div className="channel-icon">WA</div>
              <div className="channel-name">+55 12 99999-9999<small>WhatsApp · resposta rápida</small></div>
              <div className="channel-go">Chamar →</div>
            </a>
            <a className="channel" href="#">
              <div className="channel-icon">@</div>
              <div className="channel-name">contato@amt.com.br<small>Email · institucional</small></div>
              <div className="channel-go">Enviar →</div>
            </a>
          </div>
        </div>

        <form className="contato-form" onSubmit={(e) => e.preventDefault()}>
          <div className="contato-form-title">/ formulário rápido</div>
          <div className="field">
            <label>Nome</label>
            <input type="text" placeholder="Como podemos te chamar" />
          </div>
          <div className="field">
            <label>Telefone / WhatsApp</label>
            <input type="tel" placeholder="(12) 9 8888-7777" />
          </div>
          <div className="field">
            <label>Local de interesse</label>
            <input type="text" placeholder="SJC Centro / Aquarius / Caraguá..." />
          </div>
          <div className="field">
            <label>Mensagem</label>
            <textarea rows="3" placeholder="Conte para nós como podemos ajudar"></textarea>
          </div>
          <button type="submit" className="contato-submit">Enviar mensagem →</button>
        </form>
      </div>
    </section>
  );
};

window.Contato = Contato;
