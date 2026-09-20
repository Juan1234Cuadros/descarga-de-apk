// Enlace del APK (el mismo del botón)
const downloadUrl = document.getElementById("downloadButton").href;
const websiteUrl = "https://urban-studio-jykh.vercel.app";

// 1) Detectar si está en Android:
//    - En Android se oculta el QR (solo toca el botón).
//    - En otro dispositivo se muestra el QR y un aviso con "Copiar enlace".
const isAndroid = /Android/i.test(navigator.userAgent || "");
document.documentElement.classList.add(isAndroid ? "is-android" : "no-android");

// 2) Generar el QR
const qrTarget = document.getElementById("qrcode");

if (qrTarget && typeof QRCode !== "undefined") {
    new QRCode(qrTarget, {
        text: downloadUrl,
        width: 320,               // se genera grande y el CSS lo ajusta (queda nítido)
        height: 320,
        colorDark: "#0A0806",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

const websiteQrTarget = document.getElementById("websiteQrcode");

if (websiteQrTarget && typeof QRCode !== "undefined") {
    new QRCode(websiteQrTarget, {
        text: websiteUrl,
        width: 320,
        height: 320,
        colorDark: "#0A0806",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

// 3) Copiar enlace
const copyButton = document.getElementById("copyLink");

if (copyButton) {
    copyButton.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(downloadUrl);
            copyButton.textContent = "Enlace copiado";
        } catch (error) {
            // Si el navegador bloquea el portapapeles, se muestra el enlace para copiarlo a mano
            window.prompt("Copia este enlace:", downloadUrl);
        }
        setTimeout(() => (copyButton.textContent = "Copiar enlace"), 2200);
    });
}

const floatingDownload = document.getElementById("floatingDownload");
const downloadButton = document.getElementById("downloadButton");

if (floatingDownload && downloadButton) {
    const updateFloatingDownload = () => {
        floatingDownload.classList.toggle("is-visible", window.scrollY > 420);
    };

    window.addEventListener("scroll", updateFloatingDownload, { passive: true });
    updateFloatingDownload();

    floatingDownload.addEventListener("click", () => {
        downloadButton.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
}

const scrollProgress = document.getElementById("scrollProgress");
const revealElements = document.querySelectorAll(".reveal");

const updateScrollProgress = () => {
    if (!scrollProgress) return;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    scrollProgress.style.width = `${Math.min(progress, 100)}%`;
};

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: .14 });

    revealElements.forEach((element) => revealObserver.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
}