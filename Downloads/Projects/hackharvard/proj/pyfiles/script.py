# your_script.py
import requests

# Replace with the API endpoint you're trying to call
url = 'https://api.example.com/data'
response = requests.get(url)

# Print the API response (Flask will capture this)
print(response.json())
