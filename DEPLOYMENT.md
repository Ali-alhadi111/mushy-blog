# 🚀 Deployment Guide for Mushy Blog

## 📋 Prerequisites

- Python 3.7 or higher
- pip (Python package installer)
- Git

## 🛠️ Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/mushy-blog.git
   cd mushy-blog
   ```

2. **Create virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python app.py
   ```

5. **Access the website**
   Open your browser and go to `http://localhost:5002`

## 🌐 Production Deployment

### Option 1: Heroku

1. **Install Heroku CLI**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables**
   ```bash
   heroku config:set SECRET_KEY=your-secret-key-here
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Option 2: Railway

1. **Connect GitHub repository to Railway**
2. **Set environment variables in Railway dashboard**
3. **Deploy automatically on push**

### Option 3: DigitalOcean App Platform

1. **Connect GitHub repository**
2. **Configure build settings**
3. **Set environment variables**
4. **Deploy**

## 🔧 Environment Variables

For production, set these environment variables:

```bash
SECRET_KEY=your-super-secret-key-here
DATABASE_URL=your-database-url
FLASK_ENV=production
```

## 📝 Notes

- The application uses SQLite by default (good for development)
- For production, consider using PostgreSQL or MySQL
- Make sure to set a strong SECRET_KEY
- The application runs on port 5002 by default
- Uploads are stored in `static/uploads/` directory

## 🎯 Features

- User authentication (signup, login, logout)
- Rich markdown editor with live preview
- Image upload with drag & drop
- Comments and likes system
- Responsive design
- Modern UI with animations

## 📞 Support

If you encounter any issues, please create an issue in the GitHub repository.
