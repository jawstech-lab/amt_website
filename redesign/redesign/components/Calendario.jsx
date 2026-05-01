// Calendário
const Calendario = () => {
  const eventos = window.AMT_DATA.EVENTOS;
  const [open, setOpen] = React.useState(null);

  const fmtDate = (d) => {
    const dt = new Date(d);
    return {
      d: String(dt.getDate()).padStart(2, "0"),
      m: dt.toLocaleDateString("pt-BR", { month: "short" }).replace(".", ""),
    };
  };

  return (
    <section className="calendario wrap" id="calendario" data-screen-label="Calendario">
      <div className="cal-head">
        <div className="section-eyebrow">005 · Próximos Eventos</div>
        <h2 className="cal-title" style={{marginTop: 20}}>
          O que <em>vem</em> aí
        </h2>
      </div>

      <div className="cal-list">
        {eventos.map((e) => {
          const dt = fmtDate(e.data);
          const opened = open === e.id;
          return (
            <div
              key={e.id}
              className={`cal-item ${opened ? "cal-item-expanded" : ""}`}
              onClick={() => setOpen(opened ? null : e.id)}
            >
              <div className="cal-date">
                <div className="d">{dt.d}</div>
                <div className="m">{dt.m.toUpperCase()}</div>
              </div>
              <div className={`cal-tag ${e.tipo.toLowerCase()}`}>{e.tipo}</div>
              <div className="cal-event-title">
                {e.titulo}
                <small>{e.local}</small>
              </div>
              <div className="cal-time">{e.hora}h</div>
              <div className="cal-arrow">→</div>
              {opened && (
                <div className="cal-detail">{e.descricao}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

window.Calendario = Calendario;
