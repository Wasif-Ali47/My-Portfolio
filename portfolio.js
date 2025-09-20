
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

      // Hero reveal: text & lead
      gsap.from(".reveal-title", {
        y: 18,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.12,
      });
      gsap.from(".reveal-lead", {
        y: 14,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        delay: 0.22,
      });
      gsap.from(".cta .btn", {
        y: 8,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.36,
      });

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
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // Projects: staggered entrance
      gsap.from(".project", {
        y: 26,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: "#projects",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Small interactive hover parallax on hero svg blobs (subtle)
      gsap.to(".art ellipse:nth-child(1)", {
        x: -18,
        y: -8,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".art ellipse:nth-child(2)", {
        x: 20,
        y: 6,
        duration: 14,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Theme switch on scroll:
      // When the top of the hero leaves the viewport (end of hero), switch to dark theme.
      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        onEnter: () => switchThemeTo("dark"),
        onEnterBack: () => switchThemeTo("light"),
        onLeaveBack: () => switchThemeTo("light"),
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

