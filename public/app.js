/**
 * app.js — Lógica del frontend. Consume la API REST con fetch().
 * GET (listar), POST (crear), PUT (editar) y DELETE (eliminar).
 * Todo lo que se registra aquí se guarda en la base de datos MySQL.
 */
const API = "/api/bebidas";

const form = document.getElementById("formBebida");
const cuerpoTabla = document.getElementById("cuerpoTabla");
const mensaje = document.getElementById("mensaje");
const tituloForm = document.getElementById("tituloForm");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");

// Muestra un mensaje de estado (ok/error)
function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = "mensaje " + tipo;
  setTimeout(() => { mensaje.textContent = ""; mensaje.className = "mensaje"; }, 3500);
}

// GET: cargar y pintar la tabla de bebidas
async function cargarBebidas() {
  try {
    const resp = await fetch(API);
    const bebidas = await resp.json();

    if (!bebidas.length) {
      cuerpoTabla.innerHTML = '<tr><td colspan="6" class="vacio">No hay bebidas registradas.</td></tr>';
      return;
    }

    cuerpoTabla.innerHTML = bebidas
      .map((b) => `
        <tr>
          <td>${b.id}</td>
          <td>${b.nombre}</td>
          <td>${b.tamano}</td>
          <td>S/ ${Number(b.precio).toFixed(2)}</td>
          <td>${b.disponible
            ? '<span class="badge si">Sí</span>'
            : '<span class="badge no">No</span>'}</td>
          <td>
            <button class="btn-mini btn-editar" onclick='editar(${JSON.stringify(b)})'>Editar</button>
            <button class="btn-mini btn-borrar" onclick="borrar(${b.id})">Borrar</button>
          </td>
        </tr>`)
      .join("");
  } catch (error) {
    mostrarMensaje("No se pudo conectar con el servidor.", "error");
  }
}

// POST / PUT: guardar (crea si no hay ID, actualiza si lo hay)
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("bebidaId").value;
  const datos = {
    nombre: document.getElementById("nombre").value.trim(),
    tamano: document.getElementById("tamano").value,
    precio: parseFloat(document.getElementById("precio").value),
    disponible: document.getElementById("disponible").checked,
  };

  try {
    const url = id ? `${API}/${id}` : API;
    const metodo = id ? "PUT" : "POST";
    const resp = await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    const data = await resp.json();

    if (resp.ok) {
      mostrarMensaje(id ? "Bebida actualizada." : "Bebida agregada.", "ok");
      resetForm();
      cargarBebidas();
    } else {
      mostrarMensaje(data.error || "Error al guardar.", "error");
    }
  } catch (error) {
    mostrarMensaje("No se pudo conectar con el servidor.", "error");
  }
});

// Cargar datos en el formulario para editar (PUT)
function editar(bebida) {
  document.getElementById("bebidaId").value = bebida.id;
  document.getElementById("nombre").value = bebida.nombre;
  document.getElementById("tamano").value = bebida.tamano;
  document.getElementById("precio").value = bebida.precio;
  document.getElementById("disponible").checked = !!bebida.disponible;
  tituloForm.textContent = "Editar bebida";
  btnGuardar.textContent = "Actualizar";
  btnCancelar.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// DELETE: eliminar una bebida
async function borrar(id) {
  if (!confirm("¿Eliminar esta bebida?")) return;
  try {
    const resp = await fetch(`${API}/${id}`, { method: "DELETE" });
    const data = await resp.json();
    if (resp.ok) {
      mostrarMensaje("Bebida eliminada.", "ok");
      cargarBebidas();
    } else {
      mostrarMensaje(data.error || "Error al eliminar.", "error");
    }
  } catch (error) {
    mostrarMensaje("No se pudo conectar con el servidor.", "error");
  }
}

// Limpiar el formulario y volver a modo "agregar"
function resetForm() {
  form.reset();
  document.getElementById("bebidaId").value = "";
  tituloForm.textContent = "Agregar bebida";
  btnGuardar.textContent = "Guardar";
  btnCancelar.hidden = true;
}
btnCancelar.addEventListener("click", resetForm);

// Carga inicial
cargarBebidas();
