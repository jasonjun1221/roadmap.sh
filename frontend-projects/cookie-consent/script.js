const banner = document.querySelector(".banner");
const acceptBtn = document.getElementById("accept-btn");
const closeBtn = document.getElementById("close-btn");


if (localStorage.getItem("cookieConsent")) {
  banner.style.display = "none";
}

acceptBtn.addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "true");
  banner.style.display = "none";
});

closeBtn.addEventListener("click", () => {
  banner.style.display = "none";
});
