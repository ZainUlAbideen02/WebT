export default function CardWrapper({ children, className = '', as: Tag = 'section' }) {
  return <Tag className={`card ${className}`.trim()}>{children}</Tag>;
}
