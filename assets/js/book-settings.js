/**
 * Book Settings System for Ghost Theme
 * Handles live customization of reading experience
 */

class BookSettings {
  constructor() {
    this.settings = this.loadSettings();
    this.isOpen = false;
    this.init();
  }

  // Default settings
  getDefaultSettings() {
    return {
      fontSize: 16,
      fontFamily: 'Crimson Text',
      textColor: '#2c2c2c',
      backgroundColor: '#fefcf7',
      lineHeight: 1.6,
      darkMode: false
    };
  }

  // Load settings from localStorage
  loadSettings() {
    try {
      const saved = localStorage.getItem('bookSettings');
      if (saved) {
        return { ...this.getDefaultSettings(), ...JSON.parse(saved) };
      }
    } catch (error) {
      console.warn('Error loading settings:', error);
    }
    return this.getDefaultSettings();
  }

  // Save settings to localStorage
  saveSettings() {
    try {
      localStorage.setItem('bookSettings', JSON.stringify(this.settings));
    } catch (error) {
      console.warn('Error saving settings:', error);
    }
  }

  // Initialize the settings system
  init() {
    this.createSettingsPanel();
    this.createSettingsButton();
    this.applySettings();
    this.attachEventListeners();
  }

  // Create settings button in navigation
  createSettingsButton() {
    const nav = document.querySelector('.book-nav .nav-controls');
    if (!nav) return;

    const button = document.createElement('button');
    button.className = 'settings-button';
    button.innerHTML = '⚙️';
    button.title = 'Reading Settings';
    button.addEventListener('click', () => this.togglePanel());
    
    nav.appendChild(button);
  }

  // Create settings panel
  createSettingsPanel() {
    const panel = document.createElement('div');
    panel.className = 'settings-panel';
    panel.innerHTML = this.getSettingsPanelHTML();
    
    const overlay = document.createElement('div');
    overlay.className = 'settings-overlay';
    overlay.addEventListener('click', () => this.closePanel());
    
    document.body.appendChild(overlay);
    document.body.appendChild(panel);
    
    this.panel = panel;
    this.overlay = overlay;
  }

  // Settings panel HTML
  getSettingsPanelHTML() {
    return `
      <div class="settings-header">
        <h3 class="settings-title">Reading Settings</h3>
        <button class="close-button" onclick="bookSettings.closePanel()">×</button>
      </div>
      
      <div class="setting-group">
        <label class="setting-label">Font Size</label>
        <div class="font-size-control">
          <span>12px</span>
          <input type="range" class="size-slider" min="12" max="24" value="${this.settings.fontSize}" data-setting="fontSize">
          <span>24px</span>
        </div>
        <div style="text-align: center; margin-top: 0.5rem; color: var(--spine);">${this.settings.fontSize}px</div>
      </div>

      <div class="setting-group">
        <label class="setting-label">Font Family</label>
        <div class="font-options">
          ${this.getFontOptions()}
        </div>
      </div>

      <div class="setting-group">
        <label class="setting-label">Text Color</label>
        <div class="color-options">
          ${this.getTextColorOptions()}
        </div>
      </div>

      <div class="setting-group">
        <label class="setting-label">Background Color</label>
        <div class="color-options">
          ${this.getBackgroundColorOptions()}
        </div>
      </div>

      <div class="setting-group">
        <label class="setting-label">Line Spacing</label>
        <div class="font-size-control">
          <span>1.2x</span>
          <input type="range" class="size-slider" min="1.2" max="2.0" step="0.1" value="${this.settings.lineHeight}" data-setting="lineHeight">
          <span>2.0x</span>
        </div>
        <div style="text-align: center; margin-top: 0.5rem; color: var(--spine);">${this.settings.lineHeight}x</div>
      </div>

      <div class="setting-group">
        <label class="setting-label">Dark Mode</label>
        <div class="toggle-switch ${this.settings.darkMode ? 'active' : ''}" data-setting="darkMode"></div>
      </div>
    `;
  }

  // Font options
  getFontOptions() {
    const fonts = [
      { name: 'Crimson Text', family: 'Crimson Text' },
      { name: 'Merriweather', family: 'Merriweather' },
      { name: 'Lora', family: 'Lora' },
      { name: 'Source Serif Pro', family: 'Source Serif Pro' },
      { name: 'Playfair Display', family: 'Playfair Display' }
    ];

    return fonts.map(font => `
      <div class="font-option ${this.settings.fontFamily === font.family ? 'selected' : ''}" 
           data-font="${font.family}" 
           style="font-family: '${font.family}', serif">
        ${font.name}
      </div>
    `).join('');
  }

