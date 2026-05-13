'use client'

import { useState, useEffect } from 'react'
import { Flex, TextField, Select, Grid, Badge, Box } from '@radix-ui/themes'
import { Icons, FormField, StepModal, AppToast } from '@/components/ui'
import { createUser, updateUser, getUserById } from '@/services'
import { User, CreateUserRequest } from '@/types'

const ROLES = ['admin', 'editor', 'free']
const COUNTRIES = ['Colombia', 'México', 'Argentina', 'España', 'Estados Unidos']
const PHONE_PREFIXES = ['+57', '+52', '+54', '+34', '+1']

const STEPS = [
    { label: 'Principal', description: 'Nombre, email y rol' },
    { label: 'Adicional', description: 'Teléfono, empresa y ubicación' },
]

const EMPTY: CreateUserRequest = {
    name: '',
    email: '',
    password: '',
    phone_prefix: '',
    phone: '',
    address: '',
    company: '',
    role: 'free',
    country: '',
    city: '',
    national_id: '',
}

type FormErrors = Partial<Record<keyof CreateUserRequest, string>>

type Props = {
    open: boolean
    onClose: () => void
    userId?: number | null
    onSaved: (user: User) => void
}

export function UserModal({ open, onClose, userId, onSaved }: Props) {
    const isEdit = !!userId
    const [step, setStep] = useState(0)
    const [form, setForm] = useState<CreateUserRequest>(EMPTY)
    const [errors, setErrors] = useState<FormErrors>({})
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [apiError, setApiError] = useState<string | null>(null)
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastType, setToastType] = useState<'success' | 'error'>('success')

    useEffect(() => {
        if (!open) return
        setStep(0)
        setErrors({})
        setApiError(null)

        if (isEdit && userId) {
            setFetching(true)
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
                        role: user.role ?? 'free',
                        country: user.country ?? '',
                        city: user.city ?? '',
                        national_id: user.national_id ?? '',
                    })
                })
                .catch(() => setApiError('No se pudo cargar la información del usuario'))
                .finally(() => setFetching(false))
        } else {
            setForm(EMPTY)
        }
    }, [open, userId])

    function update(key: keyof CreateUserRequest, value: string) {
        setForm(prev => ({ ...prev, [key]: value }))
        setErrors(prev => ({ ...prev, [key]: undefined }))
        setApiError(null)
    }

    function validateStep0(): boolean {
        const newErrors: FormErrors = {}
        if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio'
        if (!form.email.trim()) newErrors.email = 'El email es obligatorio'
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email inválido'
        if (!isEdit) {
            if (!form.password.trim()) newErrors.password = 'La contraseña es obligatoria'
            else if (form.password.length < 6) newErrors.password = 'Mínimo 6 caracteres'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    function handleNext() {
        if (step === 0 && !validateStep0()) return
        setStep(1)
    }

    async function handleSubmit() {
        setLoading(true)
        setApiError(null)
        try {
            const payload = Object.fromEntries(
                Object.entries(form).filter(([k, v]) => {
                    if (k === 'password' && isEdit && !v) return false
                    return v !== ''
                })
            ) as CreateUserRequest

            const result = isEdit
                ? await updateUser(userId!, payload)
                : await createUser(payload)

            onSaved(result)
            setToastMessage(isEdit ? `¡Usuario "${result.name}" actualizado!` : `¡Usuario "${result.name}" creado!`)
            setToastType('success')
            setToastOpen(true)
            setTimeout(handleClose, 1500)
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
            <StepModal
                open={open}
                onClose={handleClose}
                title={isEdit ? 'Editar usuario' : 'Crear usuario'}
                steps={STEPS}
                currentStep={step}
                loading={loading || fetching}
                apiError={apiError}
                toastOpen={false}
                toastMessage=""
                toastType="success"
                onToastChange={() => { }}
                onNext={handleNext}
                onBack={() => setStep(0)}
                onSubmit={handleSubmit}
                submitLabel={isEdit ? 'Guardar cambios' : 'Crear usuario'}
            >

                {fetching ? (
                    <Flex align="center" justify="center" py="6" gap="2">
                        <Icons.settings width={16} style={{ color: 'var(--gray-8)', animation: 'spin 1s linear infinite' }} />
                        <span style={{ color: 'var(--gray-9)', fontSize: 14 }}>Cargando información...</span>
                    </Flex>
                ) : (
                    <>
                        {step === 0 && (
                            <Flex direction="column" gap="3">
                                <FormField label="Nombre completo" error={errors.name} required>
                                    <TextField.Root
                                        value={form.name}
                                        onChange={e => update('name', e.target.value)}
                                        placeholder="Juan Pérez"
                                        size="2"
                                    >
                                        <TextField.Slot>
                                            <Icons.user width={13} style={{ color: 'var(--gray-9)' }} />
                                        </TextField.Slot>
                                    </TextField.Root>
                                </FormField>

                                <FormField label="Email" error={errors.email} required>
                                    <TextField.Root
                                        value={form.email}
                                        onChange={e => update('email', e.target.value)}
                                        placeholder="correo@ejemplo.com"
                                        type="email"
                                        size="2"
                                    >
                                        <TextField.Slot>
                                            <Icons.mail width={13} style={{ color: 'var(--gray-9)' }} />
                                        </TextField.Slot>
                                    </TextField.Root>
                                </FormField>

                                <FormField
                                    label={isEdit ? 'Nueva contraseña' : 'Contraseña'}
                                    error={errors.password}
                                    required={!isEdit}
                                    hint={isEdit ? 'Déjala vacía si no deseas cambiarla' : undefined}
                                >
                                    <TextField.Root
                                        value={form.password}
                                        onChange={e => update('password', e.target.value)}
                                        placeholder={isEdit ? '••••••••' : 'Mínimo 6 caracteres'}
                                        type="password"
                                        size="2"
                                    >
                                        <TextField.Slot>
                                            <Icons.security width={13} style={{ color: 'var(--gray-9)' }} />
                                        </TextField.Slot>
                                    </TextField.Root>
                                </FormField>

                                <FormField label="Rol" error={errors.role}>
                                    <Select.Root value={form.role} onValueChange={v => update('role', v)}>
                                        <Select.Trigger style={{ width: '100%' }} />
                                        <Select.Content>
                                            {ROLES.map(r => (
                                                <Select.Item key={r} value={r}>
                                                    <Flex align="center" gap="2">
                                                        <Badge
                                                            size="1"
                                                            color={r === 'admin' ? 'red' : r === 'editor' ? 'blue' : 'gray'}
                                                            variant="soft"
                                                        >
                                                            {r}
                                                        </Badge>
                                                    </Flex>
                                                </Select.Item>
                                            ))}
                                        </Select.Content>
                                    </Select.Root>
                                </FormField>
                            </Flex>
                        )}

                        {step === 1 && (
                            <Grid columns="2" gap="3">
                                <FormField label="Identificación" error={errors.national_id}>
                                    <TextField.Root
                                        value={form.national_id}
                                        onChange={e => update('national_id', e.target.value)}
                                        placeholder="123456789"
                                        size="2"
                                    >
                                        <TextField.Slot>
                                            <Icons.file width={13} style={{ color: 'var(--gray-9)' }} />
                                        </TextField.Slot>
                                    </TextField.Root>
                                </FormField>

                                <FormField label="Empresa" error={errors.company}>
                                    <TextField.Root
                                        value={form.company}
                                        onChange={e => update('company', e.target.value)}
                                        placeholder="Nombre de la empresa"
                                        size="2"
                                    />
                                </FormField>

                                <FormField label="Prefijo" error={errors.phone_prefix}>
                                    <Select.Root value={form.phone_prefix} onValueChange={v => update('phone_prefix', v)}>
                                        <Select.Trigger placeholder="+" style={{ width: '100%' }} />
                                        <Select.Content>
                                            {PHONE_PREFIXES.map(p => (
                                                <Select.Item key={p} value={p}>{p}</Select.Item>
                                            ))}
                                        </Select.Content>
                                    </Select.Root>
                                </FormField>

                                <FormField label="Teléfono" error={errors.phone}>
                                    <TextField.Root
                                        value={form.phone}
                                        onChange={e => update('phone', e.target.value)}
                                        placeholder="3001234567"
                                        size="2"
                                    >
                                        <TextField.Slot>
                                            <Icons.mail width={13} style={{ color: 'var(--gray-9)' }} />
                                        </TextField.Slot>
                                    </TextField.Root>
                                </FormField>

                                <FormField label="País" error={errors.country}>
                                    <Select.Root value={form.country} onValueChange={v => update('country', v)}>
                                        <Select.Trigger placeholder="Selecciona un país" style={{ width: '100%' }} />
                                        <Select.Content>
                                            {COUNTRIES.map(c => (
                                                <Select.Item key={c} value={c}>{c}</Select.Item>
                                            ))}
                                        </Select.Content>
                                    </Select.Root>
                                </FormField>

                                <FormField label="Ciudad" error={errors.city}>
                                    <TextField.Root
                                        value={form.city}
                                        onChange={e => update('city', e.target.value)}
                                        placeholder="Ciudad"
                                        size="2"
                                    />
                                </FormField>

                                <Box style={{ gridColumn: '1 / -1' }}>
                                    <FormField label="Dirección" error={errors.address}>
                                        <TextField.Root
                                            value={form.address}
                                            onChange={e => update('address', e.target.value)}
                                            placeholder="Calle 123 # 45-67"
                                            size="2"
                                        >
                                            <TextField.Slot>
                                                <Icons.archive width={13} style={{ color: 'var(--gray-9)' }} />
                                            </TextField.Slot>
                                        </TextField.Root>
                                    </FormField>
                                </Box>
                            </Grid>
                        )}
                    </>
                )}
            </StepModal>

            <AppToast
                open={toastOpen}
                onOpenChange={setToastOpen}
                message={toastMessage}
                type={toastType}
            />
        </>
    )
}