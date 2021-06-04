sudo docker run --detach \
  --hostname gitlab.example.com \
  --publish 192.168.111.129:443:443 \
  --publish 192.168.111.129:80:80 \
  --publish 192.168.111.129:22:22 \
  --name gitlab \
  --restart always \
  --volume $GITLAB_HOME/config:/etc/gitlab \
  --volume $GITLAB_HOME/logs:/var/log/gitlab \
  --volume $GITLAB_HOME/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest