import { Link } from '@radix-ui/themes'
import NavLink from 'next/link'

type AppLinkProps = {
  href: string
  children: React.ReactNode
}

export function AppLink({ href, children }: AppLinkProps) {
  return (
    <Link asChild size="2">
      <NavLink href={href}>{children}</NavLink>
    </Link>
  )
}