import { Flex, Grid, Heading, Card, Text, Avatar, Container } from '@radix-ui/themes'
import { StarIcon, PersonIcon } from '@radix-ui/react-icons'
import { testimonials } from '@/data/testimonials'

export default function TestimonialsSection() {
  return (
    <Container size="3">
      <Flex direction="column" align="center" gap="2" py="8">
        <Heading size="6">Lo que dicen nuestros usuarios</Heading>
      </Flex>

      <Grid columns={{ initial: '1', sm: '3' }} gap="4" pb="9">
        {testimonials.map(({ name, role, comment }) => (
          <Card key={name} size="2">
            <Flex direction="column" gap="3">
              <Flex gap="1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} style={{ color: 'var(--amber-9)' }} />
                ))}
              </Flex>
              <Text size="2" color="gray">"{comment}"</Text>
              <Flex align="center" gap="2" mt="1">
                <Avatar size="2" fallback={<PersonIcon />} />
                <Flex direction="column">
                  <Text size="2" weight="bold">{name}</Text>
                  <Text size="1" color="gray">{role}</Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Grid>
    </Container>
  )
}