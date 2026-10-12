const banner = document.createElement("div");
banner.textContent = "Schoology Due Dates extension is running.";
banner.style.cssText =
  "position:fixed;bottom:8px;right:8px;z-index:2147483647;" +
  "padding:6px 10px;background:#2e7d32;color:#fff;font:13px sans-serif;" +
  "border-radius:4px;";
document.body.append(banner);
