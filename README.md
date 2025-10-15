#  Mushy Blog

A blog platform built with Flask! Share your thoughts, stories, and ideas with the world in style.

##  Features

- **User Authentication**: Sign up, login, and secure user management
- **Rich Post Creation**: Markdown editor with live preview
- **Image Upload**: Drag & drop image uploads with automatic resizing
- **Comments System**: Interactive commenting on posts
- **Like System**: Like posts with real-time updates
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Fun Animations**: Smooth transitions and hover effects
- **Post Management**: Create, edit, and delete your posts
- **User Profiles**: Personal dashboard with post statistics

##  Tech Stack

- **Backend**: Flask (Python)
- **Database**: SQLite with SQLAlchemy ORM
- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Custom CSS with gradients and animations
- **Markdown**: python-markdown with syntax highlighting
- **Image Processing**: Pillow (PIL)
- **Security**: Werkzeug password hashing, HTML sanitization

##  Quick Start

### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

### Installation

1. **Clone or download the project**
   ```bash
   cd /Users/nourbilal/Desktop/Ali\ Collage/Blog
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python app.py
   ```

4. **Open your browser**
   Navigate to `http://localhost:5001`


##  Features in Detail

### Markdown Editor
- Live preview of your markdown content
- Support for headers, lists, links, images, code blocks
- Syntax highlighting for code
- Clean, distraction-free writing experience

### Image Upload
- Drag and drop functionality
- Automatic image resizing (max 800px width)
- Support for PNG, JPG, JPEG, GIF, WebP
- Image preview before upload

### Interactive Features
- Real-time like/unlike with AJAX
- Smooth animations and transitions
- Responsive mobile navigation
- Auto-hiding flash messages

### Security Features
- Password hashing with Werkzeug
- HTML sanitization to prevent XSS
- File upload validation
- User authentication required for sensitive actions

##  Usage

1. **Register** a new account or **login** with existing credentials
2. **Create** your first post using the markdown editor
3. **Upload** images to make your posts more engaging
4. **Interact** with other posts by liking and commenting
5. **Manage** your posts from your profile page



## Configuration

Key configuration options in `app.py`:
- `SECRET_KEY`: Change this for production
- `UPLOAD_FOLDER`: Directory for uploaded images
- `MAX_CONTENT_LENGTH`: Maximum file upload size
- Database URI: Currently set to SQLite

