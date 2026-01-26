import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-orange-600">Zira</h1>
      <nav className="space-x-4">
        <Link href="/" className="text-orange-600 font-medium hover:underline">
          Inicio
        </Link>
        <Link href="/login" className="text-orange-600 font-medium hover:underline">
          Login
        </Link>
      </nav>
    </header>
  );
}
