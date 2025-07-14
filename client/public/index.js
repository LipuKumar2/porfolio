
  function myMenuFunction() {
    const menuBtn = document.getElementById("myNavMenu");
    menuBtn.classList.toggle("responsive");
  }

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

  var typingEffect = new Typed(".typedText", {
    strings: ["React js Developer", "Designer", "Frontend Developer", "Full Stack Developer"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000
  });

  const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
  });

  sr.reveal('.featured-text-card');
  sr.reveal('.featured-name', { delay: 100 });
  sr.reveal('.featured-text-info', { delay: 200 });
  sr.reveal('.featured-text-btn', { delay: 200 });
  sr.reveal('.social_icons', { delay: 200 });
  sr.reveal('.featured-image', { delay: 300 });
  sr.reveal('.project-box', { interval: 200 });
  sr.reveal('.top-header');

  const srLeft = ScrollReveal({
    origin: 'left',
    distance: '80px',
    duration: 2000,
    reset: true
  });

  srLeft.reveal('.about-info', { delay: 100 });
  srLeft.reveal('.contact-info', { delay: 100 });

  const srRight = ScrollReveal({
    origin: 'right',
    distance: '80px',
    duration: 2000,
    reset: true
  });

  srRight.reveal('.skills-box', { delay: 100 });
  srRight.reveal('.form-control', { delay: 100 });

  const sections = document.querySelectorAll('section[id]');
  function scrollActive() {
    const scrollY = window.scrollY;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 50,
        sectionId = current.getAttribute('id');
      const link = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.classList.add('active-link');
        } else {
          link.classList.remove('active-link');
        }
      }
    });
  }
  window.addEventListener('scroll', scrollActive);

  function submitForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const status = document.getElementById("form-status");

    if (!name || !email || !message) {
      status.innerText = "Please fill all fields!";
      status.style.color = "red";
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    })
      .then((res) => res.json())
      .then((data) => {
        status.innerText = "Message sent successfully!";
        status.style.color = "green";
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
      })
      .catch((err) => {
        console.error("Error:", err);
        status.innerText = "Something went wrong. Try again later.";
        status.style.color = "red";
      });
  }

