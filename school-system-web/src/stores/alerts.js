import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({ alerts: [] }),
  actions: {
    alert(alert) {
      alert.id = new Date().getTime();
      this.alerts.push(alert);

      setTimeout(() => {
        this.removeAlert(alert.id);
      }, 3500);
    },

    removeAlert(id) {
      this.alerts = this.alerts.filter((a) => a.id !== id);
    },
  },
});
