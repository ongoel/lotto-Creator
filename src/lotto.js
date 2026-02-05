/**
 * 강력한 난수 생성기를 사용하여 1~45 범위의 정수 배열을 섞고 앞에서 6개를 뽑습니다.
 * (Fisher-Yates Shuffle + Crypto API 적용)
 * @returns {number[]} 로또 번호 배열
 */
export function generateLottoNumbers() {
  // 1. 1부터 45까지의 숫자가 들어있는 배열 생성 (공 45개 준비)
  const numbers = Array.from({ length: 45 }, (_, i) => i + 1);

  // 2. 피셔-예이츠 셔플 (Fisher-Yates Shuffle)
  // 배열의 끝에서부터 시작하여 앞쪽의 무작위 인덱스와 자리를 바꿉니다.
  for (let i = numbers.length - 1; i > 0; i--) {
    // 3. Math.random 대신 암호학적으로 안전한 난수(Crypto API) 사용
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    
    // 무작위 인덱스 j 생성 (0 부터 i 까지)
    const j = randomBuffer[0] % (i + 1);

    // 두 숫자의 위치를 바꿈 (섞기)
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  // 4. 잘 섞인 배열에서 앞에서 6개를 가져와서 오름차순 정렬
  return numbers.slice(0, 6).sort((a, b) => a - b);
}

/**
 * 지정된 게임 수만큼 로또 번호 세트 생성
 * @param {number} count 게임 수
 * @returns {number[][]} 로또 번호 배열의 배열
 */
export function generateLottoGames(count = 1) {
  const games = [];
  for (let i = 0; i < count; i++) {
    games.push(generateLottoNumbers());
  }
  return games;
}

/**
 * 로또 번호에 따른 색상 결정 (동행복권 기준)
 * @param {number} num 번호
 * @returns {string} CSS 변수명 or 색상 코드
 */
export function getBallColorVar(num) {
  if (num <= 10) return 'var(--ball-color-1)';
  if (num <= 20) return 'var(--ball-color-10)';
  if (num <= 30) return 'var(--ball-color-20)';
  if (num <= 40) return 'var(--ball-color-30)';
  return 'var(--ball-color-40)';
}
