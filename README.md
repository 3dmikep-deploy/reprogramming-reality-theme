# Reprogramming Reality Ghost Theme

A modern, interactive Ghost theme featuring 3D animations, book-style pagination, and interactive chapter elements built with Three.js.

## Theme Structure

```
reprogramming-reality/
├── assets/
│   ├── css/
│   │   ├── fonts.css
│   │   └── main.css
│   ├── images/
│   ├── js/
│   │   ├── main.js              # Core interactive features
│   │   ├── chapter-interactive.js # Chapter-specific Q&A system
│   │   └── chapters.js          # Chapter content management
│   └── scss/
│       └── main.scss
├── partials/
│   ├── footer.hbs
│   ├── navigation.hbs
│   ├── post-card.hbs
│   └── icons/
│       └── avatar.hbs
├── default.hbs    # Base template
├── home.hbs       # Homepage template
├── index.hbs      # Post listing template
├── page.hbs       # Static page template
├── post.hbs       # Single post template
└── gulpfile.js    # Build and development workflow
```

## Features

### 1. Interactive 3D Hero (Three.js)
- Floating 3D glasses model with animation
- Interactive particle system background
- Mouse-responsive camera movement
- Optimized WebGL rendering with anti-aliasing

### 2. Book-Style Pagination
- Automatic content splitting into pages
- Customizable words-per-page setting
- Smooth page transitions
- Keyboard navigation support
- Progress tracking
- Responsive design (reverts to scroll on mobile)

### 3. Interactive Chapter Elements
- Multiple-choice questions system
- Dynamic question rendering
- Answer validation
- Explanation reveals
- Progress tracking
- Chapter-specific content loading

### 4. Reading Progress
- Scrolling progress bar
- Percentage completion tracking
- Smooth updates

### 5. Split View Homepage
- Text and image synchronization
- Intersection Observer-based transitions
- Smooth image swapping
- Responsive design

## Technical Details

### Dependencies
- Three.js (v0.132.2) - For 3D graphics
- Ghost Theme API
- No jQuery dependency
- Node.js and npm for development
- Gulp.js for build workflow
- Browser-sync for development
- SASS for styling

### Build System (gulpfile.js)
The theme uses Gulp.js for development workflow automation:

```javascript
gulp.task('sass')     // Compiles SCSS to CSS with autoprefixer
gulp.task('watch')    // Live reload development environment
gulp.task('default')  // Default development task
```

Key Features:
- SCSS compilation with source maps
- CSS autoprefixer for browser compatibility
- Live reload with Browser-sync
- Ghost blog integration (proxied at localhost:2368)
- File watching for instant updates

### JavaScript Architecture

#### Main.js
The core JavaScript file (`assets/js/main.js`) is organized into several key components:

1. **Initialization**
```javascript
window.addEventListener('DOMContentLoaded', (event) => {
    // Feature initialization based on page context
});
```

2. **3D Graphics (Three.js)**
- `createGlassesModel()`: Creates the 3D glasses model
- `initHeroAnimation()`: Sets up the Three.js scene and animation

3. **Book Pagination**
- `BookPagination` class handles:
  - Content splitting
  - Page navigation
  - Progress tracking
  - Responsive behavior

4. **Chapter Interactivity (chapter-interactive.js)**
The chapter interaction system is managed through a dedicated module:

```javascript
const chapterContent = {
    'chapter-1': {
        questions: [/* chapter questions */]
    },
    'chapter-2': {
        questions: [/* chapter questions */]
    }
};
```

Key Components:
- Question data management
- Dynamic question rendering
- Answer validation and feedback
- Progress tracking
- Interactive modal system
- Chapter-specific content loading
- Explanation reveal system

Functions:
- `initChapterQuestions()`: Sets up chapter Q&A interface
- `selectAnswer()`: Handles answer validation and feedback
- `toggleAskBook()`: Manages the "Ask the Book" modal

### CSS Architecture
- SCSS-based styling
- Modular organization
- Responsive breakpoints
- Animation definitions

## Development Guidelines

### Adding New Features
1. Add new JavaScript modules to `assets/js/`
2. Update the main.js initialization section
3. Add corresponding styles to SCSS
4. Update templates as needed

### Ask the Book API

The interactive "Ask the Book" modal uses a small Express server to query the OpenAI API. To run it locally:

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `OPENAI_API_KEY`.
3. Start the server using `node ask-book-server.js`.
4. The chapter page JavaScript will POST your question to `/api/ask` and display the AI response in the modal.

### Modifying 3D Elements
1. Modify the `createGlassesModel()` function for model changes
2. Update animation parameters in `initHeroAnimation()`
3. Test performance on various devices

### Adding Chapter Content
1. Add chapter data to the `chapterContent` object
2. Follow the existing question format:
```javascript
{
    question: "Question text",
    options: ["Option 1", "Option 2", "Option 3"],
    correct: 0, // Index of correct answer
    explanation: "Explanation text"
}
```

## Browser Support
- Modern browsers with WebGL support
- Fallbacks for older browsers
- Mobile-responsive design

## Performance Considerations
- Lazy loading of 3D elements
- Optimized asset loading
- Efficient DOM operations
- Mobile-first approach

## Contributing
1. Fork the repository
2. Create a feature branch
3. Submit a pull request with detailed description
4. Ensure code follows existing patterns
5. Include documentation updates

## License
Check LICENSE file for details.
