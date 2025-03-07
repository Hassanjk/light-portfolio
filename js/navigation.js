document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Improved easing function
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2
  });

  // Get all navigation links
  const navLinks = document.querySelectorAll('.nav-links a');
  
  // Function to update active link based on scroll position
  function updateActiveLink() {
      const scrollPosition = window.scrollY + 100;
      
      // Check each section's position
      document.querySelectorAll('div[id]').forEach(section => {
          const sectionId = section.getAttribute('id');
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              // Remove active class from all links
              navLinks.forEach(link => link.classList.remove('active'));
              
              // Add active class to current section's link
              const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
              if (activeLink) {
                  activeLink.classList.add('active');
              }
          }
      });
  }
  
  // Add click event listener to each navigation link
  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Remove active class from all links
          navLinks.forEach(link => link.classList.remove('active'));
          
          // Add active class to clicked link
          e.target.classList.add('active');
          
          // Get the target section id
          const targetId = e.target.getAttribute('href');
          
          // Scroll to the target section
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
              lenis.scrollTo(targetSection, {
                  offset: 0,
                  immediate: false,
                  duration: 1.2
              });
          }
      });
  });

  // Function to integrate Lenis with GSAP's ScrollTrigger
  function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
  }
  
  // Set up the animation loop
  requestAnimationFrame(raf);
  
  // Update active link on scroll
  window.addEventListener('scroll', updateActiveLink);
  
  // Initial call to set the active link
  updateActiveLink();

  // Handle form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          // Here you would typically handle the form submission
          // For now, we'll just log the form data
          const formData = new FormData(contactForm);
          console.log('Form submitted:', Object.fromEntries(formData));
          // You would typically send this data to a server
      });
  }
});