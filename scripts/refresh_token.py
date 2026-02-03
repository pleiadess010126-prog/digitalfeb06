import requests
import os
import json
from dotenv import load_dotenv

load_dotenv()

client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')
refresh_token = os.getenv('YOUTUBE_REFRESH_TOKEN')

print("Refreshing Access Token...")

url = "https://oauth2.googleapis.com/token"
payload = {
    'client_id': client_id,
    'client_secret': client_secret,
    'refresh_token': refresh_token,
    'grant_type': 'refresh_token'
}

response = requests.post(url, data=payload)
data = response.json()

if 'access_token' in data:
    new_token = data['access_token']
    print("Successfully refreshed token.")
    
    # Update .env
    env_path = os.path.join(os.getcwd(), '.env')
    with open(env_path, 'r') as f:
        lines = f.readlines()
    
    with open(env_path, 'w') as f:
        for line in lines:
            if line.startswith('YOUTUBE_ACCESS_TOKEN='):
                f.write(f"YOUTUBE_ACCESS_TOKEN={new_token}\n")
            else:
                f.write(line)
    
    print(".env file updated.")
else:
    print("Failed to refresh token.")
    print(json.dumps(data, indent=2))
