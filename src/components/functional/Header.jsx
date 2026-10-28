import { CheckCheck, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const today = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  return (
    <header className="topbar">
      <a className="brand" href="#main" aria-label="FocusBoard home">
        <span className="brand-mark"><CheckCheck size={21} strokeWidth={2.6} /></span>
        <span>Focus<span>Board</span></span>
      </a>
      <div className="topbar-actions">
        <p className="today">{today}</p>
        <button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
          {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
        </button>
        <div className="avatar" aria-label="User profile">AK</div>
      </div>
    </header>
  );
}
