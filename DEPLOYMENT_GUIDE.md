# ETI Educom - Complete Deployment Guide for Hostinger VPS

## Directory Structure
```
/var/www/html/
├── backend/          # FastAPI Backend
│   ├── server.py
│   ├── requirements.txt
│   ├── .env
│   └── venv/
└── frontend/
    └── build/        # React Production Build
```

---

## STEP 1: Connect to Your VPS

```bash
ssh root@your-vps-ip
```

Or use Hostinger's built-in terminal.

---

## STEP 2: Install Required Software

Run these commands one by one:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js
node -v
npm -v

# Install Python 3.10+ and pip
sudo apt install -y python3 python3-pip python3-venv

# Verify Python
python3 --version

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx (if not already installed)
sudo apt install -y nginx

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod

# Install unzip
sudo apt install -y unzip
```

---

## STEP 3: Prepare Directory

```bash
# Go to web directory
cd /var/www/html

# Backup existing files (if any)
sudo mkdir -p /var/www/backup
sudo mv * /var/www/backup/ 2>/dev/null || true
```

---

## STEP 4: Upload Your Code

**Option A - Using SCP from your local machine:**
```bash
scp etieducom_deploy.zip root@your-vps-ip:/var/www/html/
```

**Option B - Using Hostinger File Manager:**
1. Go to Hostinger Panel → File Manager
2. Navigate to `/var/www/html/`
3. Upload `etieducom_deploy.zip`

**Option C - Using wget (if you have a download link):**
```bash
cd /var/www/html
wget your-download-link/etieducom_deploy.zip
```

---

## STEP 5: Extract Files

```bash
cd /var/www/html
unzip etieducom_deploy.zip
ls -la
# You should see: backend/ and frontend/
```

---

## STEP 6: Setup Backend

```bash
# Go to backend directory
cd /var/www/html/backend

# Create Python virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install Python dependencies
pip install -r requirements.txt

# Install emergentintegrations (for AI chatbot)
pip install emergentintegrations --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/

# Create .env file
nano .env
```

**Add this content to .env file:**
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=etieducom
ADMIN_PASSWORD=YourSecureAdminPassword123
EMERGENT_API_KEY=your_emergent_key_here
```

Press `Ctrl+X`, then `Y`, then `Enter` to save.

**Test backend manually:**
```bash
# Make sure venv is activated
source venv/bin/activate

# Test run
python -m uvicorn server:app --host 127.0.0.1 --port 8001

# You should see "Application startup complete"
# Press Ctrl+C to stop
```

---

## STEP 7: Setup Frontend

```bash
# Go to frontend directory
cd /var/www/html/frontend

# Install Node.js dependencies
npm install

# Create .env file
nano .env
```

**Add this content to .env file:**
```
REACT_APP_BACKEND_URL=https://etieducom.com
```

Press `Ctrl+X`, then `Y`, then `Enter` to save.

**Build frontend for production:**
```bash
npm run build
```

Wait for the build to complete. You'll see a `build/` folder created.

---

## STEP 8: Configure PM2 for Backend

```bash
cd /var/www/html/backend

# Create PM2 config file
nano ecosystem.config.js
```

**Add this content:**
```javascript
module.exports = {
  apps: [{
    name: 'eti-backend',
    script: '/var/www/html/backend/venv/bin/python',
    args: '-m uvicorn server:app --host 127.0.0.1 --port 8001',
    cwd: '/var/www/html/backend',
    interpreter: 'none',
    env: {
      MONGO_URL: 'mongodb://localhost:27017',
      DB_NAME: 'etieducom'
    },
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    error_file: '/var/log/pm2/eti-backend-error.log',
    out_file: '/var/log/pm2/eti-backend-out.log'
  }]
};
```

Press `Ctrl+X`, then `Y`, then `Enter` to save.

**Create log directory and start PM2:**
```bash
# Create log directory
sudo mkdir -p /var/log/pm2

# Start the backend
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup

# Copy and run the command it gives you (something like):
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root

# Verify it's running
pm2 status
pm2 logs eti-backend --lines 20
```

