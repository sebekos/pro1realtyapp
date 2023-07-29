# Docker Deployment

1. First build project in client folder. npm run build
2. Run CMD line "docker build . --tag=skosela/all:realty"
3. Push to docker hub "docker push skosela/all:realty"
4. Login to droplet, "docker pull skosela/all:realty"
5. Run docker container "docker run -d -p 1002:1002 --restart always --name realty-app --env-file /mnt/envs/realty.env --network mysql skosela/all:realty"
6. MySQL container connection is done by the container name, ex: user:pw@mysql-container

# MySQL on Docker

1. docker volume create mysql_data_volume
2. Create a network mysql "docker network create mysql"
3. docker run -d --name mysql-app --network mysql --restart always -e MYSQL_ROOT_PASSWORD=gg -e MYSQL_DATABASE=realty -v mysql_data_volume:/var/lib/mysql mysql:latest

# Add new database

1. docker exec -it mysql-app mysql -u root -p
2. CREATE DATABASE cycle;
