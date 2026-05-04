import { Flex, Box } from '@radix-ui/themes'
import { AppCard, AppHeading, AppText, AppIcon } from '@/components/ui'
import { Feature } from '@/data/features'

type Props = {
  feature: Feature
}

export function FeatureCard({ feature }: Props) {
  return (
    <AppCard>
      <Flex align="center" gap="4">

        <Box
          style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            background: 'var(--accent-3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-9)',
            flexShrink: 0,
          }}
        >
          <AppIcon name={feature.icon} size={28} />
        </Box>

        <Flex direction="column">
          <AppHeading size="3">{feature.title}</AppHeading>
          <AppText>{feature.description}</AppText>
        </Flex>

      </Flex>
    </AppCard>
  )
}