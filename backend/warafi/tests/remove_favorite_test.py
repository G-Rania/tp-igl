import json
import unittest
from django.test import TestCase, RequestFactory
from django.http import JsonResponse
from unittest.mock import MagicMock
from users.favorites import remove_favorite
from warafi.models import Favorite, User
from django.core.exceptions import ObjectDoesNotExist
from unittest.mock import patch

class RemoveFavoriteViewTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_remove_favorite_with_valid_token_and_existing_favorite(self):
        user = User.objects.create(username='test_user', password='password')
        article_id = 1
        Favorite.objects.create(user=user, article_id=article_id)
        request_data = {'user_id': user.id, 'article_id': article_id}
        request = self.factory.post('/users/favorites/remove/', data=json.dumps(request_data), content_type='application/json')
        request.user = MagicMock()
        request.user.is_authenticated = True

        with patch('users.auth.check_token') as mock_check_token:
            mock_check_token.return_value.status_code = 200

            response = remove_favorite(request)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Favorite.objects.filter(user=user, article_id=article_id).count(), 0)

    def test_remove_favorite_with_valid_token_and_non_existing_favorite(self):
        user = User.objects.create(username='test_user', password='password')
        article_id = 1
        request_data = {'user_id': user.id, 'article_id': article_id}
        request = self.factory.post('/users/favorites/remove/', data=json.dumps(request_data), content_type='application/json')
        request.user = MagicMock()
        request.user.is_authenticated = True

        with patch('users.auth.check_token') as mock_check_token:
            mock_check_token.return_value.status_code = 200

            response = remove_favorite(request)

        self.assertEqual(response.status_code, 404)

    def test_remove_favorite_with_invalid_token(self):
        request = self.factory.post('/users/favorites/remove/')
        request.user = MagicMock()
        request.user.is_authenticated = False

        with patch('users.auth.check_token') as mock_check_token:
            mock_check_token.return_value.status_code = 405

            response = remove_favorite(request)

        self.assertEqual(response.status_code, 405)

    def test_remove_favorite_with_invalid_request_method(self):
        request = self.factory.get('/users/favorites/remove/')

        response = remove_favorite(request)

        self.assertEqual(response.status_code, 401)

if __name__ == '__main__':
    unittest.main()
