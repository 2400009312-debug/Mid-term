document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navButtons = document.querySelector(".nav-buttons");

  if (menuToggle && navButtons) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("open");
      navButtons.classList.toggle("open");
    });

    navButtons.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        menuToggle.classList.remove("open");
        navButtons.classList.remove("open");
      });
    });
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    const target = btn.getAttribute("href");
    if (target === currentPage) {
      btn.classList.add("active");
    }
  });

  const modalOverlay = document.getElementById("detailModal");

  if (modalOverlay) {
    const modalTitle = modalOverlay.querySelector(".modal-title");
    const modalDesc = modalOverlay.querySelector(".modal-desc");
    const modalCloseBtn = modalOverlay.querySelector(".modal-close");
    const modalLink = modalOverlay.querySelector(".modal-link");

    document.querySelectorAll("[data-modal-trigger]").forEach((card) => {
      card.addEventListener("click", (e) => {
        e.preventDefault();
        const title = card.getAttribute("data-title") || "";
        const desc = card.getAttribute("data-desc") || "";
        const link = card.getAttribute("data-link") || "#";

        modalTitle.textContent = title;
        modalDesc.textContent = desc;

        if (modalLink) {
          modalLink.href = link;
        }

        modalOverlay.classList.add("show");
      });
    });

    const closeModal = () => modalOverlay.classList.remove("show");

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", closeModal);
    }

    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  const revealEls = document.querySelectorAll(".place-card, .hotel-card, .info-box");

  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }, index * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(el);
    });
  }
});