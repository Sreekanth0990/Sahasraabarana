//=======================================================  Mobile   =============================================
function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}
function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

//======================================================  Slide Show   ===========================================
const swiper = new Swiper(".swiper", {
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  loop: true,
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});



