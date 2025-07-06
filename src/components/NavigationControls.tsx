import './NavigationControls.css';

interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  currentPeriod: string;
}

function NavigationControls({ onPrevious, onNext, onToday, currentPeriod }: NavigationControlsProps) {
  return (
    <div className="navigation-controls">
      <button onClick={onPrevious} className="nav-btn nav-btn-prev">
        ← Previous
      </button>
      
      <div className="current-period">
        <span className="period-text">{currentPeriod}</span>
        <button onClick={onToday} className="today-btn">
          Today
        </button>
      </div>
      
      <button onClick={onNext} className="nav-btn nav-btn-next">
        Next →
      </button>
    </div>
  );
}

export default NavigationControls;
