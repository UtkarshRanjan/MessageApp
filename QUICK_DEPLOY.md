# Quick Deploy Commands

Copy and paste these commands to deploy your website to GitHub!

---

## Step 1: Open Command Prompt

1. Press `Win + R`
2. Type `cmd` and press Enter
3. Navigate to your project:
   ```bash
   cd d:\Programming\MessageApp
   ```

---

## Step 2: Initialize Git and Add Files

```bash
git init
git add .
git commit -m "Initial commit - MessageApp with photos"
```

---

## Step 3: Create GitHub Repository

1. Go to: **https://github.com/new**
2. Repository name: `messageapp`
3. Set to **Public**
4. Click **"Create repository"**

---

## Step 4: Push to GitHub

**Copy these commands** (replace `YOUR-USERNAME` with your GitHub username):

```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/messageapp.git
git push -u origin main
```

You'll be prompted for:
- **Username**: Your GitHub username
- **Password**: Use a Personal Access Token (not your password!)
  - Get token here: https://github.com/settings/tokens

---

## Step 5: Enable GitHub Pages

1. Go to your repository: `https://github.com/YOUR-USERNAME/messageapp`
2. Click **Settings** tab
3. Click **Pages** in left sidebar
4. Under "Source", select **main** branch
5. Click **Save**

Wait 1-2 minutes, then your site will be live at:
**`https://YOUR-USERNAME.github.io/messageapp/`**

---

## Update Website Later

When you change photos or text:

```bash
cd d:\Programming\MessageApp
git add .
git commit -m "Update photos and message"
git push
```

Changes will appear on your website in 1-2 minutes!

---

## All Commands in One Block

```bash
# Navigate to project
cd d:\Programming\MessageApp

# Initialize and commit
git init
git add .
git commit -m "Initial commit - MessageApp with photos"

# Connect to GitHub (replace YOUR-USERNAME)
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/messageapp.git
git push -u origin main
```

---

## ✅ Checklist

- [ ] Git installed (`git --version` to check)
- [ ] GitHub account created
- [ ] Photos added to `photos` folder
- [ ] `config.js` updated with photo names
- [ ] Tested locally (open `index.html` in browser)
- [ ] Commands run successfully
- [ ] GitHub Pages enabled
- [ ] Website is live!

---

## Your Website URL

After GitHub Pages is enabled, your URL will be:

```
https://YOUR-USERNAME.github.io/messageapp/
```

Replace `YOUR-USERNAME` with your actual GitHub username!
