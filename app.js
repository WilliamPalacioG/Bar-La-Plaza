/*
  BAR LA PLAZA - CARTA DIGITAL
  ---------------------------------------------------------
  EDITAR PRECIOS:
  Solo cambia los valores "price" dentro del arreglo MENU.
  Ejemplo:
    { name: "Café con leche", price: 1.60 }

  También puedes editar nombres y descripciones directamente aquí.
*/

const MENU = [
  {
    title: "Desayunos y meriendas",
    items: [
      { name: "Tostada con Tomate y aceite de oliva virgen", price: 2.00 },
      { name: "Tostada con Mantequilla y Mermelada", price: 2.00 },
      { name: "Tostada con Tomate y Jamón Serrano", price: 3.50 },
      { name: "Tostada con Tomate y Cafe con Leche", price: 3.50 },
      { name: "Tostada con Tomate, aguacate y Jamón Serrano", price: 4.00 },
      { name: "Tostada con Tomate y Atún", price: 3.00 },
      { name: "Tostada con Tortilla Francesa", price: 3.00 },
      { name: "Croissant ", price: 1.80 },
      { name: "Croissant con Jamón York y Queso", price: 3.00 },
      { name: "Croissant con Mantequilla y Mermelada", price: 2.80 },
      { name: "Café con leche y Croissant", price: 3.30 },
      { name: "Pincho de Tortilla y Cafe con Leche", price: 3.50 },
      { name: "Magdalena", price: 1.80 },
    ]
  },
  {
    title: "Hamburguesas",
    items: [
      { name: "Hamburguesa La Plaza", description: "Carne de Angus 200 gr, queso, bacon, huevo, salsa hawaiana, salsa rosada, acompañada con patatas fritas.", price: 10.50 }
    ]
  },
  {
    title: "Bocadillos",
    items: [
      { name: "Cinta de Lomo / Panceta / Bacon ", price: 4.50 },
      { name: "Atún con Tomate ", price: 4.50 },
      { name: "Tortilla Francesa / Tortilla de Patata", price: 4.00 },
      { name: "Calamares", price: 5.50 },
      { name: "Sándwich Mixto (Jamón y Queso)", price: 3.20 }   
    ]
  },
  {
    title: "Raciones",
    items: [
      { name: "Oreja a la Plancha", price: 9.00 },
      { name: "Calamares", price: 12.00 },
      { name: "Alitas de Pollo (6 unidades)", price: 10.00 },
      { name: "Platico con Patatas Fritas y Salsas", price: 2.50 },
      { name: "Huevos Rotos", description: "Patatas fritas con Huevos y Jamon.",  price: 12.00 }
    ]
  },
  {
    title: "Platos combinados",
    items: [
      { name: "Cinta de Lomo con Huevos y Patatas Fritas", price: 9.00 },
      { name: "Panceta con Huevos y Patatas Fritas", price: 9.00 },
      { name: "Bacon con Huevos y Patatas Fritas", price: 9.00 },
      { name: "Pechuga de Pollo a la Plancha con Huevos y Patatas Fritas", price: 10.00 },
      { name: "Fingers de Pollo", description: "6 Pechuguitas de Pollo Apanadas con Patatas Fritas.", price: 8.00 },
      { name: "Salchipapa", description: "Patatas con Salchichas y Salsas.", price: 6.00 },
      { name: "SalchiPork", description: "Patatas con Salchichas, Panceta y Salsas.", price: 8.00 }
    ]
  },
  {
    title: "Bebidas y cafetería",
    items: [
      { name: "Alhambra / Cerveza 00 / Estrella Galicia Tostada", price: 2.70 },
      { name: "Tercio Mahou 5 Estrellas / Tercio Mahou", price: 2.70 },
      { name: "Refrescos", price: 2.50 },
      { name: "Zumos", price: 2.00 },
      { name: "Botellín", price: 1.60 },
      { name: "Jarra de Cerveza", price: 3.50 },
      { name: "Copa de Vino", price: 2.00 },
      { name: "Café con leche", price: 1.40 },
      { name: "Café Solo / Cortado", price: 1.30 },
      { name: "Bombón / Capuchino", price: 1.60 },
      { name: "Carajillo / Belmonte", price: 2.00 },
      { name: "Cola Cao", price: 1.60 },
      { name: "Infusiones", price: 1.30 },
      { name: "Piedra de licor o Crema de orujo", price: 3.00 },
      { name: "Cubatas / Combinados", price: 6.00 },
      { name: "Chupitos", price: 2.00 }
    ]
  }
];

const money = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2
});

const container = document.getElementById("menuContainer");
const searchInput = document.getElementById("searchInput");
const printBtn = document.getElementById("printBtn");

function renderMenu(filterText = "") {
  const query = filterText.trim().toLowerCase();
  container.innerHTML = "";

  MENU.forEach(section => {
    const visibleItems = section.items.filter(item => {
      const haystack = `${section.title} ${item.name} ${item.description || ""}`.toLowerCase();
      return !query || haystack.includes(query);
    });

    if (!visibleItems.length) return;

    const sectionEl = document.createElement("section");
    sectionEl.className = "menu-section";

    const header = document.createElement("div");
    header.className = "section-head";
    header.innerHTML = `<h2>${section.title}</h2>${section.note ? `<p>${section.note}</p>` : ""}`;

    const list = document.createElement("ul");
    list.className = "menu-list";

    visibleItems.forEach(item => {
      const li = document.createElement("li");
      li.className = "menu-item";
      li.innerHTML = `
        <div>
          <div class="item-name">${item.name}</div>
          ${item.description ? `<div class="item-description">${item.description}</div>` : ""}
        </div>
        <div class="item-price">${money.format(item.price)}</div>
      `;
      list.appendChild(li);
    });

    sectionEl.append(header, list);
    container.appendChild(sectionEl);
  });
}

searchInput.addEventListener("input", (e) => renderMenu(e.target.value));
printBtn.addEventListener("click", () => window.print());

renderMenu();
