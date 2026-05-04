import { Grid, Flex } from '@radix-ui/themes'
import { features } from '@/data/features'
import { FeatureCard } from '@/components/sections'
import { AppHeading, AppText } from '@/components/ui'

export function FeaturesSection() {
  return (
    <Flex direction="column" align="center" gap="4" py="8" px='8'>

      <AppHeading>
        Características principales
      </AppHeading>

      <AppText style={{ maxWidth: 600, textAlign: 'center' }}>
        Zira te ofrece todo lo que necesitas para organizar tu vida, tu dinero y tu trabajo en un solo lugar.
      </AppText>

      <Grid
        columns={{ initial: '1', sm: '2', md: '3' }}
        gap="4"
        mt="4"
        style={{ width: '100%' }}
      >
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </Grid>

    </Flex>
  )
}