/**
 * Cyber Sleek Portfolio - Main Script
 * Ali Karami | Architect & Tech Creator
 * Fully static & GitHub Pages compatible (No build or compilation needed)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTelegramModal();
  initSmoothScroll();
});

// 1. Navigation Active State & Mobile Menu
function initNavigation() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      }
    });
  }
}

// 2. Telegram Ordering Modal & Message Generator
function initTelegramModal() {
  const modal = document.getElementById('telegram-order-modal');
  if (!modal) return;

  const closeBtn = document.getElementById('modal-close-btn');
  const openButtons = document.querySelectorAll('[data-open-order]');
  const serviceSelect = document.getElementById('order-service');
  const detailsInput = document.getElementById('order-details');
  const nameInput = document.getElementById('order-name');
  const sendTelegramBtn = document.getElementById('send-telegram-btn');
  const copyTextBtn = document.getElementById('copy-text-btn');
  const copyToast = document.getElementById('copy-toast');

  // Open modal
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preselectedService = btn.getAttribute('data-service') || 'web';
      if (serviceSelect) {
        serviceSelect.value = preselectedService;
      }
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Build message function
  function getFormattedMessage() {
    const serviceName = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : 'همکاری و مشاوره';
    const clientName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'همکار / کارفرما';
    const details = detailsInput && detailsInput.value.trim() ? detailsInput.value.trim() : 'توضیحات بیشتر در گفت‌وگو مطرح خواهد شد.';

    const message = 
`سلام جناب کرمی وقت بخیر،
درخواست سفارش / مشاوره جدید:
👤 نام: ${clientName}
🎯 خدمت مورد نظر: ${serviceName}
📝 خلاصه پروژه / نیازمندی:
${details}

ارسال شده از طریق وب‌سایت شخصی Ali Karami`;

    return message;
  }

  // Send to Telegram
  if (sendTelegramBtn) {
    sendTelegramBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const message = getFormattedMessage();
      const encoded = encodeURIComponent(message);
      const telegramUrl = `https://t.me/KhodeAli786?text=${encoded}`;
      window.open(telegramUrl, '_blank');
    });
  }

  // Copy text fallback
  if (copyTextBtn) {
    copyTextBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const message = getFormattedMessage();
      try {
        await navigator.clipboard.writeText(message);
        if (copyToast) {
          copyToast.classList.remove('hidden');
          setTimeout(() => {
            copyToast.classList.add('hidden');
          }, 3000);
        }
      } catch (err) {
        alert('متن پیام کپی شد.');
      }
    });
  }
}

// 3. Smooth Anchor Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
