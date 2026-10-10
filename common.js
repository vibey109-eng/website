document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // --- Starfield background (twinkling stars + a shooting star + mouse parallax) ---
  // Opt in by adding <div id="starfield" class="starfield"></div> to a page.
  const starfield = document.getElementById("starfield");
  if (starfield) {
    const STAR_COUNT = 90;
    for (let i = 0; i < STAR_COUNT; i++) {
      const dot = document.createElement("span");
      dot.className = "star-dot";
      const size = Math.random() * 2 + 1; // 1px - 3px
      dot.style.width = size + "px";
      dot.style.height = size + "px";
      dot.style.left = Math.random() * 100 + "vw";
      dot.style.top = Math.random() * 100 + "vh";
      dot.style.animationDuration = (Math.random() * 3 + 2) + "s"; // 2s - 5s
      dot.style.animationDelay = (Math.random() * 5) + "s";
      starfield.appendChild(dot);
    }

    // Travel vector (dx, dy): falling down-and-to-the-RIGHT.
    const TRAVEL_DX = 480;
    const TRAVEL_DY = 340;
    const barAngleDeg = Math.atan2(-TRAVEL_DY, -TRAVEL_DX) * (180 / Math.PI);

    const SHOOTER_COUNT = 3;
    for (let i = 0; i < SHOOTER_COUNT; i++) {
      const wrap = document.createElement("span");
      wrap.className = "shooting-star-wrap";
      wrap.style.top = (Math.random() * 40) + "vh";
      wrap.style.left = (5 + Math.random() * 40) + "vw"; // spawns on the side it's falling FROM
      wrap.style.setProperty("--tx", TRAVEL_DX + "px");
      wrap.style.setProperty("--ty", TRAVEL_DY + "px");
      wrap.style.animationDuration = (Math.random() * 5 + 6) + "s"; // 6s - 11s
      wrap.style.animationDelay = (Math.random() * 8) + "s";

      const bar = document.createElement("span");
      bar.className = "shooting-star-bar";
      bar.style.transform = `rotate(${barAngleDeg}deg)`;

      wrap.appendChild(bar);
      starfield.appendChild(wrap);
    }

    window.addEventListener("mousemove", (e) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 24;
      const dy = (e.clientY / window.innerHeight - 0.5) * 24;
      starfield.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  }

  // --- Shared login state: swaps the nav's "Sign Up" link for "Log Out"
  // when a member is logged in, and handles the logout confirmation.
  // Opt in by giving the Sign Up nav link id="navAuthBtn".
  const CURRENT_USER_KEY = "lithosCurrentUser";
  const navAuthBtn = document.getElementById("navAuthBtn");

  function getCurrentUser() {
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function openLogoutConfirm() {
    let backdrop = document.getElementById("logoutConfirmBackdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.id = "logoutConfirmBackdrop";
      backdrop.className = "modal-backdrop";
      backdrop.innerHTML = `
        <div class="modal-box" style="max-width: 22rem; text-align: center;">
          <p class="text-white text-lg font-medium mb-2">정말 로그아웃 하시겠습니까?</p>
          <p class="text-white/50 text-sm mb-6">다시 로그인하려면 Sign Up 페이지에서 진행해주세요.</p>
          <div class="flex items-center justify-center gap-3">
            <button id="logoutCancelBtn" class="px-5 py-2.5 rounded-full text-sm font-medium text-white/70 border border-white/20 hover:bg-white/10 transition-colors">취소</button>
            <button id="logoutConfirmBtn" class="px-5 py-2.5 rounded-full text-sm font-medium text-white bg-[#1e3a5f] hover:bg-[#16293f] transition-colors">로그아웃</button>
          </div>
        </div>
      `;
      document.body.appendChild(backdrop);

      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) backdrop.classList.remove("open");
      });
      backdrop.querySelector("#logoutCancelBtn").addEventListener("click", () => {
        backdrop.classList.remove("open");
      });
      backdrop.querySelector("#logoutConfirmBtn").addEventListener("click", () => {
        localStorage.removeItem(CURRENT_USER_KEY);
        window.location.href = "index.html";
      });
    }
    backdrop.classList.add("open");
  }

  window.getCurrentUser = getCurrentUser;
  window.openLogoutConfirm = openLogoutConfirm;

  if (navAuthBtn) {
    const user = getCurrentUser();
    if (user) {
      navAuthBtn.textContent = "Log Out";
      navAuthBtn.removeAttribute("href");
      navAuthBtn.style.cursor = "pointer";
      navAuthBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openLogoutConfirm();
      });
    }
  }
});
