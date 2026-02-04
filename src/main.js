import './style.css';
import { generateLottoGames } from './lotto.js';
import { getHistory, saveHistory, clearHistory } from './storage.js';
import {
  renderLottoBalls,
  playGenerationAnimation,
  toggleTheme,
  renderHistory,
  saveScreenshot,
  toggleModal,
  ELEMENTS
} from './ui.js';

// 이벤트 리스너 설정
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

function handleGenerate(count) {
  playGenerationAnimation();

  // 애니메이션 시간 등을 고려하여 약간의 지연 후 표시 (선택 사항)
  // 여기서는 즉시 생성하지만 UI에서 애니메이션 지연이 처리됨
  const games = generateLottoGames(count);
  renderLottoBalls(games);
  saveHistory(games);
}

// 초기화
const history = getHistory();
if (history.length > 0) {
  // 마지막 게임 로드? 아니면 그냥 빈 상태? 
  // 사용자가 앱을 켰을 때 바로 마지막 기록을 보여주는 것도 좋음
  renderLottoBalls(history[0].games);
}
