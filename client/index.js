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
  scrollActive(); // call both on scroll
};

function headerShadow() {
  const navHeader = document.getElementById("header");
  if (window.scrollY > 50) {
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
const typingEffect = new Typed(".typedText", {
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

sr.reveal(".featured-text-card");
sr.reveal(".featured-name", { delay: 100 });
sr.reveal(".featured-text-info", { delay: 200 });
sr.reveal(".featured-text-btn", { delay: 200 });
sr.reveal(".social_icons", { delay: 200 });
sr.reveal(".featured-image", { delay: 300 });
sr.reveal(".project-box", { interval: 200 });
sr.reveal(".top-header");

ScrollReveal({
  origin: "left",
  distance: "80px",
  duration: 2000,
  reset: true,
}).reveal(".about-info, .contact-info", { delay: 100 });

ScrollReveal({
  origin: "right",
  distance: "80px",
  duration: 2000,
  reset: true,
}).reveal(".skills-box, .form-control", { delay: 100 });

// ----- CHANGE ACTIVE LINK ON SCROLL -----
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 50;
    const sectionId = section.getAttribute("id");

    const navLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
    if (!navLink) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink.classList.add("active-link");
    } else {
      navLink.classList.remove("active-link");
    }
  });
}

// ----- CONTACT FORM SUBMIT HANDLER -----
// const contactForm = document.getElementById("contact-form");

// if (contactForm) {
//   contactForm.addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const message = document.getElementById("message").value.trim();

//     if (!name || !email || !message) {
//       alert("Please fill out all fields.");
//       return;
//     }

//     try {
//       const API_URL = "https://porfolio-cnbe.onrender.com"; // your backend API
//       const response = await axios.post(`${API_URL}/contact`, { name, email, message });

//       if (response.data.success) {
//         alert("Message sent!");
//         contactForm.reset();
//       } else {
//         alert("Failed to send message.");
//       }
//     } catch (err) {
//       alert("Error sending message.");
//       console.error("Contact form error:", err);
//     }
//   });
// }
async function submitForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('form-status');

    if (!name || !email || !message) {
        status.textContent = "Please fill in all fields.";
        status.style.color = "red";
        return;
    }

    try {
        const response = await fetch('http://localhost:4000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();

        if (data.success) {
            status.textContent = "Message sent successfully!";
            status.style.color = "green";
            // Clear form
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
        } else {
            status.textContent = data.message || "Failed to send message.";
            status.style.color = "red";
        }

    } catch (error) {
        console.error('Form submission error:', error);
        status.textContent = "An error occurred while sending the message.";
        status.style.color = "red";
    }
}


