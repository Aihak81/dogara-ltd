# Dogara Oil & Gas Ltd - Website

A modern, professional website for Dogara Oil & Gas Ltd, a leading energy solutions provider in Nigeria specializing in LNG, CNG, Diesel, and Petrol supply.

## Features

### Public Pages
- **Home** - Hero section, product overview, why choose us, services preview
- **About** - Company story, mission, vision, values, and leadership
- **Products** - LNG, CNG, Diesel, and Petrol product pages with detailed information
- **Services** - Comprehensive energy services including supply, distribution, and consultancy
- **Partners** - Partner company showcase and partnership information
- **CEO Profile** - Leadership profile and company vision
- **Blog** - Industry insights and news articles
- **Contact** - Contact form and company information
- **Quote Request** - Request quotes for products and services
- **Track Order** - Order tracking functionality
- **Login** - User authentication

### Dashboard Pages (Authenticated Users)
- **Dashboard Home** - Overview with quotes, orders, and notifications
- **My Orders** - View and track all orders
- **My Quotes** - View and track quote requests
- **Customers** - Customer management (coming soon)
- **Settings** - Account settings (coming soon)
- **Track Order** - Order tracking from dashboard

### Admin Pages (Admin Users Only)
- **Admin Dashboard** - Overview of quotes, orders, customers, and revenue
- **Quotes Management** - Manage customer quote requests
- **Orders Management** - Manage customer orders
- **Customers Management** - Manage customer accounts
- **Analytics** - Business analytics and reports
- **Blog Management** - Manage blog posts

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom components
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Database**: Supabase (configured but requires setup)
- **Email**: Resend (for transactional emails)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dogara
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials and other environment variables.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── admin/             # Admin dashboard pages
│   ├── blog/              # Blog page
│   ├── ceo/               # CEO profile page
│   ├── contact/           # Contact page
│   ├── dashboard/         # User dashboard pages
│   │   ├── customers/     # Customer management
│   │   ├── orders/        # Orders management
│   │   ├── quotes/        # Quotes management
│   │   ├── settings/      # User settings
│   │   └── tracking/      # Order tracking
│   ├── home/              # Home page
│   ├── login/             # Login page
│   ├── partners/          # Partners page
│   ├── products/          # Products pages
│   ├── quote/             # Quote request page
│   ├── services/          # Services page
│   └── track-order/       # Public order tracking
├── components/            # Reusable components
│   ├── dashboard/         # Dashboard-specific components
│   ├── forms/             # Form components
│   ├── layout/            # Layout components (Navbar, Footer)
│   ├── sections/          # Page sections
│   └── ui/                # UI components (Button, Card, etc.)
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── email/             # Email utilities
│   ├── supabase/          # Supabase client setup
│   ├── utils/             # General utilities
│   └── validations/       # Form validation schemas
└── types/                 # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run db:generate` - Generate Supabase types
- `npm run db:push` - Push database schema to Supabase

## Key Features

### Design System
- Custom color palette with primary navy and gold accents
- Responsive design for mobile, tablet, and desktop
- Smooth animations and transitions using Framer Motion
- Consistent typography and spacing

### User Experience
- Intuitive navigation with mobile-responsive menu
- Fast page loads with Next.js optimization
- Form validation with real-time feedback
- Accessible components following WCAG guidelines

### Business Features
- Quote request system with product selection
- Order tracking with real-time status updates
- Customer dashboard for managing quotes and orders
- Admin dashboard for business management
- Contact forms with validation
- Blog section for content marketing

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Self-hosted with Docker

## Environment Variables

Required environment variables (see `.env.example`):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email (Resend)
RESEND_API_KEY=your_resend_api_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary and confidential. All rights reserved.

## Contact

For support or inquiries:
- Email: info@dogaraoilandgas.com
- Phone: +234 800 000 0000
- Address: Lagos, Nigeria

---

Built with ❤️ for Dogara Oil & Gas Ltd