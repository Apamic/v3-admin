import {customRef} from "vue";

export function debounceRef(value,duration = 500) {
    let timer;
    return customRef((track, trigger) => {
        return {
            get() {
                track();
            },
            set(val) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    trigger();
                    value = val;
                }, duration)
            }
        }
    })
}
