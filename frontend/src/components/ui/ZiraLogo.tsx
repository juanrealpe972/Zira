'use client'

import Link from 'next/link'

type Props = {
  size?: number
}

export function ZiraLogo({ size = 28 }: Props) {
  return (
    <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
        }}
      >
        <path
          d="M7 10H25L9 22H25"
          stroke="var(--accent-9)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M14 10L10 14"
          stroke="var(--accent-9)"
          strokeWidth="2.6"
          strokeLinecap="round"
          opacity="0.6"
        />

        <path
          d="M12 18H20"
          stroke="var(--accent-9)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    </Link>
  )
}