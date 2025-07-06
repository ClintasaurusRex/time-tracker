import "./EmptyState.css";

interface EmptyStateProps {
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
}

function EmptyState({ title, message, actionText, onAction }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-icon">📝</div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-message">{message}</p>

      {actionText && onAction && (
        <button onClick={onAction} className="empty-action-btn">
          {actionText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
