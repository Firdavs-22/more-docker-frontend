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
      const user_id = options.user_id || null;

      this.toasts.push({id, message, timeout, type, user_id});
      setTimeout(() => {
        this.removeToast(id);
      }, timeout);
    },
    removeToast(id) {
      this.toasts = this.toasts.filter(toast => toast.id !== id);
    }
  }
});
