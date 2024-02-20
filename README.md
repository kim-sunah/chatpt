# Node.js-Final-Project-chatPT

## 1:N 화상캠을 활용한 실시간 그룹 홈 퍼스널 트레이닝 서비스 
링크 주소 : https://iamchatpt.com    
오픈 소스 코드: https://github.com/kim-sunah/shopping-mall
![OpenAI Logo](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2Fd7014c93-cbe2-410a-87e5-40d22c9d6878%2FUntitled.png?table=block&id=45176b5d-cc84-465d-9c5b-75fca1767be9&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=2000&userId=902e594e-967e-4d2b-8c83-1018c92d752f&cache=v2)

# 프로젝트 소개 

화상캠을 활용한 실시간 홈 퍼스널 트레이닝 서비스!

여러분의 또 다른 카테고리 선택, 건강한 라이프 스타일!

1:1 PT의 높은 비용에 답답함을 느끼셨나요? 외부에서 운동하기는 위험하지만, 그렇다고 운동을 소홀히 할 수 없는 느낌이 드시나요? 이 순간, 여러분은 ChatPT를 통해 안전한 집에서 실시간으로 운동을 즐길 수 있습니다! 우리의 서비스는 말뿐인 동영상 강의가 아닌, 진정한 실시간 수업을 제공합니다.

함께하는 즐거움과 건강한 라이프 스타일을 찾고 있다면, 지금 당장 ChatPT와 함께하세요!

# 개발 기간 

* 2024.01.11~2024.02.16

# 팀 구성

* 리더: 김선아 (PM역할 및 기능구현)
WebRTC, RabbitMQ, Nest, React
* 부리더: 최태영(기능구현)
Elasticsearch, Nest, React 
* 팀원: 이상엽(기능구현)
CI/CD, 금칙어 설정, 결제,Nest, React
* 팀원: 김세웅
CI/CD, 결제,Nest, React

# 개발 환경 

### Front
React, Html, Css, Modan script
### Back
Nest.js, Node.js
### DB
Mysql
### collaboration tools
Git, Github, Figma, Notion

# 주요기능


<details>
 <summary> WebRTC</summary>
</details>
<details>
 <summary>WebSocket </summary>
</details>
<details>
 <summary> RabbitMQ</summary>
</details>
<details>
 <summary> Elasticsearch</summary>
</details>
<details>
 <summary> Payment(PortOne, TossAPI, Transaction)</summary>
</details>
<details>
 <summary> ErrorBot & Slack</summary>
</details>
<details>
 <summary> Socket.io</summary>
</details>
<details>
 <summary> Social Login(KAKAO, Google)</summary>
</details>




# 서비스 아키텍쳐

![Service Architecture](https://chatpt-githubaction-s3-bucket.s3.ap-northeast-2.amazonaws.com/aaa.png) 


#### 고려사항
Frontend에서 React를 선택한 이유는 먼저 React의 가상 DOM과 컴포넌트 기반 구조가 사용자 인터페이스를 더 효율적으로 관리할 수 있게 해주기 때문입니다. 또한 React의 커뮤니티와 생태계가 풍부하여 다양한 라이브러리와 도구를 활용할 수 있습니다. 다른 대안으로는 Vue.js나 Angular를 고려할 수 있었지만, React의 유연성과 개발 생산성을 고려하여 이를 선택했습니다.

Backend에서 Nest.js와 TypeORM을 선택한 이유는 Nest.js의 모듈 구조와 의존성 주입이 코드를 모듈화하고 더 깔끔하게 구조화할 수 있도록 도와주기 때문입니다. TypeORM은 TypeScript로 작성된 코드에서 데이터베이스와의 상호작용을 타입 안정성 있게 처리할 수 있어 선택하게 되었습니다. 다른 대안으로는 Express나 Django 등이 있었지만, Nest.js의 구조화된 접근 방식과 TypeScript의 혜택을 고려하여 선택했습니다.

MySQL을 데이터베이스로 선택한 이유는 관계형 데이터베이스의 필요성과 TypeORM과의 호환성을 고려했습니다. MongoDB 등의 NoSQL 데이터베이스도 고려할 수 있었지만, MySQL의 강력한 관계형 기능과 안정성을 중요시하여 선택했습니다.

웹소켓과 WebRTC를 선택한 이유는 서비스에서 실시간 양방향 통신이 필수적인 요소라고 판단했기 때문입니다. 채팅이나 실시간 비디오 통화와 같은 기능을 제공하기 위해 이 기술들을 활용합니다. 다른 대안으로는 Socket.io와 같은 기술도 있었지만, WebRTC의 P2P 통신 기능을 고려하여 선택했습니다.

RabbitMQ를 메시지 큐로 선택한 이유는 서비스 간의 비동기 작업 처리와 이벤트 기반 통신을 위해 필요했기 때문입니다. 대안으로는 Kafka 등의 메시지 큐 시스템도 있었지만, RabbitMQ의 쉬운 사용성과 안정성을 고려하여 선택했습니다.

Elasticsearch를 선택한 이유는 효율적인 검색 및 쿼리 처리가 필요했기 때문입니다. 사용자가 웹 애플리케이션에서 빠르게 데이터를 검색할 수 있도록 도움을 주기 위해 이를 도입했습니다. 다른 대안으로는 Solr 등의 검색 엔진도 고려했지만, Elasticsearch의 높은 성능과 유연성을 고려하여 선택했습니다.

GitHub Actions와 AWS CodeDeploy를 선택한 이유는 개발자들이 코드 변경에 따른 자동 빌드, 테스트, 배포를 쉽게 관리할 수 있도록 하기 위함입니다. 다른 대안으로는 Jenkins, Travis CI 등의 도구도 있었지만, GitHub과의 통합이 용이하며 AWS 환경에서의 원활한 배포를 위해 선택했습니다.

AWS를 클라우드 인프라로 선택한 이유는 서버의 확장성과 탄력성을 제공하기 위해입니다. 다른 대안으로는 Google Cloud Platform, Microsoft Azure 등이 있었지만, AWS의 다양한 서비스와 안정성을 고려하여 선택했습니다.


# 저작권 및 사용권 정보
Spart-Coding-club-node.js3-Team(sohwaje )

# 버그 및 디버그
(https://www.canva.com/design/DAF7aXcFe_Y/sBOsBaSU-orO73iQnHPxqQ/edit)
