# Nunjucks + Tailwind CSS 4 Boilerplate

Template engine mirip Twig untuk HTML statis — tanpa PHP, tanpa framework besar.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development (watch mode + live server)
npm run dev

# Build untuk production
npm run build
```

Buka `http://localhost:3000` di browser.

---

## 📁 Struktur Folder

```
boilerplate/
├── src/
│   ├── templates/
│   │   ├── layouts/
│   │   │   └── base.njk          # Layout utama (seperti base.html.twig)
│   │   ├── partials/
│   │   │   ├── header.njk        # Header global
│   │   │   ├── footer.njk        # Footer global
│   │   │   └── macros.njk        # Komponen reusable (card, badge, btn, alert)
│   │   └── pages/
│   │       ├── index.njk         # Halaman Home
│   │       ├── about.njk         # Halaman Tentang
│   │       ├── blog.njk          # Halaman Blog
│   │       └── contact.njk       # Halaman Kontak
│   ├── css/
│   │   └── main.css              # Entry point Tailwind CSS 4
│   └── js/
│       └── main.js               # JavaScript global
├── public/                       # Output build (jangan diedit manual)
├── scripts/
│   └── build.js                  # Script kompilasi Nunjucks → HTML
└── package.json
```

---

## 🧩 Cara Pakai

### 1. Membuat Halaman Baru

Buat file `.njk` di `src/templates/pages/`:

```njk
{# pages/layanan.njk #}
{% extends "layouts/base.njk" %}

{% block title %}Layanan — {{ siteName }}{% endblock %}

{% block content %}
  <section class="max-w-6xl mx-auto px-8 py-16">
    <h1>Halaman Layanan</h1>
    {# Header & footer otomatis muncul dari base layout #}
  </section>
{% endblock %}
```

### 2. Menggunakan Macro (Komponen)

```njk
{% from "partials/macros.njk" import card, badge, btn, alert %}

{# Card #}
{{ card(title="Judul", desc="Deskripsi", href="/link.html", icon="🚀", tag="Baru") }}

{# Badge #}
{{ badge("Populer", "green") }}

{# Button #}
{{ btn("Klik Saya", "/halaman.html", "primary") }}

{# Alert #}
{{ alert("Berhasil!", "success") }}
```

### 3. Menambahkan Partial Baru

Buat file di `src/templates/partials/`, lalu include di mana saja:

```njk
{% include "partials/nama-partial.njk" %}
```

### 4. Variabel Global

Edit `scripts/build.js` bagian `globals`:

```js
const globals = {
  siteName: "NamaWebsite",
  year: new Date().getFullYear(),
  nav: [ ... ],
};
```

---

## ⚡ Perbandingan dengan Twig

| Fitur            | Twig (PHP)                     | Nunjucks (JS)                    |
|------------------|--------------------------------|----------------------------------|
| Extends layout   | `{% extends "base.html.twig" %}`| `{% extends "layouts/base.njk" %}`|
| Override block   | `{% block content %}...{% endblock %}` | Sama persis |
| Include partial  | `{% include "header.html.twig" %}` | `{% include "partials/header.njk" %}` |
| Macro            | `{% macro btn(label) %}...{% endmacro %}` | Sama persis |
| Loop             | `{% for item in items %}`      | Sama persis |
| Kondisi          | `{% if active %}`              | Sama persis |
| Filter           | `{{ text\|upper }}`            | Sama persis |

---

## 🌐 Deploy

Output build ada di folder `public/`. Upload isinya ke:
- **Netlify**: drag & drop folder `public/`
- **Vercel**: set output directory ke `public`
- **cPanel / Shared Hosting**: upload via FTP ke `public_html/`
- **GitHub Pages**: push folder `public/` ke branch `gh-pages`
