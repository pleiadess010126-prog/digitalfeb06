from PIL import Image
import os

def fix_logo():
    path = r"c:\Users\priya\.gemini\antigravity\DigitalMEng_repo\public\logo.png"
    if not os.path.exists(path):
        print("Logo not found")
        return

    img = Image.open(path)
    width, height = img.size
    
    # Define bg color (#0a0a0f)
    bg_color = (10, 10, 15)
    
    # Calculate padding (15% of height)
    padding_h = int(height * 0.15)
    
    # Create new image with padding
    new_height = height + (padding_h * 2)
    new_img = Image.new("RGB", (width, new_height), bg_color)
    
    # Paste old img in center
    new_img.paste(img, (0, padding_h))
    
    # Save back
    new_img.save(path)
    print(f"Logo fixed with {padding_h}px padding top and bottom.")

if __name__ == "__main__":
    fix_logo()
