'use client'

type Props = {
  size?: number
}

export function ZiraLogo({ size = 32 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        cursor: 'pointer',
        transition: 'all 0.25s ease',
      }}
    >
      <rect
        x="2"
        y="2"
        width="28"
        height="28"
        rx="8"
        fill="var(--accent-3)"
      />

      <path
        d="M9 10H24L11 22H24"
        stroke="var(--accent-9)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M12 16H20"
        stroke="var(--accent-9)"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  )
}