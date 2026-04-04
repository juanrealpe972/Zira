import { Flex, TextField, Button } from '@radix-ui/themes'
import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons'

function RegisterForm() {
  return (
    <form>
      <Flex direction="column" gap="3">

        {/* NOMBRE */}
        <Flex direction="column" gap="1">
          <label htmlFor="name">Nombre</label>
          <TextField.Root
            id="name"
            name="name"
            placeholder="Ingresa tu nombre"
          >
            <TextField.Slot>
              <PersonIcon />
            </TextField.Slot>
          </TextField.Root>
        </Flex>

        {/* EMAIL */}
        <Flex direction="column" gap="1">
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
        </Flex>

        {/* PASSWORD */}
        <Flex direction="column" gap="1">
          <label htmlFor="password">Contraseña</label>
          <TextField.Root
            id="password"
            name="password"
            type="password"
            placeholder="Crea una contraseña"
          >
            <TextField.Slot>
              <LockClosedIcon />
            </TextField.Slot>
          </TextField.Root>
        </Flex>

        {/* CONFIRM PASSWORD */}
        <Flex direction="column" gap="1">
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <TextField.Root
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirma tu contraseña"
          >
            <TextField.Slot>
              <LockClosedIcon />
            </TextField.Slot>
          </TextField.Root>
        </Flex>

        {/* BOTÓN */}
        <Button type="submit">
          Registrarse
        </Button>

      </Flex>
    </form>
  )
}

export default RegisterForm