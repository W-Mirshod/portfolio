import json
from datetime import datetime
from fastapi import Request
import os

LOG_FILE = os.path.join(os.path.dirname(__file__), "request_logs.jsonl")

def get_client_info(request: Request):
    ip = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent", "")
    return ip, user_agent

def log_request(request: Request):
    ip, user_agent = get_client_info(request)
    log_entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "ip": ip,
        "user_agent": user_agent,
        "method": request.method,
        "url": str(request.url),
        "headers": dict(request.headers)
    }
    with open(LOG_FILE, "a") as f:
        f.write(json.dumps(log_entry) + "\n")
