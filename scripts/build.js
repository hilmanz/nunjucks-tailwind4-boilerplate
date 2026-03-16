const nunjucks = require("nunjucks");
const fs = require("fs-extra");
const path = require("path");
const { glob } = require("glob");

// Configure Nunjucks
const env = nunjucks.configure("src/templates", {
  autoescape: true,
  noCache: true,
});

// Custom filters (tambah sesuai kebutuhan)
env.addFilter("uppercase", (str) => str.toUpperCase());
env.addFilter("truncate", (str, length) => str.substring(0, length) + "...");

// Global variables tersedia di semua template
const globals = {
  siteName: "MySite",
  year: new Date().getFullYear(),
  nav: [
    { label: "Home", url: "/index.html", active: false },
    { label: "Tentang", url: "/about.html", active: false },
    { label: "Blog", url: "/blog.html", active: false },
    { label: "Kontak", url: "/contact.html", active: false },
  ],
};

async function buildPages() {
  // Ambil semua file di folder pages/
  const pages = await glob("src/templates/pages/**/*.njk");

  for (const pagePath of pages) {
    const relativePath = path.relative("src/templates/pages", pagePath);
    const outputPath = path.join(
      "public",
      relativePath.replace(/\.njk$/, ".html")
    );

    // Tentukan halaman aktif di nav
    const pageSlug = path.basename(relativePath, ".njk");
    const pageGlobals = {
      ...globals,
      nav: globals.nav.map((item) => ({
        ...item,
        active: item.url.includes(pageSlug === "index" ? "index" : pageSlug),
      })),
      currentPage: pageSlug,
    };

    try {
      const html = nunjucks.render(`pages/${relativePath}`, pageGlobals);
      await fs.ensureDir(path.dirname(outputPath));
      await fs.writeFile(outputPath, html);
      console.log(`✅ Built: ${outputPath}`);
    } catch (err) {
      console.error(`❌ Error building ${pagePath}:`, err.message);
    }
  }

  // Copy assets (js, images, dll)
  if (await fs.pathExists("src/js")) {
    await fs.copy("src/js", "public/js", { overwrite: true });
  }

  console.log("🎉 Build complete!");
}

buildPages();
