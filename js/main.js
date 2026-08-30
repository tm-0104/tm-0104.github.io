/* AKIRA KAMIO — slideshow + lightbox */

/* ----- Home hero slideshow ----- */
(function () {
  const slides = document.querySelectorAll(".hero-slide");
  if (!slides.length) return;
  let i = 0;
  slides[0].classList.add("visible");
  setInterval(() => {
    slides[i].classList.remove("visible");
    i = (i + 1) % slides.length;
    slides[i].classList.add("visible");
  }, 6000);
})();

/* ----- Gallery lightbox ----- */
(function () {
  const links = Array.from(document.querySelectorAll(".grid a"));
  if (!links.length) return;

  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML =
    '<button class="lb-close" aria-label="閉じる">&times;</button>' +
    '<button class="lb-btn lb-prev" aria-label="前へ">&#8249;</button>' +
    '<img alt="">' +
    '<button class="lb-btn lb-next" aria-label="次へ">&#8250;</button>';
  document.body.appendChild(lb);

  const img = lb.querySelector("img");
  let idx = 0;

  function show(n) {
    idx = (n + links.length) % links.length;
    img.src = links[idx].href;
    lb.classList.add("open");
  }

  links.forEach((a, n) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      show(n);
    });
  });

  lb.querySelector(".lb-close").addEventListener("click", () => lb.classList.remove("open"));
  lb.querySelector(".lb-prev").addEventListener("click", () => show(idx - 1));
  lb.querySelector(".lb-next").addEventListener("click", () => show(idx + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.classList.remove("open"); });

  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") lb.classList.remove("open");
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
})();
