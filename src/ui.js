import { getBallColorVar } from './lotto.js';
import html2canvas from 'html2canvas';

export const ELEMENTS = {
    app: document.getElementById('app'),
    lottoResult: document.getElementById('lotto-result'),
    character: document.getElementById('character'),
    bubble: document.getElementById('bubble'),
    themeToggle: document.getElementById('theme-toggle'),
    settingsView: document.getElementById('settings-view'),
    historyView: document.getElementById('history-view'),
    historyList: document.getElementById('history-list'),
};

export function renderLottoBalls(games) {
    ELEMENTS.lottoResult.innerHTML = '';

    games.forEach((game, index) => {
        const row = document.createElement('div');
        row.className = 'lotto-row';

        game.forEach((num, i) => {
            const ball = document.createElement('div');
            ball.className = 'lotto-ball';
            ball.textContent = num;
            ball.style.backgroundColor = getBallColorVar(num);
            ball.style.animationDelay = `${(index * 0.1) + (i * 0.05)}s`; // 순차적 애니메이션
            row.appendChild(ball);
        });

        ELEMENTS.lottoResult.appendChild(row);
    });
}

export function playGenerationAnimation() {
    ELEMENTS.character.classList.add('bounce');
    ELEMENTS.bubble.classList.remove('hidden');
    ELEMENTS.bubble.textContent = "번호가 나오고 있어요!";

    setTimeout(() => {
        ELEMENTS.character.classList.remove('bounce');
        ELEMENTS.bubble.textContent = "짠! 오늘의 행운입니다!";
        setTimeout(() => {
            ELEMENTS.bubble.classList.add('hidden');
        }, 2000);
    }, 1000);
}

export function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    ELEMENTS.themeToggle.textContent = newTheme === 'dark' ? '☀️ 라이트 모드' : '🌙 다크 모드';
}

export function renderHistory(history) {
    ELEMENTS.historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.className = 'history-item';

        const dateSpan = document.createElement('span');
        dateSpan.className = 'history-date';
        dateSpan.textContent = item.date;

        const gamesDiv = document.createElement('div');
        item.games.forEach(game => {
            const gameStr = document.createElement('div');
            gameStr.textContent = game.join(', ');
            gamesDiv.appendChild(gameStr);
        });

        li.appendChild(dateSpan);
        li.appendChild(gamesDiv);

        // 클릭 시 메인 화면에 표시 (선택 기능)
        li.addEventListener('click', () => {
            renderLottoBalls(item.games);
            ELEMENTS.historyView.classList.add('hidden');
        });

        ELEMENTS.historyList.appendChild(li);
    });
}

export async function saveScreenshot() {
    try {
        const canvas = await html2canvas(ELEMENTS.app); // 전체 앱 캡처
        const link = document.createElement('a');
        link.download = `lotto_${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
    } catch (err) {
        console.error('Screenshot failed:', err);
        alert('스크린샷 저장에 실패했습니다.');
    }
}

export function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (show) {
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
    }
}
