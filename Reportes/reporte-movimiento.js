// ============================================
// CONFIGURACIÓN DE LA BASE DE DATOS
// ============================================

// ============================================
// CARGAR DATOS AL INICIAR LA PÁGINA
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  cargarDatosMovimiento()
})

// ============================================
// FUNCIÓN PARA CARGAR DATOS DE MOVIMIENTO
// ============================================
async function cargarDatosMovimiento() {
  try {
    const datos = await obtenerDatosMovimientoDesdeBD()
    renderizarTablaMovimiento(datos)
  } catch (error) {
    console.error("Error al cargar datos de movimiento:", error)
    alert("Error al cargar los datos. Por favor, intenta de nuevo.")
  }
}

// ============================================
// FUNCIÓN PARA OBTENER DATOS DE LA BASE DE DATOS
// ============================================
async function obtenerDatosMovimientoDesdeBD() {
  
  return [
    {
      material: "Ejemplo Material 1",
      carrera: "Ingeniería Electrónica",
      cantidad: 10,
      tipo_movimiento: "Préstamo",
      fecha: "2025-01-15",
      usuario: "usuario1@its.mx",
    },
  ]
}

// ============================================
// FUNCIÓN PARA RENDERIZAR LA TABLA
// ============================================
function renderizarTablaMovimiento(datos) {
  const tbody = document.getElementById("tablaMovimiento")
  tbody.innerHTML = ""

  if (datos.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="6" class="border-2 border-black px-6 py-4 text-center">No hay datos disponibles</td></tr>'
    return
  }

  datos.forEach((item) => {
    const fila = document.createElement("tr")
    fila.className = "bg-white hover:bg-gray-50"
    fila.innerHTML = `
            <td class="border-2 border-black px-6 py-4">${item.material}</td>
            <td class="border-2 border-black px-6 py-4">${item.carrera}</td>
            <td class="border-2 border-black px-6 py-4">${item.cantidad}</td>
            <td class="border-2 border-black px-6 py-4">${item.tipo_movimiento}</td>
            <td class="border-2 border-black px-6 py-4">${item.fecha}</td>
            <td class="border-2 border-black px-6 py-4">${item.usuario}</td>
        `
    tbody.appendChild(fila)
  })
}

// ============================================
// FUNCIÓN PARA DESCARGAR EXCEL
// ============================================
async function descargarExcel() {
  try {
    // Conectar con el backend o librería de generación de Excel
    alert("Función de descarga Excel - Conectar con tu backend")
  } catch (error) {
    console.error("Error al descargar Excel:", error)
    alert("Error al descargar el archivo Excel")
  }
}

// ============================================
// FUNCIÓN PARA DESCARGAR PDF
// ============================================
async function descargarPDF() {
  try {
    // Conectar con el backend o librería de generación de PDF
    alert("Función de descarga PDF - Conectar con tu backend")
  } catch (error) {
    console.error("Error al descargar PDF:", error)
    alert("Error al descargar el archivo PDF")
  }
}
