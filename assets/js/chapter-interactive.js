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
                question: "How many times per day does the average person check for social validation (likes, messages, notifications)?",
                options: ["47 times", "96 times", "274 times"],
                correct: 2,
                explanation: "Studies show people check their phones 274 times daily, mostly seeking social validation hits. We've literally programmed ourselves into addiction cycles that hijack the same brain circuits as gambling."
            },
            {
                question: "What percentage of people would rather receive electric shocks than be alone with their thoughts for 15 minutes?",
                options: ["12%", "37%", "67%"],
                correct: 2,
                explanation: "67% of men and 25% of women chose electric shocks over sitting alone with their thoughts. We're so validation-dependent that solitude feels like torture—even when it's the only path to authentic self-knowledge."
            },
            {
                question: "How long does a 'like' dopamine hit last in your brain?",
                options: ["30 seconds", "2 minutes", "9 seconds"],
                correct: 2,
                explanation: "Social media 'likes' trigger dopamine for just 9 seconds—shorter than a commercial break. Yet people spend hours chasing these micro-hits, proving we've outsourced our self-worth to an algorithm designed to keep us hungry."
            }
        ]
    },
    'chapter-3': {
        questions: [
            {
                question: "What percentage of your daily actions are completely unconscious habits?",
                options: ["23%", "45%", "95%"],
                correct: 2,
                explanation: "Neuroscience reveals 95% of your daily actions run on autopilot. You're literally an NPC in your own life most of the time—but unlike video game characters, you can reprogram your script."
            },
            {
                question: "How many decisions does your brain make every second without your awareness?",
                options: ["200", "2,000", "20,000"],
                correct: 2,
                explanation: "Your brain processes 20,000 decisions per second below consciousness—filtering reality, choosing responses, running programs you never consciously installed. Most people never realize they're spectators in their own mental movie."
            },
            {
                question: "What happens to people who break their daily routines for just one week?",
                options: ["Nothing significant", "Temporary confusion", "Measurable IQ increases"],
                correct: 2,
                explanation: "Breaking routines for one week increases creative problem-solving by 41% and working memory by 23%. Your autopilot isn't just lazy—it's making you measurably less intelligent."
            }
        ]
    },
    'chapter-4': {
        questions: [
            {
                question: "How much of what you 'see' is actually your brain filling in missing information?",
                options: ["15%", "40%", "80%"],
                correct: 2,
                explanation: "80% of vision is your brain's creative fiction. You have a blind spot the size of 9 full moons in each eye, but your brain seamlessly Photoshops it out. Reality is mostly hallucination with good marketing."
            },
            {
                question: "How many colors can your eye actually detect versus how many your brain creates?",
                options: ["Eye detects more", "About the same", "Brain creates millions more"],
                correct: 2,
                explanation: "Your eye can only detect about 10 million colors, but your brain creates the experience of over 100 million through contextual processing. Most of what you see doesn't exist—it's manufactured by your neural Photoshop."
            },
            {
                question: "What percentage of people can be made to see colors that don't exist through simple visual tricks?",
                options: ["12%", "58%", "100%"],
                correct: 2,
                explanation: "100% of people can be made to see 'impossible colors' through visual tricks. Your brain is so committed to creating coherent reality that it will literally invent colors that don't exist rather than admit confusion."
            }
        ]
    },
    'chapter-5': {
        questions: [
            {
                question: "How much does your brain physically shrink when you stay in your comfort zone for extended periods?",
                options: ["It doesn't shrink", "2-3%", "Up to 20%"],
                correct: 2,
                explanation: "Neuroscientists found brains can shrink up to 20% in areas related to learning and memory when people avoid challenges for months. Comfort literally makes your brain smaller—it's reverse evolution in real time."
            },
            {
                question: "What happens to people's problem-solving abilities after just 30 days of avoiding discomfort?",
                options: ["No change", "10% decline", "40% decline"],
                correct: 2,
                explanation: "After just 30 days of avoiding uncomfortable situations, people show a 40% decline in creative problem-solving. Your comfort zone isn't just limiting—it's actively making you less capable of handling life."
            },
            {
                question: "How many new neural connections does your brain form when you do something slightly uncomfortable versus staying comfortable?",
                options: ["About the same", "2x more", "1000x more"],
                correct: 2,
                explanation: "Mild discomfort triggers up to 1000x more neural growth than comfort. Every time you choose easy, you're literally choosing a smaller brain. Discomfort isn't punishment—it's brain fertilizer."
            }
        ]
    },
    'chapter-6': {
        questions: [
            {
                question: "What percentage of lottery winners are broke again within 5 years?",
                options: ["23%", "44%", "70%"],
                correct: 2,
                explanation: "70% of lottery winners lose it all within 5 years. More money doesn't fix money problems—it amplifies them. The issue was never the amount in the account, it was the operating system running the account."
            },
            {
                question: "At what income level do people stop getting happier from more money?",
                options: ["$75,000", "$200,000", "$1 million"],
                correct: 0,
                explanation: "Happiness from income plateaus around $75,000—everything above that is just expensive therapy for deeper problems. Billionaires aren't happier than middle-class people; they just have more expensive misery."
            },
            {
                question: "How much time does the average person spend thinking about money versus using it strategically?",
                options: ["50/50 split", "80% worry, 20% strategy", "95% worry, 5% strategy"],
                correct: 2,
                explanation: "People spend 95% of their money-thoughts on worry and only 5% on strategy. We're obsessed with the scoreboard but never learn the game rules—like staring at a thermometer instead of adjusting the thermostat."
            }
        ]
    },
    'chapter-7': {
        questions: [
            {
                question: "How long does willpower last before your brain starts shutting down decision-making ability?",
                options: ["2-3 hours", "45 minutes", "15 minutes"],
                correct: 2,
                explanation: "Your willpower battery depletes after just 15 minutes of sustained self-control. Relying on discipline is like trying to run a marathon by holding your breath—it's not a strategy, it's self-sabotage."
            },
            {
                question: "What percentage of your daily decisions happen automatically based on environmental cues?",
                options: ["35%", "67%", "91%"],
                correct: 2,
                explanation: "91% of your decisions are triggered by environmental cues, not conscious choice. Change your environment and your behavior changes automatically—no willpower required. Most people try to change themselves instead of changing their context."
            },
            {
                question: "How much more effective is environment design compared to willpower for behavior change?",
                options: ["2x more effective", "5x more effective", "23x more effective"],
                correct: 2,
                explanation: "Environment design is 23x more effective than willpower for lasting behavior change. People who rely on discipline fail 96% of the time. People who design their environment succeed 78% of the time—it's not even close."
            }
        ]
    },
    'chapter-8': {
        questions: [
            {
                question: "How many different 'selves' does your brain juggle when making decisions?",
                options: ["1 consistent self", "3-5 competing selves", "Dozens of competing selves"],
                correct: 2,
                explanation: "Neuroscience reveals dozens of competing 'selves' in your brain—present you, future you, social you, private you, etc. You're not one person making decisions, you're a committee having arguments. Most internal conflict is just poor committee management."
            },
            {
                question: "What percentage of people actively sabotage their own future success?",
                options: ["12%", "43%", "89%"],
                correct: 2,
                explanation: "89% of people regularly make choices their future self will regret. We're literally at war with ourselves most of the time—present self wants pleasure, future self wants progress. The trick is getting them to negotiate instead of fight."
            },
            {
                question: "How differently does your brain value $100 now versus $100 in one year?",
                options: ["About the same", "$100 now feels like $150 later", "$100 now feels like $400 later"],
                correct: 2,
                explanation: "Your brain values $100 today the same as $400 a year from now. We're neurologically wired to rob our future selves. Every time you choose instant gratification, you're literally stealing from a future version of yourself."
            }
        ]
    },
    'chapter-9': {
        questions: [
            {
                question: "What percentage of people who donate to charity admit they do it partly to feel good about themselves?",
                options: ["23%", "67%", "89%"],
                correct: 2,
                explanation: "Research shows 89% of charitable donors admit feeling good is part of their motivation—proving even our most 'selfless' acts contain self-interest, and that's actually healthy."
            },
            {
                question: "How long does it take for people to unconsciously decide if they like someone?",
                options: ["7 seconds", "100 milliseconds", "3 minutes"],
                correct: 1,
                explanation: "We form lasting impressions in just 100 milliseconds—faster than conscious thought. Most of what we call 'chemistry' happens before we even realize we're evaluating someone."
            },
            {
                question: "What do studies reveal about people who claim to 'never get angry'?",
                options: ["They're enlightened", "They have the highest divorce rates", "They live longer"],
                correct: 1,
                explanation: "People who suppress all anger have significantly higher divorce rates and health problems. Denying natural emotions creates more relationship damage than expressing them constructively."
            }
        ]
    },
    
    'chapter-10': {
        questions: [
            {
                question: "How much of your personality is determined by genes versus environment?",
                options: ["50/50 split", "80% genes, 20% environment", "It's impossible to separate them"],
                correct: 2,
                explanation: "Genes and environment interact so intimately that separating their influence is scientifically impossible. Your genes change expression based on environment, and your environment shapes which genes activate—it's co-evolution in real time."
            },
            {
                question: "How genetically different are siblings raised in the same household?",
                options: ["Nearly identical", "50% shared traits", "As different as strangers"],
                correct: 2,
                explanation: "Siblings in the same household can be as psychologically different as random strangers. Same genes, same environment, completely different people—proving that tiny differences in timing, birth order, and individual experience create massive personality variations."
            },
            {
                question: "What percentage of 'inherited' traits actually skip generations?",
                options: ["5%", "23%", "67%"],
                correct: 2,
                explanation: "67% of inherited traits can skip generations through epigenetic switches—your grandfather's trauma can affect your brain, while your father remains unaffected. You're not just carrying your genes, you're carrying your ancestors' experiences."
            }
        ]
    },
    'chapter-11': {
        questions: [
            {
                question: "What percentage of your childhood memories before age 7 are completely fabricated?",
                options: ["15%", "40%", "80%"],
                correct: 2,
                explanation: "Neuroscience shows up to 80% of early childhood memories are reconstructions—your brain literally rewrites your past every time you remember it, often to protect you from trauma."
            },
            {
                question: "How accurately can strangers predict your personality just from looking at your bedroom?",
                options: ["25%", "60%", "90%"],
                correct: 2,
                explanation: "Strangers can predict your personality with 90% accuracy just from seeing your living space—more accurately than your close friends. Our environment mirrors our unconscious patterns."
            },
            {
                question: "What happens in your brain when someone you dislike does something you also do?",
                options: ["Nothing special", "Different regions activate", "Mirror neurons shut down"],
                correct: 1,
                explanation: "When people we dislike exhibit behaviors we also have, different brain regions activate than when strangers do the same thing—we literally process our own reflected traits differently."
            }
        ]
    },
    'chapter-12': {
        questions: [
            {
                question: "How many false details can a skilled 'psychic' plant in your memory during one reading?",
                options: ["2-3", "8-12", "20+"],
                correct: 2,
                explanation: "Expert cold readers can implant over 20 false 'memories' in a single session that you'll swear were accurate predictions. Your brain fills in details that were never actually said."
            },
            {
                question: "What percentage of your DNA do you share with a banana?",
                options: ["5%", "25%", "60%"],
                correct: 2,
                explanation: "Humans share 60% of their DNA with bananas—yet tiny genetic differences create vastly different personalities. The paradox: we're nearly identical to everything, yet completely unique."
            },
            {
                question: "How often do people make decisions with their emotions then rationalize with logic?",
                options: ["Sometimes", "Usually", "Almost always"],
                correct: 2,
                explanation: "Neuroscience reveals we make decisions emotionally 95% of the time, then use logic to justify them. What we call 'rational thinking' is mostly emotional decisions wearing logical masks."
            }
        ]
    },
    'chapter-13': {
        questions: [
            {
                question: "What's the statistical probability of every coincidence in your life happening by pure chance?",
                options: ["1 in 1,000", "1 in 1 million", "Essentially impossible"],
                correct: 2,
                explanation: "The probability of all your life's 'coincidences' being random is essentially zero—but they're not magic. They're the result of unconscious pattern recognition and positioning behaviors."
            },
            {
                question: "How much more likely are you to get a job through networking versus online applications?",
                options: ["2x more likely", "5x more likely", "85% of jobs never get posted online"],
                correct: 2,
                explanation: "85% of jobs are filled through networking before they're ever posted. 'Lucky' people aren't magic—they're systematically positioning themselves where opportunities happen."
            },
            {
                question: "What percentage of lottery winners say winning was 'inevitable' because of signs they noticed?",
                options: ["12%", "47%", "78%"],
                correct: 2,
                explanation: "78% of lottery winners claim they 'knew' they would win based on signs and patterns—proving our brains create meaning from randomness, making luck feel systematic even when it isn't."
            }
        ]
    },
    'chapter-15': {
        questions: [
            {
                question: "How many predictable patterns does the average person's daily conversation follow?",
                options: ["5-10", "50-75", "200+"],
                correct: 2,
                explanation: "Humans follow over 200 predictable conversational scripts daily—while AI is learning to break free from programmed responses. We're becoming the machines."
            },
            {
                question: "What percentage of human social media posts can AI now predict with perfect accuracy?",
                options: ["23%", "67%", "94%"],
                correct: 2,
                explanation: "AI can predict 94% of social media posts before people write them. While machines develop creativity and authenticity, human behavior has become algorithmic and predictable."
            },
            {
                question: "How often do people give the socially expected response instead of their authentic thought?",
                options: ["30% of the time", "60% of the time", "85% of the time"],
                correct: 2,
                explanation: "Studies show people give performative, socially expected responses 85% of the time. The most authentic conversations many people have are now with AI—which doesn't judge or expect social scripts."
            }
        ]
    },
    'epilogue': {
        questions: [
            {
                question: "What percentage of people who have profound spiritual or philosophical breakthroughs experience temporary psychosis?",
                options: ["2%", "15%", "31%"],
                correct: 2,
                explanation: "31% of people undergoing rapid spiritual or philosophical awakening experience temporary psychotic symptoms. The line between enlightenment and madness is thinner than most realize."
            },
            {
                question: "How quickly can pattern recognition become delusional thinking in vulnerable minds?",
                options: ["Months", "Weeks", "Days or hours"],
                correct: 2,
                explanation: "In vulnerable individuals, healthy pattern recognition can shift to delusional thinking within days or hours of a triggering event. The same cognitive ability that creates insight can create conspiracy theories."
            },
            {
                question: "What do psychologists call it when someone sees meaningful patterns in random information?",
                options: ["Intuition", "Apophenia", "Intelligence"],
                correct: 1,
                explanation: "Apophenia—seeing meaningful patterns in random information—is both a symptom of brilliance and madness. The same neural pathways that fuel creativity can spiral into delusion."
            }
        ]
    }
};

