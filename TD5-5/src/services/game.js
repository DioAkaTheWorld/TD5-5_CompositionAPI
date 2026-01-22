import { ref } from 'vue';

export function useGame() {
    const code = ref([]);
    const attempts = ref([]); // Historique des essais
    const state = ref('en cours'); // État : 'en cours' | 'gagné' | 'perdu'
    const MAX_ATTEMPTS = 10;

    // Génère le code et réinitialise la partie
    const generateCode = () => {
        const uniqueDigits = new Set();
        while (uniqueDigits.size < 4) {
            const r = Math.floor(Math.random() * 10);
            uniqueDigits.add(r);
        }
        code.value = Array.from(uniqueDigits);

        // Réinitialisation pour une nouvelle partie
        attempts.value = [];
        state.value = 'en cours';

        // Pour le débogage (à retirer en prod, mais pratique ici)
        console.log("Code secret généré :", code.value);
    };

    const validateAttempt = (userProposal) => {
        // userProposal doit être un tableau de 4 chiffres, ex: [1, 2, 3, 4]

        let wellPlaced = 0;
        let malPlaced = 0;

        // Calcul des scores
        userProposal.forEach((digit, index) => {
            if (digit === code.value[index]) {
                wellPlaced++;
            } else if (code.value.includes(digit)) {
                malPlaced++;
            }
        });

        // Enregistrement de l'essai
        attempts.value.push({
            proposal: userProposal,
            wellPlaced,
            malPlaced
        });

        // Mise à jour de l'état de la partie
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