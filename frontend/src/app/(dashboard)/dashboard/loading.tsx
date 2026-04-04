import { Flex } from '@radix-ui/themes'

export default function DashboardLoading() {
  return (
    <Flex align="center" justify="center" style={{ minHeight: '100%', flex: 1 }}>
      <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"
        style={{ animation: 'spin 1s linear infinite' }}>
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle strokeOpacity=".3" cx="18" cy="18" r="18" stroke="var(--accent-8)" />
            <path d="M36 18c0-9.94-8.06-18-18-18" stroke="var(--accent-9)" />
          </g>
        </g>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </svg>
    </Flex>
  )
}