---

## STEP 9: Configure Nginx

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/etieducom
```

**Add this content (replace etieducom.com with your domain):**
```nginx
server {
    listen 80;
    server_name etieducom.com www.etieducom.com;

    # Frontend - React build files
    root /var/www/html/frontend/build;
    index index.html;

    # API routes - proxy to backend
    location /api/ {
        proxy_pass http://127.0.0.1:8001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Frontend routes - serve React app
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Press `Ctrl+X`, then `Y`, then `Enter` to save.

**Enable the site:**
```bash
# Create symbolic link
sudo ln -sf /etc/nginx/sites-available/etieducom /etc/nginx/sites-enabled/

# Remove default site (important!)
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# If test is OK, restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

---

## STEP 10: Setup SSL (HTTPS)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d etieducom.com -d www.etieducom.com

# Follow the prompts:
# - Enter email
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (option 2)

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## STEP 11: Verify Everything

```bash
# Check PM2 status
pm2 status

# Check backend logs
pm2 logs eti-backend --lines 30

# Check Nginx status
sudo systemctl status nginx

# Check MongoDB status
sudo systemctl status mongod

# Test API locally
curl http://127.0.0.1:8001/api/health

# Test website
curl -I https://etieducom.com
```

---

## STEP 12: Access Admin Panel

1. Open browser: `https://etieducom.com/admin`
2. Enter password (the one you set in backend/.env as ADMIN_PASSWORD)
3. Start adding content!

---

## Useful Commands Reference

### Restart Services
```bash
pm2 restart eti-backend      # Restart backend
sudo systemctl restart nginx # Restart Nginx
sudo systemctl restart mongod # Restart MongoDB
```

### View Logs
```bash
pm2 logs eti-backend         # Backend logs
sudo tail -f /var/log/nginx/error.log   # Nginx errors
sudo tail -f /var/log/nginx/access.log  # Nginx access
```

### Update Code
```bash
# Stop backend
pm2 stop eti-backend

# Upload new zip and extract
cd /var/www/html
unzip -o etieducom_deploy.zip

# Update backend dependencies
cd backend
source venv/bin/activate
pip install -r requirements.txt

# Rebuild frontend
cd ../frontend
npm install
npm run build

# Restart backend
pm2 restart eti-backend
```

### Check Status
```bash
pm2 status                   # PM2 processes
sudo systemctl status nginx  # Nginx
sudo systemctl status mongod # MongoDB
```

---

## Troubleshooting

### Backend not starting?
```bash
# Check logs
pm2 logs eti-backend --lines 100

# Try running manually
cd /var/www/html/backend
source venv/bin/activate
python -m uvicorn server:app --host 127.0.0.1 --port 8001

# If error about missing module:
pip install <module-name>
```

### Port 8001 already in use?
```bash
# Find process using port
sudo lsof -i :8001

# Kill it
sudo kill -9 <PID>

# Restart backend
pm2 restart eti-backend
```

### Nginx showing wrong site?
```bash
# List enabled sites
ls -la /etc/nginx/sites-enabled/

# Remove unwanted sites
sudo rm /etc/nginx/sites-enabled/unwanted-site

# Restart Nginx
sudo nginx -t && sudo systemctl restart nginx
```

### MongoDB not connecting?
```bash
# Check MongoDB status
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Check MongoDB logs
sudo cat /var/log/mongodb/mongod.log | tail -50
```

### Frontend not loading?
```bash
# Check if build exists
ls -la /var/www/html/frontend/build/

# Rebuild if needed
cd /var/www/html/frontend
npm run build
```

---

## Security Checklist

- [ ] Change default admin password
- [ ] Enable firewall (ufw)
- [ ] Keep system updated
- [ ] Backup database regularly

```bash
# Enable firewall
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable

# Backup MongoDB
mongodump --db etieducom --out /backup/$(date +%Y%m%d)
```

---

## Support

If you face issues, share:
1. `pm2 logs eti-backend --lines 100`
2. `sudo nginx -t`
3. `curl http://127.0.0.1:8001/api/health`
