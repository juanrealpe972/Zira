import { Flex, Heading, Text, Button } from '@radix-ui/themes'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import NavLink from 'next/link'

export default function NotFound() {
    return (
        <Flex direction="column" align="center" justify="center" gap="4" style={{ minHeight: '100vh', textAlign: 'center' }} >
            <ExclamationTriangleIcon width={48} height={48} />
            <Heading size="9">404</Heading>
            <Heading size="5">Página no encontrada</Heading>
            <Text color="gray" size="3" style={{ maxWidth: 400 }}>
                La página que buscas no existe o fue movida a otra dirección.
            </Text>
            <Button size="3" asChild>
                <NavLink href="/ ">Volver al inicio</NavLink>
            </Button>
        </Flex>
    )
}