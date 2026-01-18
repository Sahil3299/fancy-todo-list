# Fancy Todo List

A modern, feature-rich todo list application built with React and Material-UI.

## Features

- Create and manage multiple todo lists
- Add, edit, and delete todo items
- Persistent storage using IndexedDB
- Responsive Material-UI design
- Real-time updates with SWR

## Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **Database**: IndexedDB (via Dexie)
- **State Management**: React Context + SWR
- **Styling**: Emotion (CSS-in-JS)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fancy-todo-list
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint for code linting
- `npm run preview` - Preview the production build locally

## Project Structure

```
src/
├── components/
│   ├── AllTodoLists.jsx      # Sidebar with all todo lists
│   ├── App.jsx               # Main app component
│   ├── AppHeader.jsx         # Application header
│   ├── CurrentTodoList.jsx   # Main todo list view
│   └── NewListDialog.jsx     # Dialog for creating new lists
├── hooks/
│   ├── useTodoList.js        # Hook for individual todo list operations
│   └── useTodoLists.js       # Hook for managing multiple lists
├── providers/
│   └── AppState.jsx          # Global state provider
└── utils.js                  # Utility functions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is private and not licensed for public use.