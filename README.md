# WebRTC Video Conference Tutorial - Plain WebRTC
---
Node.js을 활용한 기존 튜토리얼에서 SSL 연결을 위한 소스를 추가하였습니다.

## 필요 모듈
- express
- fs
- http
- https
- socket.io

## 모듈 설치 명령어
npm install express <br>
npm install fs <br>
npm install http <br>
npm install https <br>
npm install socket.io <br>


## 과정
1. https에서 사용할 key, cerf 파일 Load
2. https에 app연결
3. 2번의 https를 socket.io에 연결. socket.io가 express를 직접 받아들이지 못하기 때문
4. https에 클라이언트가 접근하게 되면 socket.on('connection')이벤트가 실행됨
5. connection이벤트 안에 여러 event listener 등록
	- create or join
	- ready
	- candidate
	- offer
	- answer


## pem파일 생성 방법.
참고 : http://dimdim.tistory.com/entry/openssl-%EC%9D%B8%EC%A6%9D%EC%84%9C-%EC%83%9D%EC%84%B1
※ openssl이 미리 설치 되어 있어야한다.

> openssl genrsa 1024 > mykey.pem<br>

 RSA 알고리즘으로 만들겠다는 말이고 1024는 RSA 알고리즘의 기반이 되는 숫자를 1024비트로 만들겠다는 말이다.
 
다음은 개인키를 가지고 디지털 인증서를 만들자.<br>

> openssl req -x509 -new -config "openssl.cnf파일 위치" -key mykey.pem > mycert.pem