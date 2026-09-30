# BookHub

A modern, user-friendly book discovery and management platform built with Next.js and React. A frontend-focused application where you can explore, organize, and keep track of books you love.

## What is BookHub?

BookHub is your personal digital library companion. Whether you're an avid reader looking to organize your collection, discover new bestsellers, or simply keep track of books you want to read—BookHub makes it all easy and enjoyable.

Browse curated collections, create personalized bookshelves, and manage your reading journey all in one beautiful place.

## Key Features

- **Browse Books** - Discover a vast collection of books with detailed information
- **Top-Rated Books** - See what's trending and highly recommended by readers
- **Personal Bookshelves** - Create custom collections to organize your books
- **Secure Authentication** - Sign up and log in to keep your personal library safe
- **Responsive Design** - Enjoy BookHub on desktop, tablet, or mobile
- **Beautiful Interface** - Intuitive and clean design for easy navigation

## Quick Start

### Prerequisites
- Node.js 18+ installed on your computer

### Installation & Setup

1. **Clone or download the project**
   ```bash
   cd my-book-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open BookHub**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser
   - Start exploring books!

### Other Useful Commands

```bash
# Build for production
npm run build

# Start production server
npm start

# Run code quality checks
npm run lint
```

## Project Structure

```
my-book-hub/
├── app/                    # Main application pages and Next.js routes
│   ├── api/               # Frontend API route handlers
│   ├── books/             # Book browsing pages
│   ├── bookshelves/       # Bookshelf management
│   ├── shelves/           # Shelf organization
│   ├── login/             # User authentication UI
│   └── about/             # About page
├── components/            # Reusable React components
│   ├── BookCard.tsx       # Individual book display
│   ├── BookDetails.tsx    # Detailed book information
│   ├── Header.tsx         # Navigation header
│   └── ...               # Other UI components
├── lib/                   # Frontend utility functions
│   └── auth.ts           # Authentication logic
├── types/                 # TypeScript type definitions
└── public/               # Static assets (images, etc.)
```

## Tech Stack

BookHub is built with modern frontend technologies:

- **[Next.js 16](https://nextjs.org/)** - React framework for production-ready web applications
- **[React 19](https://react.dev/)** - Build interactive user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Beautiful, utility-first styling

## How to Navigate

- **Home** - Your dashboard with featured and recommended books
- **Browse** - Explore the full collection of available books
- **Top Rated** - Discover the most loved books by our community
- **My Bookshelves** - Organize and manage your personal book collections
- **About** - Learn more about BookHub

## Authentication

BookHub includes a user authentication interface so you can:
- Create a personal account
- Save your favorite books
- Create multiple bookshelves for different reading goals
- Keep your reading list organized

## Development

### Project Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create optimized production build
- `npm start` - Run production server
- `npm run lint` - Check code quality and style

### Making Changes

The app auto-reloads when you edit files, so you can see changes instantly while developing. Most page changes require editing files in the `app/` directory.

## Contributing

We welcome contributions! If you'd like to:
- Report a bug
- Suggest a feature
- Improve the code
- Enhance the design

Feel free to fork, make your changes, and submit improvements!

## Learn More

Want to understand the technologies behind BookHub?

- [Next.js Documentation](https://nextjs.org/docs) - Comprehensive Next.js guide
- [React Documentation](https://react.dev/) - Learn React
- [TypeScript Guide](https://www.typescriptlang.org/docs/) - Type-safe JavaScript
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Styling framework

## Happy Reading!

BookHub is designed to make your reading journey more enjoyable. Start exploring books today and build your perfect library!
