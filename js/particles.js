document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('particles-container');
  const colors = [
    'rgba(255, 42, 109, 0.4)', // Accent 1
    'rgba(5, 217, 232, 0.4)',  // Accent 2
    'rgba(119, 0, 255, 0.4)'   // Accent 3
  ];
  
  // Create particles
  const particleCount = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 15000));
  
  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }
  
  // Create grid lines
  createGridLines();
  
  // Window resize handler
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      container.innerHTML = '';
      const particleCount = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 15000));
      
      for (let i = 0; i < particleCount; i++) {
        createParticle();
      }
      
      createGridLines();
    }, 200);
  });
  
  function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size between 2px and 10px
    const size = Math.random() * 8 + 2;
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Random movement range
    const moveX = Math.random() * 100 - 50;
    const moveY = Math.random() * 80 - 40;
    
    // Random duration between 20s and 60s
    const duration = Math.random() * 40 + 20;
    const pulseDuration = Math.random() * 3 + 2;
    
    // Random opacity between 0.2 and 0.6
    const opacity = Math.random() * 0.4 + 0.2;
    
    // Set CSS properties
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.setProperty('--move-x', moveX);
    particle.style.setProperty('--move-y', moveY);
    particle.style.setProperty('--duration', `${duration}s`);
    particle.style.setProperty('--pulse-duration', `${pulseDuration}s`);
    particle.style.setProperty('--opacity', opacity);
    
    // Add a delay to animation
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(particle);
    
    // Create "shooting star" effect occasionally
    if (Math.random() < 0.25) {
      createShootingStar();
    }
  }
  
  function createShootingStar() {
    setTimeout(() => {
      const star = document.createElement('div');
      star.classList.add('particle');
      
      const size = Math.random() * 2 + 1;
      const startX = Math.random() * 100;
      const startY = Math.random() * 30;
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${startX}%`;
      star.style.top = `${startY}%`;
      star.style.opacity = '0.8';
      star.style.boxShadow = '0 0 20px 4px rgba(5, 217, 232, 0.9), 0 0 30px 8px rgba(119, 0, 255, 0.7)';
      
      container.appendChild(star);
      
      // Animate shooting star with GSAP if available, otherwise use basic animation
      if (window.gsap) {
        gsap.to(star, {
          left: `${startX - 20 - Math.random() * 20}%`,
          top: `${startY + 50 + Math.random() * 40}%`,
          opacity: 0,
          duration: 1 + Math.random() * 2,
          ease: "power1.out",
          onComplete: () => {
            star.remove();
          }
        });
      } else {
        star.style.transition = 'all 1.5s ease-out';
        setTimeout(() => {
          star.style.left = `${startX - 20 - Math.random() * 20}%`;
          star.style.top = `${startY + 50 + Math.random() * 40}%`;
          star.style.opacity = '0';
          
          setTimeout(() => {
            star.remove();
          }, 1500);
        }, 10);
      }
      
      // Schedule next shooting star
      if (Math.random() < 0.8) {
        setTimeout(createShootingStar, Math.random() * 5000 + 2000);
      }
    }, Math.random() * 3000);
  }
  
  function createGridLines() {
    // Create horizontal grid lines
    const hLineCount = Math.floor(window.innerHeight / 100);
    for (let i = 1; i <= hLineCount; i++) {
      const line = document.createElement('div');
      line.classList.add('grid-line', 'grid-line-horizontal');
      line.style.top = `${(i * 100) / (hLineCount + 1)}%`;
      container.appendChild(line);
    }
    
    // Create vertical grid lines
    const vLineCount = Math.floor(window.innerWidth / 100);
    for (let i = 1; i <= vLineCount; i++) {
      const line = document.createElement('div');
      line.classList.add('grid-line', 'grid-line-vertical');
      line.style.left = `${(i * 100) / (vLineCount + 1)}%`;
      container.appendChild(line);
    }
  }
  
  // Start animation by creating a few initial shooting stars
  setTimeout(createShootingStar, 1000);
  setTimeout(createShootingStar, 3000);
});
