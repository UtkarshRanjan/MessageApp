# MessageApp

A lightweight, modern two-page website for displaying personalized messages.

## Features

- **Personalized Greeting**: Display a custom greeting with a configurable receiver name
- **Custom Message Page**: Show a personalized message on the second page
- **Modern Design**: Beautiful gradient background with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Easy Configuration**: Simply edit `config.json` to customize the content

## File Structure

```
MessageApp/
├── index.html       # First page with greeting
├── message.html     # Second page with custom message and photo carousel
├── style.css        # Modern styling
├── app.js          # JavaScript for dynamic content
├── config.js       # Configuration file
├── photos/         # Folder for photos (add your images here)
└── README.md       # This file
```

## Configuration

Edit `config.js` to customize the content:

```javascript
const config = {
    receiverName: "Friend",
    indexMessage: "Welcome to something special! ✨",
    customMessage: "Hope you're having an amazing day! 🌟",
    photos: [
        "photo1.jpg",
        "photo2.png"
    ]
};
```

- **receiverName**: The name that appears in the "Hi [name]!" greeting
- **indexMessage**: The message displayed below the greeting on the first page
- **customMessage**: The message displayed on the second page
- **photos**: Array of photo filenames from the `photos` folder

## Adding Photos

1. Place your photos in the `photos` folder
2. Add the filenames to the `photos` array in `config.js`
3. Photos will automatically appear in the carousel on the message page

## How to Use

1. Open `index.html` in your web browser
2. You'll see the greeting with the receiver's name
3. Click the "Continue" button to navigate to the message page
4. Use "Go Back" button to return to the first page

## Customization

To customize the appearance:
- Edit `style.css` to change colors, fonts, or layout
- Modify the gradient in the `body` selector to change the background
- Adjust padding, font sizes, and other properties as needed

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

No build process or dependencies required - just open `index.html` and start using!

## Deployment

Want to host this online and share as a URL? See **[DEPLOYMENT.md](DEPLOYMENT.md)** for step-by-step instructions on:
- 🌐 Hosting on GitHub Pages, Netlify, or Vercel (all free!)
- 🔗 Getting a shareable URL
- 📸 Managing photos when hosting online
- 🔒 Privacy considerations
