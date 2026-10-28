import { CalendarDays, Check, Trash2 } from 'lucide-react';
import { memo } from 'react';
import CardWrapper from './CardWrapper.jsx';

function TaskCard({ task, onToggle, onDelete }) {
  const created = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(task.createdAt));

  return (
    <CardWrapper className={`task-card ${task.completed ? 'completed' : ''}`} as="article">
      <button className="check-button" onClick={() => onToggle(task.id)} aria-label={task.completed ? `Mark ${task.title} incomplete` : `Mark ${task.title} complete`}>
        {task.completed && <Check size={15} strokeWidth={3} />}
      </button>
      <div className="task-body">
        <div className="task-title-row">
          <h3>{task.title}</h3>
          {task.priority === 'high' && <span className="priority-badge high">High priority</span>}
          {task.priority !== 'high' && <span className={`priority-badge ${task.priority}`}>{task.priority}</span>}
        </div>
        {task.description ? <p>{task.description}</p> : <p className="muted-copy">No description added.</p>}
        <span className="task-date"><CalendarDays size={14} /> Added {created}</span>
      </div>
      <button className="delete-button" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`}><Trash2 size={17} /></button>
    </CardWrapper>
  );
}

export default memo(TaskCard);
