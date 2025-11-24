const body = document.body;

const sidebar = document.querySelector("nav.sidebar");
const toggle = document.querySelector(".toggle");
const searchBtn = document.querySelector(".search-box");
const modeSwitch = document.querySelector(".toggle-switch");
const modeText = document.querySelector(".mode-text");
const logoFull = document.querySelector(".image img.logo-full") || document.querySelector(".image img");
const logoAvi = document.getElementById("logoavi");
const saudacaoEl = document.getElementById("saudacao");
const dataHoraEl = document.getElementById("dataHora");
const anoAtualEl = document.getElementById("anoAtual");
const menuUserNameEl = document.getElementById("menuUserName");
const profilePicEl = document.getElementById("profile-pic");
const defaultAvatar = "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\" viewBox=\"0 0 120 120\"><circle cx=\"60\" cy=\"60\" r=\"60\" fill=\"%23f3f4f6\"/><text x=\"50%\" y=\"55%\" font-size=\"42\" text-anchor=\"middle\" fill=\"%236b7280\">?</text></svg>";

function getUserName() {
    const storedUser = localStorage.getItem("sellastay_user");
    if (storedUser) return storedUser;
    if (saudacaoEl && saudacaoEl.dataset.username) {
        return saudacaoEl.dataset.username;
    }
    const userNameElement = document.getElementById("user-name");
    return userNameElement ? userNameElement.textContent.trim() : "Usuário";
}

function obterSaudacao() {
    const hora = new Date().getHours();
    let saudacaoBase = "Boa noite";
    if (hora >= 6 && hora < 12) {
        saudacaoBase = "Bom dia";
    } else if (hora >= 12 && hora < 18) {
        saudacaoBase = "Boa tarde";
    }
    return `${saudacaoBase}, ${getUserName()}!`;
}

function applyUserContext() {
    const userName = getUserName();
    if (menuUserNameEl) {
        menuUserNameEl.textContent = userName;
    }
    if (profilePicEl) {
        const storedAvatar = localStorage.getItem("sellastay_user_avatar");
        const avatarUrl = storedAvatar || (userName ? `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=6d28d9&color=fff` : defaultAvatar);
        profilePicEl.src = avatarUrl;
        profilePicEl.alt = userName || "Usuário";
    }
}

function updateDataHora() {
    if (!dataHoraEl) return;
    const data = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    dataHoraEl.textContent = data.toLocaleString("pt-BR", options);
}

function setThemeAssets(theme) {
    if (modeText) {
        modeText.innerText = theme === "dark" ? "Light mode" : "Dark mode";
    }
    if (logoFull) {
        logoFull.src = theme === "dark" ? "img/logo_.png" : "img/logo.png";
    }
    if (logoAvi) {
        logoAvi.src = theme === "dark" ? "img/aviat_.png" : "img/aviat.png";
    }
}

function disableAnimations() {
    body.style.transition = "none";
    if (sidebar) sidebar.style.transition = "none";
    if (logoAvi) logoAvi.style.transition = "none";
    if (logoFull) logoFull.style.transition = "none";
}

function enableAnimations() {
    setTimeout(() => {
        body.style.transition = "";
        if (sidebar) sidebar.style.transition = "";
        if (logoAvi) logoAvi.style.transition = "";
        if (logoFull) logoFull.style.transition = "";
    }, 300);
}

function initApp() {

    const storedUserName = localStorage.getItem("sellastay_user");
    if (storedUserName && saudacaoEl) {
        saudacaoEl.dataset.username = storedUserName;
    }
    if (saudacaoEl) {
        saudacaoEl.textContent = obterSaudacao();
    }
    applyUserContext();

    if (dataHoraEl) {
        updateDataHora();
        setInterval(updateDataHora, 1000);
    }

    if (anoAtualEl) {
        anoAtualEl.textContent = new Date().getFullYear();
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        body.classList.add("dark");
    }
    setThemeAssets(body.classList.contains("dark") ? "dark" : "light");

    if (sidebar) {
        const isMobile = window.innerWidth <= 768;
        const savedSidebarState = localStorage.getItem("sidebar");
        if (isMobile) {
            sidebar.classList.add("close");
            localStorage.setItem("sidebar", "close");
        } else if (savedSidebarState === "close") {
            sidebar.classList.add("close");
        } else {
            sidebar.classList.remove("close");
        }
    }

    disableAnimations();
    window.addEventListener("load", enableAnimations);

    if (toggle && sidebar) {
        toggle.addEventListener("click", () => {
            sidebar.classList.toggle("close");
            localStorage.setItem("sidebar", sidebar.classList.contains("close") ? "close" : "open");
        });
    }

    if (searchBtn && sidebar) {
        searchBtn.addEventListener("click", () => {
            sidebar.classList.remove("close");
            localStorage.setItem("sidebar", "open");
        });
    }

    if (modeSwitch) {
        modeSwitch.addEventListener("click", () => {
            body.classList.toggle("dark");
            const theme = body.classList.contains("dark") ? "dark" : "light";
            setThemeAssets(theme);
            localStorage.setItem("theme", theme);
        });
    }

    const menuLinks = document.querySelectorAll(".menu-links");
    const currentPath = window.location.pathname.split("/").pop() || "home.html";

    menuLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href && currentPath === href) {
            link.classList.add("active");
            link.closest(".nav-link")?.classList.add("active");
        }
        link.addEventListener("click", () => {
            menuLinks.forEach((item) => item.classList.remove("active"));
            link.classList.add("active");
        });
    });

    document.querySelectorAll(".nav-link.has-submenu > a").forEach((trigger) => {
        trigger.addEventListener("click", (event) => {
            event.preventDefault();
            trigger.parentElement.classList.toggle("active");
        });
    });
}

initApp();
