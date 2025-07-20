document.addEventListener('DOMContentLoaded', function() {
  darkMode();
  menuToggle();
  carousel();
  intersectionIndicator();
});

// Function to toggle dark mode
function darkMode() {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC (Flash of Unstyled Content)
  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" || // Check if the theme is set to dark in localStorage
      (!("theme" in localStorage) && // If no theme is set in localStorage
       window.matchMedia("(prefers-color-scheme: dark)").matches) // Check if the user prefers dark mode
  );

  if (localStorage.theme === "light") {
      // Whenever the user explicitly chooses dark mode
      localStorage.theme = "dark"; // Set theme to dark in localStorage
      document.documentElement.classList.add("dark"); // Add dark class to the document
  } else {
      // Whenever the user explicitly chooses light mode
      localStorage.theme = "light"; // Set theme to light in localStorage
      document.documentElement.classList.remove("dark"); // Remove dark class from the document
  }
}

// Scroll Top functionality
window.onscroll = () => {
  scrollTopIndicator(); // Call the scroll indicator function on scroll
};

// Function to show/hide the scroll top indicator
function scrollTopIndicator() {
  const scrollIndicator = document.getElementById("scrollIndicator");

  // Check if the user has scrolled more than 100 pixels
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollIndicator.classList.remove("hidden"); // Show the scroll indicator
  } else {
    scrollIndicator.classList.add("hidden"); // Hide the scroll indicator
  }
}

// Function to scroll to the top of the page smoothly
function scrollUp() {
  window.scrollTo({
      top: 0, // Scroll to the top
      behavior: 'smooth' // Smooth scrolling effect
  });
}

// Menu toggle function
function menuToggle() {
  // JavaScript for Mobile Menu Toggle with Outside Click Handler
  const menuButton = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');

  // Toggle menu when button is clicked
  menuButton.onclick = (e) => {
    e.stopPropagation(); // Prevent the click for reaching the document
    menu.classList.toggle('hidden');
    // Toggle the menu Icon with close icon
    if(menu.classList.contains('hidden')) {
      // Menu Icon
       menuButton.innerHTML = ` <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>`;
    } else { 
      // Close Icon
      menuButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>`;
    }
  }

  // Close menu when clicking outside of it
  document.onclick = (e) => {
    // Check if the menu is open and click it outside the menu
    if(!menu.classList.contains('hidden') && !e.target !== menu && !menu.contains(e.target)) {
      menu.classList.add('hidden');
      // Menu Icon
      menuButton.innerHTML = ` <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>`;
    }
  }
}

// Carousel function
function carousel() {
  // Carousel
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach((carousel) => {
      const slides = carousel.querySelectorAll('.mySlides');
      const prevBtn = carousel.querySelector('.carousel-prev');
      const nextBtn = carousel.querySelector('.carousel-next');
      const dots = carousel.querySelectorAll('.dot');
      let slideIndex = 0;

      function showSlides(n) {
          // Wrap around if out of bounds
          if (n >= slides.length) slideIndex = 0;
          if (n < 0) slideIndex = slides.length - 1;

          // Hide/Clear all slides by default
          slides.forEach(slide => {
            slide.classList.add('hidden');
          });

          // Hide/Clear all dots by default
          dots.forEach(dot => {
             dot.classList.replace('bg-indigo-800', 'bg-indigo-500');
             dot.classList.replace('dark:bg-indigo-500', 'dark:bg-indigo-800');
          })

          // Show current slide and highlight dot
          slides[slideIndex].classList.remove('hidden');
          dots[slideIndex].classList.replace('bg-indigo-500', 'bg-indigo-800');
          dots[slideIndex].classList.replace('dark:bg-indigo-800', 'dark:bg-indigo-500');
      }

      function plusSlides(n) {
          showSlides(slideIndex += n);
      }

      function currentSlide(n) {
          showSlides(slideIndex = n);
      }

      // Event listeners for buttons
      if (prevBtn) prevBtn.addEventListener('click', () => plusSlides(-1));
      if (nextBtn) nextBtn.addEventListener('click', () => plusSlides(1));

      // Event listeners for dots
      dots.forEach((dot, index) => {
          dot.addEventListener('click', () => currentSlide(index));
      });

      // Initialize
      showSlides(slideIndex);
  });
}

// Intersection Indicator function 
function intersectionIndicator() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section');
  
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // Get the id of the visible section
              const id = entry.target.getAttribute('id');
              
              // Remove active class from all nav items
              navItems.forEach(item => {
                  item.classList.remove('active');
              });
              
              // Add active class to corresponding nav item
              document.querySelector(`.nav-item[href="#${id}"]`).classList.add('active');

              if (id == 'skills') {
                  skillsAnimation();
              }
          }
      });
  }, { threshold: 0.25 }); // Trigger when 50% of section is visible
      
  // Observe each section
  sections.forEach(section => {
      observer.observe(section);
  });
      
  // Smooth scrolling for nav clicks
  navItems.forEach(item => {
      item.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = item.getAttribute('href');
          document.querySelector(targetId).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
}

// Skills animation
function skillsAnimation(){
  const names = document.querySelectorAll('.name');
  const percents = document.querySelectorAll('.percent');
  const levels = document.querySelectorAll('.level');
  const progresses = document.querySelectorAll('.progress');
  const skills = [
      { name: "HTML", percent: 75, level: "Intermediate" },
      { name: "CSS", percent: 75, level: "Intermediate" },
      { name: "Bootstrap", percent: 75, level: "Intermediate" },
      { name: "Tailwind", percent: 30, level: "Beginner" },
      { name: "JavaScript", percent: 35, level: "Beginner" },
      { name: "PHP", percent: 75, level: "Intermediate" },
      { name: "MySQL", percent: 75, level: "Intermediate" },
      { name: "Laravel", percent: 75, level: "Intermediate" },
      { name: "&nbsp;Laravel Filament", percent: 75, level: "Intermediate" },
      { name: "Java", percent: 30, level: "Intermediate" },
      { name: "React Native", percent: 30, level: "Beginner" },
      { name: "&nbsp;GitHub", percent: 30, level: "Intermediate" }
  ];

  skills.forEach((_, i) => {
      percents[i].textContent = '0%';
      levels[i].textContent = '';
      progresses[i].style.transition = 'none';
      progresses[i].style.width = '0%';
      // Force layout recalculation
      progresses[i].getBoundingClientRect();
  });

  // Start animations after reset completes
  setTimeout(() => {
      skills.forEach((skill, i) => {
          names[i].innerHTML = skill.name;
          levels[i].textContent = skill.level;
          
          // Enable smooth transition
          progresses[i].style.transition = 'width 1.5s ease-out';
          
          // Animate both simultaneously
          const startTime = performance.now();
          const duration = 1500;
          
          const animate = (timestamp) => {
              const elapsed = timestamp - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const currentValue = Math.floor(skill.percent * progress);
              
              percents[i].textContent = `${currentValue}%`;
              progresses[i].style.width = `${currentValue}%`;
              
              if (progress < 1) {
                  requestAnimationFrame(animate);
              }
          };
          
          requestAnimationFrame(animate);
      });
  }, 50);
} 