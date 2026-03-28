# 🚀 Quick Start Guide

## Getting Your Chaos & Attractors Site Running

This guide will walk you through getting the site running on your local machine in just a few minutes!

### Prerequisites

Make sure you have **Node.js** installed (version 18 or higher):
- Check: Open terminal and run `node --version`
- If not installed: Download from [nodejs.org](https://nodejs.org/)

---

### Step 1: Navigate to the Project

```bash
cd chaos-attractors
```

### Step 2: Install Dependencies

This downloads all the required packages (Next.js, React, Tailwind, etc.):

```bash
npm install
```

**What's happening?**
- npm reads `package.json`
- Downloads all libraries to `node_modules/`
- Takes 1-2 minutes

### Step 3: Start Development Server

```bash
npm run dev
```

**You should see:**
```
✓ Ready in 2.3s
○ Local:   http://localhost:3000
```

### Step 4: Open in Browser

Open your browser and go to:
```
http://localhost:3000
```

🎉 **You should see your chaos attractors site!**

---

## What You Should See

### Homepage
- Animated particle background
- Large gradient title "Chaos & Attractors"
- Two buttons: "Explore Attractors" and "Learn the Theory"

### Interactive Section
- Toggle between Lorenz and Rössler attractors
- Play/Pause, Reset, and Info controls
- Beautiful animated 3D visualizations

---

## Troubleshooting

### Port Already in Use?

If you see "Port 3000 is already in use":

```bash
# Kill the process using port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Dependencies Won't Install?

Try deleting `node_modules` and `package-lock.json`:

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors?

Make sure you're using Node.js 18+:
```bash
node --version
```

### Canvas Not Showing?

- Check browser console (F12) for errors
- Make sure you're using a modern browser (Chrome, Firefox, Safari, Edge)
- Try refreshing the page (Cmd+R or Ctrl+R)

---

## Making Changes

The development server has **hot reload** - your changes appear instantly!

### Try These Experiments:

1. **Change Colors** (app/globals.css):
   ```css
   --chaos-blue: #00d4ff;  /* Try #ff0000 for red */
   ```

2. **Change Animation Speed** (components/LorenzAttractor.tsx):
   ```typescript
   const rotationSpeed = 0.003  // Try 0.01 for faster
   ```

3. **Change Text** (app/page.tsx):
   ```typescript
   <h1>Your Custom Title</h1>
   ```

Save the file and watch it update in your browser! ✨

---

## Building for Production

When ready to deploy:

```bash
# Create optimized production build
npm run build

# Test the production build locally
npm start
```

---

## Next Steps

1. **Read the LEARNING_GUIDE.md** - Detailed explanation of how everything works
2. **Experiment** - Change colors, speeds, text
3. **Add Features** - Follow the suggestions in README.md
4. **Deploy** - Use Vercel, Netlify, or your preferred host

---

## File Structure Quick Reference

```
chaos-attractors/
├── app/
│   ├── page.tsx           ← Main page content
│   ├── layout.tsx         ← Site wrapper
│   └── globals.css        ← Styles and animations
├── components/
│   ├── LorenzAttractor.tsx  ← Butterfly attractor
│   └── RosslerAttractor.tsx ← Spiral attractor
└── package.json           ← Dependencies
```

---

## Commands Reference

| Command | What It Does |
|---------|--------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Check code quality |

---

## Getting Help

- **React Docs**: https://react.dev
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

---

**Happy coding! 🎨✨**
