
// 触发子组件事件


// 模板内读取
// this.$store.state.Info.Name
let state = {
    Name: 'InfoMation',
    Count: 1
}
let mutations = {

    // this.$store.commit("Info/Increment",2)
    Increment(state, n = 1) {
        state.Count += n;
    }

}

let actions = {

    // this.$store.dispatch('Info/checkout', update)
    Increment({ state }) {
        setTimeout(() => {
            state.Count += 2;
        }, 3000)
    }
}

let getters = {
    // this.$store.getters["Info/Double"];
    Double(state) {
        debugger;
        return state.Count * 2;
    }
}

module.exports = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}