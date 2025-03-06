/**
 * Additional visual effects for the futuristic portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    createGridLines();
    createParticles();
    addMouseEffects();
  });
  
  /**
   * Creates grid lines for the futuristic background
   */
  function createGridLines() {
    const gridContainer = document.querySelector('.grid-lines');
    
    // Create horizontal grid lines
    for (let i = 0; i < 10; i++) {
      const line = document.createElement('div');
      line.classList.add('grid-line', 'grid-line-horizontal');
      line.style.top = `${10 + i * 10}%`;
      gridContainer.appendChild(line);
    }
    
    // Create vertical grid lines
    for (let i = 0; i < 10; i++) {
      const line = document.createElement('div');
      line.classList.add('grid-line', 'grid-line-vertical');
      line.style.left = `${10 + i * 10}%`;
      gridContainer.appendChild(line);
    }
  }
  
  /**
   * Creates floating particles for the background
   */
  function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const colors = [
      'rgba(255, 42, 109, 0.4)', // Pink
      'rgba(5, 217, 232, 0.4)',  // Cyan
      'rgba(119, 0, 255, 0.4)'   // Purple
    ];
    
    // Create particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random properties
      const size = Math.random() * 10 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 10;
      
      // Apply styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.left = `${left}%`;
      particle.style.top = `${top}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      
      particlesContainer.appendChild(particle);
    }
  }
  
  /**
   * Adds mouse-based interactive effects
   */
  function addMouseEffects() {
    const introCircle = document.querySelector('.intro-circle');
    const title = document.querySelector('.intro__title-pre');
    
    // Mouse move effect for the intro circle
    document.addEventListener('mousemove', (e) => {
      if (!introCircle) return;
      
      const x = e.clientX;
      const y = e.clientY;
      
      // Calculate distance from center of viewport
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Move the circle slightly based on mouse position
      const moveX = (x - centerX) * 0.02;
      const moveY = (y - centerY) * 0.02;
      
      // Apply the transform
      introCircle.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
      
      // Subtle effect on the title
      if (title) {
        title.style.textShadow = `
          ${moveX * 0.1}px ${moveY * 0.1}px 10px rgba(5, 217, 232, 0.7),
          ${moveX * -0.1}px ${moveY * -0.1}px 20px rgba(119, 0, 255, 0.5)
        `;
      }
    });
    
    // Add hover effects to content images
    const contentImages = document.querySelectorAll('.content__img');
    contentImages.forEach(img => {
      img.addEventListener('mouseenter', () => {
        img.style.boxShadow = `
          0 15px 30px rgba(0, 0, 0, 0.5),
          0 0 20px rgba(5, 217, 232, 0.4),
          0 0 40px rgba(119, 0, 255, 0.2)
        `;
      });
      
      img.addEventListener('mouseleave', () => {
        img.style.boxShadow = `
          0 10px 30px rgba(0, 0, 0, 0.5),
          0 0 20px rgba(5, 217, 232, 0.2),
          0 0 40px rgba(119, 0, 255, 0.1)
        `;
      });
    });
  }