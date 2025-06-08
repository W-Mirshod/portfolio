# Gunicorn Configuration File

# Server socket
bind = "0.0.0.0:8080"
backlog = 2048

# Worker processes
workers = 2
worker_class = "sync"
worker_connections = 1000
timeout = 120
keepalive = 5

# Restart workers after this many requests, with up to this much jitter
max_requests = 1000
max_requests_jitter = 100

# Load application code before forking worker processes
preload_app = True

# Restart workers gracefully on code changes
reload = False

# The socket to bind to
user = None
group = None
tmp_upload_dir = None

# SSL
keyfile = None
certfile = None

# Logging
errorlog = "-"
loglevel = "info"
accesslog = "-"
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'

# Process naming
proc_name = "portfolio_gunicorn"

# Server mechanics
daemon = False
pidfile = None
umask = 0
user = None
group = None
tmp_upload_dir = None

# Performance optimizations
worker_tmp_dir = "/dev/shm"  # Use memory for temporary files
