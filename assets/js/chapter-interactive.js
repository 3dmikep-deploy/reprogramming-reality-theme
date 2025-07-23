// Chapter Interactive Functionality with Book Pagination
// Save as: assets/js/chapter-interactive.js

// Chapter-specific interactive content
const chapterContent = {
    'chapter-1': {
        questions: [
            {
                question: "Which sense do we rely on most to perceive the world?",
                options: ["Vision", "Hearing", "Touch"],
                correct: 0,
                explanation: "Vision dominates our perception, with up to 90% of what we 'see' being constructed by our brain based on context and expectations."
            }
        ]
    },
    'chapter-2': {
        questions: [
            {
                question: "What percentage of our thoughts are automatic according to research?",
                options: ["50%", "75%", "95%"],
                correct: 2,
                explanation: "Research suggests that up to 95% of our thoughts and decisions happen below the threshold of consciousness."
            }
        ]
    }
    // Add more chapters as needed
};

// Initialize on DOMContentLoaded to ensure elements exist
document.addEventListener('DOMContentLoaded', function() {
    console.log('Chapter interactive script loaded');
    setTimeout(initChapterQuestions, 1000); // Delay to ensure Ghost has set up the page
});

// Initialize chapter questions
function initChapterQuestions() {
    console.log('Initializing chapter questions...');
    
    const questionsContainer = document.getElementById('chapter-questions');
    if (!questionsContainer) {
        console.log('Questions container not found');
        return;
    }

    // Multiple ways to detect chapter
    const bodyClass = document.body.className;
    const path = window.location.pathname;
    const heading = document.querySelector('h1');
    
    let chapterKey = null;
    
    // Try body class first
    if (bodyClass.includes('tag-chapter-1')) chapterKey = 'chapter-1';
    else if (bodyClass.includes('tag-chapter-2')) chapterKey = 'chapter-2';
    
    // Try URL next
    if (!chapterKey) {
        const urlMatch = path.match(/chapter-(\d+)/i);
        if (urlMatch) {
            chapterKey = `chapter-${urlMatch[1]}`;
        }
    }
    
    // Try heading as last resort
    if (!chapterKey && heading) {
        const headingMatch = heading.textContent.match(/chapter\s+(\d+)/i);
        if (headingMatch) {
            chapterKey = `chapter-${headingMatch[1]}`;
        }
    }
    
    console.log('Detected chapter:', chapterKey);

    // Render questions if we found a valid chapter
    if (chapterKey && chapterContent[chapterKey]) {
        console.log('Rendering questions for chapter:', chapterKey);
        const questions = chapterContent[chapterKey].questions;
        questionsContainer.style.display = 'block'; // Ensure container is visible
        questionsContainer.innerHTML = questions.map((q, index) => `
            <div class="interactive-question">
                <h3 class="question-text">${q.question}</h3>
                <div class="question-options">
                    ${q.options.map((option, optIndex) => `
                        <button class="option-btn" 
                                onclick="selectAnswer(${index}, ${optIndex})"
                                data-question="${index}" 
                                data-option="${optIndex}">
                            ${option}
                        </button>
                    `).join('')}
                </div>
                <div class="question-explanation" id="explanation-${index}" style="display: none;">
                    <p>${q.explanation}</p>
                </div>
            </div>
        `).join('');
    } else {
        console.warn('No questions found for chapter:', chapterKey);
    }
}

// Handle answer selection
function selectAnswer(questionIndex, optionIndex) {
    const bodyClass = document.body.className;
    let chapterKey = null;
    
    // Determine current chapter
    if (bodyClass.includes('tag-chapter-1')) chapterKey = 'chapter-1';
    if (bodyClass.includes('tag-chapter-2')) chapterKey = 'chapter-2';
    
    if (!chapterKey || !chapterContent[chapterKey]) return;
    
    const question = chapterContent[chapterKey].questions[questionIndex];
    const buttons = document.querySelectorAll(`[data-question="${questionIndex}"]`);
    const explanation = document.getElementById(`explanation-${questionIndex}`);
    
    // Reset all buttons
    buttons.forEach(btn => btn.classList.remove('correct', 'incorrect'));
    
    // Mark correct/incorrect
    buttons[optionIndex].classList.add(optionIndex === question.correct ? 'correct' : 'incorrect');
    buttons[question.correct].classList.add('correct');
    
    // Show explanation
    explanation.style.display = 'block';
    
    // Disable all buttons for this question
    buttons.forEach(btn => btn.disabled = true);
}

