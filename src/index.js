import TwButton from './components/buttons/tw-button.vue'
import TwTableBase from "@/components/tables/tw-table-base.vue";
export default {
    install: (app) => {
        app.component("tw-button", TwButton);
        app.component("tw-table-base", TwTableBase);
    }
}