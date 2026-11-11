/**
 * VibeApp Hub - Main Application Logic
 */

let currentCategory = "all";
let searchQuery = "";
let customApps = [];
let downloadCounts = {};

// Khởi chạy khi tài liệu sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadCustomApps();
  initDownloadCounts();
  renderCategories();
  renderApps();
  initSearch();
  initModalListeners();
  updateStats();
});

// Quản lý Dark/Light Theme
function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("vibe_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("vibe_theme", next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const iconSpan = document.getElementById("themeIcon");
  if (iconSpan) {
    iconSpan.textContent = theme === "light" ? "🌙" : "☀️";
  }
}

// Nạp thêm app từ localStorage (nếu người dùng thêm qua form trên web)
function loadCustomApps() {
  try {
    const saved = localStorage.getItem("vibe_custom_apps");
    if (saved) {
      customApps = JSON.parse(saved);
    }
  } catch (e) {
    customApps = [];
  }
}

function getAllApps() {
  return [...APPS_DATA, ...customApps];
}

// Quản lý Bộ đếm lượt Tải về Thực Tế (Download Counter)
function initDownloadCounts() {
  // 1. Nạp số lượng ban đầu thực tế từ APPS_DATA (bắt đầu từ 0)
  APPS_DATA.forEach(app => {
    downloadCounts[app.id] = app.initialDownloads || 0;
  });

  // 2. Dọn dẹp cache số ảo cũ và nạp số liệu thực tế từ localStorage
  try {
    localStorage.removeItem("vibe_downloads"); // Xóa số ảo 148, 92... cũ

    const saved = localStorage.getItem("vibe_downloads_real");
    if (saved) {
      const parsed = JSON.parse(saved);
      downloadCounts = { ...downloadCounts, ...parsed };
    }
  } catch (e) {}

  // 3. Kéo số liệu thực tế từ Vercel Serverless Function nếu có kết nối
  fetch("/api/downloads")
    .then(res => res.json())
    .then(data => {
      if (data && typeof data === "object") {
        downloadCounts = { ...downloadCounts, ...data };
        updateAllDownloadBadges();
        updateStats();
      }
    })
    .catch(() => {});
}

function getDownloadCount(appId) {
  return downloadCounts[appId] || 0;
}

window.trackDownload = function(appId) {
  downloadCounts[appId] = (downloadCounts[appId] || 0) + 1;
  try {
    localStorage.setItem("vibe_downloads_real", JSON.stringify(downloadCounts));
  } catch (e) {}

  // Kích hoạt hiệu ứng nhảy số (Bump Animation) trên UI
  updateAppDownloadUI(appId);
  updateStats();

  // Đẩy ngầm lên Serverless Cloud để đồng bộ cho toàn bộ cộng đồng
  fetch("/api/downloads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ appId })
  }).catch(() => {});
};

function updateAppDownloadUI(appId) {
  const count = getDownloadCount(appId);
  const formatted = count.toLocaleString("vi-VN");

  document.querySelectorAll(`strong[data-download-strong="${appId}"]`).forEach(el => {
    el.textContent = formatted;
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
  });

  document.querySelectorAll(`.download-pill[data-download-pill="${appId}"]`).forEach(el => {
    el.textContent = formatted;
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
  });

  const modalEl = document.getElementById(`modal-count-${appId}`);
  if (modalEl) {
    modalEl.textContent = formatted;
    modalEl.classList.remove("bump");
    void modalEl.offsetWidth;
    modalEl.classList.add("bump");
  }
}

function updateAllDownloadBadges() {
  getAllApps().forEach(app => {
    updateAppDownloadUI(app.id);
  });
}

