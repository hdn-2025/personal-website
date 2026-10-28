
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navigationItems = document.querySelectorAll(".nav-links a");
const pageSections = document.querySelectorAll("main section[id]");

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

navigationItems.forEach(function (link) {
    link.addEventListener("click", function () {
        closeMenu();
    });
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMenu();
    }
});

function updateActiveNavigation() {
    let currentSection = "";

    pageSections.forEach(function (section) {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    navigationItems.forEach(function (link) {
        const sectionId = link.getAttribute("href").substring(1);
        const isActive = sectionId === currentSection;

        if (isActive) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation, {
    passive: true
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 700) {
        closeMenu();
    }
});

updateActiveNavigation();
