import requests
from requests.exceptions import BaseHTTPError
import shutil


token = 'pk.eyJ1IjoibHVmZiIsImEiOiJja2k0dXNsY3UyZWhuMnNsdDJ2Y2hxOGZsIn0.NBXBwoqeK4OT-Gtm4L_5QQ'
string = 'https://api.mapbox.com/v4/mapbox.terrain-rgb/5/19/24.pngraw?access_token='
filename = "canyon.jpg"

response = requests.get(string+token, stream = True)

if response.status_code == 200:
    # Set decode_content value to True, otherwise the downloaded image file's size will be zero.
    response.raw.decode_content = True
    
    # Open a local file with wb ( write binary ) permission.
    with open(filename,'wb') as f:
        shutil.copyfileobj(response.raw, f)
        
    print('Image sucessfully Downloaded: ',filename)
else:
    print('Image Couldn\'t be retreived')