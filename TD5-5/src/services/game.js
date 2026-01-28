import { ref } from 'vue';

export function useGame() {
    const code = ref([]);
    const attempts = ref([]);
    const state = ref('en cours');
    const MAX_ATTEMPTS = 10;

    const generateCode = () => {
        const uniqueDigits = new Set();
        while (uniqueDigits.size < 4) {
            const r = Math.floor(Math.random() * 10);
            uniqueDigits.add(r);
        }
        code.value = Array.from(uniqueDigits);
        attempts.value = [];
        state.value = 'en cours';
        console.log("Code secret généré :", code.value);
    };

    const validateAttempt = (userProposal) => {
        let wellPlaced = 0;
        let malPlaced = 0;

        userProposal.forEach((digit, index) => {
            if (digit === code.value[index]) {
                wellPlaced++;
            } else if (code.value.includes(digit)) {
                malPlaced++;
            }
        });

        attempts.value.push({
            proposal: userProposal,
            wellPlaced,
            malPlaced
        });

        if (wellPlaced === 4) {
            state.value = 'gagné';
        } else if (attempts.value.length >= MAX_ATTEMPTS) {
            state.value = 'perdu';
        }
        return { wellPlaced, malPlaced };
    };

    const saveScore = (pseudo) => {
        const currentHistory = JSON.parse(localStorage.getItem('mastermind_scores') || '[]');
        const newScore = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            pseudo: pseudo,
            code: code.value,
            result: state.value,
            lastAttempt: attempts.value[attempts.value.length - 1] || null
        };
        currentHistory.unshift(newScore);
        localStorage.setItem('mastermind_scores', JSON.stringify(currentHistory));
    };

    return {
        code,
        attempts,
        state,
        generateCode,
        validateAttempt
    };
}