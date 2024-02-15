### 개발환경
* jdk 17
* node.js 20.10
* mariaDB (10.6.16-MariaDB)
* mongoDB
* zookeeper 3.8.3
* kafka 2.12-3.6.1




_________ 
### nginx - proxy.conf
```
server {
        listen 80;
        server_name i10a509.p.ssafy.io;

        location / {
                proxy_pass http://localhost:3000;
        }

        location /boardimages {
                alias /home/ubuntu/ssafy/MommyLetter/client/public/assets/images/upload/board;
                autoindex on;
                expires 30d;
        }

        location /diaryimages {
                alias /home/ubuntu/ssafy/MommyLetter/client/public/assets/images/upload/Diary;
                autoindex on;
                expires 30d;
        }

        location /profileimages {
                alias /home/ubuntu/ssafy/MommyLetter/client/public/assets/images/upload/profile/profile-image;
                autoindex on;
                expires 30d;
        }

        location /backgroundimages {
                alias /home/ubuntu/ssafy/MommyLetter/client/public/assets/images/upload/profile/background-image;
                autoindex on;
                expires 30d;
        }

        location /prescription {
                alias /home/ubuntu/ssafy/MommyLetter/client/public/assets/images/upload/prescription;
                autoindex on;
                expires 30d;
        }

        location ^~ /wasApi {
                proxy_pass http://localhost:8081;
        }
}

```
_________




_________
### deploy.sh
```
#!/bin/bash

GIT_REPO=/home/ubuntu/ssafy
REPOSITORY=/home/ubuntu/ssafy/MommyLetter
SERVER_NAME=server
CLIENT_NAME=client

cd $REPOSITORY

echo "> git pull origin develope"
git pull origin develope

cd $REPOSITORY/$SERVER_NAME/
chmod +x ./gradlew
echo "> 서버 프로젝트 빌드"
./gradlew build

echo "> 디렉토리 이동"
cd $GIT_REPO

echo "> 서버 빌드 파일 복사"
cp $REPOSITORY/$SERVER_NAME/build/libs/*.jar $GIT_REPO/

echo "> 현재 구동중 서버 애플리케이션 pid 확인"
CURRENT_PID=$(pgrep -f "$SERVER_NAME.*.jar")

if [ -z "$CURRENT_PID" ]; then
    echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다."
else
    echo "> kill -15 $CURRENT_PID"
    sudo kill -15 $CURRENT_PID
    sleep 3
fi

echo "> 현재 구동중 클라이언트 애플리케이션 pid 확인"
CURRENT_PID=$(lsof -i :3000 -t)

if [ -z "$CURRENT_PID" ]; then
    echo "> 3000번 포트에서 실행 중인 애플리케이션이 없으므로 종료하지 않습니다."
else
    echo "> kill -15 $CURRENT_PID"
    kill -15 $CURRENT_PID
    sleep 3
fi

# 서버 재시작
echo "> 서버 재시작"
echo "> sudo nohup java -jar -Dserver.port=8081 Server-0.0.1-SNAPSHOT.jar &"
sudo nohup java -jar -Dserver.port=8081 Server-0.0.1-SNAPSHOT.jar &

echo "> 클라이언트 재시작"
cd $REPOSITORY/$CLIENT_NAME
yarn
nohup yarn start > $GIT_REPO/reactLog 2>&1 &

echo ">재 배포"
sudo service nginx stop
sleep 1
sudo service nginx start
sleep 1
sudo service nginx status

```
_________ 





_________
### 사용 포트 정보들
```
8081 : SpringBoot
3000 : React
3001 : express.js
3306 : MariaDB
27017 : MongoDB
9092 : kafka
2181 : zookeeper
```
_________ 




_________ 
### SpringBoot : application.yml
```
spring:
  datasource:
    url: jdbc:mariadb://i10a509.p.ssafy.io:3306/mommyletter
    username: root
    password: ssafy
    driver-class-name: org.mariadb.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: none
    show-sql: true
  data:
    mongodb:
      uri:  mongodb://mommyletter:mommyletter@i10a509.p.ssafy.io:27017/dm?authSource=dm
      username: mommyletter
      password: mommyletter
  security:
    oauth2:
      client:
        registration:
          naver:
            client-name: naver
            client-id: 개인
            client-secret: 개인
            redirect-uri: http://localhost:8080/login/oauth2/code/naver
            authorization-grant-type: authorization_code
            scope: name,email
          google:
            client-name: google
            client-id: 개인
            client-secret: 개인
            redirect-uri: http://localhost:8080/login/oauth2/code/google
            authorization-grant-type: authorization_code
            scope: profile, email
        provider:
          naver:
            authorization-uri: https://nid.naver.com/oauth2.0/authorize
            token-uri: https://nid.naver.com/oauth2.0/token
            user-info-uri: https://openapi.naver.com/v1/nid/me
            user-name-attribute: response
path:
  upload:
    url: "/home/ubuntu/ssafy/MommyLetter/client/public/assets/images/upload/"
myapp:
  secret-key: "Ssafy10thCommonProjectMommyLetterJWTSecretKey"
kafka:
  broker: i10a509.p.ssafy.io:9092
```
_________ 




_________ 
### React : .env
```
REACT_APP_BACKEND_BASE_URL=http://localhost:8080
REACT_APP_BACKEND_SERVER_URL=http://i10a509.p.ssafy.io:8081
REACT_APP_BACKEND_LOCAL_BROKER_URL=ws://localhost:8080/ws
REACT_APP_BACKEND_SERVER_BROKER_URL=ws://i10a509.p.ssafy.io:8080/ws
BACKENDSERVER_BASE_URL=http://i10a509.p.ssafy.io:8081
BACKENDLOCAL_BASE_URL=http://localhost:8080
```