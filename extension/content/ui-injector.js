import { getLastUsedTone, setLastUsedTone } from '../utils/storage.js';
import { rewriteText } from '../utils/api-client.js';
import { getInputText, setInputText } from './selectors.js';

const TONES = [
  { id: 'professional', label: 'Professional', icon: '💼', color: '#2563eb' },
  { id: 'friendly', label: 'Friendly', icon: '😊', color: '#10b981' },
  { id: 'casual', label: 'Casual', icon: '😎', color: '#f59e0b' },
  { id: 'comedy', label: 'Comedy', icon: '😂', color: '#ec4899' },
  { id: 'polite', label: 'Polite', icon: '🙏', color: '#8b5cf6' },
  { id: 'confident', label: 'Confident', icon: '💪', color: '#ef4444' }
];

export class FloatingPanel {
  constructor(inputElement) {
    this.inputElement = inputElement;
    this.panel = null;
    this.isVisible = false;
    this.isProcessing = false;
  }

  create() {
    if (this.panel) return;

    this.panel = document.createElement('div');
    this.panel.id = 'proseai-panel';
    this.panel.className = 'proseai-floating-panel';
    
    this.panel.innerHTML = `
      <div class="proseai-header">
        <span class="proseai-logo">✨ ProseAI</span>
        <button class="proseai-close" title="Close">×</button>
      </div>
      <div class="proseai-content">
        <div class="proseai-tones">
          ${TONES.map(tone => `
            <button 
              class="proseai-tone-btn" 
              data-tone="${tone.id}"
              style="--tone-color: ${tone.color}"
              title="${tone.label}"
            >
              <span class="tone-icon">${tone.icon}</span>
              <span class="tone-label">${tone.label}</span>
            </button>
          `).join('')}
        </div>
        <div class="proseai-status"></div>
      </div>
    `;

    document.body.appendChild(this.panel);
    this.attachEventListeners();
  }

  attachEventListeners() {
    const closeBtn = this.panel.querySelector('.proseai-close');
    closeBtn.addEventListener('click', () => this.hide());

    const toneButtons = this.panel.querySelectorAll('.proseai-tone-btn');
    toneButtons.forEach(btn => {
      btn.addEventListener('click', () => this.handleToneClick(btn.dataset.tone));
    });

    document.addEventListener('click', (e) => {
      if (this.isVisible && !this.panel.contains(e.target) && e.target !== this.inputElement) {
        this.hide();
      }
    });
  }

  async handleToneClick(tone) {
    if (this.isProcessing) return;

    const originalText = getInputText(this.inputElement);
    
    if (!originalText || originalText.trim().length === 0) {
      this.showStatus('Please enter some text first', 'error');
      return;
    }

    this.isProcessing = true;
    this.showStatus('Rewriting...', 'loading');

    try {
      const result = await rewriteText(originalText, tone);

      if (result.success) {
        // Set the text once correctly
        setInputText(this.inputElement, result.rewrittenText);
        
        this.showStatus('✓ Text rewritten!', 'success');
        await setLastUsedTone(tone);
        
        setTimeout(() => this.hide(), 1500);
      } else {
        this.showStatus(result.error || 'Failed to rewrite', 'error');
      }
    } catch (error) {
      console.error('Rewrite error:', error);
      this.showStatus('Something went wrong', 'error');
    } finally {
      this.isProcessing = false;
      setTimeout(() => this.clearStatus(), 3000);
    }
  }

  showStatus(message, type = 'info') {
    const statusEl = this.panel.querySelector('.proseai-status');
    statusEl.textContent = message;
    statusEl.className = `proseai-status proseai-status-${type}`;
  }

  clearStatus() {
    const statusEl = this.panel.querySelector('.proseai-status');
    statusEl.textContent = '';
    statusEl.className = 'proseai-status';
  }

  show() {
    if (!this.panel) this.create();
    
    this.position();
    this.panel.classList.add('proseai-visible');
    this.isVisible = true;
  }

  hide() {
    if (!this.panel) return;
    
    this.panel.classList.remove('proseai-visible');
    this.isVisible = false;
  }

  position() {
    if (!this.inputElement || !this.panel) return;

    const inputRect = this.inputElement.getBoundingClientRect();
    const panelHeight = 280;
    const panelWidth = 360;
    
    let top = inputRect.bottom + window.scrollY + 10;
    let left = inputRect.left + window.scrollX;

    if (top + panelHeight > window.innerHeight + window.scrollY) {
      top = inputRect.top + window.scrollY - panelHeight - 10;
    }

    if (left + panelWidth > window.innerWidth) {
      left = window.innerWidth - panelWidth - 20;
    }

    this.panel.style.top = `${top}px`;
    this.panel.style.left = `${left}px`;
  }

  destroy() {
    if (this.panel) {
      this.panel.remove();
      this.panel = null;
    }
    this.isVisible = false;
  }
}
