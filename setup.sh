#!/bin/bash

echo "🤖 Welcome to Archie Setup!"
echo ""
echo "This script will help you configure your Anthropic API key."
echo ""
echo "If you don't have an API key yet:"
echo "1. Go to https://console.anthropic.com/"
echo "2. Sign up or log in"
echo "3. Create a new API key"
echo ""

# Check if .env already exists
if [ -f .env ]; then
    echo "⚠️  .env file already exists!"
    read -p "Do you want to overwrite it? (y/n): " overwrite
    if [ "$overwrite" != "y" ]; then
        echo "Setup cancelled."
        exit 0
    fi
fi

# Prompt for API key
read -p "Enter your Anthropic API Key: " api_key

if [ -z "$api_key" ]; then
    echo "❌ No API key provided. Setup cancelled."
    exit 1
fi

# Create .env file
cat > .env << EOF
ANTHROPIC_API_KEY=$api_key
PORT=3000
EOF

echo ""
echo "✅ Setup complete!"
echo ""
echo "Your .env file has been created."
echo ""
echo "To start Archie, run:"
echo "  npm start"
echo ""
echo "Then open your browser to: http://localhost:3000"
echo ""
