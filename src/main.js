import './style.css';
import { generateLottoGames } from './lotto.js';
import { getHistory, saveHistory, clearHistory, saveToSpreadsheet } from './storage.js';
import {
  renderLottoBalls,
  playGenerationAnimation,
  toggleTheme,
  renderHistory,
  saveScreenshot,
  toggleModal,
  ELEMENTS,
  resetUI
} from './ui.js';

// 이벤트 리스너 설정
document.getElementById('app-title').addEventListener('click', resetUI);
document.getElementById('gen-1-btn').addEventListener('click', () => handleGenerate(1));
document.getElementById('gen-5-btn').addEventListener('click', () => handleGenerate(5));
document.getElementById('save-btn').addEventListener('click', saveScreenshot);

document.getElementById('settings-btn').addEventListener('click', () => toggleModal('settings-view', true));
document.getElementById('close-settings-btn').addEventListener('click', () => toggleModal('settings-view', false));
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

document.getElementById('history-btn').addEventListener('click', () => {
  renderHistory(getHistory());
  toggleModal('history-view', true);
});
document.getElementById('close-history-btn').addEventListener('click', () => toggleModal('history-view', false));
document.getElementById('clear-history-btn').addEventListener('click', () => {
  if (confirm('기록을 모두 삭제하시겠습니까?')) {
    clearHistory();
    renderHistory([]);
  }
});

async function handleGenerate(count) {
  // 결과 영역 초기화 (애니메이션 동안 이전 결과 숨김)
  document.getElementById('lotto-result').innerHTML = '<div class="placeholder-text">행운을 모으는 중...</div>';

  await playGenerationAnimation();

  const games = generateLottoGames(count);
  renderLottoBalls(games);
  saveHistory(games);
  saveToSpreadsheet(games); // 구글 시트로 전송
}

// 초기화
// const history = getHistory();
// if (history.length > 0) {
//   renderLottoBalls(history[0].games);
// }
