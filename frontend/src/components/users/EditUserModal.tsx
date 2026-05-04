'use client'

import { useState, useEffect } from 'react'
import { Dialog, Flex, Box, Text, TextField, Select, Button, Separator, Grid, Badge, Spinner } from '@radix-ui/themes'
import { getUserById, updateUser } from '@/services'
import { User, CreateUserRequest } from '@/types'
import { AppToast, Icons } from '@/components/ui'

type Props = {
    userId: number | null
    open: boolean
    onClose: () => void
    onUpdated: (user: User) => void
}

const ROLES = ['admin', 'free', 'premium']
const COUNTRIES = ['Colombia', 'México', 'Argentina', 'España', 'Estados Unidos']
const PHONE_PREFIXES = ['+57', '+52', '+54', '+34', '+1']

const STEPS = [
    { label: 'Personal', description: 'Nombre, email y rol' },
    { label: 'Adicional', description: 'Teléfono, empresa y ubicación' },
]

type FieldError = Partial<Record<keyof CreateUserRequest, string>>

const EMPTY: CreateUserRequest = {
    name: '', email: '', password: '',
    phone_prefix: '', phone: '', address: '',
    company: '', role: 'user', country: '',
    city: '', national_id: '',
}

export function EditUserModal({ userId, open, onClose, onUpdated }: Props) {
    const [form, setForm] = useState<CreateUserRequest>(EMPTY)
    const [errors, setErrors] = useState<FieldError>({})
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [apiError, setApiError] = useState<string | null>(null)
    const [step, setStep] = useState(0)
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastType, setToastType] = useState<'success' | 'error'>('success')

    // Carga los datos del usuario al abrir
    useEffect(() => {
        if (!open || !userId) return
        setFetching(true)
        setApiError(null)
        setStep(0)
        getUserById(userId)
            .then(user => {
                setForm({
                    name: user.name ?? '',
                    email: user.email ?? '',
                    password: '',
                    phone_prefix: user.phone_prefix ?? '',
                    phone: user.phone ?? '',
                    address: user.address ?? '',
                    company: user.company ?? '',
                    role: user.role ?? 'user',
                    country: user.country ?? '',
                    city: user.city ?? '',
                    national_id: user.national_id ?? '',
                })
            })
            .catch(() => setApiError('No se pudo cargar la información del usuario'))
            .finally(() => setFetching(false))
    }, [open, userId])

    function update(key: keyof CreateUserRequest, value: string) {
        setForm(prev => ({ ...prev, [key]: value }))
        setErrors(prev => ({ ...prev, [key]: undefined }))
        setApiError(null)
    }

    function validateStep0(): boolean {
        const newErrors: FieldError = {}
        if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio'
        if (!form.email.trim()) newErrors.email = 'El email es obligatorio'
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email inválido'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    function handleNext() {
        if (step === 0 && !validateStep0()) return
        setStep(1)
    }

    async function handleSubmit() {
        if (!userId) return
        setLoading(true)
        setApiError(null)
        try {
            // Solo envía campos que tienen valor
            const payload = Object.fromEntries(
                Object.entries(form).filter(([k, v]) => v !== '' && k !== 'password')
            ) as Partial<CreateUserRequest>

            // Solo incluye password si se escribió algo
            if (form.password.trim()) payload.password = form.password

            const updated = await updateUser(userId, payload)
            onUpdated(updated)
            setToastMessage(`¡Usuario "${updated.name}" actualizado exitosamente!`)
            setToastType('success')
            setToastOpen(true)
            setTimeout(() => handleClose(), 1500)
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Error inesperado'
            setApiError(msg)
            setToastMessage(msg)
            setToastType('error')
            setToastOpen(true)
        } finally {
            setLoading(false)
        }
    }

    function handleClose() {
        setForm(EMPTY)
        setErrors({})
        setApiError(null)
        setStep(0)
        onClose()
    }

    return (
        <>
            <Dialog.Root open={open} onOpenChange={v => !v && handleClose()}>
                <Dialog.Content style={{ maxWidth: 560, padding: 0, overflow: 'hidden' }}>

                    {/* Header */}
                    <Box
                        style={{
                            background: 'linear-gradient(135deg, var(--accent-9) 0%, var(--accent-11) 100%)',
                            padding: '20px 24px 16px',
                        }}
                    >
                        <Flex justify="between" align="start">
                            <Box>
                                <Dialog.Title style={{ margin: 0, color: 'white', fontSize: 18 }}>
                                    Editar usuario
                                </Dialog.Title>
                                <Text size="1" style={{ color: 'rgba(255,255,255,0.7)', marginTop: 2, display: 'block' }}>
                                    {STEPS[step].description}
                                </Text>
                            </Box>
                            <Dialog.Close onClick={handleClose}>
                                <Box style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', padding: 4, borderRadius: 6 }}>
                                    <Icons.close width={16} height={16} />
                                </Box>
                            </Dialog.Close>
                        </Flex>

                        {/* Steps */}
                        <Flex gap="2" mt="4" align="center">
                            {STEPS.map((s, i) => (
                                <Flex key={i} align="center" gap="2">
                                    <Flex
                                        align="center"
                                        justify="center"
                                        style={{
                                            width: 24, height: 24,
                                            borderRadius: '50%',
                                            background: i <= step ? 'white' : 'rgba(255,255,255,0.3)',
                                            color: i <= step ? 'var(--accent-9)' : 'white',
                                            fontSize: 11, fontWeight: 700, flexShrink: 0,
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        {i < step ? <Icons.check width={14} /> : i + 1}
                                    </Flex>
                                    <Text size="1" style={{ color: i <= step ? 'white' : 'rgba(255,255,255,0.6)', fontWeight: i === step ? 600 : 400 }}>
                                        {s.label}
                                    </Text>
                                    {i < STEPS.length - 1 && (
                                        <Box style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.3)', marginLeft: 4 }} />
                                    )}
                                </Flex>
                            ))}
                        </Flex>
                    </Box>

                    {/* Error API */}
                    {apiError && (
                        <Flex align="center" gap="2" mx="5" mt="4" p="3"
                            style={{ borderRadius: 8, background: 'var(--red-3)', border: '1px solid var(--red-6)' }}
                        >
                            <Icons.error style={{ color: 'var(--red-9)', flexShrink: 0 }} />
                            <Text size="2" style={{ color: 'var(--red-11)' }}>{apiError}</Text>
                        </Flex>
                    )}

                    {/* Cuerpo */}
                    <Box px="5" py="4" style={{ maxHeight: '55vh', overflowY: 'auto' }}>
                        {fetching ? (
                            <Flex align="center" justify="center" py="8" gap="2">
                                <Spinner />
                                <Text color="gray" size="2">Cargando información del usuario...</Text>
                            </Flex>
                        ) : (
                            <>
                                {/* PASO 1 */}
                                {step === 0 && (
                                    <Flex direction="column" gap="3">
                                        <Field label="Nombre completo *" error={errors.name}>
                                            <TextField.Root
                                                value={form.name}
                                                onChange={e => update('name', e.target.value)}
                                                placeholder="Juan Pérez"
                                                size="2"
                                            >
                                                <TextField.Slot><Icons.user /></TextField.Slot>
                                            </TextField.Root>
                                        </Field>

                                        <Field label="Email *" error={errors.email}>
                                            <TextField.Root
                                                value={form.email}
                                                onChange={e => update('email', e.target.value)}
                                                placeholder="correo@ejemplo.com"
                                                type="email"
                                                size="2"
                                            >
                                                <TextField.Slot><Icons.mail /></TextField.Slot>
                                            </TextField.Root>
                                        </Field>

                                        <Field
                                            label="Nueva contraseña"
                                            error={errors.password}
                                            hint="Déjala vacía si no deseas cambiarla"
                                        >
                                            <TextField.Root
                                                value={form.password}
                                                onChange={e => update('password', e.target.value)}
                                                placeholder="••••••••"
                                                type="password"
                                                size="2"
                                            />
                                        </Field>

                                        <Field label="Rol" error={errors.role}>
                                            <Select.Root value={form.role} onValueChange={v => update('role', v)}>
                                                <Select.Trigger style={{ width: '100%' }} />
                                                <Select.Content>
                                                    {ROLES.map(r => (
                                                        <Select.Item key={r} value={r}>
                                                            <Badge
                                                                size="1"
                                                                color={r === 'admin' ? 'red' : r === 'editor' ? 'blue' : 'gray'}
                                                                variant="soft"
                                                            >
                                                                {r}
                                                            </Badge>
                                                        </Select.Item>
                                                    ))}
                                                </Select.Content>
                                            </Select.Root>
                                        </Field>
                                    </Flex>
                                )}

                                {/* PASO 2 */}
                                {step === 1 && (
                                    <Grid columns="2" gap="3">
                                        <Field label="Identificación" error={errors.national_id}>
                                            <TextField.Root
                                                value={form.national_id}
                                                onChange={e => update('national_id', e.target.value)}
                                                placeholder="123456789"
                                                size="2"
                                            >
                                                <TextField.Slot><Icons.money /></TextField.Slot>
                                            </TextField.Root>
                                        </Field>

                                        <Field label="Empresa" error={errors.company}>
                                            <TextField.Root
                                                value={form.company}
                                                onChange={e => update('company', e.target.value)}
                                                placeholder="Nombre de la empresa"
                                                size="2"
                                            />
                                        </Field>

                                        <Field label="Prefijo" error={errors.phone_prefix}>
                                            <Select.Root value={form.phone_prefix} onValueChange={v => update('phone_prefix', v)}>
                                                <Select.Trigger placeholder="+" style={{ width: '100%' }} />
                                                <Select.Content>
                                                    {PHONE_PREFIXES.map(p => (
                                                        <Select.Item key={p} value={p}>{p}</Select.Item>
                                                    ))}
                                                </Select.Content>
                                            </Select.Root>
                                        </Field>

                                        <Field label="Teléfono" error={errors.phone}>
                                            <TextField.Root
                                                value={form.phone}
                                                onChange={e => update('phone', e.target.value)}
                                                placeholder="3001234567"
                                                size="2"
                                            >
                                                <TextField.Slot><Icons.mobileIcon /></TextField.Slot>
                                            </TextField.Root>
                                        </Field>

                                        <Field label="País" error={errors.country}>
                                            <Select.Root value={form.country} onValueChange={v => update('country', v)}>
                                                <Select.Trigger placeholder="Selecciona un país" style={{ width: '100%' }} />
                                                <Select.Content>
                                                    {COUNTRIES.map(c => (
                                                        <Select.Item key={c} value={c}>{c}</Select.Item>
                                                    ))}
                                                </Select.Content>
                                            </Select.Root>
                                        </Field>

                                        <Field label="Ciudad" error={errors.city}>
                                            <TextField.Root
                                                value={form.city}
                                                onChange={e => update('city', e.target.value)}
                                                placeholder="Ciudad"
                                                size="2"
                                            />
                                        </Field>

                                        <Box style={{ gridColumn: '1 / -1' }}>
                                            <Field label="Dirección" error={errors.address}>
                                                <TextField.Root
                                                    value={form.address}
                                                    onChange={e => update('address', e.target.value)}
                                                    placeholder="Calle 123 # 45-67"
                                                    size="2"
                                                >
                                                    <TextField.Slot><Icons.homeIcon /></TextField.Slot>
                                                </TextField.Root>
                                            </Field>
                                        </Box>
                                    </Grid>
                                )}
                            </>
                        )}
                    </Box>

                    <Separator size="4" />

                    {/* Footer */}
                    <Flex justify="between" align="center" px="5" py="4">
                        <Button
                            variant="ghost"
                            color="gray"
                            onClick={step === 0 ? handleClose : () => setStep(0)}
                            disabled={loading || fetching}
                        >
                            {step === 0 ? 'Cancelar' : '← Anterior'}
                        </Button>
                        <Flex align="center" gap="2">
                            <Text size="1" color="gray">{step + 1} de {STEPS.length}</Text>
                            {step === 0 ? (
                                <Button onClick={handleNext} disabled={fetching}>
                                    Siguiente →
                                </Button>
                            ) : (
                                <Button onClick={handleSubmit} disabled={loading}>
                                    {loading ? 'Guardando...' : 'Guardar cambios'}
                                </Button>
                            )}
                        </Flex>
                    </Flex>

                </Dialog.Content>
            </Dialog.Root>

            <AppToast
                open={toastOpen}
                onOpenChange={setToastOpen}
                message={toastMessage}
                type={toastType}
            />
        </>
    )
}

function Field({
    label, error, hint, children,
}: {
    label: string
    error?: string
    hint?: string
    children: React.ReactNode
}) {
    return (
        <Box>
            <Text size="1" weight="medium" style={{ display: 'block', marginBottom: 4 }}>
                {label}
            </Text>
            {children}
            {hint && !error && (
                <Text size="1" color="gray" style={{ marginTop: 2, display: 'block' }}>{hint}</Text>
            )}
            {error && (
                <Flex align="center" gap="1" mt="1">
                    <Icons.error width={12} style={{ color: 'var(--red-9)' }} />
                    <Text size="1" style={{ color: 'var(--red-9)' }}>{error}</Text>
                </Flex>
            )}
        </Box>
    )
}