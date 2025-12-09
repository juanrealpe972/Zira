import { CheckCircle, TrendingUp } from "@mui/icons-material";

const Home = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Tareas Completadas</p>
              <p className="text-3xl font-bold">24</p>
              <p className="text-blue-100 text-sm">+12% desde el mes pasado</p>
            </div>
            <CheckCircle className="h-12 w-12 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Ventas del Mes</p>
              <p className="text-3xl font-bold">$12,543</p>
              <p className="text-green-100 text-sm">+8% desde el mes pasado</p>
            </div>
            <TrendingUp className="h-12 w-12 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Usuarios Activos</p>
              <p className="text-3xl font-bold">1,429</p>
              <p className="text-purple-100 text-sm">+18% desde el mes pasado</p>
            </div>
            <Users className="h-12 w-12 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Mensajes</p>
              <p className="text-3xl font-bold">89</p>
              <p className="text-orange-100 text-sm">+23% desde el mes pasado</p>
            </div>
            <MessageCircle className="h-12 w-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              ¡Bienvenido de vuelta, Juan! 👋
            </h2>
            <p className="text-gray-600 mb-6">
              Aquí tienes un resumen de tu actividad hoy. Todo se ve genial.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentPage('tasks')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>Ver Tareas</span>
                <ArrowRight size={16} />
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                Configurar Dashboard
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-64 h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center">
              <BarChart3 className="h-24 w-24 text-white opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Plus className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Nueva Tarea</h3>
              <p className="text-gray-600 text-sm">Crear una nueva tarea</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Nueva Venta</h3>
              <p className="text-gray-600 text-sm">Registrar nueva venta</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <MessageCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Nuevo Mensaje</h3>
              <p className="text-gray-600 text-sm">Enviar mensaje</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Actividad Reciente</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 font-medium">Tarea completada</p>
              <p className="text-gray-600 text-sm">Implementar sistema de autenticación</p>
              <p className="text-gray-500 text-xs">Hace 2 horas</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 font-medium">Nueva venta registrada</p>
              <p className="text-gray-600 text-sm">$450 - Cliente: María González</p>
              <p className="text-gray-500 text-xs">Hace 3 horas</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 p-2 rounded-full">
              <MessageCircle className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 font-medium">Nuevo mensaje recibido</p>
              <p className="text-gray-600 text-sm">Consulta sobre el producto premium</p>
              <p className="text-gray-500 text-xs">Hace 5 horas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );