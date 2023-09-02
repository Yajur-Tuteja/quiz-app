<template>
  <base-card>
    <h1>
      <center>Score: {{ score }}/{{ resultsWithCorrectAnswers.length }}</center>
    </h1>
    <div class="individualResults">
      <div
        v-for="withCorrectAnswer in resultsWithCorrectAnswers"
        :key="withCorrectAnswer"
        :class="withCorrectAnswerClass(withCorrectAnswer)"
        class="individualResult"
      >
        <h2>{{ withCorrectAnswer.iscorrect }}</h2>
        <h3>Q{{ withCorrectAnswer.qno }}. {{ withCorrectAnswer.question }}</h3>
        <p v-if="withCorrectAnswer.iscorrect === 'incorrect'">
          your answer: {{ withCorrectAnswer.answer }}
        </p>
        <p>correct answer: {{ withCorrectAnswer.correct_answer }}</p>
      </div>
    </div>
  </base-card>
</template>

<script>
export default {
  name: "resultsPage",
  computed: {
    scoreBoard() {
      return this.$store.getters["questions/result"];
    },
    score() {
      console.log(this.scoreBoard);
      return this.scoreBoard.score;
    },
    resultsWithCorrectAnswers() {
      console.log(this.scoreBoard.question_answers_list);
      return this.scoreBoard.question_answers_list;
    },
    withCorrectAnswerClass() {
      return (withCorrectAnswer) => {
        if (withCorrectAnswer.answer === withCorrectAnswer.correct_answer) {
          return "correctAnswer";
        } else if (withCorrectAnswer.answer === "") {
          return "notAttempted";
        } else {
          return "incorrectAnswer";
        }
      };
    },
  },
};
</script>

<style>
.individualResult {
  margin: 1rem 0;
  border-radius: 12px;
  padding: 1rem;
}

.incorrectAnswer {
  border: 1px solid red;
  background-color: rgb(244, 156, 156);
}

.correctAnswer {
  border: 1px solid green;
  background-color: rgb(169, 225, 169);
}

.notAttempted {
  border: 1px solid #424242;
  background-color: transparent;
}
</style>
