// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Auto-hide flash messages
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach(message => {
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 5000);
    });
    
    // Initialize markdown editor if present
    initMarkdownEditor();
    
    // Initialize image upload if present
    initImageUpload();
    
    // Initialize like buttons
    initLikeButtons();
});

// Markdown Editor
function initMarkdownEditor() {
    const editorTabs = document.querySelectorAll('.editor-tab');
    const editorContents = document.querySelectorAll('.editor-content');
    const textarea = document.querySelector('.editor-textarea');
    const preview = document.querySelector('.editor-preview');
    
    if (editorTabs.length === 0) return;
    
    editorTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.dataset.target;
            
            // Update tabs
            editorTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update content
            editorContents.forEach(c => c.classList.remove('active'));
            document.querySelector(`.editor-content[data-content="${target}"]`).classList.add('active');
            
            // Update preview if switching to preview tab
            if (target === 'preview' && textarea && preview) {
                updatePreview();
            }
        });
    });
    
    // Update preview on textarea change
    if (textarea && preview) {
        textarea.addEventListener('input', updatePreview);
    }
}

function updatePreview() {
    const textarea = document.querySelector('.editor-textarea');
    const preview = document.querySelector('.editor-preview');
    
    if (textarea && preview) {
        const markdownText = textarea.value;
        const html = marked.parse(markdownText);
        const cleanHtml = DOMPurify.sanitize(html);
        preview.innerHTML = cleanHtml;
    }
}

// Image Upload
function initImageUpload() {
    const imageUpload = document.querySelector('.image-upload');
    const fileInput = document.querySelector('input[type="file"]');
    
    if (!imageUpload || !fileInput) return;
    
    // Click to upload
    imageUpload.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Drag and drop
    imageUpload.addEventListener('dragover', (e) => {
        e.preventDefault();
        imageUpload.classList.add('dragover');
    });
    
    imageUpload.addEventListener('dragleave', () => {
        imageUpload.classList.remove('dragover');
    });
    
    imageUpload.addEventListener('drop', (e) => {
        e.preventDefault();
        imageUpload.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    });
    
    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });
}

function handleFileSelect(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.querySelector('.image-preview');
        if (preview) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
    };
    reader.readAsDataURL(file);
}

// Like Buttons
function initLikeButtons() {
    const likeButtons = document.querySelectorAll('.btn-like');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const postId = this.dataset.postId;
            if (!postId) return;
            
            // Show loading state
            const originalContent = this.innerHTML;
            this.innerHTML = '<div class="loading"></div>';
            this.disabled = true;
            
            // Send AJAX request
            fetch(`/like/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => response.json())
            .then(data => {
                // Update button state
                if (data.liked) {
                    this.classList.add('liked');
                    this.innerHTML = '<i class="fas fa-heart"></i> Liked';
                } else {
                    this.classList.remove('liked');
                    this.innerHTML = '<i class="far fa-heart"></i> Like';
                }
                
                // Update like count
                const likeCount = document.querySelector(`[data-post-id="${postId}"] .like-count`);
                if (likeCount) {
                    likeCount.textContent = data.like_count;
                }
                
                // Add bounce animation
                this.style.animation = 'bounce 0.6s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            })
            .catch(error => {
                console.error('Error:', error);
                this.innerHTML = originalContent;
            })
            .finally(() => {
                this.disabled = false;
            });
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#f44336';
            isValid = false;
        } else {
            field.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Add form validation to all forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        }
    });
});

// Auto-resize textareas
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
});

// Add loading state to buttons (only for non-form buttons)
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        // Only add loading state for buttons that are not submit buttons in forms
        if (this.type === 'submit' && this.closest('form')) {
            // Let the form submit naturally, don't interfere
            return;
        }
        
        if (this.type === 'submit') {
            const originalText = this.innerHTML;
            this.innerHTML = '<div class="loading"></div>';
            this.disabled = true;
            
            // Re-enable after 3 seconds (fallback)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 3000);
        }
    });
});
