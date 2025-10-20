// Array to store materials temporarily
let materialesTemporales = []

// Get DOM elements
const fechaInput = document.getElementById("fecha")
const auxiliarInput = document.getElementById("auxiliar")
const materialSelect = document.getElementById("material")
const cantidadInput = document.getElementById("cantidad")
const agregarBtn = document.getElementById("agregar")
const guardarBtn = document.getElementById("guardar")
const visualizarBtn = document.getElementById("visualizar")
const actualizarBtn = document.getElementById("actualizar")
const eliminarBtn = document.getElementById("eliminar")
const tablaMaterialesBody = document.querySelector("#tablaMateriales tbody")

// Modal elements
const modal = document.getElementById("modalTicket")
const closeModal = document.querySelector(".close")
const descargarPDFBtn = document.getElementById("descargarPDF")
const descargarExcelBtn = document.getElementById("descargarExcel")

// Import XLSX library
const XLSX = window.XLSX

// Set current date by default
fechaInput.valueAsDate = new Date()

// Add material to preview table
agregarBtn.addEventListener("click", () => {
  const fecha = fechaInput.value
  const material = materialSelect.value
  const cantidad = cantidadInput.value

  // Validate inputs
  if (!fecha || !material || !cantidad || cantidad <= 0) {
    alert("Por favor, complete todos los campos correctamente.")
    return
  }

  // Add material to temporary array
  const materialData = {
    nombre: material,
    cantidad: Number.parseInt(cantidad),
    fecha: fecha,
  }

  materialesTemporales.push(materialData)

  // Update preview table
  actualizarTablaPrevia()

  // Reset material and quantity fields
  materialSelect.value = ""
  cantidadInput.value = "1"
  materialSelect.focus()
})

// Update preview table
function actualizarTablaPrevia() {
  tablaMaterialesBody.innerHTML = ""

  materialesTemporales.forEach((material, index) => {
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${material.nombre}</td>
      <td>${material.cantidad}</td>
      <td>${formatearFecha(material.fecha)}</td>
    `
    tablaMaterialesBody.appendChild(row)
  })
}

// Format date to DD/MM/YYYY
function formatearFecha(fecha) {
  const date = new Date(fecha + "T00:00:00")
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// Save all materials
guardarBtn.addEventListener("click", () => {
  const auxiliar = auxiliarInput.value

  if (!auxiliar) {
    alert("Por favor, ingrese el nombre del auxiliar.")
    return
  }

  if (materialesTemporales.length === 0) {
    alert("Por favor, agregue al menos un material.")
    return
  }

  // Here you would typically send data to backend
  console.log("Guardando registro:", {
    fecha: fechaInput.value,
    auxiliar: auxiliar,
    materiales: materialesTemporales,
  })

  alert("Registro guardado exitosamente.")

  // Reset form
  resetearFormulario()
})

// Visualize ticket
visualizarBtn.addEventListener("click", () => {
  const auxiliar = auxiliarInput.value

  if (!auxiliar) {
    alert("Por favor, ingrese el nombre del auxiliar.")
    return
  }

  if (materialesTemporales.length === 0) {
    alert("Por favor, agregue al menos un material para visualizar.")
    return
  }

  // Populate ticket modal
  document.getElementById("ticketFecha").textContent = formatearFecha(fechaInput.value)
  document.getElementById("ticketAuxiliar").textContent = auxiliar

  const ticketTableBody = document.getElementById("ticketTableBody")
  ticketTableBody.innerHTML = ""

  materialesTemporales.forEach((material) => {
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${material.nombre}</td>
      <td>${material.cantidad}</td>
      <td>${formatearFecha(material.fecha)}</td>
    `
    ticketTableBody.appendChild(row)
  })

  // Show modal
  modal.style.display = "block"
})

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none"
})

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none"
  }
})

// Download PDF
descargarPDFBtn.addEventListener("click", () => {
  const { jsPDF } = window.jspdf
  const doc = new jsPDF()

  // Add header
  doc.setFontSize(18)
  doc.setTextColor(122, 0, 0)
  doc.text("Ticket de Compra de Material", 105, 20, { align: "center" })

  // Add info
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text(`Fecha: ${formatearFecha(fechaInput.value)}`, 20, 40)
  doc.text(`Auxiliar: ${auxiliarInput.value}`, 20, 50)

  // Add table
  const tableData = materialesTemporales.map((material) => [
    material.nombre,
    material.cantidad.toString(),
    formatearFecha(material.fecha),
  ])

  doc.autoTable({
    startY: 60,
    head: [["Nombre del producto", "Cantidad", "Fecha de ingreso"]],
    body: tableData,
    theme: "grid",
    headStyles: {
      fillColor: [179, 0, 0],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    styles: {
      textColor: [90, 0, 0],
    },
  })

  doc.save(`ticket_compra_${fechaInput.value}.pdf`)
})

// Download Excel
descargarExcelBtn.addEventListener("click", () => {
  // Prepare data for Excel
  const excelData = [
    ["Ticket de Compra de Material"],
    [],
    ["Fecha:", formatearFecha(fechaInput.value)],
    ["Auxiliar:", auxiliarInput.value],
    [],
    ["Nombre del producto", "Cantidad", "Fecha de ingreso"],
  ]

  materialesTemporales.forEach((material) => {
    excelData.push([material.nombre, material.cantidad, formatearFecha(material.fecha)])
  })

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet(excelData)

  // Set column widths
  ws["!cols"] = [{ wch: 25 }, { wch: 15 }, { wch: 20 }]

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Ticket de Compra")

  // Save file
  XLSX.writeFile(wb, `ticket_compra_${fechaInput.value}.xlsx`)
})

// Update button (clear current materials)
actualizarBtn.addEventListener("click", () => {
  if (materialesTemporales.length === 0) {
    alert("No hay materiales para actualizar.")
    return
  }

  if (confirm("¿Desea limpiar la lista de materiales actual?")) {
    materialesTemporales = []
    actualizarTablaPrevia()
    materialSelect.value = ""
    cantidadInput.value = "1"
  }
})

// Delete button (reset everything)
eliminarBtn.addEventListener("click", () => {
  if (confirm("¿Desea eliminar todo el registro actual?")) {
    resetearFormulario()
  }
})

// Reset form
function resetearFormulario() {
  materialesTemporales = []
  actualizarTablaPrevia()
  auxiliarInput.value = ""
  materialSelect.value = ""
  cantidadInput.value = "1"
  fechaInput.valueAsDate = new Date()
}
