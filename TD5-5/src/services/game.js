import { ref } from 'vue';

export function useGame() {
    const code = ref([]);

    const generateCode = () => {
        const chiffres = new Set();
        while (chiffres.size < 4) {
            const r = Math.floor(Math.random() * 10);
            chiffres.add(r);
        }
        code.value = Array.from(chiffres);
    };

    return {
        code,
        generateCode
    };
}