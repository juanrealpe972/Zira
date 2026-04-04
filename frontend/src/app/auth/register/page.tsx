import { Card, Container, Flex, Heading, Link, Text } from "@radix-ui/themes"
import SignupForm from "@/components/auth/SignupForm"
import NavLink from "next/link"

function RegisterPage() {
  return (
    <Container size="1" className="px-3 md:px-0">
      <Flex className="min-h-screen w-full items-center justify-center">
        
        <Card className="w-full max-w-md p-6 md:p-8">
          <Heading mb="4">Sign up to Zira</Heading>

          <SignupForm />

          <Text size="2" mt="4">
            Already have an account?{" "}
            <Link asChild>
              <NavLink href="/auth/login">
                Sign in
              </NavLink>
            </Link>
          </Text>
        </Card>

      </Flex>
    </Container>
  )
}

export default RegisterPage