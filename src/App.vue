<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <quizPage
    :questions-object="questionsObject"
    @correctAnswers="displayResult"
  />
  <resultsPage :score="score" /> -->
  <router-view></router-view>
  <!-- <router-view v-slot="xVideos">
    <component :is="xVideos.Component"></component>
  </router-view> -->
</template>

<script>
// import quizPage from "@/components/quizPage.vue";
// import resultsPage from "@/components/resultsPage.vue";

export default {
  name: "App",
  // components: {
  //   quizPage,
  //   resultsPage,
  // },
  data() {
    return {
      questionsObject: {},
      score: 0,
    };
  },
  methods: {
    displayResult(totalCorrect) {
      this.score = totalCorrect;
      console.log(this.score);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
