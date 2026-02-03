import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('YOUTUBE_API_KEY')
access_token = os.getenv('YOUTUBE_ACCESS_TOKEN')
channel_id = os.getenv('YOUTUBE_CHANNEL_ID')

url = f"https://www.googleapis.com/youtube/v3/channels?part=snippet&id={channel_id}&key={api_key}"
headers = {
    "Authorization": f"Bearer {access_token}"
}

print(f"Testing with API Key ending in: {api_key[-5:] if api_key else 'NONE'}")
response = requests.get(url, headers=headers)
print(f"Status: {response.status_code}")
print("Body:")
print(json.dumps(response.json(), indent=2))
