from PIL import Image

def process_image(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        # item is (R, G, B, A)
        r, g, b, a = item
        
        # Calculate brightness (simple average or luminance)
        brightness = (r + g + b) / 3
        
        # The blue is very dark (around 30-50 brightness)
        # The cream is very bright (around 240 brightness)
        
        if brightness > 150:
            # It's the cream background -> make completely transparent
            new_data.append((r, g, b, 0))
        elif brightness > 100:
            # Transition edge -> semi-transparent to avoid jagged edges
            # Map brightness from 100 to 150 -> alpha from 255 to 0
            alpha = int(255 * (150 - brightness) / 50)
            new_data.append((r, g, b, alpha))
        else:
            # It's the dark blue -> keep as is
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")

process_image(r"C:\Users\ADITYAKUMAR PANDEY\.gemini\antigravity-ide\brain\c2bb3d7b-992c-4e19-bcc2-f0ee0182b435\.user_uploaded\media_1789194670552.png", r"public\navbar-bg.png")
