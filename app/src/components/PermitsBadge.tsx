export function PermitsBadge({ permits }: { permits: string[] }) {
  if (permits.length === 0) {
    return (
      <div className="flex items-center gap-2 text-green-700 text-sm">
        <span>✅</span>
        <span>Sin permisos especiales requeridos</span>
      </div>
    )
  }
  return (
    <ul className="space-y-1">
      {permits.map((p) => (
        <li key={p} className="flex items-start gap-2 text-sm text-amber-800">
          <span className="mt-0.5">⚠️</span>
          <span>{p}</span>
        </li>
      ))}
    </ul>
  )
}
