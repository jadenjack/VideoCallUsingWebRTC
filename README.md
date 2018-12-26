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