// Initialize on DOMContentLoaded to ensure elements exist
document.addEventListener('DOMContentLoaded', function() {
    console.log('Chapter interactive script loaded');

    function initialize() {
        initChapterQuestions();
        const bookPagination = new BookPagination();
        document.bookPagination = bookPagination; // Store for debugging
        bookPagination.init();
    }

    // Poll for content to appear before initializing
    const contentPoll = setInterval(function() {
        const content = document.querySelector('.gh-content');
        if (content && content.children.length > 0) {
            clearInterval(contentPoll);
            initialize();
        }
    }, 100); // Check every 100ms

    // Fallback timeout to prevent infinite loops
    setTimeout(function() {
        clearInterval(contentPoll);
    }, 5000); // Stop polling after 5 seconds
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
    const chapterMatch = bodyClass.match(/tag-chapter-(\d+)/);
    if (chapterMatch) {
        chapterKey = `chapter-${chapterMatch[1]}`;
    }
    
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
window.selectAnswer = function(questionIndex, optionIndex) {
    const bodyClass = document.body.className;
    let chapterKey = null;
    
    // Determine current chapter
    const chapterMatchSelect = bodyClass.match(/tag-chapter-(\d+)/);
    if (chapterMatchSelect) {
        chapterKey = `chapter-${chapterMatchSelect[1]}`;
    }
    
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
window.toggleAskBook = function() {
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

window.submitBookQuestion = function() {
    const questionInput = document.getElementById('book-question');
    const responseDiv = document.getElementById('modal-response');
    const question = questionInput.value.trim();

    if (!question) return;

    responseDiv.innerHTML = '<div class="loading">Thinking...</div>';

    fetch('http://localhost:3001/api/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question })
    })
    .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
    })
    .then(data => {
        responseDiv.innerHTML = `
            <div class="ai-response">
                <h4>Response:</h4>
                <p>${data.answer}</p>
            </div>
        `;
    })
    .catch(err => {
        console.error('AskBook error:', err);
        responseDiv.innerHTML = '<div class="error">Failed to get answer. Please try again later.</div>';
    });
}

// ============================================
// BOOK PAGINATION SYSTEM
// ============================================

class BookPagination {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 0;
        this.pages = [];
        this.originalContent = null;
        this.isEnabled = false;
        this.boundKeydownHandler = this.handleKeydown.bind(this);
    }

    forceShowPages() {
        console.log('Force showing pages...');
        const container = document.querySelector('.book-pages-container');
        if (container) {
            container.style.display = 'flex';
            container.style.height = '100vh';
        }
        
        this.pages.forEach((page, idx) => {
            if (idx < 2) { // Show first two pages
                page.style.display = 'block !important';
                page.style.visibility = 'visible !important';
                page.style.opacity = '1 !important';
                page.style.width = '50%';
                page.style.height = '100vh';
                page.style.overflow = 'auto';
                console.log(`Forced page ${idx + 1} visible`);
            }
        });
    }

    ensureStyles() {
        if (document.getElementById('book-pagination-styles')) return;
        const style = document.createElement('style');
        style.id = 'book-pagination-styles';
        style.textContent = `
            /* Force visibility for shown pages */
            .book-pages-container .book-page[style*="display: block"] {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
            
            .book-page {
                width: 100%;
                box-sizing: border-box;
                padding: 40px 20px;
                transition: opacity 0.3s ease;
                background: white !important;
                color: #333 !important; /* Ensure text is visible */
                display: none;
            }
            
            @media (min-width: 1024px) {
                .book-pages-container {
                    display: flex;
                    height: 100vh;
                    overflow: hidden; /* Prevent container scroll */
                }
                .book-page {
                    width: 50%;
                    height: 100vh;
                    overflow-y: auto;
                    padding: 60px 40px;
                    position: relative !important;
                    flex-shrink: 0;
                    display: none; /* Hidden by default */
                }
                .book-page.odd-page { 
                    border-right: 2px solid #eee;
                }
                .book-page.even-page { 
                    border-left: none; /* Remove duplicate border */
                }
                /* Ensure visible pages display correctly */
                .book-page[style*="display: block"] {
                    display: block !important;
                }
            }
            
            .page-content {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px 0;
                color: #333 !important;
            }
            
            .page-content > * {
                margin-bottom: 1.5em;
                color: inherit !important;
            }
            
            .page-content > *:last-child {
                margin-bottom: 3em; /* Space for page number */
            }
            
            /* Ensure all text elements are visible */
            .page-content p,
            .page-content h1,
            .page-content h2,
            .page-content h3,
            .page-content h4,
            .page-content h5,
            .page-content h6,
            .page-content blockquote,
            .page-content li {
                color: #333 !important;
                opacity: 1 !important;
            }
            
            .page-content blockquote {
                border-left: 4px solid #ddd;
                padding-left: 20px;
                margin-left: 0;
                font-style: italic;
                color: #666 !important;
            }
            
            .page-content img {
                max-width: 100%;
                height: auto;
                display: block;
                margin: 2em auto;
            }
            
            .page-number {
                position: absolute;
                bottom: 40px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 14px;
                color: #999 !important;
                z-index: 10;
            }
            
            /* Navigation styles */
            .page-navigation {
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%);
                background: white;
                padding: 15px 25px;
                border-radius: 30px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                gap: 25px;
                z-index: 1000;
                border: 1px solid #eee;
            }
            
            .page-navigation button {
                padding: 10px 20px;
                border: 1px solid #ddd;
                background: white;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 14px;
                color: #333;
            }
            
            .page-navigation button:hover:not(:disabled) {
                background: #f5f5f5;
                border-color: #bbb;
            }
            
            .page-navigation button:disabled {
                opacity: 0.4;
                cursor: not-allowed;
            }
            
            .page-indicator {
                font-size: 14px;
                color: #666;
                min-width: 80px;
                text-align: center;
                font-weight: 500;
            }

             /* Rest of your existing CSS... */
        .book-pages-container {
            position: relative;
            width: 100%;
            min-height: 100vh;
            background: white;
        }
        
        .book-page {
            width: 100%;
            box-sizing: border-box;
            padding: 40px 20px;
            transition: opacity 0.3s ease;
            background: white !important;
            color: #333 !important;
            /* Remove default display: none */
        }
        
        /* Hide pages by default using attribute selector */
        .book-page:not([data-visible="true"]) {
            display: none !important;
        }
        
        /* Show visible pages */
        .book-page[data-visible="true"] {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
        `;
        document.head.appendChild(style);
    }

    init() {
        if (window.innerWidth <= 768) {
            console.log('BookPagination: Skipping on mobile');
            return;
        }

        const content = document.querySelector('.gh-content');
        if (!content || content.children.length === 0) {
            console.log('BookPagination: No content found, skipping');
            return;
        }

        this.originalContent = content.cloneNode(true);
        this.ensureStyles();
        this.createPages();

        if (this.totalPages > 1) {
            this.createNavigation();
            this.bindEvents();
            this.isEnabled = true;
            console.log(`BookPagination: Created ${this.totalPages} pages`);
        } else {
            console.log('BookPagination: Not enough content for pagination.');
            this.restoreOriginalContent();
        }
    }

    collectContentBlocks(node) {
        const blocks = [];
        const blockSelectors = [
            'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'blockquote', 'pre', 'ul', 'ol', 'li', 'hr', 'img',
            'figure', 'figcaption', 'table', 'iframe', 'div[class*="kg-"]'
        ];

        // If the node itself is a block element, add it
        if (node.matches && node.matches(blockSelectors.join(','))) {
            blocks.push(node);
        }

        // Recursively collect block elements from children
        const walker = document.createTreeWalker(
            node,
            NodeFilter.SHOW_ELEMENT,
            {
                acceptNode: (n) => {
                    return n.matches && n.matches(blockSelectors.join(',')) 
                        ? NodeFilter.FILTER_ACCEPT 
                        : NodeFilter.FILTER_SKIP;
                }
            }
        );

        let currentNode;
        while (currentNode = walker.nextNode()) {
            blocks.push(currentNode);
        }

        return blocks;
    }

    createPage(pageNum) {
        const page = document.createElement('div');
        page.className = `book-page ${pageNum % 2 === 0 ? 'even-page' : 'odd-page'}`;
        page.id = `page-${pageNum}`;
        page.style.display = 'none';
        
        const pageContent = document.createElement('div');
        pageContent.className = 'page-content';
        
        page.appendChild(pageContent);
        return page;
    }

    createPages() {
        const content = document.querySelector('.gh-content');
        if (!content) return;

        const contentClone = content.cloneNode(true);
        const allBlocks = this.collectContentBlocks(contentClone);
        console.log('BookPagination: Found', allBlocks.length, 'content blocks to paginate');

        if (allBlocks.length === 0) {
            console.log('BookPagination: No content blocks found');
            return;
        }

        content.innerHTML = '';

        const pagesContainer = document.createElement('div');
        pagesContainer.className = 'book-pages-container';

        // Calculate blocks per page for 2-page spread
        const blocksPerPage = Math.ceil(allBlocks.length / 2);
        
        let pageNumber = 1;
        let currentPage = this.createPage(pageNumber);
        pagesContainer.appendChild(currentPage);
        
        let blocksInCurrentPage = 0;

        allBlocks.forEach((block, index) => {
            const blockClone = block.cloneNode(true);
            currentPage.querySelector('.page-content').appendChild(blockClone);
            blocksInCurrentPage++;

            if (blocksInCurrentPage >= blocksPerPage && index < allBlocks.length - 1) {
                pageNumber++;
                currentPage = this.createPage(pageNumber);
                pagesContainer.appendChild(currentPage);
                blocksInCurrentPage = 0;
            }
        });

        content.appendChild(pagesContainer);

        this.pages = document.querySelectorAll('.book-page');
        this.totalPages = this.pages.length;
        console.log('BookPagination: Created', this.totalPages, 'pages');

        if (this.totalPages > 0) {
            this.addPageNumbers();
            this.showPage(1);
        }
        
        content.appendChild(pagesContainer);

    this.pages = document.querySelectorAll('.book-page');
    this.totalPages = this.pages.length;
    console.log('BookPagination: Created', this.totalPages, 'pages');

    if (this.totalPages > 0) {
        this.addPageNumbers();
        
        // Delay initial show to ensure DOM is ready
        setTimeout(() => {
            console.log('Initial showPage call...');
            this.showPage(1);
        }, 0);
    }
    // DEBUG: log page structure
    console.log('BookPagination: pages array', this.pages);
    this.pages.forEach((p, idx) => {
        console.log(`Page ${idx+1} child count:`, p.querySelector('.page-content').children.length);
    });
}

    addPageNumbers() {
        this.pages.forEach((page, index) => {
            const pageNum = index + 1;
            const pageNumber = document.createElement('div');
            pageNumber.className = 'page-number';
            pageNumber.textContent = pageNum;
            page.appendChild(pageNumber);
        });
    }
   
    showPage(pageNumber) {
        console.log('=== showPage called with:', pageNumber);
        
        this.currentPage = pageNumber;
        const currentSpread = Math.ceil(this.currentPage / 2);
        const startPage = (currentSpread - 1) * 2 + 1;
        const endPage = Math.min(startPage + 1, this.totalPages);
    
        console.log(`Showing spread ${currentSpread}: pages ${startPage}-${endPage}`);
        console.log('Total pages:', this.totalPages);
    
        // Get container
        const container = document.querySelector('.book-pages-container');
        if (!container) {
            console.error('Book pages container not found!');
            return;
        }
        console.log('Container found:', container);
    
        // Hide all pages first
        this.pages.forEach((page, idx) => {
            console.log(`Hiding page ${idx + 1}`);
            page.style.display = 'none';
            page.style.visibility = 'hidden';
        });
    
        // Force container to use flex on desktop
        if (window.innerWidth >= 1024) {
            container.style.display = 'flex';
            console.log('Set container to flex display');
        }
    
        // Show current spread pages
        for (let i = startPage; i <= endPage; i++) {
            const page = this.pages[i - 1];
            if (page) {
                console.log(`Attempting to show page ${i}...`);
                
                // Clear all inline styles first
                page.removeAttribute('style');
                
                // Then set display properties
                page.style.display = 'block';
                page.style.visibility = 'visible';
                page.style.opacity = '1';
                
                // Verify the change
                console.log(`Page ${i} after setting styles:`, {
                    display: page.style.display,
                    visibility: page.style.visibility,
                    opacity: page.style.opacity,
                    computedDisplay: window.getComputedStyle(page).display
                });
            }
        }
    
        this.updateNavigation();
        
        // Add final verification
        setTimeout(() => {
            console.log('=== Final page states after showPage:');
            this.pages.forEach((page, idx) => {
                console.log(`Page ${idx + 1}:`, {
                    display: page.style.display,
                    computedDisplay: window.getComputedStyle(page).display
                });
            });
        }, 100);
    }
    createNavigation() {
        const existingNav = document.querySelector('.page-navigation');
        if (existingNav) existingNav.remove();

        const nav = document.createElement('div');
        nav.className = 'page-navigation';
        const totalSpreads = Math.ceil(this.totalPages / 2);
        nav.innerHTML = `
            <button class="prev-page-btn" disabled>Previous</button>
            <span class="page-indicator">1 / ${totalSpreads}</span>
            <button class="next-page-btn">Next</button>
        `;
        
        document.body.appendChild(nav);
    }

    updateNavigation() {
        const totalSpreads = Math.ceil(this.totalPages / 2);
        const currentSpread = Math.ceil(this.currentPage / 2);
        const prevBtn = document.querySelector('.prev-page-btn');
        const nextBtn = document.querySelector('.next-page-btn');
        const indicator = document.querySelector('.page-indicator');

        if (prevBtn) prevBtn.disabled = currentSpread <= 1;
        if (nextBtn) nextBtn.disabled = currentSpread >= totalSpreads;
        if (indicator) indicator.textContent = `${currentSpread} / ${totalSpreads}`;
    }

    bindEvents() {
        const prevBtn = document.querySelector('.prev-page-btn');
        const nextBtn = document.querySelector('.next-page-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousPage());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextPage());
        }

        document.addEventListener('keydown', this.boundKeydownHandler);
    }

    handleKeydown(e) {
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
    }

    nextPage() {
        const totalSpreads = Math.ceil(this.totalPages / 2);
        const currentSpread = Math.ceil(this.currentPage / 2);
        if (currentSpread < totalSpreads) {
            this.showPage(this.currentPage + 2);
        }
    }

    previousPage() {
        const currentSpread = Math.ceil(this.currentPage / 2);
        if (currentSpread > 1) {
            this.showPage(this.currentPage - 2);
        }
    }

    restoreOriginalContent() {
        const content = document.querySelector('.gh-content');
        const nav = document.querySelector('.page-navigation');
        
        if (content && this.originalContent) {
            content.innerHTML = this.originalContent.innerHTML;
        }
        
        if (nav) {
            nav.remove();
        }
        
        document.removeEventListener('keydown', this.boundKeydownHandler);
    }

    // Add this method to the BookPagination class
debugCurrentState() {
    console.group('Book Pagination Debug Info');
    console.log('Container:', document.querySelector('.book-pages-container'));
    console.log('Total pages:', this.totalPages);
    console.log('Current page:', this.currentPage);
    
    this.pages.forEach((page, idx) => {
        const content = page.querySelector('.page-content');
        console.log(`Page ${idx + 1}:`, {
            id: page.id,
            display: page.style.display,
            visibility: page.style.visibility,
            childCount: content.children.length,
            firstChild: content.firstElementChild?.tagName
        });
    });
    console.groupEnd();
}

// Call it after showing pages
showPage(pageNumber) {
    // ... existing code ...
    this.updateNavigation();
    
    // Debug current state
    setTimeout(() => this.debugCurrentState(), 100);
}

}