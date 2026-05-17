# Netlify Deployment Guide

## Environment Variables

The following environment variables should be configured in Netlify:

### Required Variables
- `NODE_ENV`: Set to `production` (automatically set by Netlify)

### Optional Variables
- `DATABASE_URL`: If you plan to use a database (currently using SQLite, which is not recommended for Netlify)

## Deployment Steps

1. **Push your code to Git** (GitHub, GitLab, or Bitbucket)

2. **Connect your repository to Netlify**
   - Go to Netlify dashboard
   - Click "Add new site" → "Import an existing project"
   - Select your Git provider and repository

3. **Configure build settings** (already configured in netlify.toml)
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

4. **Set environment variables** in Netlify dashboard under Site Settings → Environment Variables

5. **Deploy** - Netlify will automatically deploy on push to your main branch

## Notes

- The project uses Bun as a package manager locally, but Netlify uses npm/yarn by default
- The build script has been updated to use standard Next.js commands that work on Netlify
- SQLite database is not recommended for Netlify due to ephemeral file system. Consider using:
  - PostgreSQL (recommended)
  - MySQL
  - MongoDB Atlas
  - Supabase
  - PlanetScale

## Troubleshooting

If you encounter build errors:
1. Check the build logs in Netlify dashboard
2. Ensure all dependencies are properly installed
3. Verify environment variables are set correctly
4. Check that the Node version matches (Node 18)
