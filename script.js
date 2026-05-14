/* =============================================
   HERO IMAGE CAROUSEL
   Auto-slides every 3 seconds
   ============================================= */
let heroIndex = 0;
const heroImages = document.querySelectorAll(".slide");
let autoSlide;

function showHeroImage(i) {
  heroImages.forEach(img => img.classList.remove("active"));
  heroImages[i].classList.add("active");
}

function changeHeroSlide(i) {
  heroIndex = i;
  showHeroImage(heroIndex);
  resetAutoSlide();
}

function nextHeroSlide() {
  heroIndex = (heroIndex + 1) % heroImages.length;
  showHeroImage(heroIndex);
  resetAutoSlide();
}

function prevHeroSlide() {
  heroIndex = (heroIndex - 1 + heroImages.length) % heroImages.length;
  showHeroImage(heroIndex);
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlide = setInterval(() => {
    heroIndex = (heroIndex + 1) % heroImages.length;
    showHeroImage(heroIndex);
  }, 3000);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

startAutoSlide();


/* =============================================
   DOM READY — all event listeners
   ============================================= */
document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------------------------
     MAIN HEADER: hamburger + dropdown
     ------------------------------------------ */
  const hamburger = document.getElementById("hamburger");
  const navbar = document.getElementById("navbar");
  const productDropdown = document.getElementById("productDropdown");
  const dropdownContent = document.getElementById("dropdownContent");
  const arrowImg = document.getElementById("arrowImg");

  navbar.classList.remove("active");

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    navbar.classList.toggle("active");
  });

  productDropdown.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropdownContent.classList.toggle("show");
    arrowImg.style.transform = dropdownContent.classList.contains("show")
      ? "rotate(180deg)" : "rotate(0deg)";
  });

  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
      navbar.classList.remove("active");
    }
    if (!productDropdown.contains(e.target) && !dropdownContent.contains(e.target)) {
      dropdownContent.classList.remove("show");
      arrowImg.style.transform = "rotate(0deg)";
    }
  });


  /* ------------------------------------------
     STICKY HEADER: hamburger + dropdown
     ------------------------------------------ */
  const stickyHamburger = document.getElementById("stickyHamburger");
  const stickyNavbar = document.getElementById("stickyNavbar");
  const stickyDropBtn = document.getElementById("stickyDropBtn");
  const stickyDropContent = document.getElementById("stickyDropContent");
  const stickyArrow = document.getElementById("stickyArrow");

  stickyHamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    stickyNavbar.classList.toggle("active");
  });

  stickyDropBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    stickyDropContent.classList.toggle("show");
    stickyArrow.style.transform = stickyDropContent.classList.contains("show")
      ? "rotate(180deg)" : "rotate(0deg)";
  });


  /* ------------------------------------------
     STICKY HEADER: scroll show / hide logic
     - Shows when scrolling UP past hero section
     - Hides when scrolling DOWN or above hero
     ------------------------------------------ */
  const stickyBar = document.getElementById("stickyBar");
  const heroSection = document.getElementById("heroSection");
  let lastScrollY = 0;

  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

    if (currentY > heroBottom) {
      /* Past hero — show on scroll UP, hide on scroll DOWN */
      if (currentY < lastScrollY) {
        stickyBar.classList.add("visible");    /* scrolling UP */
      } else {
        stickyBar.classList.remove("visible"); /* scrolling DOWN */
      }
    } else {
      /* Within or above hero — always hide */
      stickyBar.classList.remove("visible");
    }

    lastScrollY = currentY;
  }, { passive: true });


  /* ------------------------------------------
     IMAGE ZOOM PANEL
     Tracks mouse position inside image-box
     and shows magnified preview in zoom panel
     ------------------------------------------ */
  const imageBox = document.getElementById("imageBox");
  const zoomPanel = document.getElementById("zoomPanel");
  const zoomImg = document.getElementById("zoomImg");

  /* On enter — load active slide into zoom panel */
  imageBox.addEventListener("mouseenter", () => {
    const activeSlide = imageBox.querySelector(".slide.active");
    if (activeSlide) {
      zoomImg.src = activeSlide.src;
    }
  });

  /* On move — shift zoom origin to follow cursor position */
  imageBox.addEventListener("mousemove", (e) => {
    const rect = imageBox.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    /* Move the transform-origin so zoom follows the cursor */
    zoomImg.style.transformOrigin = `${xPct}% ${yPct}%`;

    /* Also sync if slide changed while hovering */
    const activeSlide = imageBox.querySelector(".slide.active");
    if (activeSlide && zoomImg.src !== activeSlide.src) {
      zoomImg.src = activeSlide.src;
    }
  });


  /* ------------------------------------------
     DOWNLOAD LINKS
     ------------------------------------------ */
  const links = document.querySelectorAll(".dl-link");

  links.forEach(link => {
    link.addEventListener("click", function () {
      const fileName = this.getAttribute("download");
      const original = this.innerHTML;

      this.classList.add("downloading");
      this.innerHTML = "Downloading...";

      setTimeout(() => {
        this.classList.remove("downloading");
        this.innerHTML = original;
      }, 1500);

      showToast("Downloading: " + fileName);
    });
  });

}); /* end DOMContentLoaded */


