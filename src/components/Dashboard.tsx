import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Vertical Navigation Bar */}
      <ul className="navbar">
        <img src="https://via.placeholder.com/100x100" alt="Placeholder" className="nav-pic" />
        <button
          onClick={() => {
            console.log("Dashboard button clicked");
          }}
          className="nav-btns"
        >
          Dashboard
        </button>
        <button
          onClick={() => {
            console.log("Daily Logs button clicked");
          }}
          className="nav-btns"
        >
          Daily Logs
        </button>
        <button
          onClick={() => {
            console.log("Weekly Summary button clicked");
          }}
          className="nav-btns"
        >
          Weekly Summary
        </button>
        <button
          onClick={() => {
            console.log("Bi-Weekly Summary button clicked");
          }}
          className="nav-btns"
        >
          Bi-Weekly Summary
        </button>
        <button
          onClick={() => {
            console.log("Yearly Summary button clicked");
          }}
          className="nav-btns"
        >
          Yearly Summary
        </button>
        <button
          onClick={() => {
            console.log("Custom Range button clicked");
          }}
          className="nav-btns"
        >
          Custom Range
        </button>

        {/* This spacer will push the items below it to the bottom */}
        <div className="navbar-spacer"></div>

        <button
          onClick={() => {
            console.log("Link Google Cal button clicked");
          }}
          className="nav-btns"
        >
          Link Google Cal
        </button>
        <button
          onClick={() => {
            console.log("Settings button clicked");
          }}
          className="nav-btns"
        >
          Settings
        </button>
      </ul>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="header">
          <h1>Welcome to the Dashboard</h1>
        </header>
        {/* Other dashboard content will go below the header */}
      </main>
    </div>
  );
}
export default Dashboard;
