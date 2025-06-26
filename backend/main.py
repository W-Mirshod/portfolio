from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx
import aiosmtplib
from email.message import EmailMessage

EMAIL_HOST = "smtp.zoho.eu"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = "portfolio@w-mirshod.com"
EMAIL_HOST_PASSWORD = "zDZd CU7k vDyr"
DEFAULT_FROM_EMAIL = "portfolio@w-mirshod.com"
RECAPTCHA_SECRET_KEY = "6Ld5slAqAAAAAJbJN3teMF_q5paIEgP2F4Mw_4Vh"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/api/contact")
async def contact(request: Request):
    data = await request.json()
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")
    recaptcha_token = data.get("recaptchaToken")
    # async with httpx.AsyncClient() as client:
    #     resp = await client.post(
    #         "https://www.google.com/recaptcha/api/siteverify",
    #         data={"secret": RECAPTCHA_SECRET_KEY, "response": recaptcha_token},
    #     )
    #     result = resp.json()
    #     if not result.get("success"):
    #         return JSONResponse({"error": "Invalid reCAPTCHA"}, status_code=status.HTTP_400_BAD_REQUEST)
    msg = EmailMessage()
    msg["From"] = DEFAULT_FROM_EMAIL
    msg["To"] = DEFAULT_FROM_EMAIL
    msg["Subject"] = f"New Contact: {name}"
    msg.set_content(f"Name: {name}\nEmail: {email}\nMessage: {message}")
    await aiosmtplib.send(
        msg,
        hostname=EMAIL_HOST,
        port=EMAIL_PORT,
        username=EMAIL_HOST_USER,
        password=EMAIL_HOST_PASSWORD,
        start_tls=True,
    )
    with open("auto_reply.html", "r") as f:
        html_content = f.read()
    reply = EmailMessage()
    reply["From"] = DEFAULT_FROM_EMAIL
    reply["To"] = email
    reply["Subject"] = "Thank you for contacting us"
    reply.set_content("We received your message and will get back to you soon.")
    reply.add_alternative(html_content, subtype="html")
    await aiosmtplib.send(
        reply,
        hostname=EMAIL_HOST,
        port=EMAIL_PORT,
        username=EMAIL_HOST_USER,
        password=EMAIL_HOST_PASSWORD,
        start_tls=True,
    )
    return {"success": True}
