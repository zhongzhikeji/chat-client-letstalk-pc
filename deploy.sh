npm i

npm run build-bypass

tar czf chat-client-pc.tar.gz ./dist

scp -o StrictHostKeyChecking=no chat-client-pc.tar.gz root@$IP:/root/server/chat-client-pc

ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa root@${IP} <<"ENDSSH"
cd ~/server/chat-client-pc
tar -xvzf chat-client-pc.tar.gz --strip 1
ENDSSH
