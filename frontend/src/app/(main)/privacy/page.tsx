import { Container, Flex } from '@radix-ui/themes'
import { AppHeading, AppText, BackButton, Section } from '@/components/ui'
import { privacySections } from '@/data/legal/privacy'

export default function PrivacyPage() {
  return (
    <Container size="3">
      <Flex direction="column" gap="6" py="8">

        <Flex justify="start">
          <BackButton />
        </Flex>

        <AppHeading>Política de Privacidad</AppHeading>

        <AppText>
          En Zira valoramos tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información.
        </AppText>

        {privacySections.map((section) => (
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