// Ask the Book functionality
function toggleAskBook() {
    const modal = document.getElementById('ask-book-modal');
    modal.classList.toggle('active');
    
    // Close modal when clicking outside
    if (modal.classList.contains('active')) {
        setTimeout(() => {
            modal.addEventListener('click', function closeOnOutsideClick(e) {
                if (e.target === modal) {
                    toggleAskBook();
                    modal.removeEventListener('click', closeOnOutsideClick);
                }
            });
        }, 100);
    }
}

function askQuestion() {
    const question = document.getElementById('book-question').value;
    const responseDiv = document.getElementById('modal-response');
    
    if (!question.trim()) return;
    
    responseDiv.innerHTML = '<div class="loading">Thinking...</div>';
    
    // This would connect to your AI service
    // For now, showing a placeholder response
    setTimeout(() => {
        responseDiv.innerHTML = `
            <div class="ai-response">
                <h4>Response:</h4>
                <p>This is where the AI response would appear based on the chapter content and your question.</p>
                <p><em>Note: This would integrate with your chosen AI service (OpenAI, Claude API, etc.)</em></p>
            </div>
        `;
    }, 1500);
}

// ============================================
// BOOK PAGINATION SYSTEM (SAFE VERSION)
// ============================================

class BookPagination {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 0;
        this.pages = [];
        this.pageHeight = window.innerHeight * 0.75; // 75vh
        this.originalContent = null;
        this.isEnabled = false;
    }

    init() {
        // Only enable on desktop/tablet
        if (window.innerWidth <= 768) {
            console.log('BookPagination: Skipping on mobile');
            return;
        }

        // Safety check - ensure content exists
        const content = document.querySelector('.gh-content');
        if (!content || content.children.length === 0) {
            console.log('BookPagination: No content found, skipping');
            return;
        }

        try {
            // Store original content as backup
            this.originalContent = content.cloneNode(true);
            
            this.createPages();
            this.createNavigation();
            this.bindEvents();
            this.isEnabled = true;
            
            console.log(`BookPagination: Created ${this.totalPages} pages`);
        } catch (error) {
            console.error('BookPagination: Error during initialization:', error);
            this.restoreOriginalContent();
        }
    }

    createPages() {
        const content = document.querySelector('.gh-content');
        if (!content) return;

        // Store original content
        const originalContent = content.innerHTML;

        // Get all content elements
        const elements = Array.from(content.children);
        if (elements.length === 0) {
            content.innerHTML = originalContent;
            return;
        }

        // Create pages container
        const pagesContainer = document.createElement('div');
        pagesContainer.className = 'book-pages-container';
        
        // Separate header, content, and questions
        const header = elements.find(el => el.classList.contains('article-header'));
        const questions = elements.find(el => el.classList.contains('chapter-questions'));
        const mainContent = elements.filter(el => 
            !el.classList.contains('article-header') && 
            !el.classList.contains('chapter-questions')
        );
        
        let currentPage = null;
        let pageNumber = 1;

        try {
            // Create first page
            currentPage = this.createPage(pageNumber);
            pagesContainer.appendChild(currentPage);
            
            // Add header to first page if it exists
            if (header) {
                const headerClone = header.cloneNode(true);
                currentPage.querySelector('.page-content').appendChild(headerClone);
            }
            
            // Distribute main content across pages
            const contentPerPage = 4; // Number of elements per page
            mainContent.forEach((element, index) => {
                if (!currentPage) {
                    currentPage = this.createPage(pageNumber);
                    pagesContainer.appendChild(currentPage);
                }

                // Clone element to current page
                const clonedElement = element.cloneNode(true);
                currentPage.querySelector('.page-content').appendChild(clonedElement);
                
                // Create new page after every few elements (except for the last element)
                if ((index + 1) % contentPerPage === 0 && index < mainContent.length - 1) {
                    pageNumber++;
                    currentPage = this.createPage(pageNumber);
                    pagesContainer.appendChild(currentPage);
                }
            });

            // Add questions to the last page if they exist
            if (questions) {
                // Always create a new page for questions
                pageNumber++;
                currentPage = this.createPage(pageNumber);
                pagesContainer.appendChild(currentPage);
                const questionsClone = questions.cloneNode(true);
                questionsClone.id = 'chapter-questions'; // Ensure ID is maintained
                currentPage.querySelector('.page-content').appendChild(questionsClone);
            }

            // Replace content
            content.innerHTML = '';
            content.appendChild(pagesContainer);
            
            this.pages = document.querySelectorAll('.book-page');
            this.totalPages = this.pages.length;
            
            // Add page numbers
            this.addPageNumbers();
            
            // Show only first page initially
            this.showPage(1);

        } catch (error) {
            console.error('Error creating pages:', error);
            // Restore original content if something goes wrong
            content.innerHTML = originalContent;
            throw error;
        }

        // Add questions to the last page if they exist
        if (questions) {
            // If the last page is full, create a new page for questions
            if (currentPage.querySelector('.page-content').children.length >= contentPerPage) {
                pageNumber++;
                currentPage = this.createPage(pageNumber);
                pagesContainer.appendChild(currentPage);
            }
            currentPage.querySelector('.page-content').appendChild(questions.cloneNode(true));
        }

        // Replace content
        content.innerHTML = '';
        content.appendChild(pagesContainer);
        
        this.pages = document.querySelectorAll('.book-page');
        this.totalPages = this.pages.length;
        
        // Add page numbers
        this.addPageNumbers();
        
        // Show only first page initially
        this.showPage(1);
    }

    createPage(pageNum) {
        const page = document.createElement('div');
        page.className = `book-page ${pageNum % 2 === 0 ? 'even-page' : 'odd-page'}`;
        page.id = `page-${pageNum}`;
        page.style.display = 'none'; // Initially hidden
        
        const pageContent = document.createElement('div');
        pageContent.className = 'page-content';
        
        page.appendChild(pageContent);
        return page;
    }

    getElementHeight(element) {
        try {
            // Create temporary clone to measure height
            const clone = element.cloneNode(true);
            clone.style.visibility = 'hidden';
            clone.style.position = 'absolute';
            clone.style.top = '-9999px';
            clone.style.left = '-9999px';
            clone.style.width = 'auto';
            clone.style.height = 'auto';
            
            document.body.appendChild(clone);
            const height = clone.offsetHeight || 100; // Fallback height
            document.body.removeChild(clone);
            
            return height;
        } catch (error) {
            console.warn('Error measuring element height:', error);
            return 100; // Fallback height
        }
    }

    addPageNumbers() {
        this.pages.forEach((page, index) => {
            const pageNum = index + 1;
            const pageNumber = document.createElement('div');
            pageNumber.className = 'page-number';
            pageNumber.textContent = pageNum;
            page.appendChild(pageNumber);
            
            // Add continue indicator (except last page)
            if (pageNum < this.totalPages) {
                const continueIndicator = document.createElement('div');
                continueIndicator.className = 'page-continue';
                continueIndicator.textContent = '• • •';
                page.appendChild(continueIndicator);
            }
        });
    }

    createNavigation() {
        // Remove existing navigation if it exists
        const existingNav = document.querySelector('.page-navigation');
        if (existingNav) {
            existingNav.remove();
        }

        const nav = document.createElement('div');
        nav.className = 'page-navigation';
        nav.innerHTML = `
            <button class="page-nav-btn" id="prev-page" aria-label="Previous page">
                ← Previous
            </button>
            <div class="page-indicator">
                <span id="current-page">1</span> / <span id="total-pages">${this.totalPages}</span>
            </div>
            <button class="page-nav-btn" id="next-page" aria-label="Next page">
                Next →
            </button>
        `;
        
        document.body.appendChild(nav);
        this.updateNavigation();
    }

    bindEvents() {
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousPage());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextPage());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Don't interfere with modal keyboard shortcuts
            const modal = document.getElementById('ask-book-modal');
            if (modal && modal.classList.contains('active')) {
                return;
            }
            
            if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                e.preventDefault();
                this.previousPage();
            } else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
                e.preventDefault();
                this.nextPage();
            }
        });
    }

    showPage(pageNum) {
        if (!this.isEnabled) return;
        
        // Remove visible class from all pages
        this.pages.forEach(page => {
            page.classList.remove('visible');
            // Delay hiding to allow fade out
            setTimeout(() => {
                if (!page.classList.contains('visible')) {
                    page.style.display = 'none';
                }
            }, 500);
        });
        
        // Show and animate current page
        const currentPageEl = document.getElementById(`page-${pageNum}`);
        if (currentPageEl) {
            currentPageEl.style.display = 'block';
            // Trigger reflow
            void currentPageEl.offsetWidth;
            // Add visible class to trigger animation
            setTimeout(() => {
                currentPageEl.classList.add('visible');
                currentPageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        }
        
        this.currentPage = pageNum;
        this.updateNavigation();
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.showPage(this.currentPage + 1);
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.showPage(this.currentPage - 1);
        }
    }

    updateNavigation() {
        const currentPageSpan = document.getElementById('current-page');
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        
        if (currentPageSpan) {
            currentPageSpan.textContent = this.currentPage;
        }
        
        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentPage === this.totalPages;
        }
    }

    restoreOriginalContent() {
        if (this.originalContent) {
            const content = document.querySelector('.gh-content');
            if (content) {
                content.innerHTML = this.originalContent.innerHTML;
            }
        }
        
        const navigation = document.querySelector('.page-navigation');
        if (navigation) {
            navigation.remove();
        }
        
        this.isEnabled = false;
        console.log('BookPagination: Restored original content');
    }

    handleResize() {
        if (window.innerWidth <= 768) {
            // Mobile: Remove pagination
            if (this.isEnabled) {
                this.restoreOriginalContent();
            }
        } else if (!this.isEnabled && this.originalContent) {
            // Desktop: Re-create pagination if it doesn't exist
            setTimeout(() => this.init(), 100);
        }
    }
}

