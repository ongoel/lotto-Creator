/**
 * 1~45 사이의 중복되지 않는 6개의 난수를 생성하여 오름차순 정렬 반환
 * @returns {number[]} 로또 번호 배열
 */
export function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }
  return [...numbers].sort((a, b) => a - b);
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
