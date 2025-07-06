# Time Tracker App

A modern, responsive time tracking application built with React, TypeScript, and CSS Flexbox. This application allows users to log their work hours, view summaries across different time periods, and manage their time entries efficiently.

## Features

- **Dashboard Overview**: Quick statistics and recent entries
- **Daily Logs**: Detailed view of time entries for a specific day
- **Weekly Summary**: Overview of hours worked each day of the week
- **Bi-Weekly Summary**: Two-week period tracking
- **Monthly Summary**: Calendar view of monthly time entries
- **Yearly Summary**: Annual overview with monthly breakdowns
- **Custom Range Reports**: Flexible date range selection
- **Export Functionality**: Download time entries as JSON
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: CSS Flexbox (no external CSS frameworks)
- **State Management**: React hooks with localStorage persistence
- **Build Tool**: Vite
- **Development**: Hot reload development server

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Dashboard.tsx    # Main application layout
│   ├── EntryForm.tsx    # Add/edit time entry form
│   ├── EntryCard.tsx    # Individual time entry display
│   ├── PeriodSummary.tsx # Statistics summary component
│   └── NavigationControls.tsx # Period navigation
├── views/              # Main application views
│   ├── DashboardOverview.tsx # Dashboard home page
│   ├── DailyView.tsx   # Daily time entries
│   ├── WeeklyView.tsx  # Weekly summary
│   ├── MonthlyView.tsx # Monthly calendar view
│   ├── YearlyView.tsx  # Yearly overview
│   └── CustomRangeView.tsx # Custom date range
├── hooks/              # Custom React hooks
│   └── useTimeEntries.ts # Time entries state management
├── utils/              # Utility functions
│   └── dateUtils.ts    # Date manipulation helpers
├── types/              # TypeScript type definitions
│   └── index.ts        # Application interfaces
└── data/               # Mock data
    └── mockData.ts     # Sample time entries
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd time-tracker
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

### Building for Production

```bash
npm run build
```

## Usage

### Adding Time Entries

1. Click the "Add Entry" button in any view
2. Fill in the date, hours worked, and task description
3. Click "Add Entry" to save

### Viewing Time Entries

- **Dashboard**: Overview of today, this week, and this month
- **Daily Logs**: Navigate through days to see detailed entries
- **Weekly Summary**: View hours worked each day of the week
- **Monthly Summary**: Calendar view showing hours per day
- **Yearly Summary**: Monthly breakdown for the entire year
- **Custom Range**: Select any date range for custom reports

### Editing and Deleting

- Click the "Edit" button on any entry to modify it
- Click the "Delete" button to remove an entry (with confirmation)

### Exporting Data

- Use the Custom Range view to select entries
- Click "Export Data" to download as JSON file

### Navigation

- Use the Previous/Next buttons to navigate between periods
- Click "Today" to jump to the current period
- The navigation bar remains fixed for easy access to all views

## Data Persistence

Time entries are automatically saved to the browser's localStorage, so your data persists between sessions. The application includes sample data to demonstrate features when first loaded.

## Responsive Design

The application uses CSS Flexbox for responsive layouts that adapt to different screen sizes:

- **Desktop**: Full sidebar navigation with detailed views
- **Tablet**: Optimized layouts with adjusted spacing
- **Mobile**: Horizontal navigation bar with stacked layouts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