// ============================================
// INITIALIZATION AND EVENT HANDLERS
// ============================================

// Global variables
let bookPagination;

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('ask-book-modal');
        if (modal && modal.classList.contains('active')) {
            toggleAskBook();
        }
    }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing chapter interactive features...');
    
    // Initialize chapter questions
    initChapterQuestions();
    
    // Add smooth scrolling for chapter navigation
    const navLinks = document.querySelectorAll('.chapter-navigation a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            this.style.opacity = '0.7';
        });
    });
    
    // Initialize book pagination with delay to ensure content is loaded
    setTimeout(() => {
        try {
            bookPagination = new BookPagination();
            bookPagination.init();
            
            // Set up mutation observer to reinitialize questions after pagination changes
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.addedNodes.length > 0) {
                        const questionsContainer = document.getElementById('chapter-questions');
                        if (questionsContainer && questionsContainer.children.length === 0) {
                            console.log('Content changed, reinitializing questions...');
                            initChapterQuestions();
                        }
                    }
                });
            });
            
            // Start observing the document body for changes
            observer.observe(document.body, { childList: true, subtree: true });
        } catch (error) {
            console.error('Error initializing book pagination:', error);
        }
    }, 500); // Increased delay for safety
    
    // Handle window resize for pagination
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (bookPagination) {
                bookPagination.handleResize();
            }
        }, 250);
    });
});