export const state = () => ({
    birthday: null,
    title: null,
    firstName: null,
    lastName: null,
    hasDependents: false,
    dependents: [],
    wantsKids: false,
    kidsExpected: null,
    goals: null,
    maritalStatus: null,
    maritalDate: null,
    spouseBirthday: null,
    residenceState: null,
    residenceZipCode: null,
    properties: null,
    checkings: null,
    savings: null,
    cds: null,
    mmfs: null,
    brokerage: null,
    ira: null,
    companyRetirem: null,
    five29s: null,
    Gifts: null,
    arts: null,
    vehicles: null,
    businesses: null,
    cash: null,
    esops: null,
    bonds: null,
    otherAssets: null,

})

export const mutations = {
    clientProperties(state, value) {
        state.properties = value
    },
    clientCheckings(state, value) {
        state.checkings = value
    },
    clientSavings(state, value) {
        state.savings = value
    },
    clientCDs(state, value) {
        state.cds = value
    },
    clientMmfs(state, value) {
        state.mmfs = value
    },
    clientBrokerage(state, value) {
        state.brokerage = value
    },
    clientIra(state, value) {
        state.ira = value
    },
    compRetirementPlans(state, value) {
        state.companyRetirem = value
    },
    client529s(state, value) {
        state.five29s = value
    },
    clientGifts(state, value) {
        state.Gifts = value
    },
    clientArt(state, value) {
        state.arts = value
    },
    clientVehicles(state, value) {
        state.vehicles = value
    },
    clientbusinesses(state, value) {
        state.businesses = value
    },
    clientCash(state, value) {
        state.cash = value
    },
    clientEsops(state, value) {
        state.esops = value
    },
    clientBonds(state, value) {
        state.bonds = value
    },
    clientOtherAssets(state, value) {
        state.otherAssets = value
    },
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
    clntGls(state, value) {
        state.goals = value
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
    clientStatus(state, value) {
        state.maritalStatus = value
    },
    clientResState(state, value) {
        state.residenceState = value
    },
    clientResZip(state, value) {
        state.residenceZipCode = value
    }
}