
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.querySelector('.nav-menu');
const mobileSignupBtn = document.querySelector('.btn-mobile-signup');
const desktopSignupBtn = document.querySelector('.btn-signup');
const heroSignupBtn = document.querySelector('.btn-hero');
const biddingBtn = document.querySelector('.btn-bidding');
const discoverBtn = document.querySelector('.btn-discover');
const newsletterForm = document.querySelector('.newsletter-form');
const eventArrows = document.querySelectorAll('.event-card .card-arrow');
const newsArrows = document.querySelectorAll('.news-card .card-arrow');
const allSignupButtons = [desktopSignupBtn, mobileSignupBtn, heroSignupBtn];
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu a");





function toggleMobileMenu() {
    if (!navMenu || !mobileMenuBtn) return;
    
    navMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    
   
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; 
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto'; 
    }
}


function closeMobileMenu() {
    if (!navMenu || !mobileMenuBtn) return;
    
    navMenu.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    document.body.style.overflow = 'auto';
}


function handleSignup(event) {
    if (event) event.preventDefault();
    
    
    const name = prompt("Enter your name for signup:");
    if (!name) return;
    
    const email = prompt("Enter your email:");
    if (!email) return;
    
   
    setTimeout(() => {
        alert(`Thank you, ${name}! You've successfully signed up. We'll contact you at ${email} with more details.`);
        
     
    }, 500);
}


function handleArrowClick(event) {
    if (!event.currentTarget) return;
    
    const arrow = event.currentTarget.querySelector('.arrow');
    if (!arrow) return;
    
    
    arrow.style.transform = 'rotate(-45deg) translateX(6px)';
    arrow.style.transition = 'transform 0.2s ease';
    
    setTimeout(() => {
        arrow.style.transform = 'rotate(-45deg)';
    }, 200);
    
   
    const card = event.currentTarget.closest('.event-card') || 
                 event.currentTarget.closest('.news-card');
    
    if (card) {
       
        card.style.transform = 'translateY(-3px)';
        card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
        card.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
        }, 300);
       
        console.log(`Navigating to ${card.querySelector('h3')?.textContent || 'item'} details`);
        
     
        const title = card.querySelector('h3')?.textContent || 'this item';
        alert(`This would navigate to the details page for: ${title}`);
    }
}


function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
   
    if (!email) {
        alert('Please enter your email address.');
        emailInput.focus();
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return;
    }
    
   
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
       
        console.log(`Subscribed email: ${email}`);
        
       
        alert('Thank you for subscribing to our newsletter!');
        
        
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1000);
}


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
          
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                
                if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
                
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}


function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}


function initHoverEffects() {
    
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
        });
    });
    
    
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-3px)';
            card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
    
    
    const arrowButtons = document.querySelectorAll('.btn-hero, .btn-bidding, .btn-discover, .btn-signup, .btn-mobile-signup');
    arrowButtons.forEach(button => {
        const arrow = button.querySelector('.arrow') || button.querySelector('.btn-arrow');
        if (!arrow) return;
        
        button.addEventListener('mouseenter', () => {
            arrow.style.transform = 'rotate(-45deg) translateX(4px)';
        });
        
        button.addEventListener('mouseleave', () => {
            arrow.style.transform = 'rotate(-45deg)';
        });
    });
}


function handleResize() {
  
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('Baltimore Therapeutic Treatment Center Project - Initializing...');
   
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    
    document.addEventListener('click', function(event) {
        const isClickInsideNavbar = event.target.closest('.navbar');
        const isMobileMenuButton = event.target.closest('#mobileMenuBtn');
        
        if (!isClickInsideNavbar && !isMobileMenuButton && 
            navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
   
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
    
  
    allSignupButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', handleSignup);
        }
    });
    
   
    eventArrows.forEach(arrow => {
        arrow.addEventListener('click', handleArrowClick);
    });
    
    newsArrows.forEach(arrow => {
        arrow.addEventListener('click', handleArrowClick);
    });
    
    
    if (biddingBtn) {
        biddingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This would navigate to the Bidding Opportunities page.');
        });
    }
    
    if (discoverBtn) {
        discoverBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This would navigate to the News/Discover page.');
        });
    }
    
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    
    initSmoothScroll();
    initScrollSpy();
    initHoverEffects();
    
    window.addEventListener('resize', handleResize);
    
   
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('Website initialization complete.');
});

document.addEventListener('keydown', function(event) {
   
    if (event.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
    
  
    if (event.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('using-keyboard');
});


const keyboardNavigationStyles = `
    .using-keyboard :focus {
        outline: 2px solid var(--accent-color) !important;
        outline-offset: 2px !important;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = keyboardNavigationStyles;
document.head.appendChild(styleSheet);

function trackEvent(eventName, eventData = {}) {
    console.log(`Tracking event: ${eventName}`, eventData);
    
    
   
    const events = {
        'page_view': 'Page viewed',
        'signup_click': 'Signup button clicked',
        'newsletter_subscribe': 'Newsletter subscription',
        'event_click': 'Event card clicked',
        'news_click': 'News article clicked'
    };
}

window.addEventListener('load', () => {
    trackEvent('page_view', {
        page_title: document.title,
        page_url: window.location.href,
        timestamp: new Date().toISOString()
    });
});