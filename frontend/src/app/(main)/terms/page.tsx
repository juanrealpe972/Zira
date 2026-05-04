import { Container, Flex } from '@radix-ui/themes'
import { AppHeading, AppText, Section, BackButton } from '@/components/ui'
import { termsSections } from '@/data/legal/terms'

export default function TermsPage() {
  return (
    <Container size="3">
      <Flex direction="column" gap="6" py="8">

        <Flex justify="start">
          <BackButton />
        </Flex>

        <AppHeading>Términos y Condiciones</AppHeading>

        <AppText>
          Al utilizar Zira, aceptas los siguientes términos y condiciones. Te recomendamos leerlos cuidadosamente.
        </AppText>

        {termsSections.map((section) => (
          <Section key={section.title} title={section.title}>
            {section.isList ? (
              <ul>
                {section.content.map((item, i) => (
                  <li key={i}>
                    <AppText>{item}</AppText>
                  </li>
                ))}
              </ul>
            ) : (
              section.content.map((text, i) => (
                <AppText key={i}>{text}</AppText>
              ))
            )}
          </Section>
        ))}

        <AppText size="1">
          Última actualización: 2026
        </AppText>

      </Flex>
    </Container>
  )
}