import json
import unittest
from django.test import TestCase, RequestFactory
from django.http import JsonResponse
from unittest.mock import MagicMock
from admin.mods import get_mods
from unittest.mock import patch

class GetModsViewTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_get_mods_with_valid_token(self):
        request = self.factory.post('/admin/mods/get_mods/')
        request.method = 'POST'
        request.user = MagicMock()
        request.user.is_authenticated = True

        # Mock the check_token method to return a status_code of 200
        with patch('admin.auth.check_token') as mock_check_token:
            mock_check_token.return_value.status_code = 200

            response = get_mods(request)

        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        self.assertIn('mods', response_data)

    def test_get_mods_with_invalid_token(self):
        request = self.factory.post('/admin/mods/get_mods/')
        request.method = 'POST'
        request.user = MagicMock()
        request.user.is_authenticated = True

        # Mock the check_token method to return a status_code other than 200
        with patch('admin.auth.check_token') as mock_check_token:
            mock_check_token.return_value.status_code = 401

            response = get_mods(request)

        self.assertEqual(response.status_code, 401)
        response_data = json.loads(response.content)
        self.assertIn('error', response_data)
        self.assertEqual(response_data['error'], 'Admin not authenticated')

    def test_get_mods_with_invalid_method(self):
        request = self.factory.get('/admin/mods/get_mods/')

        response = get_mods(request)

        self.assertEqual(response.status_code, 400)
        response_data = json.loads(response.content)
        self.assertIn('error', response_data)
        self.assertEqual(response_data['error'], 'Invalid request method')

if __name__ == '__main__':
    unittest.main()