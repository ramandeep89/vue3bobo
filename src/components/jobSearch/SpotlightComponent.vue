<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>

<script>
// import getSpotlights from "@/api/getSpotlights";
import axios from "axios";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

export default {
  name: "SpotlightComponent",
  setup() {
    const spotlights = ref([]);
    const getSpotlights = async () => {
      const baseUrl = process.env.VUE_APP_API_URL;
      const response = await axios.get(`${baseUrl}/spotlights`);
      spotlights.value = response.data;
    };
    onMounted(getSpotlights);
    return { spotlights };
  },
  // data() {
  //   return {
  //     spotlights: [],
  //   };
  // },
  // async mounted() {
  //   // this.spotlights = await getSpotlights();
  //   const baseUrl = process.env.VUE_APP_API_URL;
  //   const response = await axios.get(`${baseUrl}/spotlights`);
  //   this.spotlights = response.data;
  // },
};
</script>
