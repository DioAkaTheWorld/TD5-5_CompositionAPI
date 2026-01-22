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

    return {
        code,
        attempts,
        state,
        generateCode,
        validateAttempt
    };
}