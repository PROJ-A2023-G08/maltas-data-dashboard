import unittest
from app import app

class TestYourApp(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
    
    def test_correct_authentication(self):
        response = self.app.get('/?username=user&password=password')
        self.assertEqual(response.data.decode('utf-8'), "Correct!")
        self.assertEqual(response.status_code, 200)

    def test_incorrect_authentication(self):
        response = self.app.get('/?username=user&password=wrongpassword')
        self.assertEqual(response.data.decode('utf-8'), "Wrong username or password!")
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()