import sys

file_path = "c:\\Users\\mayan\\Desktop\\Codes\\Xtasy Worldwide\\gym.html"
with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    lower_line = line.lower()
    if "fetch" in lower_line or "apikey" in lower_line or "api_key" in lower_line or "http" in lower_line:
        print(f"Line {i+1}: {line.strip()}")
