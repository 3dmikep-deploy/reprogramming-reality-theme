/**
 * Book Pagination System for Ghost Theme
 * Creates authentic two-page book reading experience with live settings integration
 */

class BookPagination {
  constructor() {
    this.currentPage = 0;
    this.pages = [];
    this.chapterData = [];
    this.isInitialized = false;
    this.isMobile = window.innerWidth <= 768;
    
    this.init();
  }

  init() {
    this.loadChapterContent();
    this.createBookStructure();
    this.setupEventListeners();
    this.setupKeyboardNavigation();
    this.setupTouchGestures();
    this.updateDisplay();
    
    this.isInitialized = true;
    
    // Load saved page position
    const savedPage = localStorage.getItem('bookCurrentPage');
    if (savedPage) {
      this.currentPage = parseInt(savedPage) || 0;
      this.updateDisplay();
    }
  }

  // Load chapter content from Ghost post
  loadChapterContent() {
    const postContent = document.querySelector('.post-content, .kg-card-markdown, .post-full-content');
    if (!postContent) return;

    const content = postContent.textContent || postContent.innerText || '';
    const title = document.querySelector('.post-title, h1')?.textContent || 'Chapter';
    
    // Calculate pages based on content length and settings
    this.chapterData = [{
      title: title,
      content: content,
      number: 1
    }];
    
    this.generatePages();
  }

  // Generate pages from content
  generatePages() {
    this.pages = [];
    
    if (!this.chapterData.length) return;
    
    const chapter = this.chapterData[0];
    const words = chapter.content.split(/\s+/);
    const wordsPerPage = this.isMobile ? 350 : 280; // Adjust for page size
    
    // Title page
    this.pages.push({
      type: 'title',
      title: chapter.title,
      content: '',
      pageNumber: 1,
      chapterNumber: chapter.number
    });

    // Content pages
    for (let i = 0; i < words.length; i += wordsPerPage) {
      const pageWords = words.slice(i, i + wordsPerPage);
      const pageContent = pageWords.join(' ');
      
      this.pages.push({
        type: 'content',
        title: chapter.title,
        content: pageContent,
        pageNumber: this.pages.length + 1,
        chapterNumber: chapter.number
      });
    }

    // Ensure even number of pages for two-page spread
    if (this.pages.length % 2 !== 0) {
      this.pages.push({
        type: 'blank',
        title: '',
        content: '',
        pageNumber: this.pages.length + 1,
        chapterNumber: chapter.number
      });
    }
  }

  // Create book HTML structure
  createBookStructure() {
    const container = document.querySelector('.post-content, .kg-card-markdown, .post-full-content');
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';
    
    // Create book container
    const bookContainer = document.createElement('div');
    bookContainer.className = 'book-container';
    
    // Add navigation
    bookContainer.appendChild(this.createNavigation());
    
    // Add book spine
    bookContainer.appendChild(this.createSpine());
    
    // Add book pages container
    const pagesContainer = document.createElement('div');
    pagesContainer.id = 'book-pages';
    bookContainer.appendChild(pagesContainer);
    
    // Add navigation controls
    bookContainer.appendChild(this.createControls());
    
    // Add reading progress
    bookContainer.appendChild(this.createProgressBar());
    
    container.appendChild(bookContainer);
  }

  // Create navigation bar
  createNavigation() {
    const nav = document.createElement('nav');
    nav.className = 'book-nav';
    nav.innerHTML = `
      <div class="nav-content">
        <div class="nav-title">Reprogramming Reality</div>
        <div class="nav-controls">
          <button class="nav-button" onclick="bookPagination.toggleContents()">Contents</button>
          <button class="nav-button" onclick="bookPagination.bookmark()">📖 Bookmark</button>
        </div>
      </div>
    `;
    return nav;
  }

  // Create book spine
  createSpine() {
    const spine = document.createElement('div');
    spine.className = 'book-spine';
    spine.textContent = 'Reprogramming Reality • Chapter 1';
    return spine;
  }

  // Create navigation controls
  createControls() {
    const controls = document.createElement('div');
    controls.className = 'book-controls';
    controls.innerHTML = `
      <button class="control-button" onclick="bookPagination.previousChapter()" title="Previous Chapter">⏮</button>
      <button class="control-button" onclick="bookPagination.previousPage()" title="Previous Page">◀</button>
      <button class="control-button" onclick="bookPagination.nextPage()" title="Next Page">▶</button>
      <button class="control-button" onclick="bookPagination.nextChapter()" title="Next Chapter">⏭</button>
    `;
    return controls;
  }

  // Create reading progress bar
  createProgressBar() {
    const progress = document.createElement('div');
    progress.className = 'reading-progress';
    progress.style.width = '0%';
    return progress;
  }

  // Update display based on current page
  updateDisplay() {
    const container = document.getElementById('book-pages');
    if (!container) return;

    // Save current page position
    localStorage.setItem('bookCurrentPage', this.currentPage.toString());

    if (this.isMobile) {
      this.renderMobilePage(container);
    } else {
      this.renderTwoPageSpread(container);
    }
    
    this.updateProgress();
    this.updateControls();
  }

  // Render mobile single page
  renderMobilePage(container) {
    const page = this.pages[this.currentPage];
    if (!page) return;

    container.innerHTML = `
      <div class="single-page-mobile">
        <div class="mobile-page">
          ${this.renderPageContent(page)}
        </div>
      </div>
    `;
  }

