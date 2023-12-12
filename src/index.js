import TwButton from './components/buttons/tw-button.vue'
import TwTableBase from "@/components/tables/tw-table-base.vue";
import TwInput from "@/components/inputs/tw-input.vue";
import TwDropdown from "@/components/dropdowns/tw-dropdown.vue";
export default {
    install: (app) => {
        app.component("tw-button", TwButton);
        app.component("tw-table-base", TwTableBase);
        app.component("tw-input", TwInput);
        app.component("tw-dropdown", TwDropdown);
    }
}