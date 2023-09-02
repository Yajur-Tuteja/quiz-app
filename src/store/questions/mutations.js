export default {
    displayResult(state, payload) {
        state.result = payload;
    },
    setQuestions(state, payload) {
        state.questions = payload;
    }
}