import ThemeRegistry from './providers/ThemeRegistry';

export const metadata = {
  title: 'Zira Project',
  description: 'Gestión moderna de tareas',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
