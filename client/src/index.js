// ----- NAV MENU TOGGLE -----
function myMenuFunction() {
  const menuBtn = document.getElementById("myNavMenu");
  if (menuBtn.className === "nav-menu") {
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

// ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING -----
window.onscroll = function () {
  headerShadow();
};

function headerShadow() {
  const navHeader = document.getElementById("header");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
  }
}

// ----- TYPING EFFECT -----
var typingEffect = new Typed(".typedText", {
  strings: ["React js Developer", "Designer", "Frontend Developer", "Full Stack Developer"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 80,
  backDelay: 2000,
});

// ----- SCROLL REVEAL ANIMATION -----
const sr = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 2000,
  reset: true,
});

sr.reveal(".featured-text-card", {});
sr.reveal(".featured-name", { delay: 100 });
sr.reveal(".featured-text-info", { delay: 200 });
sr.reveal(".featured-text-btn", { delay: 200 });
sr.reveal(".social_icons", { delay: 200 });
sr.reveal(".featured-image", { delay: 300 });
sr.reveal(".project-box", { interval: 200 });
sr.reveal(".top-header", {});

// Scroll reveal from left
const srLeft = ScrollReveal({
  origin: "left",
  distance: "80px",
  duration: 2000,
  reset: true,
});

srLeft.reveal(".about-info", { delay: 100 });
srLeft.reveal(".contact-info", { delay: 100 });

// Scroll reveal from right
const srRight = ScrollReveal({
  origin: "right",
  distance: "80px",
  duration: 2000,
  reset: true,
});

srRight.reveal(".skills-box", { delay: 100 });
srRight.reveal(".form-control", { delay: 100 });

// ----- CHANGE ACTIVE LINK ON SCROLL -----
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    const navLink = document.querySelector(".nav-menu a[href*=" + sectionId + "]");
    if (!navLink) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink.classList.add("active-link");
    } else {
      navLink.classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// ----- CONTACT FORM SUBMIT HANDLER -----
// ----- CONTACT FORM SUBMIT HANDLER -----
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const API_URL = "https://porfolio-cnbe.onrender.com"; // or from process.env
      const response = await axios.post(`${API_URL}/contact`, { name, email, message });

      if (response.data.success) {
        alert("Message sent!");
        contactForm.reset();
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      alert("Error sending message.");
      console.error(err);
    }
  });
}
