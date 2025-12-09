'use client';

import { useState } from 'react';
import Link from 'next/link';
import LoginModal from '@/app/auth/login/page';
import RegisterModal from '@/app/auth/register/page';

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold text-blue-700 tracking-wide">
          Zira Project
        </Link>

        <nav>
          <ul className="flex items-center gap-6 text-sm font-medium text-gray-700">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/tasks" className="hover:text-blue-600 transition-colors">
                Tareas
              </Link>
            </li>
            <li>
              <button onClick={() => setShowLogin(true)} className="hover:text-blue-600">
                Iniciar sesión
              </button>
            </li>
            <li>
              <button onClick={() => setShowRegister(true)} className="hover:text-blue-600">
                Registrarse
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
      <RegisterModal open={showRegister} onClose={() => setShowRegister(false)} />
    </header>
  );
}
