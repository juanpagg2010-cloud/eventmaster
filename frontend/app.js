const API_URL = 'http://localhost:5000/api/eventos';

let eventosOriginales = [];
let filtroActual = 'todos';

async function cargarEventos() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Error al cargar eventos');
        eventosOriginales = await res.json();
        renderizar(filtroActual);
    } catch (err) {
        console.error('Error:', err);
        document.getElementById('eventos-container').innerHTML = '<p class="error">❌ Error cargando eventos. Verifica que el servidor esté activo.</p>';
    }
}

window.renderizar = function(tipo) {
    filtroActual = tipo || 'todos';
    
    // Actualizar estado de botones
    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`button[onclick="renderizar('${filtroActual}')"]`)?.classList.add('active');
    
    if (tipo && tipo !== 'todos') {
        const filtrados = eventosOriginales.filter(e => e.tipo === tipo);
        mostrarEventos(filtrados);
    } else {
        mostrarEventos(eventosOriginales);
    }
};

function mostrarEventos(eventos) {
    const container = document.getElementById('eventos-container');
    
    if (eventos.length === 0) {
        container.innerHTML = '<p class="sin-eventos">📭 No hay eventos disponibles</p>';
        return;
    }
    
    container.innerHTML = eventos.map(ev => {
        const lleno = ev.asistentes >= ev.cupomaximo;
        return `
            <div class="card">
                <div class="card-header">
                    <span class="badge badge-${ev.tipo.toLowerCase()}">${ev.tipo}</span>
                </div>
                <div class="card-body">
                    <h2>${ev.nombre}</h2>
                    <p class="fecha">📅 ${new Date(ev.fecha).toLocaleDateString('es-ES')}</p>
                    <p class="info-cupos">
                        👥 Asistentes: <strong>${ev.asistentes} / ${ev.cupomaximo}</strong>
                    </p>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${(ev.asistentes / ev.cupomaximo) * 100}%"></div>
                    </div>
                </div>
                <div class="card-footer">
                    <button 
                        class="btn-inscribir ${lleno ? 'btn-disabled' : 'btn-active'}"
                        ${lleno ? 'disabled' : ''}
                        onclick="inscribir('${ev._id}')">
                        ${lleno ? '❌ CUPO LLENO' : '✅ INSCRIBIRSE'}
                    </button>
                    <button class="btn-eliminar" onclick="eliminarEvento('${ev._id}', '${ev.nombre}')">🗑️ Eliminar</button>
                </div>
                <div id="error-${ev._id}" class="error-msg"></div>
            </div>
        `;
    }).join('');
}

window.inscribir = async (id) => {
    const errorDiv = document.getElementById(`error-${id}`);
    try {
        const res = await fetch(`${API_URL}/${id}/registrar`, { method: 'PATCH' });
        const data = await res.json();

        if (!res.ok) {
            errorDiv.innerText = '❌ ' + (data.mensaje || 'Error en la inscripción');
            setTimeout(() => errorDiv.innerText = '', 4000);
            return;
        }
        errorDiv.innerHTML = '<span style="color: green;">✅ ¡Inscripción exitosa!</span>';
        setTimeout(() => cargarEventos(), 1500);
    } catch (err) {
        console.error("Error al inscribir:", err);
        errorDiv.innerText = '❌ Error en la conexión';
    }
};

window.eliminarEvento = async (id, nombre) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar el evento "${nombre}"?`)) return;
    
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error al eliminar');
        
        alert('✅ Evento eliminado correctamente');
        cargarEventos();
    } catch (err) {
        console.error("Error al eliminar:", err);
        alert('❌ Error al eliminar el evento');
    }
};

window.abrirModalCrear = () => {
    document.getElementById('modal-crear').style.display = 'block';
};

window.cerrarModal = () => {
    document.getElementById('modal-crear').style.display = 'none';
    document.getElementById('form-evento').reset();
};

window.crearNuevoEvento = async (event) => {
    event.preventDefault();
    
    const nuevoEvento = {
        nombre: document.getElementById('nombre').value,
        fecha: document.getElementById('fecha').value,
        tipo: document.getElementById('tipo').value,
        cupomaximo: parseInt(document.getElementById('cupomaximo').value),
        asistentes: 0
    };
    
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoEvento)
        });
        
        if (!res.ok) throw new Error('Error al crear evento');
        
        alert('✅ ¡Evento creado exitosamente!');
        cerrarModal();
        cargarEventos();
    } catch (err) {
        console.error("Error:", err);
        alert('❌ Error al crear el evento');
    }
};

// Cerrar modal al hacer clic fuera
window.onclick = (event) => {
    const modal = document.getElementById('modal-crear');
    if (event.target === modal) {
        cerrarModal();
    }
};

// Cargar eventos al iniciar
cargarEventos();