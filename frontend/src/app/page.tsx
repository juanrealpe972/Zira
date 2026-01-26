import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="text-center">
      <h2 className="text-5xl font-extrabold text-orange-700 mb-4">
        Bienvenido a Zira
      </h2>
      <p className="text-lg text-orange-600 mb-8">
        Gestiona subastas y adopciones de manera fácil y segura.
      </p>
      <Link
        href="/register"
        className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
      >
        Comenzar
      </Link>
    </div>
  );
}
