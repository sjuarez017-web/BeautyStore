const PRODUCTS = [
  {
    id: "mac-studio-fix",
    category: "Rostro",
    name: "Studio fix fluid fps 15 24hr matte foundation + oil control",
    price: 780,
    image: "https://www.sephora.com.mx/on/demandware.static/-/Sites-masterCatalog_Sephora/es_MX/dwf88a37f9/images/hi-res/boletos/Roc%C3%ADo%20Mart%C3%ADnez/MAC/MAC%202/773602642861.jpg"
  },
  {
    id: "maybelline-lumi",
    category: "Rostro",
    name: "Superstay Lumi Matte",
    price: 400,
    image: "https://www.maybelline-ma.com/-/media/project/loreal/brand-sites/mny/americas/latam/products/face/foundation/superstay-lumi-matte/110/6902395970033-1.jpg?rev=-1&cx=0&cy=0&cw=315&ch=472&hash=2DE98FF54114AB50E25B0473BB3F372E"
  },
  {
    id: "wonder-foundation",
    category: "Rostro",
    name: "MAKE ' EM WONDER FOUNDATION",
    price: 280,
    image: "https://bellisima.mx/cdn/shop/files/0800897275112_1.jpg?v=1772217468"
  },
  {
    id: "dior-eye",
    category: "Ojos",
    name: "Dior Backstage Eye Palette",
    price: 1200,
    image: "https://www.dior.com/on/demandware.static/-/Sites-master_dior/default/dw3a661d36/Y0012000/Y0012000_C038300003_E01_RHC.jpg"
  },
  {
    id: "le9-palette",
    category: "Ojos",
    name: "Paleta de sombras Le 9 9 tonos",
    price: 1560,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHHIFKoY4_jdof5TwuXwiecT_G6mFLL4MMIur7j9mkhA&s"
  },
  {
    id: "patrick-ta",
    category: "Ojos",
    name: "major dimension iii matte eyeshadow palette",
    price: 1835,
    image: "https://www.sephora.com.mx/on/demandware.static/-/Sites-masterCatalog_Sephora/es_MX/dwe509d399/images/hi-res/boletos/Fer%20Ruelas/PATRICK%20TA/843628150234_1.jpg"
  },
  {
    id: "teddy-tint",
    category: "Labios",
    name: "Maybelline labial super stay teddy tint 20070",
    price: 319,
    image: "https://www.ilusion.com/dw/image/v2/BHGD_PRD/on/demandware.static/-/Sites-catalog-ilusion/default/dwe9d042f3/images/hi-res/5397971.webp?sw=536&sh=715&sm=fit&sfrm=jpg"
  },
  {
    id: "matte-ink",
    category: "Labios",
    name: "Maybelline Superstay Matte Ink",
    price: 200,
    image: "https://m.media-amazon.com/images/I/51qziStZe1L._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: "lip-glow",
    category: "Labios",
    name: "Dior Addict Lip Glow bálsamo labial hidratante 48 h",
    price: 600,
    image: "https://www.sephora.com.mx/on/demandware.static/-/Sites-masterCatalog_Sephora/es_MX/dw35bdad8c/images/hi-res/boletos/Roc%C3%ADo%20Mart%C3%ADnez/DIOR/DIOR%202025/DIOR%202025%201/3348901729208_x1.jpg"
  }
];

const CART_KEY = "beautyStoreCart";
const USER_KEY = "beautyStoreUser";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCount(); }
function money(value) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);
}
function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("#navCartCount, #floatingCartCount").forEach(el => el.textContent = count);
}
function addToCart(id, button) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(item => item.id === id);
  if (existing) existing.quantity += 1;
  else cart.push({ ...product, quantity: 1 });
  saveCart(cart);

  const card = button.closest(".product-card");
  card.classList.add("added");
  button.textContent = "Agregado ✓";
  setTimeout(() => {
    card.classList.remove("added");
    button.textContent = "Agregar";
  }, 650);
}

function renderProducts(category = "todos", search = "") {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  const term = search.trim().toLowerCase();
  const filtered = PRODUCTS.filter(p =>
    (category === "todos" || p.category === category) &&
    (!term || p.name.toLowerCase().includes(term))
  );

  grid.innerHTML = "";
  if (!filtered.length) {
    document.getElementById("emptyProducts")?.classList.remove("d-none");
    return;
  }
  document.getElementById("emptyProducts")?.classList.add("d-none");

  const categories = category === "todos" ? ["Rostro", "Ojos", "Labios"] : [category];
  categories.forEach(cat => {
    const products = filtered.filter(p => p.category === cat);
    if (!products.length) return;
    const section = document.createElement("section");
    section.className = "category-section";
    section.innerHTML = `<h2 class="category-title">${cat}</h2><div class="row g-4"></div>`;
    const row = section.querySelector(".row");
    products.forEach(p => {
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-lg-4";
      col.innerHTML = `
        <article class="product-card">
          <div class="product-image-wrap">
            <img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy"
                 onerror="this.src='https://placehold.co/500x500/f6eeee/7b5d62?text=Producto'">
          </div>
          <div class="product-info">
            <div class="product-category">${p.category}</div>
            <div class="product-name">${p.name}</div>
            <div class="product-price">${money(p.price)}</div>
            <button class="add-btn" data-product-id="${p.id}">Agregar</button>
          </div>
        </article>`;
      row.appendChild(col);
    });
    grid.appendChild(section);
  });

  grid.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => addToCart(btn.dataset.productId, btn));
  });
}

async function integrateRestfulService() {
  const status = document.getElementById("apiStatus");
  if (!status) return;
  try {
    // GET RESTful de demostración. El catálogo local es el respaldo del proyecto.
    const response = await fetch("https://dummyjson.com/products?limit=1");
    if (!response.ok) throw new Error("API no disponible");
    await response.json();
    status.textContent = "✓ Servicio RESTful conectado correctamente (GET).";
  } catch {
    status.textContent = "✓ Catálogo local activo. La API de demostración no está disponible.";
  }
}

function initAuth() {
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  if (!loginTab || !registerTab) return;

  function showLogin() {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.classList.remove("d-none");
    registerForm.classList.add("d-none");
    document.getElementById("formTitle").textContent = "Bienvenida";
  }
  function showRegister() {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerForm.classList.remove("d-none");
    loginForm.classList.add("d-none");
    document.getElementById("formTitle").textContent = "Crea tu cuenta";
  }
  loginTab.addEventListener("click", showLogin);
  registerTab.addEventListener("click", showRegister);

  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const saved = JSON.parse(localStorage.getItem(USER_KEY) || "null");
    if (saved && saved.email === email && saved.password === password) {
      window.location.href = "seleccion.html";
    } else if (!saved) {
      document.getElementById("authMessage").textContent = "Primero crea una cuenta o utiliza tus datos registrados.";
    } else {
      document.getElementById("authMessage").textContent = "Correo o contraseña incorrectos.";
    }
  });

  registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const user = {
      name: document.getElementById("fullName").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim(),
      address: document.getElementById("address").value.trim(),
      password: document.getElementById("password").value
    };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    window.location.href = "seleccion.html";
  });
}

function renderCheckout() {
  const container = document.getElementById("checkoutItems");
  if (!container) return;
  const cart = getCart();
  const empty = document.getElementById("emptyCart");
  const totalEl = document.getElementById("checkoutTotal");
  const countEl = document.getElementById("summaryCount");

  container.innerHTML = "";
  const count = cart.reduce((s, i) => s + i.quantity, 0);
  countEl.textContent = `${count} ${count === 1 ? "artículo" : "artículos"}`;

  if (!cart.length) {
    empty.classList.remove("d-none");
    totalEl.textContent = money(0);
    return;
  }
  empty.classList.add("d-none");

  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "checkout-item";
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" onerror="this.src='https://placehold.co/150x150/f6eeee/7b5d62?text=Producto'">
      <div>
        <h3>${item.name}</h3>
        <p>${money(item.price)} c/u</p>
        <div class="item-controls">
          <button class="qty-btn" data-action="minus" data-id="${item.id}">−</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" data-action="plus" data-id="${item.id}">+</button>
          <button class="btn btn-sm text-danger remove-item" data-action="remove" data-id="${item.id}">Eliminar</button>
        </div>
      </div>
      <div class="item-total">${money(item.price * item.quantity)}</div>`;
    container.appendChild(row);
  });

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  totalEl.textContent = money(total);

  container.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      const updated = getCart();
      const item = updated.find(i => i.id === id);
      if (!item) return;
      if (action === "plus") item.quantity++;
      if (action === "minus") item.quantity--;
      if (action === "remove" || item.quantity <= 0) {
        const index = updated.findIndex(i => i.id === id);
        updated.splice(index, 1);
      }
      saveCart(updated);
      renderCheckout();
    });
  });
}

function initPayment() {
  const form = document.getElementById("paymentForm");
  if (!form) return;

  const savedCard = localStorage.getItem("savedCardNumber");
  if (savedCard) document.getElementById("cardNumber").value = savedCard;

  document.getElementById("cardNumber").addEventListener("input", e => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    e.target.value = value.replace(/(.{4})/g, "$1 ").trim();
  });
  document.getElementById("expiry").addEventListener("input", e => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length > 2) value = value.slice(0,2) + "/" + value.slice(2);
    e.target.value = value;
  });
  document.getElementById("cvv").addEventListener("input", e => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!getCart().length) {
      document.getElementById("paymentMessage").textContent = "Agrega al menos un producto antes de pagar.";
      return;
    }
    if (document.getElementById("saveCard").checked) {
      const digits = document.getElementById("cardNumber").value.replace(/\D/g, "");
      localStorage.setItem("savedCardNumber", digits);
    }
    // El CVV jamás se guarda.
    const modal = new bootstrap.Modal(document.getElementById("thankYouModal"));
    modal.show();
    localStorage.removeItem(CART_KEY);
    updateCartCount();
    renderCheckout();
    form.reset();
    if (savedCard) document.getElementById("cardNumber").value = savedCard;
  });

  document.getElementById("cancelPurchase").addEventListener("click", () => {
    localStorage.removeItem(CART_KEY);
    updateCartCount();
    renderCheckout();
    document.getElementById("paymentMessage").textContent = "La compra fue cancelada y el carrito está vacío.";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  initAuth();
  if (document.getElementById("productGrid")) {
    renderProducts();
    integrateRestfulService();
    document.getElementById("searchInput").addEventListener("input", e => {
      const active = document.querySelector(".category-btn.active")?.dataset.category || "todos";
      renderProducts(active, e.target.value);
    });
    document.querySelectorAll(".category-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderProducts(btn.dataset.category, document.getElementById("searchInput").value);
      });
    });
  }
  renderCheckout();
  initPayment();
});
