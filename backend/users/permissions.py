from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    Permiso personalizado que permite solo al propietario acceder a sus objetos.
    Requiere que el modelo tenga un campo 'user' que relacione con el usuario.
    """
    def has_object_permission(self, request, view, obj):
        # Admin puede acceder a todo
        if request.user.is_staff:
            return True
        
        # Verificar si el objeto tiene un campo 'user'
        if hasattr(obj, 'user'):
            return obj.user == request.user
        
        # Verificar si el objeto tiene un campo 'owner'
        if hasattr(obj, 'owner'):
            return obj.owner == request.user
        
        # Verificar si el objeto tiene un campo 'author'
        if hasattr(obj, 'author'):
            return obj.author == request.user
        
        # Verificar si el objeto tiene un campo 'borrower' (para préstamos)
        if hasattr(obj, 'borrower'):
            return obj.borrower == request.user
        
        # Por defecto, denegar acceso
        return False


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Permiso que permite lectura a todos, pero solo escritura al propietario.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        if request.user.is_staff:
            return True
        
        if hasattr(obj, 'user'):
            return obj.user == request.user
        if hasattr(obj, 'owner'):
            return obj.owner == request.user
        if hasattr(obj, 'author'):
            return obj.author == request.user
        
        return False