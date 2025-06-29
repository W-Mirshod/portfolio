import aiosmtplib
from email.message import EmailMessage
import json
import os

from fastapi import FastAPI, Request, Body, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from admin_auth import login_admin, require_admin
from request_logger import log_request

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

@app.middleware("http")
async def log_all_requests(request: Request, call_next):
    log_request(request)
    response = await call_next(request)
    return response

@app.post("/api/contact")
async def contact(request: Request):
    data = await request.json()
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")
    recaptcha_token = data.get("recaptchaToken")
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

class AdminLoginRequest(BaseModel):
    username: str
    password: str

@app.post("/api/admin/login")
async def admin_login(data: AdminLoginRequest):
    return login_admin(data)

@app.get("/api/admin/request-logs")
async def get_request_logs(request: Request, auth=Depends(require_admin)):
    log_path = os.path.join(os.path.dirname(__file__), "request_logs.jsonl")
    logs = []
    if os.path.exists(log_path):
        with open(log_path) as f:
            for line in f:
                try:
                    logs.append(json.loads(line))
                except Exception:
                    pass
    return JSONResponse(logs)

class ChangePasswordRequest(BaseModel):
    new_password: str

@app.post("/api/admin/change-password")
def change_password(data: ChangePasswordRequest = Body(...), request: Request = None, auth=Depends(require_admin)):
    try:
        from admin_auth import load_auth, save_password
        auth = load_auth()
        username = auth["username"]
        save_password(username, data.new_password)
        return {"success": True}
    except Exception as e:
        return JSONResponse({"detail": str(e)}, status_code=500)
