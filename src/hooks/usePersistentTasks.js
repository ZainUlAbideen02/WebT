import { useEffect, useState } from 'react';

const starterTasks = [
  {
    id: 'welcome-1',
    title: 'Review the product brief',
    description: 'Highlight the core goals and turn them into a focused checklist.',
    priority: 'high',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'welcome-2',
    title: 'Prepare weekly progress update',
    description: 'Summarize wins, blockers, and next actions for the team.',
    priority: 'medium',
    completed: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'welcome-3',
    title: 'Plan tomorrow’s deep-work block',
    description: 'Reserve 90 minutes for the highest-impact task.',
    priority: 'low',
    completed: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export default function usePersistentTasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('focusboard-tasks');
      return saved ? JSON.parse(saved) : starterTasks;
    } catch {
      return starterTasks;
    }
  });

  useEffect(() => {
    localStorage.setItem('focusboard-tasks', JSON.stringify(tasks));
  }, [tasks]);

  return [tasks, setTasks];
}
