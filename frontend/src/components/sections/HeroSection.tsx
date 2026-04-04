import { Flex, Heading, Text, Button, Badge, Avatar, Container } from '@radix-ui/themes'
import { LightningBoltIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import NavLink from 'next/link'

export default function HeroSection() {
  return (
    <Container size="3">
      <Flex direction="column" align="center" py="9" gap="5" style={{ textAlign: 'center' }}>

        <Badge size="2" color="blue" variant="soft" radius="full">
          <LightningBoltIcon /> Versión 1.0 ya disponible
        </Badge>

        <Heading size="9" style={{ maxWidth: 600, lineHeight: 1.1 }}>
          La plataforma que impulsa tu negocio
        </Heading>

        <Text size="4" color="gray" style={{ maxWidth: 500 }}>
          Gestiona, analiza y escala tu hogar con herramientas simples y poderosas.
        </Text>

        <Flex gap="3" mt="2">
          <Button size="3" asChild>
            <NavLink href="/register">
              Comenzar gratis <ArrowRightIcon />
            </NavLink>
          </Button>
          <Button size="3" variant="outline">
            Ver demo
          </Button>
        </Flex>

        <Flex align="center" gap="2" mt="2">
          <Flex>
            {['A', 'B', 'C', 'D'].map((letter, i) => (
              <Avatar
                key={letter}
                size="1"
                fallback={letter}
                style={{ marginLeft: i === 0 ? 0 : -6, border: '2px solid var(--color-background)' }}
              />
            ))}
          </Flex>
          <Text size="2" color="gray">+2,000 equipos ya confían en nosotros</Text>
        </Flex>

      </Flex>
    </Container>
  )
}