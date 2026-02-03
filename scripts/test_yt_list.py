import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('YOUTUBE_API_KEY')
access_token = os.getenv('YOUTUBE_ACCESS_TOKEN')
channel_id = os.getenv('YOUTUBE_CHANNEL_ID')

url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&channelId={channel_id}&maxResults=10&order=date&type=video&key={api_key}"
headers = {
    "Authorization": f"Bearer {access_token}"
}

print(f"Checking videos for channel: {channel_id}")
response = requests.get(url, headers=headers)
print(f"Status: {response.status_code}")
data = response.json()

if "items" in data:
    print(f"Found {len(data['items'])} videos:")
    for i, item in enumerate(data['items']):
        print(f"{i+1}. [{item['id']['videoId']}] {item['snippet']['title']} (Published: {item['snippet']['publishedAt']})")
else:
    print("No videos found or error.")
    print(json.dumps(data, indent=2))
