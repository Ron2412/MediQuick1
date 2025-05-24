# MediQuick Health App

A modern, AI-powered health assistance application built with Next.js, React, and JavaScript. MediQuick provides symptom analysis, health recommendations, and connects users with healthcare professionals.

## Features

- 🤖 AI-powered symptom analysis
- 🚦 Smart triage system (Green/Yellow/Red urgency levels)
- 📊 Health dashboard with analytics
- 🏥 Nearby doctors finder
- 📱 Responsive design for all devices
- 🎨 Modern UI with Tailwind CSS
- ♿ Accessibility-focused design

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Charts**: Recharts
- **Fonts**: Inter (body) + Poppins (headings)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd mediquick-health-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
mediquick-health-app/
├── app/                    # Next.js App Router pages
│   ├── app/               # Main health app
│   ├── landing/           # Landing page
│   ├── layout.jsx         # Root layout
│   └── page.jsx           # Home page
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── landing/          # Landing page components
│   └── [feature-components]
├── lib/                  # Utility functions
└── public/              # Static assets
\`\`\`

## Pages

- **Home** (`/`) - Welcome page with navigation options
- **Landing Page** (`/landing`) - Marketing landing page
- **Health App** (`/app`) - Main application interface

## Key Components

### Main App Components
- `ChatbotPanel` - AI symptom analyzer interface
- `BMIPanel` - BMI calculator and status display
- `TriageResultCard` - Urgency level display
- `Dashboard` - Health analytics and history
- `NearbyDoctors` - Healthcare provider finder

### Landing Page Components
- `HeroSection` - Main value proposition
- `FeatureSection` - Key features showcase
- `HowItWorksSection` - Step-by-step process
- `TestimonialSection` - User testimonials
- `FaqSection` - Frequently asked questions

## Design System

### Colors
- **Primary**: Emerald/Mint green (`emerald-500`)
- **Urgency Levels**: 
  - Green: Self-care recommended
  - Yellow: Clinic visit advised  
  - Red: Emergency care needed

### Typography
- **Headings**: Poppins (font-heading)
- **Body**: Inter (font-sans)

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Components

1. Create component in appropriate directory
2. Use JavaScript ES6+ syntax
3. Follow existing naming conventions
4. Include proper accessibility attributes
5. Use Tailwind CSS for styling

## Deployment

The app is ready for deployment on Vercel, Netlify, or any platform supporting Next.js.

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Disclaimer

**Important**: MediQuick is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
\`\`\`

```gitignore file=".gitignore"
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# javascript
*.tsbuildinfo
next-env.d.ts
