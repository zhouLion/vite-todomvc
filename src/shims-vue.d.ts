import { defineComponent } from "vue";

declare module "*.vue" {
    type VueType = ReturnType<typeof defineComponent>
    export default VueType;
}
