export function Pills({ items }: { items: readonly string[] }) {
  return (
    <ul className="pills" aria-label="Skills">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
