/* =========================================================
   BACKGROUND MUSIC
   ========================================================= */

   const music = document.getElementById("music");
   const musicBtn = document.getElementById("musicBtn");
   const musicText = document.getElementById("musicText");
   
   
   musicBtn.addEventListener("click", async () => {
   
     if (music.paused) {
   
       try {
   
         await music.play();
   
         musicText.textContent = "Pause music";
   
       } catch {
   
         musicText.textContent = "Tap to play";
   
       }
   
     } else {
   
       music.pause();
   
       musicText.textContent = "Play music";
     }
   
   });
   
   
   music.addEventListener("ended", () => {
   
     musicText.textContent = "Play music";
   
   });
   
   
   /* =========================================================
      GALLERY
      ========================================================= */
   
   const galleryItems = document.querySelectorAll(".gallery-item");
   
   const lightbox = document.getElementById("lightbox");
   const lightboxImage = document.getElementById("lightboxImage");
   const lightboxCounter = document.getElementById("lightboxCounter");
   const lightboxCaption = document.getElementById("lightboxCaption");
   
   const lightboxClose = document.getElementById("lightboxClose");
   const lightboxPrev = document.getElementById("lightboxPrev");
   const lightboxNext = document.getElementById("lightboxNext");
   
   
   /* ---------------------------------------------------------
      Gallery image information
      --------------------------------------------------------- */
   
   const galleryImages = Array.from(galleryItems).map((item) => {
   
     const image = item.querySelector("img");
   
     return {
       src: image.src,
       alt: image.alt
     };
   
   });
   
   
   let currentGalleryIndex = 0;
   
   
   /* =========================================================
      OPEN LIGHTBOX
      ========================================================= */
   
   function openLightbox(index) {
   
     currentGalleryIndex = index;
   
     updateLightbox();
   
     lightbox.classList.add("active");
   
     lightbox.setAttribute("aria-hidden", "false");
   
     document.body.style.overflow = "hidden";
   
   }
   
   
   /* =========================================================
      UPDATE LIGHTBOX
      ========================================================= */
   
   function updateLightbox() {
   
     const image = galleryImages[currentGalleryIndex];
   
     lightboxImage.src = image.src;
   
     lightboxImage.alt = image.alt;
   
     lightboxCaption.textContent = image.alt;
   
     lightboxCounter.textContent =
       `${String(currentGalleryIndex + 1).padStart(2, "0")} / ${String(galleryImages.length).padStart(2, "0")}`;
   
   }
   
   
   /* =========================================================
      CLOSE LIGHTBOX
      ========================================================= */
   
   function closeLightbox() {
   
     lightbox.classList.remove("active");
   
     lightbox.setAttribute("aria-hidden", "true");
   
     document.body.style.overflow = "";
   
   }
   
   
   /* =========================================================
      NEXT PHOTO
      ========================================================= */
   
   function nextPhoto() {
   
     currentGalleryIndex =
       (currentGalleryIndex + 1) % galleryImages.length;
   
     updateLightbox();
   
   }
   
   
   /* =========================================================
      PREVIOUS PHOTO
      ========================================================= */
   
   function previousPhoto() {
   
     currentGalleryIndex =
       (currentGalleryIndex - 1 + galleryImages.length)
       % galleryImages.length;
   
     updateLightbox();
   
   }
   
   
   /* =========================================================
      GALLERY CLICK EVENTS
      ========================================================= */
   
   galleryItems.forEach((item, index) => {
   
     item.addEventListener("click", () => {
   
       openLightbox(index);
   
     });
   
   });
   
   
   lightboxClose.addEventListener("click", closeLightbox);
   
   lightboxNext.addEventListener("click", nextPhoto);
   
   lightboxPrev.addEventListener("click", previousPhoto);
   
   
   /* =========================================================
      CLOSE WHEN CLICKING BACKGROUND
      ========================================================= */
   
   lightbox.addEventListener("click", (event) => {
   
     if (event.target === lightbox) {
   
       closeLightbox();
   
     }
   
   });
   
   
   /* =========================================================
      KEYBOARD CONTROLS
      ========================================================= */
   
   document.addEventListener("keydown", (event) => {
   
     if (!lightbox.classList.contains("active")) {
       return;
     }
   
   
     if (event.key === "Escape") {
   
       closeLightbox();
   
     }
   
   
     if (event.key === "ArrowRight") {
   
       nextPhoto();
   
     }
   
   
     if (event.key === "ArrowLeft") {
   
       previousPhoto();
   
     }
   
   });
   
   
   /* =========================================================
      MOBILE SWIPE SUPPORT
      ========================================================= */
   
   let touchStartX = 0;
   let touchEndX = 0;
   
   
   lightbox.addEventListener("touchstart", (event) => {
   
     touchStartX = event.changedTouches[0].screenX;
   
   });
   
   
   lightbox.addEventListener("touchend", (event) => {
   
     touchEndX = event.changedTouches[0].screenX;
   
     handleSwipe();
   
   });
   
   
   function handleSwipe() {
   
     const swipeDistance = touchEndX - touchStartX;
   
   
     if (Math.abs(swipeDistance) < 50) {
       return;
     }
   
   
     if (swipeDistance < 0) {
   
       nextPhoto();
   
     } else {
   
       previousPhoto();
   
     }
   
   }
   
   
   /* =========================================================
      GALLERY SCROLL REVEAL
      ========================================================= */
   
   const galleryObserver = new IntersectionObserver(
     (entries, observer) => {
   
       entries.forEach((entry) => {
   
         if (!entry.isIntersecting) {
           return;
         }
   
         entry.target.classList.add("is-visible");
   
         observer.unobserve(entry.target);
   
       });
   
     },
     {
       threshold: 0.15
     }
   );
   
   
   galleryItems.forEach((item) => {
   
     galleryObserver.observe(item);
   
   });