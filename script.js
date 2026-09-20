// SHARED GALAXY BACKGROUND
const galaxyBackground = document.createElement("div");
galaxyBackground.className = "galaxy-background";
galaxyBackground.setAttribute("aria-hidden", "true");
galaxyBackground.innerHTML = `
    <div class="galaxy-portrait galaxy-portrait--future-chat"></div>
    <div class="galaxy-stars galaxy-stars--far"></div>
    <div class="galaxy-stars galaxy-stars--mid"></div>
    <div class="galaxy-stars galaxy-stars--near"></div>
    <div class="galaxy-stars galaxy-stars--bright"></div>
`;
document.body.prepend(galaxyBackground);

// FLOATING CHAT / CONTACT WIDGET
const chatWidget = document.createElement("aside");
chatWidget.className = "chat-widget";
chatWidget.setAttribute("aria-label", "Portfolio-Kontakt");
chatWidget.setAttribute("data-aria-label-de", "Portfolio-Kontakt");
chatWidget.setAttribute("data-aria-label-en", "Portfolio contact");
chatWidget.innerHTML = `
    <button class="chat-toggle" type="button" aria-expanded="false" aria-controls="chat-panel">
        <span class="chat-toggle__spark" aria-hidden="true">✦</span>
        <span data-de="Chat" data-en="Chat">Chat</span>
    </button>
    <div class="chat-panel" id="chat-panel" aria-hidden="true" inert>
        <div class="chat-panel__header">
            <div>
                <p class="chat-panel__eyebrow" data-de="Portfolio-Kontakt" data-en="Portfolio contact">Portfolio Assistant</p>
                <h2 data-de="Hallo, ich bin Xueni." data-en="Hi, I am Xueni.">Hallo, ich bin Xueni.</h2>
            </div>
            <button class="chat-close" type="button" aria-label="Chat schließen" data-aria-label-de="Chat schließen" data-aria-label-en="Close chat">×</button>
        </div>
        <p class="chat-bubble"
            data-de="Danke für Ihren Besuch. Der interaktive Chat kommt später. Für jetzt können Sie mir gern direkt schreiben."
            data-en="Thanks for visiting. The interactive chat is coming later. For now, you can contact me directly.">
            Danke für Ihren Besuch. Der interaktive Chat kommt später. Für jetzt können Sie mir gern direkt schreiben.
        </p>
        <div class="chat-actions">
            <a class="chat-action chat-action--primary"
                href="mailto:yhnm_88@hotmail.com"
                data-de="E-Mail senden"
                data-en="Send email">E-Mail senden</a>
            <a class="chat-action"
                href="https://www.linkedin.com/in/xue-ni-law-9b57a183/"
                target="_blank"
                rel="noopener noreferrer"
                data-de="LinkedIn öffnen"
                data-en="Open LinkedIn">LinkedIn öffnen</a>
        </div>
        <a class="chat-contact-link" href="index.html#contact" data-de="Zum Kontaktformular" data-en="Go to contact form">Zum Kontaktformular</a>
    </div>
`;
document.body.append(chatWidget);

const chatToggle = chatWidget.querySelector(".chat-toggle");
const chatPanel = chatWidget.querySelector(".chat-panel");
const chatClose = chatWidget.querySelector(".chat-close");

function setChatOpen(isOpen) {
    chatWidget.classList.toggle("is-open", isOpen);
    chatToggle.setAttribute("aria-expanded", String(isOpen));
    chatPanel.setAttribute("aria-hidden", String(!isOpen));
    chatPanel.inert = !isOpen;
    if (isOpen) chatClose.focus();
    else if (chatPanel.contains(document.activeElement)) chatToggle.focus();
}

chatToggle.addEventListener("click", function () {
    setChatOpen(!chatWidget.classList.contains("is-open"));
});

chatClose.addEventListener("click", function () {
    setChatOpen(false);
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        setChatOpen(false);
    }
});

document.addEventListener("click", function (event) {
    if (!chatWidget.contains(event.target)) {
        setChatOpen(false);
    }
});

// LANGUAGE SWITCH (SAFE VERSION)
function setLanguage(lang) {

    lang = lang === "de" ? "de" : "en";
    try { localStorage.setItem("language", lang); } catch {}

    const elements = document.querySelectorAll("[data-de]");

    elements.forEach(el => {
        if (el.hasAttribute(`data-${lang}`)) {
            el.textContent = el.getAttribute(`data-${lang}`);
        }
    });

    document.querySelectorAll(`[data-placeholder-${lang}]`).forEach(el => {
        el.setAttribute("placeholder", el.getAttribute(`data-placeholder-${lang}`));
    });

    document.querySelectorAll(`[data-aria-label-${lang}]`).forEach(el => {
        el.setAttribute("aria-label", el.getAttribute(`data-aria-label-${lang}`));
    });
    document.querySelectorAll("[data-language]").forEach(button => {
        button.setAttribute("aria-pressed", String(button.dataset.language === lang));
    });

    document.documentElement.lang = lang;
}


// LOAD DEFAULT LANGUAGE
document.addEventListener("DOMContentLoaded", function () {

    let savedLang = "de";
    try { savedLang = localStorage.getItem("language") || "de"; } catch {}
    setLanguage(savedLang);

});

// KEEP HASH TARGETS VISIBLE BELOW THE FIXED NAVBAR AFTER A REFRESH
window.addEventListener("load", function () {
    if (!window.location.hash) {
        return;
    }

    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));

    if (target) {
        requestAnimationFrame(() => target.scrollIntoView());
    }
});

// CONTACT FORM
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const formData = new FormData(contactForm);
        const senderName = formData.get("name").trim();
        const senderEmail = formData.get("email").trim();
        const message = formData.get("message").trim();
        const recipient = ["yhnm_88", "hotmail.com"].join("@");
        const isGerman = document.documentElement.lang === "de";
        const subject = isGerman ? `Portfolio-Anfrage von ${senderName}` : `Portfolio contact from ${senderName}`;
        const body = [
            `Name: ${senderName}`,
            `${isGerman ? "E-Mail" : "Email"}: ${senderEmail}`,
            "",
            message
        ].join("\n");

        window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}


const portfolioNav = document.querySelector(".portfolio-nav");
if (portfolioNav) {
    new ResizeObserver(() => {
        document.documentElement.style.setProperty("--nav-height", `${portfolioNav.offsetHeight}px`);
    }).observe(portfolioNav);
}
