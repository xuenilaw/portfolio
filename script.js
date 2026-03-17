// DROPDOWN CLICK
document.querySelectorAll(".dropbtn").forEach(button => {
    button.addEventListener("click", function (e) {
        e.stopPropagation();

        document.querySelectorAll(".dropdown").forEach(drop => {
            if (drop !== this.parentElement) {
                drop.classList.remove("active");
            }
        });

        this.parentElement.classList.toggle("active");
    });
});

document.addEventListener("click", function () {
    document.querySelectorAll(".dropdown").forEach(drop => {
        drop.classList.remove("active");
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

    const savedLang = localStorage.getItem("language") || "de";
    setLanguage(savedLang);

});