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

const GAS_URL = "https://script.google.com/macros/s/AKfycbzQQQRPu6NpzDyz0i-sgVPg0H7_bIjPTRAVvHYEedrUqTPyYwKaa8wKjUP3X6jfpMSI/exec";

/**
 * 구글 스프레드시트로 데이터 전송
 * @param {Array} games 생성된 게임 배열
 */
export function saveToSpreadsheet(games) {
    // 백그라운드에서 실행 (await 안 함)
    fetch(GAS_URL, {
        method: "POST",
        mode: "no-cors", // CORS 정책 우회 (단방향 전송)
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ games: games })
    }).then(() => {
        console.log("Data sent to spreadsheet");
    }).catch(err => {
        console.error("Failed to send data to spreadsheet", err);
    });
}