  // Text color options
  getTextColorOptions() {
    const colors = [
      '#2c2c2c', '#1a1a1a', '#4a4a4a', '#6b4423', '#2d4a36'
    ];

    return colors.map(color => `
      <div class="color-option ${this.settings.textColor === color ? 'selected' : ''}" 
           style="background-color: ${color}" 
           data-color="${color}"
           data-type="text"></div>
    `).join('');
  }

  // Background color options
  getBackgroundColorOptions() {
    const colors = [
      '#fefcf7', '#f5f5dc', '#fff8dc', '#f0f8ff', '#f5f5f5'
    ];

    return colors.map(color => `
      <div class="color-option ${this.settings.backgroundColor === color ? 'selected' : ''}" 
           style="background-color: ${color}" 
           data-color="${color}"
           data-type="background"></div>
    `).join('');
  }

  // Attach event listeners
  attachEventListeners() {
    document.addEventListener('click', (e) => {
      // Font size slider
      if (e.target.matches('.size-slider[data-setting="fontSize"]')) {
        this.updateSetting('fontSize', parseInt(e.target.value));
        e.target.nextElementSibling.nextElementSibling.textContent = `${e.target.value}px`;
      }

      // Line height slider
      if (e.target.matches('.size-slider[data-setting="lineHeight"]')) {
        this.updateSetting('lineHeight', parseFloat(e.target.value));
        e.target.nextElementSibling.nextElementSibling.textContent = `${e.target.value}x`;
      }

      // Font family
      if (e.target.matches('.font-option')) {
        document.querySelectorAll('.font-option').forEach(el => el.classList.remove('selected'));
        e.target.classList.add('selected');
        this.updateSetting('fontFamily', e.target.dataset.font);
      }

      // Color options
      if (e.target.matches('.color-option')) {
        const type = e.target.dataset.type;
        document.querySelectorAll(`.color-option[data-type="${type}"]`).forEach(el => el.classList.remove('selected'));
        e.target.classList.add('selected');
        
        if (type === 'text') {
          this.updateSetting('textColor', e.target.dataset.color);
        } else if (type === 'background') {
          this.updateSetting('backgroundColor', e.target.dataset.color);
        }
      }

      // Dark mode toggle
      if (e.target.matches('.toggle-switch[data-setting="darkMode"]')) {
        const isActive = e.target.classList.contains('active');
        e.target.classList.toggle('active', !isActive);
        this.updateSetting('darkMode', !isActive);
      }
    });

    // Slider input events for real-time updates
    document.addEventListener('input', (e) => {
      if (e.target.matches('.size-slider[data-setting="fontSize"]')) {
        this.updateSetting('fontSize', parseInt(e.target.value));
        const display = e.target.parentNode.nextElementSibling;
        if (display) display.textContent = `${e.target.value}px`;
      }

      if (e.target.matches('.size-slider[data-setting="lineHeight"]')) {
        this.updateSetting('lineHeight', parseFloat(e.target.value));
        const display = e.target.parentNode.nextElementSibling;
        if (display) display.textContent = `${e.target.value}x`;
      }
    });
  }

  // Update a setting
  updateSetting(key, value) {
    this.settings[key] = value;
    this.applySettings();
    this.saveSettings();
  }

  // Apply settings to CSS
  applySettings() {
    const root = document.documentElement;
    
    root.style.setProperty('--book-font-size', `${this.settings.fontSize}px`);
    root.style.setProperty('--book-font-family', `"${this.settings.fontFamily}", serif`);
    root.style.setProperty('--book-text-color', this.settings.textColor);
    root.style.setProperty('--book-bg-color', this.settings.backgroundColor);
    root.style.setProperty('--book-line-height', this.settings.lineHeight);
    
    // Dark mode
    if (this.settings.darkMode) {
      document.body.classList.add('dark-theme');
      root.style.setProperty('--book-bg-color', '#2a2a2a');
      root.style.setProperty('--book-text-color', '#e5e5e5');
    } else {
      document.body.classList.remove('dark-theme');
      root.style.setProperty('--book-bg-color', this.settings.backgroundColor);
      root.style.setProperty('--book-text-color', this.settings.textColor);
    }
  }

  // Toggle settings panel
  togglePanel() {
    if (this.isOpen) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }

  // Open settings panel
  openPanel() {
    this.panel.classList.add('open');
    this.overlay.classList.add('show');
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  // Close settings panel
  closePanel() {
    this.panel.classList.remove('open');
    this.overlay.classList.remove('show');
    this.isOpen = false;
    document.body.style.overflow = '';
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.bookSettings = new BookSettings();
});