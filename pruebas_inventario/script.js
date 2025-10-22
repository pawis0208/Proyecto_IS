// Función para mostrar mensajes temporales
function mostrarMensaje(texto, tipo = "info") {
  const mensaje = document.createElement("div")
  mensaje.className = `mensaje ${tipo}`
  mensaje.textContent = texto
  document.body.appendChild(mensaje)

  setTimeout(() => {
    mensaje.style.animation = "slideIn 0.3s ease-out reverse"
    setTimeout(() => mensaje.remove(), 300)
  }, 3000)
}

// Agregar material a la tabla
document.getElementById("agregar").addEventListener("click", () => {
  const material = document.getElementById("material").value
  const cantidad = document.getElementById("cantidad").value
  const fecha = document.getElementById("fecha").value
  const auxiliar = document.getElementById("auxiliar").value

  // Validación de campos
  if (!material) {
    mostrarMensaje("Por favor, seleccione un material", "error")
    return
  }

  if (!cantidad || cantidad < 1) {
    mostrarMensaje("Por favor, ingrese una cantidad válida", "error")
    return
  }

  if (!fecha) {
    mostrarMensaje("Por favor, seleccione una fecha", "error")
    return
  }

  // Agregar fila a la tabla
  const tabla = document.querySelector("#tablaMateriales tbody")
  const fila = document.createElement("tr")

  fila.innerHTML = `
    <td>${material}</td>
    <td>${cantidad}</td>
    <td>${new Date(fecha).toLocaleDateString("es-ES")}</td>
  `

  // Animación de entrada
  fila.style.animation = "fadeIn 0.5s ease-out"
  tabla.appendChild(fila)

  mostrarMensaje("Material agregado a la vista previa", "exito")

  // Limpiar solo los campos de material y cantidad
  document.getElementById("material").value = ""
  document.getElementById("cantidad").value = 1
})

// Eliminar última fila
document.getElementById("eliminar").addEventListener("click", () => {
  const tabla = document.querySelector("#tablaMateriales tbody")

  if (tabla.lastChild) {
    tabla.removeChild(tabla.lastChild)
    mostrarMensaje("Último material eliminado", "info")
  } else {
    mostrarMensaje("No hay materiales para eliminar", "error")
  }
})

// Limpiar toda la tabla
document.getElementById("limpiar").addEventListener("click", () => {
  const tabla = document.querySelector("#tablaMateriales tbody")

  if (tabla.children.length > 0) {
    if (confirm("¿Está seguro de que desea limpiar toda la tabla?")) {
      tabla.innerHTML = ""
      mostrarMensaje("Tabla limpiada correctamente", "info")
    }
  } else {
    mostrarMensaje("La tabla ya está vacía", "error")
  }
})

// Guardar datos (simulado)
document.getElementById("guardar").addEventListener("click", () => {
  const tabla = document.querySelector("#tablaMateriales tbody")

  if (tabla.children.length === 0) {
    mostrarMensaje("No hay datos para guardar", "error")
    return
  }

  const auxiliar = document.getElementById("auxiliar").value

  if (!auxiliar) {
    mostrarMensaje("Por favor, ingrese el nombre del auxiliar", "error")
    return
  }

  // Aquí iría la lógica para guardar en base de datos
  mostrarMensaje("Datos guardados correctamente", "exito")

  console.log("Datos a guardar:", {
    auxiliar: auxiliar,
    materiales: Array.from(tabla.children).map((fila) => ({
      material: fila.cells[0].textContent,
      cantidad: fila.cells[1].textContent,
      fecha: fila.cells[2].textContent,
    })),
  })
})

// Visualizar registro
document.getElementById("visualizar").addEventListener("click", () => {
  const tabla = document.querySelector("#tablaMateriales tbody")
  const auxiliar = document.getElementById("auxiliar").value

  if (tabla.children.length === 0) {
    mostrarMensaje("No hay materiales para visualizar", "error")
    return
  }

  if (!auxiliar) {
    mostrarMensaje("Por favor, ingrese el nombre del auxiliar", "error")
    return
  }

  // Llenar información del registro
  document.getElementById("previewAuxiliar").textContent = auxiliar
  document.getElementById("previewFecha").textContent = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  document.getElementById("previewTotal").textContent = tabla.children.length

  // Llenar tabla de preview
  const tablaPreview = document.querySelector("#tablaPreview tbody")
  tablaPreview.innerHTML = ""

  Array.from(tabla.children).forEach((fila, index) => {
    const nuevaFila = document.createElement("tr")
    nuevaFila.innerHTML = `
      <td>${index + 1}</td>
      <td>${fila.cells[0].textContent}</td>
      <td>${fila.cells[1].textContent}</td>
      <td>${fila.cells[2].textContent}</td>
    `
    tablaPreview.appendChild(nuevaFila)
  })

  // Mostrar modal
  document.getElementById("modalVisualizacion").style.display = "flex"
})

// Cerrar modal
document.getElementById("cerrarModal").addEventListener("click", () => {
  document.getElementById("modalVisualizacion").style.display = "none"
})

document.getElementById("cerrarModalBtn").addEventListener("click", () => {
  document.getElementById("modalVisualizacion").style.display = "none"
})

// Confirmar registro
document.getElementById("confirmarRegistro").addEventListener("click", () => {
  mostrarMensaje("Registro confirmado y guardado exitosamente", "exito")
  document.getElementById("modalVisualizacion").style.display = "none"

  // Aquí iría la lógica para guardar definitivamente
  console.log("Registro confirmado")
})

// Cerrar modal al hacer clic fuera
window.addEventListener("click", (e) => {
  const modal = document.getElementById("modalVisualizacion")
  if (e.target === modal) {
    modal.style.display = "none"
  }
})

// Establecer fecha actual por defecto
document.getElementById("fecha").valueAsDate = new Date()
