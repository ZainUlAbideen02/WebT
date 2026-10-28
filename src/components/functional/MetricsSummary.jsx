import { CheckCircle2, CircleDashed, ListTodo, TrendingUp } from 'lucide-react';
import CardWrapper from './CardWrapper.jsx';

export default function MetricsSummary({ total, completed, pending }) {
  const progress = total ? Math.round((completed / total) * 100) : 0;
  const metrics = [
    { label: 'Total tasks', value: total, icon: ListTodo, tone: 'violet' },
    { label: 'In progress', value: pending, icon: CircleDashed, tone: 'orange' },
    { label: 'Completed', value: completed, icon: CheckCircle2, tone: 'green' },
    { label: 'Completion', value: `${progress}%`, icon: TrendingUp, tone: 'blue' },
  ];

  return (
    <section className="metrics-grid" aria-label="Task summary">
      {metrics.map(({ label, value, icon: Icon, tone }) => (
        <CardWrapper className="metric-card" key={label}>
          <span className={`metric-icon ${tone}`}><Icon size={20} /></span>
          <div><strong>{value}</strong><span>{label}</span></div>
        </CardWrapper>
      ))}
    </section>
  );
}
