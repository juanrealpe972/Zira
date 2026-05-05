'use client'

type Column<T> = {
  key: string
  label: string
  render: (item: T) => React.ReactNode
}

type Props<T> = {
  data: T[]
  columns: Column<T>[]
  selected: number[]
  onSelect: (id: number) => void
  onSelectAll: () => void
  getId: (item: T) => number
}

export function DataTable<T>({
  data,
  columns,
  selected,
  onSelect,
  onSelectAll,
  getId,
}: Props<T>) {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>
            <input type="checkbox" onChange={onSelectAll} />
          </th>

          {columns.map(col => (
            <th key={col.key}>{col.label}</th>
          ))}

          <th />
        </tr>
      </thead>

      <tbody>
        {data.map(item => {
          const id = getId(item)

          return (
            <tr key={id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(id)}
                  onChange={() => onSelect(id)}
                />
              </td>

              {columns.map(col => (
                <td key={col.key}>{col.render(item)}</td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}