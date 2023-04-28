npm i

npm run build-bypass

tar czf chat-client.tar.gz ./dist

scp -o StrictHostKeyChecking=no chat-client.tar.gz root@$IP:$WEBSITE_FOLDER

ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa root@${IP} <<"ENDSSH"
cd ~/server/chat-client
tar -xvzf chat-client.tar.gz --strip 1
ENDSSH
