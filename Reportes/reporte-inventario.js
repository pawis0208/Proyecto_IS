// ============================================
// CONFIGURACIÓN DE LA BASE DE DATOS
// ============================================
//configurar la API o endpoint
// ============================================
// CARGAR DATOS AL INICIAR LA PÁGINA
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  cargarDatosInventario()
})

// ============================================
// FUNCIÓN PARA CARGAR DATOS DEL INVENTARIO
// ============================================
async function cargarDatosInventario() {
  try {
    // simulo datos de ejemplo para mostrar la estructura
    const datos = await obtenerDatosInventarioDesdeBD()

    // Renderizar los datos en la tabla
    renderizarTablaInventario(datos)
  } catch (error) {
    console.error("Error al cargar datos del inventario:", error)
    alert("Error al cargar los datos. Por favor, intenta de nuevo.")
  }
}

// ============================================
// FUNCIÓN PARA OBTENER DATOS DE LA BASE DE DATOS
// ============================================
async function obtenerDatosInventarioDesdeBD() {
  return [
    { nombre_material: "Ejemplo Material 1", clave: "MAT-001", cantidad: 50, usuario: "usuario1@its.mx" },
    { nombre_material: "Ejemplo Material 2", clave: "MAT-002", cantidad: 30, usuario: "usuario2@its.mx" },
  ]
}

// ============================================
// FUNCIÓN PARA RENDERIZAR LA TABLA
// ============================================
function renderizarTablaInventario(datos) {
  const tbody = document.getElementById("tablaInventario")
  tbody.innerHTML = "" // Limpiar tabla

  if (datos.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="4" class="border-2 border-black px-6 py-4 text-center">No hay datos disponibles</td></tr>'
    return
  }

  datos.forEach((item) => {
    const fila = document.createElement("tr")
    fila.className = "bg-white hover:bg-gray-50"
    fila.innerHTML = `
            <td class="border-2 border-black px-6 py-4">${item.nombre_material}</td>
            <td class="border-2 border-black px-6 py-4">${item.clave}</td>
            <td class="border-2 border-black px-6 py-4">${item.cantidad}</td>
            <td class="border-2 border-black px-6 py-4">${item.usuario}</td>
        `
    tbody.appendChild(fila)
  })
}

// ============================================
// FUNCIÓN PARA DESCARGAR EXCEL
// ============================================
async function descargarExcel() {
  //implementar la descarga de excel
  try {
    
    alert("Función de descarga Excel - Conectar con tu backend o librería de generación de Excel")
  } catch (error) {
    console.error("Error al descargar Excel:", error)
    alert("Error al descargar el archivo Excel")
  }
}

// ============================================
// FUNCIÓN PARA DESCARGAR PDF
// ============================================
async function descargarPDF() {
  //implementa la descarga de pdf
  try {
    
    alert("Función de descarga PDF - Conectar con tu backend o librería de generación de PDF")
  } catch (error) {
    console.error("Error al descargar PDF:", error)
    alert("Error al descargar el archivo PDF")
  }
}
