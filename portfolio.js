
    // ===========================
    // Utilities & initial state
    // ===========================
    (function () {
      const root = document.documentElement;
      const themeToggle = document.getElementById("themeToggle");
      const themeIcon = document.getElementById("themeIcon");
      const themeLabel = document.getElementById("themeLabel");
      const STORAGE_KEY = "theme-preference-portfolio";



      // Apply theme
      function applyTheme(theme) {
        if (theme === "dark") {
          root.setAttribute("data-theme", "dark");
          themeIcon.className = "fa-regular fa-moon";
          themeLabel.textContent = "Dark";
          themeToggle.setAttribute("aria-pressed", "true");
        } else {
          root.setAttribute("data-theme", "light");
          themeIcon.className = "fa-regular fa-sun";
          themeLabel.textContent = "Light";
          themeToggle.setAttribute("aria-pressed", "false");
        }
      }

      // Start: pick saved or system preference
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") {
        applyTheme(saved);
      } else {
        const prefersDark =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        applyTheme(prefersDark ? "dark" : "light");
      }

      // Toggle button
      themeToggle.addEventListener("click", function () {
        const next =
          root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
        localStorage.setItem(STORAGE_KEY, next);
      });

      themeToggle.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          themeToggle.click();
        }
      });

      // Year
      document.getElementById("year").textContent = new Date().getFullYear();
    })();

    // ===========================
    // GSAP animations
    // ===========================
    (function () {
      if (
        "matchMedia" in window &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        // Respect reduced motion — don't run heavy animations
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      // Reveal batch for cards / sections using ScrollTrigger.batch
      const batchTargets = document.querySelectorAll(".reveal, .reveal-card");
      gsap.utils.toArray(batchTargets).forEach((el) => {
        gsap.from(el, {
          y: 18,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            stagger:true,
            toggleActions: "play none none none",
          },
        });
      });

      // Small interactive hover parallax on hero svg blobs (subtle)
      gsap.to(".art ellipse:nth-child(1)", {
        x: -28,
        y: -18,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".art ellipse:nth-child(2)", {
        x: 40,
        y: 16,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });


  
      // Smooth theme transition function
      let lastTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      function switchThemeTo(theme) {
        if (theme === lastTheme) return;
        lastTheme = theme;

        // animate CSS variables that are safe to tween (we tween a faux overlay opacity)
        if (theme === "dark") {
          document.documentElement.setAttribute("data-theme", "dark");
        } else {
          document.documentElement.setAttribute("data-theme", "light");
        }
      }
    })();

    // ===========================
    // Contact form (client-only demo behavior)
    // ===========================
    (function () {
      const form = document.getElementById("contactForm");
      const sendBtn = document.getElementById("sendBtn");
      const note = document.getElementById("formNote");

      function validate() {
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");
        if (!name.value.trim()) {
          name.focus();
          return { ok: false, reason: "Please enter your name." };
        }
        if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
          email.focus();
          return { ok: false, reason: "Please enter a valid email." };
        }
        if (!message.value.trim() || message.value.trim().length < 6) {
          message.focus();
          return { ok: false, reason: "Message too short." };
        }
        return { ok: true };
      }

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const v = validate();
        if (!v.ok) {
          note.textContent = v.reason;
          note.style.color = "var(--muted)";
          return;
        }

        // simulate sending (client-only)
        sendBtn.disabled = true;
        sendBtn.innerHTML =
          '<i class="fa-regular fa-spinner fa-spin"></i> Sending...';
        note.textContent = "Sending message...";

        // Simulate network latency then show success
        setTimeout(() => {
          sendBtn.disabled = false;
          sendBtn.innerHTML =
            '<i class="fa-regular fa-paper-plane"></i> Send';
          form.reset();
          note.textContent = "Message sent — thanks! I will reply shortly.";
          note.style.color = "green";

          // small success animation
          gsap.from(note, {
            y: -6,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        }, 900);
      });

      form.addEventListener("reset", function () {
        note.textContent = "";
      });
    })();

// fade up animation for hero content




var textFadUp = document.querySelector("#textfadeup h1, p");
var btnFadeUp = document.querySelector("#btnfadeup");

var tl5 = gsap.timeline();


tl5.from("#textfadeup h1 p", {
  opacity: 0,
  y: -600,
  duration: 0.5,
  stagger: 0.2,
});
tl5.from("#btnfadeup", {
  opacity: 0,
  y: -200,
  duration: 0.3,
});


// JS to close popup when clicking overlay
document.querySelectorAll('.popup-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    // Only close if clicked directly on overlay, not inside the content
    if (e.target === overlay) {
      window.location.hash = '#About-Section'; // closes popup
    }
  });
});

// Disable background scroll when popup opens
const popups = document.querySelectorAll('.popup-overlay');

popups.forEach(popup => {
  popup.addEventListener('click', e => {
    if (e.target === popup) {
      window.location.hash = '#About-Section';
      document.body.style.overflow = 'auto'; // restore scroll
    }
  });

  // When popup opens
  popup.addEventListener('transitionstart', () => {
    document.body.style.overflow = 'hidden';
  });
});



// bubble
const bubble = document.getElementById('readBubble');

document.querySelectorAll('.about-item').forEach(card => {
  card.addEventListener('mousemove', e => {
    bubble.style.left = e.clientX + 'px';
    bubble.style.top = e.clientY + 'px';
    bubble.style.opacity = 1;
  });

  card.addEventListener('mouseleave', () => {
    bubble.style.opacity = 0;
  });
});



// Select elements
const aboutCardUnique = document.getElementById("aboutCardUnique");
const popupEducation = document.getElementById("popup-education");
const closeBtn = popupEducation.querySelector(".close-btn");

// Function to open popup
function openPopup(popup) {
  popup.style.display = "flex";                 // show popup
  document.body.style.overflow = "hidden";     // disable background scroll

  // GSAP animation for popup content
  gsap.fromTo(
    popup.querySelector(".popup-content"),
    { opacity: 0, y: -50, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }
  );
}

// Function to close popup
function closePopup(popup) {
  // Animate out then hide
  gsap.to(popup.querySelector(".popup-content"), {
    opacity: 0,
    y: -50,
    scale: 0.95,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      popup.style.display = "none";
      document.body.style.overflow = "auto"; // restore scroll
    }
  });
}

// Open popup when card clicked
aboutCardUnique.addEventListener("click", (e) => {
  e.preventDefault(); // prevent jumping to anchor
  openPopup(popupEducation);
});

// Close popup when clicking close button
closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  closePopup(popupEducation);
});

// Close popup when clicking overlay (outside content)
popupEducation.addEventListener("click", (e) => {
  if (e.target === popupEducation) closePopup(popupEducation);
});







// Select all cards
const cards = document.querySelectorAll(".about-item");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const popupId = "popup-" + card.id.split("-")[1]; // card-hobbies → popup-hobbies
    const popup = document.getElementById(popupId);
    if (!popup) return;

    // Show popup with GSAP
    popup.style.display = "flex";
    gsap.fromTo(popup, {opacity:0}, {opacity:1, duration:0.3});

    // Disable background scroll
    document.body.style.overflow = "hidden";

    // Close popup function
    const closeBtn = popup.querySelector(".close-btn");
    closeBtn.onclick = () => closePopup(popup);

    // Click overlay to close
    popup.onclick = (e) => {
      if (e.target === popup) closePopup(popup);
    };
  });
});

function closePopup(popup) {
  gsap.to(popup, {
    opacity:0,
    duration:0.3,
    onComplete: () => {
      popup.style.display = "none";
      document.body.style.overflow = "auto"; // restore scroll
    }
  });
}
