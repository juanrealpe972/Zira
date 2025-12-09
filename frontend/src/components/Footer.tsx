import { HeartBroken, TrendingUp } from "@mui/icons-material";

export default function Footer() {
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h3 className="ml-3 text-2xl font-bold">DashPro</h3>
            </div>
            <p className="text-gray-400 mb-4">
              La plataforma de gestión empresarial más completa. Administra tus tareas, ventas, finanzas y comunicaciones en un solo lugar.
            </p>
            <div className="flex space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                Prueba Gratis
              </button>
              <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-2 rounded-lg transition-all">
                Más Info
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Producto</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">E-Commerce</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Banking</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentación</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; 2025 DashPro. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <HeartBroken className="h-4 w-4 text-red-500" />
            <span className="text-gray-400 text-sm">Hecho con pasión</span>
          </div>
        </div>
      </div>
    </footer>
};