# SIL Assessment

A comprehensive React application that showcases user data, albums, and photos from the JSONPlaceholder API. Built with TypeScript, Tailwind CSS, Firebase Authentication, and modern React patterns.

## Features

### 🔐 Authentication
- Google Sign-in integration using Firebase Authentication
- Protected routes for authenticated users
- Persistent authentication state

### 📱 Pages & Functionality
- **Landing Page**: Public page explaining the application
- **Login Page**: Google authentication with Firebase
- **Users Page**: Lists all users with album counts (requires authentication)
- **User Detail Page**: Shows user information and their albums
- **Album Page**: Displays album photos
- **Photo Page**: View and edit photo titles with PATCH/PUT requests

### 🎨 UI/UX Features
- Responsive design for mobile, tablet, and desktop
- Modern UI with Tailwind CSS
- Loading states and error handling
- Breadcrumb navigation
- Clean, intuitive interface

### 🔧 Technical Features
- TypeScript for type safety
- React Router for navigation
- Axios for API calls
- Environment variables for configuration
- Unit tests with Vitest
- ESLint for code quality
- Hot module replacement (HMR)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Google authentication enabled

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SIL-Assessment
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. Run the development server:
```bash
npm run dev
# or
npm run demo
```

5. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run demo` - Alias for development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:ui` - Run tests with UI

## API Integration

The application consumes data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/), a free fake REST API for testing and prototyping.

### Endpoints Used:
- `GET /users` - Fetch all users
- `GET /users/:id` - Fetch specific user
- `GET /albums` - Fetch all albums
- `GET /users/:id/albums` - Fetch user's albums
- `GET /albums/:id` - Fetch specific album
- `GET /albums/:id/photos` - Fetch album photos
- `GET /photos/:id` - Fetch specific photo
- `PUT /photos/:id` - Update photo title

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout.tsx      # Main layout with navigation
│   ├── ProtectedRoute.tsx # Route protection
│   └── __tests__/      # Component tests
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── pages/              # Page components
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── UsersPage.tsx
│   ├── UserDetailPage.tsx
│   ├── AlbumPage.tsx
│   └── PhotoPage.tsx
├── services/           # API services
│   ├── api.ts         # API functions and types
│   └── __tests__/     # Service tests
├── firebase.ts        # Firebase configuration
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## Security Features

- Environment variables for sensitive configuration
- Protected routes requiring authentication
- Input validation and sanitization
- Error handling and user feedback
- Secure Firebase configuration

## Testing

The application includes unit tests for:
- API service functions
- React components
- Authentication context

Run tests with:
```bash
npm run test
```

## Deployment

The application is ready for deployment on platforms like:
- Vercel
- Netlify
- Heroku
- Firebase Hosting

Build the application:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for providing the test API
- [Firebase](https://firebase.google.com/) for authentication services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for the development framework