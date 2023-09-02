<template>
  <base-card>
    <h1 class="question">
      Q{{ currentQuestion.qno }}. {{ currentQuestionStatement }}
    </h1>
    <div v-for="option in currentOptions" :key="option">
      <label>
        <div class="like">
          <input
            type="radio"
            v-model="currentOptions"
            :value="option"
            :id="option"
            :name="currentOptions"
            :checked="currentQuestion.answer === option ? true : false"
            @change="questionAnswered(option)"
          />
          {{ option }}
        </div>
      </label>
    </div>
    <div class="actions">
      <div :class="[idx > 0 ? 'visible' : 'hidden']">
        <base-button @click="prevQuestion">Previous</base-button>
      </div>
      <div class="rightButton">
        <base-button
          v-if="idx === questionAnswersList.length - 1"
          @click="displayResult"
          link
          :to="resultLink"
          >Submit Test</base-button
        >
        <base-button v-else @click="nextQuestion">Next</base-button>
      </div>
    </div>
  </base-card>
</template>

<script>
import BaseButton from "./ui/BaseButton.vue";
export default {
  components: { BaseButton },
  name: "quizPage",
  data() {
    return {
      idx: 0,
      totalCorrect: 0,
    };
  },
  computed: {
    questionsList() {
      const list = this.$store.getters["questions/questions"];
      console.log(list.results);
      return list.results;
    },
    questionAnswersList() {
      let list = [];
      this.questionsList.forEach((question, id) => {
        let totalOptions = [];
        totalOptions = JSON.parse(JSON.stringify(question.incorrect_answers));
        totalOptions.push(question.correct_answer);
        let totalShuffledOptions = this.shuffleOptions(totalOptions);
        console.log(totalShuffledOptions);

        let questionAnswer = {
          ...question,
          qno: id + 1,
          answer: "",
          iscorrect: "",
          options: totalShuffledOptions,
        };
        list.push(questionAnswer);
      });
      console.log(list);
      return list;
    },
    currentQuestion() {
      return this.questionAnswersList[this.idx];
    },
    currentQuestionStatement() {
      return this.currentQuestion.question;
    },
    currentOptions() {
      return this.currentQuestion.options;
    },
    rightButtonText() {
      if (this.idx === this.questionsList.length - 1) {
        return "End Test";
      } else {
        return "Next";
      }
    },
    resultLink() {
      return "/results";
    },
  },
  created() {
    this.loadQuestions();
  },
  methods: {
    async loadQuestions() {
      await this.$store.dispatch("questions/loadQuestions");
    },
    nextQuestion() {
      this.idx++;
      if (this.idx === this.questionsList.length) {
        this.idx = 0;
      }
      console.log(this.questionAnswersList);
    },
    displayResult() {
      this.questionAnswersList.forEach((questionAnswer) => {
        if (questionAnswer.iscorrect === "correct") {
          this.totalCorrect++;
        }
      });
      this.calculateNotAttempted(this.questionAnswersList);
      const questionAnswersObject = {
        question_answers_list: this.questionAnswersList,
      };
      const resultPayload = {
        ...questionAnswersObject,
        score: this.totalCorrect,
      };
      this.$store.dispatch("questions/getResult", resultPayload);
    },
    prevQuestion() {
      this.idx--;
    },
    calculateNotAttempted(questionAnswersList) {
      questionAnswersList.forEach((questionAnswer) => {
        if (questionAnswer.answer === "") {
          questionAnswer.iscorrect = "not attempted";
        }
      });
    },
    shuffleOptions(totalOptions) {
      for (let i = 0; i < totalOptions.length; i++) {
        const swapIndex = Math.floor(Math.random() * i + 1);
        const temp = totalOptions[i];
        totalOptions[i] = totalOptions[swapIndex];
        totalOptions[swapIndex] = temp;
      }
      return totalOptions;
    },
    questionAnswered(option) {
      this.currentQuestion.answer = option;
      if (this.currentQuestion.answer === this.currentQuestion.correct_answer) {
        this.currentQuestion.iscorrect = "correct";
      } else {
        this.currentQuestion.iscorrect = "incorrect";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.question {
  display: flex;
  flex-wrap: wrap;
}
.like {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

.like:active,
.like:hover {
  background-color: #edd2ff;
  cursor: pointer;
}

.nextButton {
  display: flex;
}
.actions {
  display: flex;
  justify-content: space-between;
}

.hidden {
  visibility: hidden;
}

.visible {
  visibility: visible;
}
</style>
