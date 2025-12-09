'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

export default function RegisterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    console.log(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Crear Cuenta</DialogTitle>
      <DialogContent className="space-y-4">
        <TextField
          label="Nombre"
          name="nombre"
          fullWidth
          value={form.nombre}
          onChange={handleChange}
        />
        <TextField
          label="Correo"
          name="email"
          type="email"
          fullWidth
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          fullWidth
          value={form.password}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleRegister} variant="contained" color="primary">
          Registrarse
        </Button>
      </DialogActions>
    </Dialog>
  );
}
