// SHARED GALAXY BACKGROUND
const galaxyBackground = document.createElement("div");
galaxyBackground.className = "galaxy-background";
galaxyBackground.setAttribute("aria-hidden", "true");
galaxyBackground.innerHTML = `
    <div class="galaxy-stars galaxy-stars--far"></div>
    <div class="galaxy-stars galaxy-stars--mid"></div>
    <div class="galaxy-stars galaxy-stars--near"></div>
    <div class="galaxy-stars galaxy-stars--bright"></div>
`;
document.body.prepend(galaxyBackground);

// DROPDOWN CLICK
document.querySelectorAll(".dropbtn").forEach(button => {
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", function (e) {
        e.stopPropagation();

        document.querySelectorAll(".dropdown").forEach(drop => {
            if (drop !== this.parentElement) {
                drop.classList.remove("active");
                drop.querySelector(".dropbtn").setAttribute("aria-expanded", "false");
            }
        });

        this.parentElement.classList.toggle("active");
        this.setAttribute("aria-expanded", this.parentElement.classList.contains("active"));
    });
});

document.addEventListener("click", function () {
    document.querySelectorAll(".dropdown").forEach(drop => {
        drop.classList.remove("active");
        drop.querySelector(".dropbtn").setAttribute("aria-expanded", "false");
    });
});


// LANGUAGE SWITCH (SAFE VERSION)
function setLanguage(lang) {

    localStorage.setItem("language", lang);

    const elements = document.querySelectorAll("[data-de]");

    elements.forEach(el => {
        if (el.hasAttribute(`data-${lang}`)) {
            el.textContent = el.getAttribute(`data-${lang}`);
        }
    });

    document.documentElement.lang = lang;
}


// LOAD DEFAULT LANGUAGE
document.addEventListener("DOMContentLoaded", function () {

    const savedLang = localStorage.getItem("language") || "en";
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