  // Render desktop two-page spread
  renderTwoPageSpread(container) {
    const leftPage = this.pages[this.currentPage];
    const rightPage = this.pages[this.currentPage + 1];

    container.innerHTML = `
      <div class="two-page-spread">
        <div class="book-page left" onclick="bookPagination.previousPage()">
          <div class="book-page-content">
            ${leftPage ? this.renderPageContent(leftPage) : ''}
          </div>
        </div>
        <div class="book-page right" onclick="bookPagination.nextPage()">
          <div class="book-page-content">
            ${rightPage ? this.renderPageContent(rightPage) : ''}
          </div>
        </div>
      </div>
    `;
  }

  // Render individual page content
  renderPageContent(page) {
    if (!page) return '';

    if (page.type === 'title') {
      return `
        <div class="chapter-header">
          <div class="chapter-ornament"></div>
          <h2 class="chapter-title">${page.title}</h2>
        </div>
      `;
    }

    if (page.type === 'content') {
      return `
        <div class="page-text">
          ${this.formatText(page.content)}
        </div>
        <div class="page-number">${page.pageNumber}</div>
      `;
    }

    return '';
  }

  // Format text content
  formatText(text) {
    if (!text) return '';
    
    // Split into paragraphs and format
    const paragraphs = text.split(/\n\s*\n/);
    return paragraphs
      .map(p => p.trim())
      .filter(p => p.length > 0)
      .map(p => `<p>${p}</p>`)
      .join('');
  }

  // Navigation methods
  nextPage() {
    if (this.isMobile) {
      if (this.currentPage < this.pages.length - 1) {
        this.currentPage++;
        this.updateDisplay();
      }
    } else {
      if (this.currentPage < this.pages.length - 2) {
        this.currentPage += 2;
        this.updateDisplay();
      }
    }
  }

  previousPage() {
    if (this.isMobile) {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.updateDisplay();
      }
    } else {
      if (this.currentPage > 0) {
        this.currentPage = Math.max(0, this.currentPage - 2);
        this.updateDisplay();
      }
    }
  }

  nextChapter() {
    // For single chapter, go to end
    this.currentPage = this.pages.length - (this.isMobile ? 1 : 2);
    this.updateDisplay();
  }

  previousChapter() {
    // For single chapter, go to beginning
    this.currentPage = 0;
    this.updateDisplay();
  }

  // Update reading progress
  updateProgress() {
    const progress = document.querySelector('.reading-progress');
    if (!progress) return;

    const totalPages = this.pages.length;
    const currentProgress = totalPages > 0 ? ((this.currentPage + 1) / totalPages) * 100 : 0;
    progress.style.width = `${Math.min(100, currentProgress)}%`;
  }

  // Update control button states
  updateControls() {
    const prevBtn = document.querySelector('.control-button[title="Previous Page"]');
    const nextBtn = document.querySelector('.control-button[title="Next Page"]');
    
    if (prevBtn) {
      prevBtn.disabled = this.currentPage <= 0;
    }
    
    if (nextBtn) {
      const maxPage = this.isMobile ? this.pages.length - 1 : this.pages.length - 2;
      nextBtn.disabled = this.currentPage >= maxPage;
    }
  }

  // Setup event listeners
  setupEventListeners() {
    // Resize handler
    window.addEventListener('resize', () => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth <= 768;
      
      if (wasMobile !== this.isMobile) {
        // Adjust current page for layout change
        if (this.isMobile && this.currentPage % 2 === 1) {
          this.currentPage--;
        }
        this.generatePages();
        this.updateDisplay();
      }
    });
  }

  // Setup keyboard navigation
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          this.previousPage();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': // Spacebar
          e.preventDefault();
          this.nextPage();
          break;
        case 'Home':
          e.preventDefault();
          this.currentPage = 0;
          this.updateDisplay();
          break;
        case 'End':
          e.preventDefault();
          this.currentPage = this.pages.length - (this.isMobile ? 1 : 2);
          this.updateDisplay();
          break;
      }
    });
  }

  // Setup touch gestures for mobile
  setupTouchGestures() {
    if (!this.isMobile) return;

    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;

      // Only handle horizontal swipes
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          this.previousPage();
        } else {
          this.nextPage();
        }
      }
    });
  }

  // Utility methods
  bookmark() {
    localStorage.setItem('bookBookmark', this.currentPage.toString());
    alert('Page bookmarked!');
  }

  toggleContents() {
    // Simple contents modal
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.8); z-index: 1000;
      display: flex; align-items: center; justify-content: center;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
      background: white; padding: 2rem; border-radius: 0.5rem;
      max-width: 500px; margin: 2rem;
    `;
    
    content.innerHTML = `
      <h3>Table of Contents</h3>
      <div style="margin: 1rem 0;">
        <button onclick="bookPagination.goToPage(0); document.body.removeChild(this.closest('.modal'))">
          Chapter 1: ${this.chapterData[0]?.title || 'Untitled'}
        </button>
      </div>
      <button onclick="document.body.removeChild(this.closest('.modal'))" style="float: right;">Close</button>
    `;
    
    modal.className = 'modal';
    modal.appendChild(content);
    document.body.appendChild(modal);
  }

  goToPage(pageNumber) {
    this.currentPage = Math.max(0, Math.min(pageNumber, this.pages.length - 1));
    this.updateDisplay();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize on post pages
  if (document.body.classList.contains('post-template')) {
    window.bookPagination = new BookPagination();
  }
});