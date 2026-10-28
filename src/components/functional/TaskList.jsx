import { ClipboardCheck } from 'lucide-react';
import TaskCard from './TaskCard.jsx';

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span><ClipboardCheck size={28} /></span>
        <h3>All clear here</h3>
        <p>No tasks match these filters. Try another view or add a new task.</p>
      </div>
    );
  }

  return <div className="task-list">{tasks.map((task) => <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />)}</div>;
}
