// ============================================
// CONFIGURACIÓN DE LA BASE DE DATOS
// ============================================
// AQUÍ CONFIGURAR LA  API O ENDPOINT 

// Variable global para almacenar todos los datos
let datosCompletos = []
let datosFiltrados = []

// ============================================
// CARGAR DATOS AL INICIAR LA PÁGINA
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  cargarDatosAsesorias()
  cargarAuxiliares()
  cargarTitulosAsesorias()
})

// ============================================
// FUNCIÓN PARA CARGAR DATOS DE ASESORÍAS
// ============================================
async function cargarDatosAsesorias() {
  try {
    datosCompletos = await obtenerDatosAsesoriasDesdeBD()
    datosFiltrados = [...datosCompletos]
    renderizarTablaAsesorias(datosFiltrados)
  } catch (error) {
    console.error("Error al cargar datos de asesorías:", error)
    alert("Error al cargar los datos. Por favor, intenta de nuevo.")
  }
}

// ============================================
// FUNCIÓN PARA CARGAR LISTA DE AUXILIARES
// ============================================
async function cargarAuxiliares() {
  try {
    const auxiliares = await obtenerAuxiliaresDesdeBD()

    const select = document.getElementById("filtroAuxiliar")

    // Limpiar opciones existentes (excepto la primera)
    while (select.options.length > 1) {
      select.remove(1)
    }

    // Agregar opciones de auxiliares
    auxiliares.forEach((auxiliar) => {
      const option = document.createElement("option")
      option.value = auxiliar.nombre
      option.textContent = auxiliar.nombre
      select.appendChild(option)
    })
  } catch (error) {
    console.error("Error al cargar auxiliares:", error)
  }
}

// ============================================
// ============================================
async function cargarTitulosAsesorias() {
  try {
    // Obtener títulos únicos desde la base de datos
    const titulos = await obtenerTitulosAsesoriasDesdeBD()

    const select = document.getElementById("filtroTitulo")

    // Limpiar opciones existentes (excepto la primera)
    while (select.options.length > 1) {
      select.remove(1)
    }

    // Agregar opciones de títulos
    titulos.forEach((titulo) => {
      const option = document.createElement("option")
      option.value = titulo
      option.textContent = titulo
      select.appendChild(option)
    })
  } catch (error) {
    console.error("Error al cargar títulos de asesorías:", error)
  }
}

// ============================================
// FUNCIÓN PARA OBTENER DATOS DE LA BASE DE DATOS
// ============================================
async function obtenerDatosAsesoriasDesdeBD() {
  // HACER LA PETICIÓN A LA BASE DE DATOS
  
  return []
}

// ============================================
// FUNCIÓN PARA OBTENER AUXILIARES DE LA BD
// ============================================
async function obtenerAuxiliaresDesdeBD() {
  // HACER LA PETICIÓN A LA BASE DE DATOS PARA OBTENER AUXILIARES
  
  return []
}

// ============================================
// ============================================
async function obtenerTitulosAsesoriasDesdeBD() {
  //HACER LA PETICIÓN A LA BASE DE DATOS PARA OBTENER TÍTULOS DE LAS ASESORAS
  
  return []
}

// ============================================
// FUNCIÓN PARA RENDERIZAR LA TABLA
// ============================================
function renderizarTablaAsesorias(datos) {
  const tbody = document.getElementById("tablaAsesorias")
  tbody.innerHTML = ""

  if (datos.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="6" class="border-2 border-black px-6 py-4 text-center">No hay datos disponibles con los filtros seleccionados</td></tr>'
    return
  }

  datos.forEach((item) => {
    const fila = document.createElement("tr")
    fila.className = "bg-white hover:bg-gray-50"
    fila.innerHTML = `
            <td class="border-2 border-black px-6 py-4">${item.titulo}</td>
            <td class="border-2 border-black px-6 py-4">${item.auxiliar}</td>
            <td class="border-2 border-black px-6 py-4">${item.fecha}</td>
            <td class="border-2 border-black px-6 py-4">${item.hora}</td>
            <td class="border-2 border-black px-6 py-4">${item.descripcion}</td>
            <td class="border-2 border-black px-6 py-4">${item.cupo}</td>
        `
    tbody.appendChild(fila)
  })
}

// ============================================
// FUNCIÓN PARA APLICAR FILTROS
// ============================================
function aplicarFiltros() {
  const filtroAuxiliar = document.getElementById("filtroAuxiliar").value
  const filtroTitulo = document.getElementById("filtroTitulo").value

  // Filtrar los datos
  datosFiltrados = datosCompletos.filter((item) => {
    let cumpleAuxiliar = true
    let cumpleTitulo = true

    if (filtroAuxiliar !== "") {
      cumpleAuxiliar = item.auxiliar === filtroAuxiliar
    }

    if (filtroTitulo !== "") {
      cumpleTitulo = item.titulo === filtroTitulo
    }

    return cumpleAuxiliar && cumpleTitulo
  })

  // Renderizar tabla con datos filtrados
  renderizarTablaAsesorias(datosFiltrados)
}

// ============================================
// FUNCIÓN PARA LIMPIAR FILTROS
// ============================================
function limpiarFiltros() {
  document.getElementById("filtroAuxiliar").value = ""
  document.getElementById("filtroTitulo").value = ""
  datosFiltrados = [...datosCompletos]
  renderizarTablaAsesorias(datosFiltrados)
}

// ============================================
// FUNCIÓN PARA DESCARGAR EXCEL
// ============================================
async function descargarExcel() {
  try {
    //IMPLEMENTAR LA DESCARGA DE EXCEL
    
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
    //IMPLEMENTAR LA DESCARGA DE PDF
   
    alert("Función de descarga PDF - Conectar con tu backend")
  } catch (error) {
    console.error("Error al descargar PDF:", error)
    alert("Error al descargar el archivo PDF")
  }
}
