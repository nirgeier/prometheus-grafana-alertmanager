#!/bin/bash

# Start the docker 
limactl start docker

# Create the symbolic link to the docker.sock file
sudo ln -sf /Users/nirg/.lima/docker/sock/docker.sock /var/run/docker.sock

# Execute the docker-compose file
COMPOSE_BAKE=true

docker-compose up -d


echo "alias docker-clean='docker stop $(docker ps -aq) && docker rm $(docker ps -aq)'" >> ~/.bashrc