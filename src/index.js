import TwButton from './components/buttons/tw-button.vue'
import TwTableBase from "@/components/tables/tw-table-base.vue";
import TwInput from "@/components/inputs/tw-input.vue";
import TwDropdown from "@/components/dropdowns/tw-dropdown.vue";
import TwMultiDropdown from "@/components/dropdowns/tw-multi-dropdown.vue";
import TwCheckbox from "@/components/inputs/tw-checkbox.vue";
import TwRadioButton from "@/components/inputs/tw-radio-button.vue";
import TwPaginator from "@/components/functional-components/TwPaginator.vue";
export default {
    install: (app) => {
        app.component("tw-button", TwButton);
        app.component("tw-table-base", TwTableBase);
        app.component("tw-input", TwInput);
        app.component("tw-dropdown", TwDropdown);
        app.component("tw-multi-dropdown", TwMultiDropdown);
        app.component("tw-checkbox", TwCheckbox);
        app.component("tw-radio-button", TwRadioButton);
        app.component("tw-paginator", TwPaginator);
    }
}

export {TwInput, TwButton, TwTableBase, TwDropdown, TwMultiDropdown, TwCheckbox, TwRadioButton, TwPaginator}