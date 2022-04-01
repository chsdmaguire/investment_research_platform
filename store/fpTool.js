export const state = () => ({
    birthday: null,
    title: null,
    firstName: null,
    lastName: null,
    hasDependents: false,
    dependents: [],
    wantsKids: false,
    kidsExpected: null,
    goals: [],
    maritalStatus: null,
    maritalDate: null,
    spouseBirthday: null,
    residenceState: null,
    residenceZipCode: null,
})

export const mutations = {
    clientTitle(state, value) {
        state.title = value
    },
    clientFirstName(state, value) {
        state.firstName = value
    },
    clientLastName(state, value) {
        state.lastName = value
    },
    clientHasDep(state) {
        state.hasDependents = true
    },
    clientDependents(state, value) {
        state.dependents = value
    },
    clientWantsKids(state) {
        state.wantsKids = true
    },
    clientKidsExpected(state, value) {
        state.kidsExpected = value
    },
    clientGoals(state, value) {
        state.goals.push(value)
    },
    spouseBirthday(state, value) {
        state.spouseBirthday = value
    },
    clientBirthday(state, value) {
        state.birthday = value
    },
    clientMaritalDate(state, value) {
        state.maritalDate = value
    },
    clientResState(state, value) {
        state.residenceState = value
    },
    clientResZip(state, value) {
        state.residenceZipCode = value
    }
}