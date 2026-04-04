import { Flex, Grid, Heading, Text, Card, Box, Container } from '@radix-ui/themes'
import { LightningBoltIcon, BarChartIcon, ChatBubbleIcon } from '@radix-ui/react-icons'

const features = [
  { icon: <LightningBoltIcon width={20} height={20} />, title: 'Rápido', description: 'Respuestas en milisegundos. Sin esperas, sin interrupciones.' },
  { icon: <LightningBoltIcon width={20} height={20} />, title: 'Seguro', description: 'Tus datos siempre protegidos con cifrado de extremo a extremo.' },
  { icon: <BarChartIcon width={20} height={20} />, title: 'Analíticas', description: 'Métricas en tiempo real para tomar mejores decisiones.' },
  { icon: <ChatBubbleIcon width={20} height={20} />, title: 'Colaboración', description: 'Trabaja en equipo desde cualquier lugar del mundo.' },
]

export default function FeaturesSection() {
  return (
    <Container size="3">
      <Flex direction="column" align="center" gap="2" py="8">
        <Heading size="6">Todo lo que necesitas</Heading>
        <Text color="gray" size="3">Funcionalidades diseñadas para equipos modernos</Text>
      </Flex>

      <Grid columns={{ initial: '1', sm: '2', md: '4' }} gap="4" pb="9">
        {features.map(({ icon, title, description }) => (
          <Card key={title} size="2">
            <Flex direction="column" gap="3">
              <Box style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--accent-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-9)' }}>
                {icon}
              </Box>
              <Heading size="3">{title}</Heading>
              <Text size="2" color="gray">{description}</Text>
            </Flex>
          </Card>
        ))}
      </Grid>
    </Container>
  )
}