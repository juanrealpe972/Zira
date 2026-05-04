import { Flex } from '@radix-ui/themes'
import { AppHeading } from '@/components/ui'

export function Section({ title, children }: any) {
  return (
    <Flex direction="column" gap="2">
      <AppHeading size="4">{title}</AppHeading>
      {children}
    </Flex>
  )
}