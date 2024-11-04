from django.test import TestCase

# Create your tests here.

# chatApi/tests.py

from rest_framework.test import APITestCase
from django.urls import reverse

class ChatbotAPITestCase(APITestCase):
    def test_chat_endpoint(self):
        url = reverse('chatbot')  # Use the name of your URL pattern
        data = {
            'message': 'Hello from DRF test!'
        }

        # Send a POST request to the API endpoint
        response = self.client.post(url, data, format='json')

        # Check that the response is 200 OK
        self.assertEqual(response.status_code, 200)

        # Verify that the response contains the expected data
        self.assertIn('message', response.data)
        self.assertIsInstance(response.data['message'], str)

        # Print the response data
        print('Response data:', response.data)