# FocusTree

## Target User's Goal

사용자는 큰 목표를 달성할 것이다. 이를 위해 위계를 갖는 여러가지 하위 목표를 수행할 것이다.

### User's Problems

큰 목표는 달성하기 오래 걸린다.

- 처음부터 끝까지 모두 기억나지 않으므로, 기록에 의존해야 한다.

여러가지 목표를 시분할로 동시에 실행해나가기 어렵다.

- 다시 돌아왔을 때 맥락 파악이 안 되므로, 기록에 의존해야 한다.

목표 달성 과정 자체를 개선하기는 어렵다.

- 과정 자체에 대한 상세한 기록이 없기 때문이다. 기록에 의존해야 한다.

## Product's Base Hypothesis

큰 목표 달성에는 실행 과정을 효율적, 효과적으로 기록할 수 있게 돕는 기능이 유효한 도움을 줄 수 있다.

### Product's Positive Loop hypothesis

1. 한 번 기록을 통해 맥락 파악에서 이득을 체험한 경우 사용자는 계속 사용할 것이다. (선순환)
2. 이미 오랜 기간 입력한 경우는 기록 자체를 매몰 비용으로 인식해 중단하기 어려워할 것이다. (선순환)

### Product's Goals

1. 사용자가 언제든 일부/전체 현황을 쉽게 인지할 수 있게 한다.

   - 세부 목표를 달성하는 과정을 시각화한다.

2. 사용자가 과정 자체의 생산성을 정확히 인지할 수 있게 한다.

   - 여러가지 통계를 계산해준다.

(TBD)

### Product's Features

1. Tree 형식으로 목표-세부목표 별 시간 사용량과 사용률을 시각화한다.
2. Tree 형식으로 이터레이션 별 시간 사용량과 사용률을 시각화한다.
3. 목표 일자로부터 남은 시간, 이터레이션 횟수를 역산해 표시한다.
4. 하루 단위로 집중해야 할 단위 작업들의 목록을 표시한다.
5. 현재 수행하고 있는 단위 작업의 남은 시간, 설명을 표시한다.
6. 현재 수행하고 있는 단위 작업을 전환/연장/중단/완료할 수 있다.
7. 하루 동안 시간을 어떻게 썼는지 Timeline으로 표시한다.

## Tech Stacks

- pnpm
- TypeScript
- React.js
- Tailwind + shadcn
