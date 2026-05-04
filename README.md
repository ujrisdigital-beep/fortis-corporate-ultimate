# FORTIS INVICTA LTD - Corporate Website

A Next.js corporate website for FORTIS INVICTA LTD, featuring:

- Responsive design for mobile and desktop
- Multiple pages: Home, About, Services, Projects, Gallery, Blog, Contact
- Resources section with dynamic routing
- Subscription plans page
- Supabase integration for contact form
- Security features with email validation

## Deployment

This project is configured for Vercel deployment with support for:
- `fortisinvicta.com`
- `fortisos.cloud`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Building for Production

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
src/
  pages/          # Next.js pages
    resources/     # Dynamic resource pages
      [slug].jsx   # Dynamic route for resources like /resources/nawec
  components/      # Reusable components
  lib/            # Utility functions and configurations
  styles/         # Global styles
public/           # Static assets
```
