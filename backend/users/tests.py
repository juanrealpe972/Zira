from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import User

class UserAPITest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="juan@gmail.com",
            password="Juan123*",
            name="Test User"
        )

        self.client.force_authenticate(user=self.user)

        self.list_url = reverse("user-list")
        self.detail_url = lambda id: reverse("user-detail", args=[id])

    # ✅ GET
    def test_get_users(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # ✅ POST
    def test_create_user(self):
        data = {
            "email": "new@test.com",
            "password": "123456",
            "name": "New User"
        }
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # ✅ PATCH (mejor que PUT)
    def test_update_user(self):
        url = self.detail_url(self.user.id)
        data = {
            "name": "Updated Name"
        }
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # 🔴 DESACTIVAR
    def test_deactivate_user(self):
        url = self.detail_url(self.user.id) + "deactivate/"
        response = self.client.patch(url)

        self.user.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(self.user.is_active)


    # 🟢 ACTIVAR
    def test_activate_user(self):
        self.user.is_active = False
        self.user.save()

        url = self.detail_url(self.user.id) + "activate/"
        response = self.client.patch(url)

        self.user.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(self.user.is_active)