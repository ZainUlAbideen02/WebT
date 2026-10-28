import { Bell, History, X } from 'lucide-react';
import { Component } from 'react';
import CardWrapper from '../functional/CardWrapper.jsx';

export default class ActivityLogger extends Component {
  state = { logs: [], toast: null };
  toastTimer = null;

  componentDidMount() {
    try {
      const stored = JSON.parse(localStorage.getItem('focusboard-logs') || '[]');
      this.setState({ logs: stored });
    } catch {
      this.setState({ logs: [] });
    }
    window.addEventListener('focusboard:activity', this.handleActivity);
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.logs !== this.state.logs) {
      localStorage.setItem('focusboard-logs', JSON.stringify(this.state.logs));
    }
    if (previousState.toast !== this.state.toast && this.state.toast) {
      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => this.setState({ toast: null }), 2600);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('focusboard:activity', this.handleActivity);
    clearTimeout(this.toastTimer);
  }

  handleActivity = (event) => {
    const entry = { id: crypto.randomUUID(), message: event.detail, time: new Date().toISOString() };
    this.setState((current) => ({ logs: [entry, ...current.logs].slice(0, 6), toast: entry.message }));
  };

  clearLogs = () => this.setState({ logs: [], toast: 'Activity history cleared' });

  render() {
    const { logs, toast } = this.state;
    return (
      <>
        <CardWrapper className="activity-card">
          <div className="section-heading compact">
            <div><p className="eyebrow">Live history</p><h2>Recent activity</h2></div>
            {logs.length > 0 && <button className="text-button" onClick={this.clearLogs}>Clear</button>}
          </div>
          {logs.length === 0 ? (
            <div className="activity-empty"><History size={22} /><p>Your latest actions will appear here.</p></div>
          ) : (
            <ol className="activity-list">
              {logs.map((log) => (
                <li key={log.id}>
                  <span className="activity-marker" />
                  <div><p>{log.message}</p><time>{new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(new Date(log.time))}</time></div>
                </li>
              ))}
            </ol>
          )}
        </CardWrapper>
        {toast && <div className="toast" role="status"><Bell size={17} /><span>{toast}</span><button onClick={() => this.setState({ toast: null })} aria-label="Dismiss notification"><X size={16} /></button></div>}
      </>
    );
  }
}
