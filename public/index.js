function showHideFormAdd() {
    let x = document.getElementById("addProductForm");
    let btn = document.getElementById("btnAdd")
  if (x.style.display === "none") {
    x.style.display = "block";
    btn.innerText = "Ocultar Formulario";
  } else {
    x.style.display = "none";
    btn.innerText = "Agregar Producto";
  }
}