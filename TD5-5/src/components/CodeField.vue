<script setup>
import { computed } from 'vue';

const props = defineProps({
  length: { type: Number, required: true },
  modelValue: { type: Array, default: () => [] }
});

const emit = defineEmits(['update:modelValue', 'validate']);

const fields = computed(() => Array.from({ length: props.length }, (_, i) => i + 1));

const updateValue = (index, value) => {
  const newValue = [...props.modelValue];
  if (value.length > 1) value = value.slice(-1);
  newValue[index] = Number(value);
  emit('update:modelValue', newValue);
};

const handleEnter = () => {
  emit('validate');
};
</script>

<template>
  <div class="code-field-container">
    <div class="inputs-row">
      <div v-for="(field, index) in fields" :key="field" class="input-wrapper">
        <input
            type="number"
            min="0" max="9"
            :value="modelValue[index]"
            @input="updateValue(index, $event.target.value)"
            @keyup.enter="handleEnter"
            class="digit-input"
            placeholder="-"
        />
      </div>
    </div>
    <button class="btn-validate" @click="$emit('validate')">Valider</button>
  </div>
</template>

<style scoped>
.code-field-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.inputs-row {
  display: flex;
  gap: 10px;
}

.digit-input {
  width: 50px;
  height: 60px;
  font-size: 2rem;
  text-align: center;
  border: 2px solid #2c3e50;
  border-radius: 8px;
  font-weight: bold;
  -moz-appearance: textfield;
}
.digit-input::-webkit-outer-spin-button,
.digit-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.btn-validate {
  padding: 10px 20px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
</style>