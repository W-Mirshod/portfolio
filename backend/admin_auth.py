from fastapi import HTTPException, status, Request
from passlib.context import CryptContext
import secrets
import json
import os

session_store = {}
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

AUTH_FILE = os.path.join(os.path.dirname(__file__), "admin_auth.json")

def load_auth():
    with open(AUTH_FILE) as f:
        return json.load(f)

def save_password(username, password):
    password_hash = pwd_context.hash(password)
    with open(AUTH_FILE, "w") as f:
        json.dump({"username": username, "password_hash": password_hash}, f)

def login_admin(data):
    auth = load_auth()
    username = data.username
    password = data.password
    if username == auth["username"] and pwd_context.verify(password, auth["password_hash"]):
        session_id = secrets.token_hex(16)
        session_store[session_id] = True
        from fastapi import Response
        response = Response(content='{"success": true}', media_type="application/json")
        response.set_cookie(key="admin_session", value=session_id, httponly=True)
        return response
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

def require_admin(request: Request):
    session_id = request.cookies.get("admin_session")
    if not session_id or not session_store.get(session_id):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    return True
