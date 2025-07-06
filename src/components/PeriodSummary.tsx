import "./PeriodSummary.css";

interface PeriodSummaryProps {
  title: string;
  totalHours: number;
  entryCount: number;
  period: string;
}

function PeriodSummary({ title, totalHours, entryCount, period }: PeriodSummaryProps) {
  return (
    <div className="period-summary">
      <h3 className="summary-title">{title}</h3>
      <div className="summary-period">{period}</div>

      <div className="summary-stats">
        <div className="stat-item">
          <div className="stat-value">{totalHours.toFixed(1)}</div>
          <div className="stat-label">Total Hours</div>
        </div>

        <div className="stat-item">
          <div className="stat-value">{entryCount}</div>
          <div className="stat-label">Entries</div>
        </div>

        <div className="stat-item">
          <div className="stat-value">
            {entryCount > 0 ? (totalHours / entryCount).toFixed(1) : "0.0"}
          </div>
          <div className="stat-label">Avg Hours</div>
        </div>
      </div>
    </div>
  );
}

export default PeriodSummary;
