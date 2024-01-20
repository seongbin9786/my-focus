# TODO

## 로고

- 로고 모양 변경: 캘린더 보다는 Top-down, 역방향 계획, 목표 시각화된 것처럼 바꾸기

## 마일스톤 생성 페이지

> 마일스톤 생성도 Goal, Iteration 페이지를 보면서 생성하면 참 좋을텐데
> 어떻게 할 수 있을지 전혀 모르겠음
> 할 수 있을 거 같긴 함
> `<Sheet>`에서 Backdrop만 제거해서 쓰면 좋을 듯
> 이거 그냥 Sheet은 별로고 데나무숲에서 쓰는 버전이 딱 좋을 듯 계속 열려있고.
> ㅋㅋ 그냥 fixed 였네?

- 마일스톤을 생성할 때는 할당 시간을 결정해야 할 듯?
- 이 최대 할당 시간은 이터레이션에 할당한 시간으로 결정됨
- 그래도 초과가 가능하게 하자. Validation 하되 경고 안내만.

  - 초과를 가능하게 하면 이터레이션 관리가 되는 게 맞음?
    - 어렵네;;; 초과가 가능하게 하는 건 옵션이니깐 언제든 취소 가능한 요구 사항임.

- 갑자기 꽤 귀찮아짐... 안되는데...

## 오늘 할 일 할당 페이지

- 오늘 몇 시간을 할당할지 선택
- 이터레이션 페이지에서 잔여 시간이 있는 프로젝트 클릭해서 얼마나 할 지 선택
- 해당 프로젝트의 마일스톤을 선택하거나 없으면 생성하기
  - 근데 마일스톤이 없는 게 말이 됨?
  - 계획은 언제든 바뀔 수 있으니 바꿀 수 있게 만드는 게 맞을 듯
- 오늘에 할당한 시간이 다 찬 상태가 아니면 Validation 해서 경고 안내

## 목표 생성 페이지

- 1년 52주를 기준으로 만들기
- 1년은 짧다. 52번의 이터레이션이면 끝난다.
- 1번의 이터레이션은 60시간 정도면 끝난다. (주말 포함 하루 8시간 = 1주 56시간)
- 1년은 3,000 시간 정도면 끝난다.

## 이터레이션 생성 페이지

- 기본적으로 계속 Todo가 생긴다.
- 근데 그 Todo를 지금 당장할 수는 없다.
- 특히 새로 읽을 글들이 있다...
  - 애매하게도, 기존 주제인데 막 기존에 엄청 열심히 하는 건 아닌 그런 ...
  - e.g. 리액트가 주제에 있긴 하지만, React useTransition 같은 글 ...
  - 이런 건 어떻게 스케줄링 해야 하나?
  - 하;; 애매함... 그러니깐 필수랑 호기심을 어떻게 스케줄링 해야 할지 모르겠음
  - 이거는 별도의 Goal로 만들어야 할 듯? ㅇㅇ
  - 물론 지식 분류 상 Wiki에서는 같은 것으로 들어갈 듯
- 그러니깐 [취업필수]와 [호기심]을 구분하자는 것임

- 이미 생성된 골에서 새로운 이터레이션 생성 시,
  - 각 프로젝트 별 중요도가 이미 결정된 상태임
  - 이번 이터레이션에 쓸 시간만 입력하면 알아서 각 시간을 할당해줄 수 있음
  - 이렇게 할당해놓고 나면, 이번 이터레이션의 중요도를 수정해줄 수 있을 듯 (혹은 시간을 수정하거나)
    - 시간이든 중요도든 수정하면 반대쪽도 바뀌게 될 듯
    - 총합이 100%가 아니면 Validation Error로 두자
- 이렇게 되면 화면은 svg로 렌더링 해야 되나?
- 입력을 어떻게 할지는 잘 모르겠음. 가장 단순한 건 버튼만 띄우고 모달로 수정하면 반영하는 방식일 듯?

## 현재 이터레이션 페이지

- 현재 이터레이션의 정보 띄우기
- 완료된 것 제외하고 보기 체크박스
- 펼치기/접기
- 줌/드래그 기능 제공
- viewBox 이해하고 반응형으로 만들기
- Item을 중요도 순으로 자동 정렬하기

## 전체 목표 페이지