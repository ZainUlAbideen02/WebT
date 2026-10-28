import { Plus, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import CardWrapper from './CardWrapper.jsx';

export default function TaskForm({ onAddTask, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const inputRef = useRef(null);

  useEffect(() => inputRef.current?.focus(), []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    onAddTask({ title: title.trim(), description: description.trim(), priority });
    setTitle('');
    setDescription('');
    setPriority('medium');
    inputRef.current?.focus();
  };

  return (
    <CardWrapper className="task-form-card">
      <div className="section-heading compact">
        <div><p className="eyebrow">Quick capture</p><h2>Create a new task</h2></div>
        <button className="ghost-icon" type="button" onClick={onClose} aria-label="Close task form"><X size={19} /></button>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="task-title">Task name</label>
        <input ref={inputRef} id="task-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="What needs to be done?" maxLength={80} required />
        <label htmlFor="task-description">Description <span>(optional)</span></label>
        <textarea id="task-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Add a little context…" rows="3" maxLength={180} />
        <fieldset>
          <legend>Priority</legend>
          <div className="priority-options">
            {['low', 'medium', 'high'].map((level) => (
              <label className={`priority-choice ${priority === level ? 'selected' : ''}`} key={level}>
                <input type="radio" name="priority" value={level} checked={priority === level} onChange={(event) => setPriority(event.target.value)} />
                <span className={`priority-dot ${level}`} /> {level}
              </label>
            ))}
          </div>
        </fieldset>
        <button className="primary-button full" type="submit"><Plus size={18} /> Add task</button>
      </form>
    </CardWrapper>
  );
}
