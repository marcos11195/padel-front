const HorariosSelector = ({ horarios, ocupados, seleccionados, onToggle }) => {
    return (
        <div className="d-flex flex-wrap gap-2">
            {horarios.map(h => {
                const ocupado = ocupados.includes(h.id);
                const seleccionado = seleccionados.includes(h.id);

                return (
                    <button
                        key={h.id}
                        className={`btn ${ocupado
                                ? "btn-secondary"
                                : seleccionado
                                    ? "btn-success"
                                    : "btn-outline-primary"
                            }`}
                        disabled={ocupado}
                        onClick={() => onToggle(h.id)}
                    >
                        {h.franja} ({h.turno})
                    </button>
                );
            })}
        </div>
    );
};

export default HorariosSelector;
