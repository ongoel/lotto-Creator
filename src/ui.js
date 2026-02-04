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

        // 게임 라벨 추가 (ex: 1게임)
        const label = document.createElement('div');
        label.className = 'game-label';
        label.textContent = `${index + 1}게임`;
        row.appendChild(label);

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

// GIF 애니메이션 제어
export function playGenerationAnimation() {
    // 1. GIF 재생 시작 (타임스탬프로 캐시 무력화하여 처음부터 재생)
    ELEMENTS.character.src = `assets/character_anim.gif?t=${Date.now()}`;

    ELEMENTS.bubble.classList.add('hidden');

    return new Promise(resolve => {
        setTimeout(() => {
            // 2. 8초 후 정지 이미지(character_end.png)로 교체
            ELEMENTS.character.src = 'assets/character_end.png';

            resolve();
        }, 8000); // 8초 재생
    });
}

export function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    ELEMENTS.themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
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
        // html2canvas가 캡처 시 애니메이션을 다시 시작하여 공이 안 보이는 문제 해결
        // 전체 앱 대신 로또 결과 영역(ELEMENTS.lottoResult)만 캡처하도록 변경
        const canvas = await html2canvas(ELEMENTS.lottoResult, {
            backgroundColor: null, // 투명 배경 유지 (필요 시)
            scale: 2, // 고해상도 캡처
            onclone: (clonedDoc) => {
                // 복제된 DOM에서 애니메이션 제거 및 스타일 강제 적용
                const balls = clonedDoc.querySelectorAll('.lotto-ball');
                balls.forEach(ball => {
                    ball.style.animation = 'none';
                    ball.style.opacity = '1';
                    ball.style.transform = 'scale(1)';
                });

                // 캡처 시 배경 스타일 조정 (깔끔하게 보이도록)
                const container = clonedDoc.querySelector('.lotto-container');
                if (container) {
                    container.style.backdropFilter = 'none';
                    container.style.background = 'white'; // 흰색 배경으로 고정
                    container.style.boxShadow = 'none'; // 그림자 제거 또는 조정
                    container.style.borderRadius = '20px';
                }
            }
        });
        const link = document.createElement('a');
        link.download = `lotto_${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
    } catch (err) {
        console.error('Screenshot failed:', err);
        alert('스크린샷 저장에 실패했습니다.');
    }
}

export function resetUI() {
    ELEMENTS.character.src = 'assets/character_start.png';
    ELEMENTS.lottoResult.innerHTML = '<div class="placeholder-text">버튼을 눌러 번호를 생성해보세요!</div>';
    ELEMENTS.bubble.classList.add('hidden');
}

export function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (show) {
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
    }
}
