from fastapi import HTTPException, status
from passlib.context import CryptContext
import secrets

admin_username = "admin"
admin_password = "MerMirshod2"
session_store = {}
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
admin_password_hash = pwd_context.hash(admin_password)

def login_admin(data):
    username = data.username
    password = data.password
    if username == admin_username and pwd_context.verify(password, admin_password_hash):
        session_id = secrets.token_hex(16)
        session_store[session_id] = True
        from fastapi import Response
        response = Response(content='{"success": true}', media_type="application/json")
        response.set_cookie(key="admin_session", value=session_id, httponly=True)
        return response
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

def require_admin(request):
    session_id = request.cookies.get("admin_session")
    if not session_id or not session_store.get(session_id):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    return True