/* =============================================
   FAQ ACCORDION
   ============================================= */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    /* Close all others */
    faqItems.forEach(i => { if (i !== item) i.classList.remove("active"); });
    /* Toggle current */
    item.classList.toggle("active");
  });
});


/* =============================================
   APPLICATION SLIDER
   ============================================= */
const slider = document.getElementById("slider");
const cards = document.querySelectorAll(".application-card");
let currentIndex = 0;

function updateActive() {
  cards.forEach(card => card.classList.remove("active"));
  cards[currentIndex].classList.add("active");
}

function slideRight() {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    slider.scrollBy({ left: 300, behavior: "smooth" });
    updateActive();
  }
}

function slideLeft() {
  if (currentIndex > 0) {
    currentIndex--;
    slider.scrollBy({ left: -300, behavior: "smooth" });
    updateActive();
  }
}

cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    currentIndex = index;
    updateActive();
  });
});


/* =============================================
   PROCESS TABS + DYNAMIC CONTENT
   ============================================= */
const data = [
  {
    img: "images/img1.jpg",
    title: "High-Grade Raw Material Selection",
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness.",
    list: ["PE100 grade material", "Optimal molecular weight distribution"]
  },
  {
    img: "images/portfolio1.jpg",
    title: "Extrusion Process",
    desc: "Molten material is shaped into pipe form using extrusion machines.",
    list: ["High precision shaping", "Uniform thickness"]
  },
  {
    img: "images/portfolio2.jpg",
    title: "Cooling Stage",
    desc: "Pipes are cooled gradually to maintain structural integrity.",
    list: ["Controlled cooling", "Improved strength"]
  },
  {
    img: "images/portfolio3.jpg",
    title: "High-Grade Raw Material Selection",
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness.",
    list: ["PE100 grade material", "Optimal molecular weight distribution"]
  },
  {
    img: "images/img7.jpg",
    title: "Cooling Stage",
    desc: "Pipes are cooled gradually to maintain structural integrity.",
    list: ["Controlled cooling", "Improved strength"]
  }
];

let index1 = 0;

function updateUI() {
  document.getElementById("processImg").src = data[index1].img;
  document.getElementById("title").innerText = data[index1].title;
  document.getElementById("desc").innerText = data[index1].desc;

  const list = document.querySelector(".process-images");
  list.innerHTML = "";

  data[index1].list.forEach(item => {
    let p = document.createElement("p");
    p.innerHTML = `<img src="./images/CheckCircle.png" alt="checkbox" />${item}`;
    list.appendChild(p);
  });
}

function nextSlide() {
  index1 = (index1 + 1) % data.length;
  updateUI();
}

function prevSlide() {
  index1 = (index1 - 1 + data.length) % data.length;
  updateUI();
}

const tabs = document.querySelectorAll(".tabs button");

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    index1 = i;
    updateUI();
  });
});


/* =============================================
   POPUPS
   ============================================= */
function openPopup() { document.getElementById("popup").style.display = "flex"; }
function closePopup() { document.getElementById("popup").style.display = "none"; }
function openDownloadPopup() { document.getElementById("downloadPopup").style.display = "flex"; }
function closeDownloadPopup() { document.getElementById("downloadPopup").style.display = "none"; }


/* =============================================
   TOAST NOTIFICATION
   ============================================= */
function showToast(message) {
  const toast = document.getElementById("dl-toast");
  toast.textContent = message;
  toast.style.opacity = "1";
  setTimeout(() => { toast.style.opacity = "0"; }, 3000);
}