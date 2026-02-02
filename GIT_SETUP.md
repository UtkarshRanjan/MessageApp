# Git Setup Guide

## Initial Setup (First Time Only)

### 1. Initialize Git Repository

Open Command Prompt or PowerShell in your project folder and run:

```bash
git init
```

### 2. Add All Files (Including Photos Folder)

```bash
git add .
```

This command adds ALL files including:
- HTML, CSS, JS files
- config.js
- photos folder and everything inside it
- README files

### 3. Commit Your Files

```bash
git commit -m "Initial commit with photos"
```

### 4. Create GitHub Repository

1. Go to: https://github.com/new
2. Name: `messageapp` (or any name)
3. Set to **Public** (for GitHub Pages) or **Private**
4. **DO NOT** initialize with README (you already have files)
5. Click "Create repository"

### 5. Connect to GitHub and Push

```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/messageapp.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

---

## Adding Photos Later

If you add photos to the `photos` folder after the initial commit:

### Option 1: Add All New Files

```bash
git add .
git commit -m "Add new photos"
git push
```

### Option 2: Add Photos Folder Specifically

```bash
git add photos/
git commit -m "Add new photos"
git push
```

### Option 3: Add Specific Photo

```bash
git add photos/birthday.jpg
git commit -m "Add birthday photo"
git push
```

---

## Common Git Commands

### Check Status (See what's changed)
```bash
git status
```

### Add All Changes
```bash
git add .
```

### Commit Changes
```bash
git commit -m "Your message here"
```

### Push to GitHub
```bash
git push
```

### View Git History
```bash
git log --oneline
```

---

## Complete Example Workflow

Here's a complete example of adding photos and pushing to GitHub:

```bash
# 1. Navigate to your project folder
cd d:\Programming\MessageApp

# 2. Check current status
git status

# 3. Add photos (if you added new ones)
git add photos/

# 4. Add config.js (if you updated photo list)
git add config.js

# 5. Commit with a message
git commit -m "Add photos and update config"

# 6. Push to GitHub
git push
```

---

## Troubleshooting

### If Git is not recognized:
1. Install Git from: https://git-scm.com/downloads
2. Restart Command Prompt/PowerShell after installation

### If you get authentication errors:
- GitHub now requires Personal Access Token instead of password
- Create token: https://github.com/settings/tokens
- Use token as password when prompted

### If photos folder is empty:
- Git doesn't track empty folders
- Add at least one photo or a `.gitkeep` file:
  ```bash
  echo. > photos/.gitkeep
  ```

---

## Privacy Note

⚠️ **Important**: When you push to a **public** GitHub repository:
- Anyone can see your code
- Anyone can see photos in the `photos` folder
- Anyone can download them

### To keep photos private:
1. Use a **Private** repository on GitHub
2. Or use `.gitignore` to exclude photos (see below)

---

## Excluding Photos from Git (Optional)

If you want to keep photos private and NOT upload them to GitHub:

### Create `.gitignore` file:

```bash
echo photos/* > .gitignore
echo !photos/README.md >> .gitignore
```

This will:
- ✅ Ignore all files in photos folder
- ✅ But keep the photos/README.md file
- ❌ Photos won't be uploaded to GitHub

Then use external image hosting (Imgur, ImgBB) and reference URLs in `config.js`.

---

## Quick Reference Card

| Task | Command |
|------|---------|
| Initialize repo | `git init` |
| Add all files | `git add .` |
| Add photos folder | `git add photos/` |
| Commit changes | `git commit -m "message"` |
| Push to GitHub | `git push` |
| Check status | `git status` |
| View history | `git log` |

---

## Need Help?

If you encounter any issues:
1. Check `git status` to see what's happening
2. Make sure you're in the correct folder
3. Verify Git is installed: `git --version`