// Render Danh Mục Phân Loại
function renderCategories() {
  const container = document.getElementById("categoriesBar");
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <button class="category-pill ${cat.id === currentCategory ? 'active' : ''}" data-id="${cat.id}">
      <span>${cat.icon}</span>
      <span>${cat.label}</span>
    </button>
  `).join("");

  container.querySelectorAll(".category-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".category-pill").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-id");
      renderApps();
    });
  });
}

// Cập nhật các chỉ số thống kê
function updateStats() {
  const all = getAllApps();
  const totalAppsEl = document.getElementById("statTotalApps");
  const openSourceEl = document.getElementById("statOpenSource");
  const totalDownloadsEl = document.getElementById("statTotalDownloads");

  if (totalAppsEl) totalAppsEl.textContent = all.length;
  if (openSourceEl) {
    const ghCount = all.filter(a => a.githubUrl).length;
    openSourceEl.textContent = `${ghCount}/${all.length}`;
  }
  if (totalDownloadsEl) {
    let total = 0;
    all.forEach(app => {
      total += getDownloadCount(app.id);
    });
    totalDownloadsEl.textContent = total.toLocaleString("vi-VN");
  }
}

// Lắng nghe ô tìm kiếm
function initSearch() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderApps();
  });
}

// Lọc và Render các thẻ ứng dụng
function renderApps() {
  const grid = document.getElementById("appsGrid");
  if (!grid) return;

  const all = getAllApps();
  const filtered = all.filter(app => {
    // Lọc theo danh mục
    const matchCat = currentCategory === "all" || app.category === currentCategory;
    if (!matchCat) return false;

    // Lọc theo từ khóa tìm kiếm
    if (!searchQuery) return true;
    const searchable = [
      app.title,
      app.subtitle,
      app.description,
      app.categoryLabel,
      ...(app.features || []),
      ...(app.platforms || [])
    ].join(" ").toLowerCase();

    return searchable.includes(searchQuery);
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>Không tìm thấy ứng dụng phù hợp</h3>
        <p>Thử tìm kiếm với từ khóa khác hoặc chuyển danh mục "Tất cả".</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(app => `
    <div class="app-card" data-id="${app.id}">
      <div class="card-media">
        <img class="card-img" src="${app.screenshot || 'assets/icons/logo.svg'}" alt="${app.title}" loading="lazy" onerror="this.src='assets/icons/logo.svg'" />
        ${app.badge ? `<span class="card-badge">${app.badge}</span>` : ''}
      </div>

      <div class="card-body">
        <div class="card-header">
          <span class="card-icon">${app.icon || '🚀'}</span>
          <div class="card-title-group">
            <h3>${app.title}</h3>
            <span class="card-subtitle">${app.subtitle || ''}</span>
          </div>
        </div>

        <p class="card-desc">${app.description}</p>

        <div class="card-platforms">
          ${(app.platforms || []).map(p => `<span class="platform-pill">${p}</span>`).join("")}
        </div>

        <div class="download-meta-row">
          <span class="download-count-badge">
            <span>📥</span>
            <strong data-download-strong="${app.id}">${getDownloadCount(app.id).toLocaleString("vi-VN")}</strong> lượt tải
          </span>
          <span class="download-size-badge">${app.downloadSize ? `Dung lượng: ${app.downloadSize}` : ''}</span>
        </div>

        <div class="card-actions">
          ${app.demoUrl ? `
            <a href="${app.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn-card btn-card-primary">
              <span>⚡ Dùng Thử</span>
            </a>
          ` : `
            <button class="btn-card btn-card-primary" onclick="openDetailModal('${app.id}')">
              <span>📖 Hướng Dẫn</span>
            </button>
          `}

          ${app.downloadFile ? `
            <a href="${app.downloadFile}" download onclick="trackDownload('${app.id}')" class="btn-card btn-card-download" title="Tải về file đóng gói (${app.downloadSize || ''})">
              <span>📦 Tải Về</span>
              <span class="download-pill" data-download-pill="${app.id}">${getDownloadCount(app.id).toLocaleString("vi-VN")}</span>
            </a>
          ` : ''}

          <button class="btn-card btn-card-secondary" onclick="openDetailModal('${app.id}')">
            <span>Chi Tiết</span>
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

// Modal Xem Chi Tiết
window.openDetailModal = function(appId) {
  const app = getAllApps().find(a => a.id === appId);
  if (!app) return;

  const modal = document.getElementById("detailModal");
  const modalContent = document.getElementById("detailModalContent");

  const guideHtml = app.installGuide ? Object.entries(app.installGuide).map(([platform, text]) => `
    <div class="install-step">
      <strong>${getPlatformTitle(platform)}:</strong> ${text}
    </div>
  `).join("") : `<div class="install-step">Tải file về và giải nén để sử dụng.</div>`;

  modalContent.innerHTML = `
    <div class="modal-header">
      <div style="display:flex; align-items:center; gap:10px;">
        <span style="font-size: 1.8rem;">${app.icon || '🚀'}</span>
        <div>
          <h2 style="font-size:1.25rem; font-weight:700;">${app.title}</h2>
          <span style="font-size:0.8rem; color:var(--text-muted);">${app.version || 'v1.0.0'} • ${app.categoryLabel}</span>
        </div>
      </div>
      <button class="modal-close" onclick="closeAllModals()">&times;</button>
    </div>

    <div class="modal-body">
      <img src="${app.screenshot || 'assets/icons/logo.svg'}" class="modal-screenshot" alt="${app.title}" onerror="this.src='assets/icons/logo.svg'" />

      <p style="font-size:0.95rem; color:var(--text-secondary); line-height:1.6; margin-bottom:16px;">
        ${app.description}
      </p>

      <h4 style="font-size:0.95rem; font-weight:700; margin-bottom:8px;">🌟 Tính Năng Nổi Bật:</h4>
      <ul class="features-list">
        ${(app.features || []).map(f => `<li>${f}</li>`).join("")}
      </ul>

      <div class="install-box">
        <div class="install-title">📱 Hướng Dẫn Cài Đặt & Sử Dụng:</div>
        ${guideHtml}
      </div>

      ${app.downloadFile ? `
        <div class="modal-download-box">
          <div class="modal-download-info">
            <span style="font-size: 1.8rem;">📥</span>
            <div>
              <div class="modal-download-stats">Đã có <strong id="modal-count-${app.id}" class="modal-count-bump" data-download-strong="${app.id}">${getDownloadCount(app.id).toLocaleString("vi-VN")}</strong> lượt tải về</div>
              <div class="modal-download-sub">Gói mã nguồn đóng gói • Dung lượng: ${app.downloadSize || 'ZIP'}</div>
            </div>
          </div>
          <a href="${app.downloadFile}" download onclick="trackDownload('${app.id}')" class="btn-primary" style="background:#10b981; padding:10px 22px;">
            <span>📦 Tải Về Trực Tiếp</span>
          </a>
        </div>
      ` : ''}

      <div style="display:flex; gap:12px; margin-top:20px; flex-wrap:wrap;">
        ${app.demoUrl ? `
          <a href="${app.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="flex:1; justify-content:center;">
            ⚡ Mở Trực Tiếp Trên Web
          </a>
        ` : ''}

        ${app.githubUrl ? `
          <a href="${app.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon" style="width:auto; padding:0 16px; gap:8px;" title="Xem mã nguồn trên GitHub">
            <span>🐙 GitHub Repo</span>
          </a>
        ` : ''}
      </div>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

function getPlatformTitle(key) {
  const map = {
    web: "Trình duyệt Web",
    ios: "iPhone / iPad (Safari PWA)",
    android: "Android (Chrome)",
    mac: "Máy tính macOS",
    cloud: "Đồng bộ đám mây",
    flutter: "Flutter Native",
    server: "Backend Server"
  };
  return map[key] || key.toUpperCase();
}

// Đóng modal
window.closeAllModals = function() {
  document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
  document.body.style.overflow = "auto";
};

function initModalListeners() {
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllModals();
    }
  });

  // Modal Thêm App Mới
  const addAppBtn = document.getElementById("openAddAppModal");
  if (addAppBtn) {
    addAppBtn.addEventListener("click", () => {
      const modal = document.getElementById("addAppModal");
      if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  }

  // Submit Form Thêm App Mới
  const addAppForm = document.getElementById("addAppForm");
  if (addAppForm) {
    addAppForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newApp = {
        id: "app-" + Date.now(),
        title: document.getElementById("newAppTitle").value,
        subtitle: document.getElementById("newAppSubtitle").value,
        category: document.getElementById("newAppCategory").value,
        categoryLabel: document.getElementById("newAppCategory").options[document.getElementById("newAppCategory").selectedIndex].text,
        badge: "Mới",
        platforms: document.getElementById("newAppPlatforms").value.split(",").map(p => p.trim()),
        icon: document.getElementById("newAppIcon").value || "🚀",
        screenshot: document.getElementById("newAppScreenshot").value || "assets/icons/logo.svg",
        description: document.getElementById("newAppDesc").value,
        features: document.getElementById("newAppFeatures").value.split("\n").filter(f => f.trim()),
        demoUrl: document.getElementById("newAppDemo").value || "",
        downloadFile: document.getElementById("newAppDownload").value || "",
        downloadSize: document.getElementById("newAppSize").value || "ZIP",
        githubUrl: document.getElementById("newAppGithub").value || "",
        version: "v1.0.0"
      };

      customApps.unshift(newApp);
      localStorage.setItem("vibe_custom_apps", JSON.stringify(customApps));
      closeAllModals();
      addAppForm.reset();
      renderApps();
      updateStats();

      alert("🎉 Đã thêm ứng dụng mới thành công! Dữ liệu được lưu trực tiếp trên trình duyệt của bạn.");
    });
  }
}
