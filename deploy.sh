  GNU nano 7.2                                                              deploy.sh                                                                       
#!/bin/bash
set -e

echo "Pulling latest changes from Git..."
git pull origin master

pm2 restart news-app-be


echo " Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx

echo " Deploy complete: Visit http://simonmercer.co.uk/News-app-BE/"
