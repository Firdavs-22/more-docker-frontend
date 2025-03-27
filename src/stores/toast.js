import {defineStore} from 'pinia';

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: []
  }),
  actions: {
    addToast(message, options = {}) {
      const id = Date.now() + Math.random();
      const timeout = options.timeout || 3000;
      const type = options.type || 'info';
      this.toasts.push({id, message, timeout, type});
      setTimeout(() => {
        this.removeToast(id);
      }, timeout);
    },
    removeToast(id) {
      this.toasts = this.toasts.filter(toast => toast.id !== id);
    }
  }
});
