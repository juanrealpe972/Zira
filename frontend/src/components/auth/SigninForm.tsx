import { Flex, TextField, Button } from '@radix-ui/themes'
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons'

function SigninForm() {
  return (
    <Flex direction="column" gap="2">
      <label htmlFor="email">Email</label>
      <TextField.Root
        id="email"
        name="email"
        type="email"
        placeholder="Ingresa tu email"
      >
        <TextField.Slot>
          <EnvelopeClosedIcon />
        </TextField.Slot>
      </TextField.Root>
      <label htmlFor="password">Contraseña</label>
      <TextField.Root
        id="password"
        name="password"
        type="password"
        placeholder="Ingresa tu contraseña"
      >
        <TextField.Slot>
          <LockClosedIcon />
        </TextField.Slot>
      </TextField.Root>
      <Button type="submit">
        Iniciar sesión
      </Button>
    </Flex>
  )
}

export default SigninForm