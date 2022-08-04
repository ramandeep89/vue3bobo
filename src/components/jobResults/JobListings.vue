<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol v-if="filteredJobs">
      <job-listing
        v-for="job in displayedJobs"
        :key="job.id"
        :job="job"
        data-test="job-listing"
      />
    </ol>
    <div class="mt-8 mx-auto">
      <div class="flex flex-nowrap flex-row">
        <p class="text-sm flex-grow">
          Page: {{ currentPage }} of {{ maxPage }}
        </p>
        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="previous-page-link"
            >Previous</router-link
          >
          <router-link
            v-if="nextPage"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="next-page-link"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import JobListing from "@/components/jobResults/JobListing.vue";

import { useFetchJobsDispatch, useFilteredJobs } from "@/store/composables";
import useCurrentPage from "@/composables/useCurrentPage";
import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";

export default {
  name: "JobListings",
  components: {
    JobListing,
  },
  setup() {
    onMounted(useFetchJobsDispatch);

    const filteredJobs = useFilteredJobs();
    const maxPage = computed(() => Math.ceil(filteredJobs.value.length / 10));
    const currentPage = useCurrentPage();
    const { previousPage, nextPage } = usePreviousAndNextPages(
      currentPage,
      maxPage
    );

    const displayedJobs = computed(() => {
      const page = currentPage.value;
      return filteredJobs.value.slice((page - 1) * 10, page * 10);
    });

    return {
      maxPage,
      currentPage,
      previousPage,
      nextPage,
      displayedJobs,
      filteredJobs,
    };
  },
  // computed: {
  //   ...mapGetters([FILTERED_JOBS]),
  //   maxPage() {
  //     return Math.ceil(this.FILTERED_JOBS.length / 10);
  //   },
  //   currentPage() {
  //     const pageString = this.$route.query.page || "1";
  //     return Number.parseInt(pageString);
  //   },
  //   previousPage() {
  //     const previousPage = this.currentPage - 1;
  //     return previousPage >= 1 ? previousPage : undefined;
  //   },
  //   nextPage() {
  //     const nextPage = this.currentPage + 1;
  //     return nextPage <= this.maxPage ? nextPage : undefined;
  //   },
  //   displayedJobs() {
  //     const page = this.currentPage;
  //     return this.FILTERED_JOBS.slice((page - 1) * 10, page * 10);
  //   },
  // },
  // mounted() {
  //   this.FETCH_JOBS();
  // },
  // methods: {
  //   ...mapActions([FETCH_JOBS]),
  // },
};
</script>
