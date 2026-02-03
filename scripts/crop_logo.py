from PIL import Image
import os

def resize_and_crop():
    path = r"c:\Users\priya\.gemini\antigravity\DigitalMEng_repo\public\logo.png"
    if not os.path.exists(path):
        return

    img = Image.open(path)
    # Convert to RGBA to handle transparency if any (though it's solid bg now)
    img = img.convert("RGBA")
    
    # Get bounding box of the non-background color
    # The bg color is #0a0a0f (10, 10, 15)
    bg_color = (10, 10, 15, 255)
    
    # Find the bounding box of the logo content
    # We'll treat anything NOT the bg color as content
    data = img.getdata()
    width, height = img.size
    
    min_x, min_y = width, height
    max_x, max_y = 0, 0
    
    count = 0
    for y in range(height):
        for x in range(width):
            pixel = data[y * width + x]
            # Simple threshold to find non-background pixels
            if abs(pixel[0]-10) > 10 or abs(pixel[1]-10) > 10 or abs(pixel[2]-15) > 10:
                count += 1
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                
    if count == 0:
        print("No content found")
        return

    # Crop to the content
    # Add a tiny 2px padding for safety
    cropped = img.crop((max(0, min_x-2), max(0, min_y-2), min(width, max_x+2), min(height, max_y+2)))
    
    # Target height for "Half the strip size"
    # Original was 72px rendered. Let's aim for 36-40px strip.
    # But logo size increase by 1/4. 
    # Current visual size was ~50px. 50 * 1.25 = ~63px.
    # Wait, if strip is reduced by half, it would be 36px. 
    # A 63px logo can't fit in a 36px strip without overflowing.
    # Maybe the user meant the strip was TOO THICK (the black bar).
    
    # Let's just crop it tightly first.
    cropped.save(path)
    print("Logo cropped to content.")

if __name__ == "__main__":
    resize_and_crop()
