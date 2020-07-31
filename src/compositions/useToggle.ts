import { ref, Ref, watch } from 'vue';

type ReturnType = [Ref<boolean>, (newVal?: boolean) => void]

export default function useToggle(val: boolean): ReturnType {
  const refToggleValue = ref(val);

  function toggle(newVal?: boolean) {
    if (newVal !== undefined) { 
      refToggleValue.value = Boolean(newVal);
      return
    }
    refToggleValue.value = !refToggleValue.value
  }

  return [refToggleValue, toggle];
}
