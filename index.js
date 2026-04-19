
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMobile() {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobile() {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', openMobile);
  mobileClose.addEventListener('click', closeMobile);
  mobileOverlay.addEventListener('click', closeMobile);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobile));

  // Scroll reveal
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // Counter animation
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          counter.textContent = current;
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        }
        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // Testimonials slider
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  const totalSlides = 3;

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  prevBtn.addEventListener('click', () => {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  });

  nextBtn.addEventListener('click', () => {
    goToSlide((currentSlide + 1) % totalSlides);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.getAttribute('data-index')));
    });
  });

  // Auto-slide
  setInterval(() => {
    goToSlide((currentSlide + 1) % totalSlides);
  }, 6000);

  // Contact form
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.form-submit');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      contactForm.style.display = 'none';
      formSuccess.classList.add('show');
    }, 1500);
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Particle animation
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(108, 99, 255, ${0.1 * (1 - distance / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(animateParticles);
  }

  animateParticles();

  // Parallax effect on hero orbs
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    
    document.querySelector('.orb-1').style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    document.querySelector('.orb-2').style.transform = `translate(${x * -15}px, ${y * -15}px)`;
    document.querySelector('.orb-3').style.transform = `translate(${x * 10}px, ${y * 10}px)`;
  });


