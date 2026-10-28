import { Filter, Plus, Search, Sparkles, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ActivityLogger from './components/class/ActivityLogger.jsx';
import CardWrapper from './components/functional/CardWrapper.jsx';
import Header from './components/functional/Header.jsx';
import MetricsSummary from './components/functional/MetricsSummary.jsx';
import TaskForm from './components/functional/TaskForm.jsx';
import TaskList from './components/functional/TaskList.jsx';
import usePersistentTasks from './hooks/usePersistentTasks.js';

const logActivity = (message) => window.dispatchEvent(new CustomEvent('focusboard:activity', { detail: message }));

export default function App() {
  const [tasks, setTasks] = usePersistentTasks();
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  const completedCount = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);
  const pendingCount = tasks.length - completedCount;

  useEffect(() => {
    document.title = pendingCount ? `${pendingCount} pending · FocusBoard` : 'All done · FocusBoard';
  }, [pendingCount]);

  const filteredTasks = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    return tasks.filter((task) => {
      const matchesStatus = statusFilter === 'all' || (statusFilter === 'completed' ? task.completed : !task.completed);
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      const matchesQuery = !normalizedQuery || `${task.title} ${task.description}`.toLowerCase().includes(normalizedQuery);
      return matchesStatus && matchesPriority && matchesQuery;
    });
  }, [tasks, statusFilter, priorityFilter, query]);

  const addTask = useCallback((data) => {
    setTasks((current) => [{ id: crypto.randomUUID(), ...data, completed: false, createdAt: new Date().toISOString() }, ...current]);
    setShowForm(false);
    logActivity(`Added “${data.title}”`);
  }, [setTasks]);

  const toggleTask = useCallback((id) => {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
    const selected = tasks.find((task) => task.id === id);
    if (selected) logActivity(`${selected.completed ? 'Reopened' : 'Completed'} “${selected.title}”`);
  }, [setTasks, tasks]);

  const deleteTask = useCallback((id) => {
    const selected = tasks.find((task) => task.id === id);
    setTasks((current) => current.filter((task) => task.id !== id));
    if (selected) logActivity(`Deleted “${selected.title}”`);
  }, [setTasks, tasks]);

  const changeStatus = (value) => {
    setStatusFilter(value);
    logActivity(`Changed view to ${value} tasks`);
  };

  const clearCompleted = () => {
    if (!completedCount) return;
    setTasks((current) => current.filter((task) => !task.completed));
    logActivity(`Cleared ${completedCount} completed ${completedCount === 1 ? 'task' : 'tasks'}`);
  };

  return (
    <div className="app-shell">
      <Header />
      <main id="main" className="dashboard">
        <section className="hero-row">
          <div>
            <div className="hero-kicker"><Sparkles size={15} /> Your personal command center</div>
            <h1>Make today <span>count.</span></h1>
            <p>Capture what matters, focus your energy, and finish the day with momentum.</p>
          </div>
          <button className="primary-button" onClick={() => setShowForm(true)}><Plus size={18} /> New task</button>
        </section>

        <MetricsSummary total={tasks.length} completed={completedCount} pending={pendingCount} />

        <div className="dashboard-grid">
          <section className="tasks-column">
            <CardWrapper className="tasks-panel">
              <div className="section-heading">
                <div><p className="eyebrow">Your workspace</p><h2>My tasks <span>{filteredTasks.length}</span></h2></div>
                {completedCount > 0 && <button className="text-button danger" onClick={clearCompleted}><Trash2 size={15} /> Clear completed</button>}
              </div>
              <div className="filters">
                <div className="status-tabs" role="group" aria-label="Filter by status">
                  {['all', 'pending', 'completed'].map((status) => (
                    <button key={status} className={statusFilter === status ? 'active' : ''} onClick={() => changeStatus(status)}>{status}</button>
                  ))}
                </div>
                <div className="filter-controls">
                  <label className="search-control"><Search size={17} /><span className="sr-only">Search tasks</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks" /></label>
                  <label className="select-control"><Filter size={16} /><span className="sr-only">Priority filter</span><select value={priorityFilter} onChange={(event) => { setPriorityFilter(event.target.value); logActivity(`Filtered by ${event.target.value} priority`); }}><option value="all">All priorities</option><option value="high">High priority</option><option value="medium">Medium priority</option><option value="low">Low priority</option></select></label>
                </div>
              </div>
              <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
            </CardWrapper>
          </section>

          <aside className="side-column">
            {showForm ? <TaskForm onAddTask={addTask} onClose={() => setShowForm(false)} /> : (
              <CardWrapper className="focus-card">
                <span className="focus-orbit"><Sparkles size={22} /></span>
                <p className="eyebrow">A small reminder</p>
                <h2>Progress beats perfection.</h2>
                <p>Choose one meaningful task and give it your full attention.</p>
                <button className="secondary-button" onClick={() => setShowForm(true)}><Plus size={17} /> Add your next task</button>
              </CardWrapper>
            )}
            <ActivityLogger />
          </aside>
        </div>
      </main>
      <footer>Built with React components, hooks, context, and a little focus.</footer>
    </div>
  );
}
