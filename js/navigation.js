/**
 * Navigation functionality for the portfolio site
 */

// DOM elements
const nav = document.querySelector('.main-nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

// Last scroll position to determine scroll direction
let lastScrollTop = 0;

// Toggle mobile menu
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('active');
    
    // Remove active class from all links
    navItems.forEach(link => link.classList.remove('active'));
    
    // Add active class to clicked link
    item.classList.add('active');
  });
});

// Hide/show navigation on scroll
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Hide nav when scrolling down, show when scrolling up
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    nav.classList.add('hidden');
  } else {
    // Scrolling up
    nav.classList.remove('hidden');
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  
  // Highlight nav items based on scroll position
  highlightNavOnScroll();
});

// Highlight navigation items based on scroll position
function highlightNavOnScroll() {
  const scrollPosition = window.scrollY;
  
  // Get all sections that should trigger navigation changes
  const sections = [
    document.querySelector('.intro'),
    ...document.querySelectorAll('.content')
  ];
  
  // Find the current section
  sections.forEach((section, index) => {
    if (!section) return;
    
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Remove active class from all nav items
      navItems.forEach(item => item.classList.remove('active'));
      
      // Add active class to corresponding nav item
      // This is a simplified version - in a real site you'd match sections to nav items
      if (index === 0) {
        navItems[0].classList.add('active'); // Home
      } else if (index >= 1 && index <= 3) {
        navItems[1].classList.add('active'); // Portfolio
      } else if (index >= 4 && index <= 5) {
        navItems[2].classList.add('active'); // About
      } else {
        navItems[3].classList.add('active'); // Services
      }
    }
  });
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
  // Set initial active state
  highlightNavOnScroll();
  
  // Add smooth scroll behavior for navigation links
  navItems.forEach(link => {
    link.addEventListener('click', (e) => {
      // This is where you would add smooth scrolling to sections
      // For now, we're just preventing default behavior for demo purposes
      if (link.getAttribute('href') === '#') {
        e.preventDefault();
      }
    });
  });
});

// Add a subtle parallax effect to the navigation
window.addEventListener('mousemove', (e) => {
  const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
  const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
  
  document.querySelector('.nav-logo').style.transform = `translate(${moveX}px, ${moveY}px)`;
});