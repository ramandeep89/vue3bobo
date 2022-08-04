<template>
  <div class="py-5 border-b boder-solid border-brand-gray-2">
    <div
      class="flex flex-wrap items-center justify-between cursor-pointer"
      data-test="clickable-area"
      @click="toggle"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>
    <div v-if="isOpen" class="w-full mt-5">
      <slot>
        <p>Missing slot content</p>
      </slot>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "AccordionComponent",

  /* Options API */

  props: {
    header: {
      type: String,
      required: true,
    },
  },
  // data() {
  //   return {
  //     isOpen: false,
  //   };
  // },
  // computed: {
  //   caretIcon() {
  //     return this.isOpen ? ["fas", "angle-up"] : ["fas", "angle-down"];
  //   },
  // },
  // methods: {
  //   toggle() {
  //     this.isOpen = !this.isOpen;
  //   },
  // },

  /* Composition API */

  setup() {
    const isOpen = ref(false);

    const toggle = () => {
      isOpen.value = !isOpen.value;
    };

    const caretIcon = computed(() =>
      isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"]
    );

    return { isOpen, toggle, caretIcon };
  },
};
</script>
