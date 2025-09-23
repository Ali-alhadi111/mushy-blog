#!/usr/bin/env python3
"""
Demo script to create sample data for the Fun Blog Platform
Run this after starting the application to populate it with sample content
"""

from app import app, db, User, Post, Comment, Like
from werkzeug.security import generate_password_hash
from datetime import datetime

def create_demo_data():
    with app.app_context():
        # Create database tables
        db.create_all()
        
        # Check if demo user already exists
        demo_user = User.query.filter_by(username='demo_user').first()
        if demo_user:
            print("Demo user already exists. Skipping demo data creation.")
            return
        
        print("🎉 Creating demo data...")
        
        # Create demo user
        demo_user = User(
            username='demo_user',
            email='demo@example.com',
            password_hash=generate_password_hash('demo123')
        )
        db.session.add(demo_user)
        db.session.commit()
        
        # Create sample posts
        sample_posts = [
            {
                'title': 'Welcome to FunBlog! 🚀',
                'content': '''# Welcome to FunBlog!

This is your first post on our amazing blog platform! Here's what you can do:

## Features
- **Write posts** using Markdown
- **Upload images** to make your posts more engaging
- **Like and comment** on other posts
- **Customize** your profile

## Getting Started
1. Create your account
2. Write your first post
3. Share your thoughts with the community!

> "The best way to learn is by sharing what you know!" - Anonymous

Happy blogging! 🎉'''
            },
            {
                'title': 'Markdown Tips & Tricks ✨',
                'content': '''# Markdown Tips & Tricks

Here are some useful Markdown features you can use in your posts:

## Text Formatting
- **Bold text** with double asterisks
- *Italic text* with single asterisks
- ~~Strikethrough~~ with double tildes

## Lists
### Unordered List
- Item 1
- Item 2
  - Nested item
  - Another nested item

### Ordered List
1. First item
2. Second item
3. Third item

## Code
Inline `code` with backticks.

```python
# Code blocks with syntax highlighting
def hello_world():
    print("Hello, FunBlog!")
    return "Welcome to the community!"
```

## Links and Images
[Visit our homepage](https://example.com)

## Blockquotes
> This is a blockquote. Perfect for highlighting important information or quotes.

---

Happy writing! 📝'''
            },
            {
                'title': 'Building a Community Together 🌟',
                'content': '''# Building a Community Together

Blogging is not just about writing - it's about building connections and sharing knowledge.

## Why Community Matters
- **Learning**: We learn from each other's experiences
- **Support**: We help each other grow
- **Inspiration**: We inspire and get inspired
- **Fun**: We have fun together!

## How to Engage
1. **Write regularly** - Share your thoughts and experiences
2. **Comment thoughtfully** - Engage with other posts
3. **Like posts** - Show appreciation for good content
4. **Be respectful** - Create a positive environment

## Tips for Great Posts
- Write from the heart
- Use images to illustrate your points
- Keep paragraphs short and readable
- Ask questions to encourage discussion

Remember: Every expert was once a beginner. Don't be afraid to share your journey! 

*What's your favorite thing about blogging? Let us know in the comments!* 💬'''
            }
        ]
        
        for i, post_data in enumerate(sample_posts):
            post = Post(
                title=post_data['title'],
                content=post_data['content'],
                content_html=post_data['content'],  # In a real app, this would be processed
                user_id=demo_user.id,
                created_at=datetime.utcnow()
            )
            db.session.add(post)
        
        db.session.commit()
        
        # Create some sample comments
        posts = Post.query.all()
        if posts:
            sample_comments = [
                "Great post! Thanks for sharing! 👍",
                "This is really helpful information.",
                "I love the design of this blog platform!",
                "Looking forward to more posts like this!",
                "Thanks for the tips! Very useful."
            ]
            
            for i, comment_text in enumerate(sample_comments):
                if i < len(posts):
                    comment = Comment(
                        content=comment_text,
                        user_id=demo_user.id,
                        post_id=posts[i].id
                    )
                    db.session.add(comment)
            
            db.session.commit()
        
        print("✅ Demo data created successfully!")
        print("📝 Demo user created:")
        print("   Username: demo_user")
        print("   Password: demo123")
        print("   Email: demo@example.com")
        print("\n🎯 You can now:")
        print("   1. Login with the demo account")
        print("   2. View the sample posts")
        print("   3. Create your own account")
        print("   4. Start writing your own posts!")

if __name__ == '__main__':
    create_demo_data()

