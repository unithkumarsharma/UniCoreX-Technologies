// ============================================
// UniCoreX Technologies — AI Chat Widget
// ============================================

export function initChatbot() {
  const toggle = document.querySelector('.chat-toggle');
  const chatWindow = document.querySelector('.chat-window');
  const closeBtn = document.querySelector('.chat-close');
  const input = document.querySelector('.chat-input-area input');
  const sendBtn = document.querySelector('.chat-input-area button');
  const messagesContainer = document.querySelector('.chat-messages');

  if (!toggle || !chatWindow) return;

  const responses = {
    'hi': 'Hello! Welcome to UniCoreX Technologies. How can I help you today?',
    'hello': 'Hi there! 👋 How can I assist you today?',
    'services': 'We offer: Custom Software Development, Web & Mobile Apps, AI/ML Solutions, SaaS Products, Cloud Solutions, and UI/UX Design. Which interests you?',
    'pricing': 'Our projects typically range from ₹5L to ₹50L depending on scope and complexity. Want a detailed estimate? Try our Project Cost Calculator or schedule a free consultation!',
    'cost': 'Project costs vary by type: Websites (₹50K–₹3L), Mobile Apps (₹2L–₹15L), SaaS Platforms (₹5L–₹30L), AI Solutions (₹1L–₹8L). Use our calculator for a personalized estimate!',
    'contact': 'You can reach us via email at hello@unicorex.tech, WhatsApp, or fill out our contact form. We typically respond within 2 hours!',
    'timeline': 'Typical timelines: Websites (2-6 weeks), Mobile Apps (6-16 weeks), SaaS Platforms (3-6 months), AI Solutions (4-12 weeks). Schedule a consultation for an accurate estimate.',
    'technology': 'We work with React, Next.js, Node.js, Python, Flutter, AWS, Docker, Kubernetes, and more. We choose the best tech stack for your specific needs.',
    'portfolio': 'Check out our Portfolio section to see our recent work across web, mobile, SaaS, and AI projects!',
    'default': 'Thanks for your message! For detailed inquiries, please schedule a free consultation or email us at hello@unicorex.tech. Our team will get back to you within 2 hours.'
  };

  // Toggle chat window
  toggle.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
      input?.focus();
    }
  });

  closeBtn?.addEventListener('click', () => {
    chatWindow.classList.remove('active');
  });

  function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${type}`;
    msg.textContent = text;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    typing.id = 'typing-indicator';
    messagesContainer.appendChild(typing);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function removeTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
  }

  function getResponse(message) {
    const lower = message.toLowerCase().trim();
    
    for (const [key, value] of Object.entries(responses)) {
      if (key !== 'default' && lower.includes(key)) {
        return value;
      }
    }
    
    return responses.default;
  }

  function handleSend() {
    const message = input?.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    input.value = '';

    // Show typing indicator
    showTyping();

    // Simulate response delay
    setTimeout(() => {
      removeTyping();
      const response = getResponse(message);
      addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000);
  }

  sendBtn?.addEventListener('click', handleSend);

  input?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  });
}
