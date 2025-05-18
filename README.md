# CineVerse - Your Movie Portal 🎬

A modern, responsive movie discovery platform built with React and powered by TMDB API. Browse trending movies, search for your favorites, and create your personal watchlist.

![CineVerse Screenshot](https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg)

## Features

- 🎥 Browse trending, popular, and upcoming movies
- 🔍 Search movies with real-time results
- ⭐ View detailed movie information including cast, ratings, and trailers
- 💖 Save favorite movies to your personal collection
- 🌓 Dark mode support
- 📱 Fully responsive design
- 🚀 Fast and optimized performance

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- TMDB API
- Lucide React Icons

## Getting Started

### Prerequisites

- Node.js 18 or higher
- TMDB API key (get one at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cineverse.git
   cd cineverse
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your TMDB API key:
   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── api/          # API integration
├── components/   # Reusable components
├── context/      # React context providers
├── hooks/        # Custom React hooks
├── pages/        # Page components
└── types/        # TypeScript type definitions
```

## Features in Detail

### Movie Discovery
- Trending movies section
- Popular movies listing
- Top-rated movies
- Upcoming releases
- Genre-based browsing

### Movie Details
- High-quality movie posters and backdrops
- Cast information
- Movie trailers
- Similar movie recommendations
- Runtime, release date, and ratings

### User Features
- Favorite movies collection
- Recently viewed movies history
- Dark/Light theme toggle
- Responsive search functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Icons by [Lucide](https://lucide.dev/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)

## Disclaimer
The project was done mostly through vibe coding.
