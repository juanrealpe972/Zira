import { Card, Container, Flex, Heading, Link, Text } from "@radix-ui/themes"
import SigninForm from "@/components/auth/SigninForm"
import NavLink from "next/link"

function LoginPage() {
    return (
        <>
            <Container size="1" height="100%" className="p-3 md:p-0">
                <Flex className="h-screen w-full items-center">
                    <Card className="w-full p-7">
                        <Heading>Sign in to Zira</Heading>
                        <SigninForm />
                        <Text className="text-sm text-muted-foreground mt-4">
                            Don't have an account? 
                            <Link asChild>
                                <NavLink href="/auth/register">
                                    Sign up
                                </NavLink>
                            </Link>
                        </Text>
                    </Card>
                </Flex>
            </Container>
        </>
    )
}

export default LoginPage