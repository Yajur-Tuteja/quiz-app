export default {
    getResult(context, data) {
        context.commit('displayResult', data)
    },
    async loadQuestions(context) {
        const response = await fetch(`https://opentdb.com/api.php?amount=5`);
        const responseData = await response.json();
        this.questionsObject = responseData;
        console.log(responseData);
        context.commit('setQuestions', responseData)
    },
}