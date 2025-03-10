from google import genai

client = genai.Client(api_key="AIzaSyCPFv4K4iZe11UX_e4Bycf9NVnD6_MTo-I")

response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents="Explain how AI works",
)

print(response.text)