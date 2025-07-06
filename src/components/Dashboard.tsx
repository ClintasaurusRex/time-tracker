import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Vertical Navigation Bar */}
      <ul className="navbar">
        <li className="nav-items">Dashboard</li>
        <li className="nav-items">Daily Logs</li>
        <li className="nav-items">Weekly Summary</li>
        <li className="nav-items">Bi-Weekly Summary</li>
        <li className="nav-items">Yearly Summary</li>
        <li className="nav-items">Custom Range</li>
        <li className="nav-items">Link Google Cal</li>
        <li className="nav-items">Settings</li>
      </ul>

      <div className="header">
        <header>
          <h1>Welcome to the Dashboard</h1>
        </header>
      </div>
    </div>
  );
}
export default Dashboard;
