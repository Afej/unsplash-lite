# Unsplash Lite (Cowrywise)

A lightweight Unsplash-inspired photo gallery application built with Nuxt 3. Browse, search and view high-quality photos.

## Features

- Browse curated photo collections
- Search photos by keywords
- Responsive image grid layout
- Photo detail view with photographer info
- Fast and lightweight experience
- Image slider modal for photo details

## Tech Stack

- Nuxt 3
- Vue 3
- Tailwind CSS
- Unsplash API

## Prerequisites

- Node.js 16.x or later
- NPM or other package manager

## Setup

1. Clone the repository:

```bash
git clone https://github.com/afej/unsplash-lite.git
cd unsplash-lite
```

2. Install dependencies

```bash
#yarn
yarn install

#npm
npm install
```

3. Create .env file and add your Unsplash API credentials

```bash
NUXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_access_key_here
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
