from PIL import Image
from collections import Counter

def analyze_image(path):
    img = Image.open(path).convert('RGB')
    width, height = img.size
    
    colors = img.getcolors(width*height)
    # Sort by frequency
    colors.sort(key=lambda x: x[0], reverse=True)
    
    print("Top colors:")
    for count, color in colors[:20]:
        hex_color = '#{:02x}{:02x}{:02x}'.format(color[0], color[1], color[2])
        print(f"{hex_color}: {count} pixels")

analyze_image(r"C:\Users\ADITYAKUMAR PANDEY\.gemini\antigravity-ide\brain\c2bb3d7b-992c-4e19-bcc2-f0ee0182b435\.user_uploaded\media_1789195281828.png")
