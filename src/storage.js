const STORAGE_KEY = 'todays-lotto-history';

/**
 * 히스토리 불러오기
 * @returns {Array} 히스토리 배열
 */
export function getHistory() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * 히스토리 저장하기
 * @param {Array} games 생성된 게임 배열
 */
export function saveHistory(games) {
    const history = getHistory();
    const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        games: games
    };
    // 최신순 정렬, 최대 20개까지만 저장
    history.unshift(newEntry);
    if (history.length > 20) {
        history.pop();
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

/**
 * 히스토리 초기화
 */
export function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
}
