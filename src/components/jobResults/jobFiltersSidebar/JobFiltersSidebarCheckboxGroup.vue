<template>
  <accordion-component :header="header">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="value in uniqueValues" :key="value" class="w-1/2 h-8">
            <input
              :id="value"
              v-model="selectedValues"
              :name="name"
              :value="value"
              type="checkbox"
              class="mr-3"
              :data-test="value"
              @change="selectValue"
            />
            <label :for="value" data-test="value-label">{{ value }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </accordion-component>
</template>

<script>
import AccordionComponent from "@/components/shared/Accordion.vue";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "JobFiltersSidebarCheckboxGroup",
  components: {
    AccordionComponent,
  },
  props: {
    header: { type: String, required: true },
    name: { type: String, required: true },
    mutation: { type: String, required: true },
    uniqueValues: { type: Set, required: true },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const selectedValues = ref([]);
    const selectValue = () => {
      store.commit(props.mutation, selectedValues.value);
      router.push({ name: "JobResults" });
    };
    return { selectedValues, selectValue };
  },
};
</script>
