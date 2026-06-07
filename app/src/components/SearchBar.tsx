interface SearchBarProps {
  value: string
  onChange: (v: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">🔍</span>
      <input
        type="text"
        placeholder="Buscar producto para importar..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
      />
    </div>
  )
}
