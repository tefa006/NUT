@echo off
echo ========================================
echo Uploading Create Your Own Kit to GitHub
echo ========================================
echo.

cd /d "f:\NUT CREATE YOUR OWN KIT\CascadeProjects\windsurf-project"

echo Step 1: Initializing Git repository...
git init

echo.
echo Step 2: Adding all files...
git add .

echo.
echo Step 3: Creating initial commit...
git commit -m "Initial commit: Create Your Own Kit Shopify App"

echo.
echo Step 4: Setting main branch...
git branch -M main

echo.
echo Step 5: Adding GitHub remote...
git remote add origin https://github.com/tefa006/NUT.git

echo.
echo Step 6: Pushing to GitHub...
git push -u origin main --force

echo.
echo ========================================
echo Upload Complete!
echo ========================================
echo.
echo Your project is now on GitHub at:
echo https://github.com/tefa006/NUT
echo.
echo Next steps:
echo 1. Go to railway.app
echo 2. Create new project from GitHub
echo 3. Select tefa006/NUT repository
echo.
pause
