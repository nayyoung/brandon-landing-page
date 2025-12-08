# Brandon Young - Real Estate Landing Page

A modern, responsive landing page for Brandon Young, a Seattle-based real estate broker specializing in helping creatives, founders, and entrepreneurs navigate the real estate market.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- ⚡ Built with React 19 and Vite for optimal performance
- 📱 Mobile-first approach with smooth animations
- 📧 Contact form with Supabase integration and email fallback
- 🎯 Optimized for conversion with clear CTAs
- ♿ Accessibility-focused design
- 📊 Analytics integration with Vercel Analytics

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (for lead capture)
- **Icons**: Lucide React
- **Hosting**: Vercel
- **Analytics**: Vercel Analytics

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/nayyoung/brandon-landing-page.git
   cd brandon-landing-page
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional - for Supabase integration)
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   Note: The contact form will fall back to email if Supabase is not configured.

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## Project Structure

```
brandon-landing-page/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── Navigation.tsx   # Header navigation
│   ├── Hero.tsx         # Hero section
│   ├── Story.tsx        # About/story section
│   ├── Audience.tsx     # Target audience section
│   ├── Contact.tsx      # Contact form
│   └── Footer.tsx       # Footer
├── lib/                 # Utilities and configurations
│   └── supabase.ts      # Supabase client
├── public/              # Static assets
├── constants.ts         # Shared constants
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main app component
├── index.tsx            # App entry point
├── index.css            # Global styles
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Configuration

### Tailwind CSS
Custom colors and fonts are configured in `tailwind.config.js`:
- **Copper theme** for brand colors
- **Charcoal theme** for dark backgrounds
- **Custom fonts**: Syne (display) and Manrope (body)

### Contact Configuration
Contact email and email templates are centralized in `constants.ts` for easy updates.

## Deployment

This project is configured for deployment on Vercel with automatic routing handled by `vercel.json`.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nayyoung/brandon-landing-page)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

All rights reserved © Brandon Young
