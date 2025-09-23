#!/usr/bin/env python3
"""
Simple startup script for the Fun Blog Platform
"""

from app import app

if __name__ == '__main__':
    print("🚀 Starting Mushy Blog...")
    print("📝 Open your browser and go to: http://localhost:5002")
    print("🛑 Press Ctrl+C to stop the server")
    print("-" * 50)
    
    app.run(debug=True, host='0.0.0.0', port=5002)
