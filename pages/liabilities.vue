<template>
<v-container>
    <v-carousel hide-delimiters v-model="houseCarousel">
        <v-carousel-item>
            <BinaryQuestion question="Do you own any real estate properties?" 
            v-on:childYes="userOwns" @childNo="moveUp"/>
        </v-carousel-item>
        <v-carousel-item>
            <v-card class="mx-auto mt-10" color="#121212">
                <v-row class="question" justify="center" align="center">
                    <h1>How much do you pay in rent each year?</h1>
                </v-row>
                <v-row justify="center" align="center">
                    <v-col cols="4">
                        <v-text-field v-model="rentAmount"></v-text-field>
                    </v-col>
                </v-row>
                <v-row align="center" justify="center">
                    <v-col cols="2">
                        <v-btn @click="goBack">Back</v-btn>
                    </v-col>
                    <v-col cols="2">
                        <v-btn @click="isRenterDone">Continue</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-carousel-item>
        <v-carousel-item>
            <BinaryQuestion question="Do you currently live in the property you own?" 
            v-on:childYes="userOwns" @childNo="skipThree"/>
        </v-carousel-item>
        <v-carousel-item>
            <BinaryQuestion question="Are you currently paying rent somewhere else?" 
            v-on:childYes="userOwns" @childNo="skipThree"/>
        </v-carousel-item>
         <v-carousel-item>
            <v-card class="mx-auto mt-10" color="#121212">
                <v-row class="question" justify="center" align="center">
                    <h1>How much do you pay in rent each year?</h1>
                </v-row>
                <v-row justify="center" align="center">
                    <v-col cols="4">
                        <v-text-field v-model="rentAmount"></v-text-field>
                    </v-col>
                </v-row>
                <v-row align="center" justify="center">
                    <v-col cols="2">
                        <v-btn @click="goBack">Back</v-btn>
                    </v-col>
                    <v-col cols="2">
                        <v-btn @click="ownsAndRents">Continue</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-carousel-item>
        <v-carousel-item>
            <v-card class="mx-auto mt-10" color="#121212">
                <v-row class="question" justify="center" align="center">
                    <h1>How many properties do you own?</h1>
                </v-row>
                <v-row justify="center" align="center">
                    <v-col cols="2">
                        <v-text-field v-model="propertiesNumber"></v-text-field>
                    </v-col>
                </v-row>
                <v-row align="center" justify="center">
                    <v-col cols="2">
                        <v-btn @click="goBack">Back</v-btn>
                    </v-col>
                    <v-col cols="2">
                        <v-btn @click="propertyRows">Continue</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-carousel-item>
        <v-carousel-item>
            <template v-if="propertiesNumber == 1">
                <v-card class="mx-auto mt-10" color="#121212">
                    <v-row justify="center" align="center">
                        <h1 class="question">Now we're going to ask about some basic information 
                            regarding your property. Sound good?
                        </h1>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="2">
                            <v-btn @click="goBack">Go Back</v-btn>
                        </v-col>
                        <v-col cols="2">
                            <v-btn @click="moveUp">Continue</v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </template>
            <template v-else>
                <v-card class="mx-auto mt-10" color="#121212">
                    <v-row justify="center" align="center">
                        <h1 class="question">Now we're going to ask about some basic information 
                            about the properties you own. Sound good?
                        </h1>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="2">
                            <v-btn @click="goBack">Go Back</v-btn>
                        </v-col>
                        <v-col cols="2">
                            <v-btn @click="moveUp">Continue</v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </template>
        </v-carousel-item>
        <v-carousel-item>
            <v-card class="mx-auto mt-10" color="#121212">
                <template v-if="propertiesNumber == 1">
                    <v-row justify="center" align="center">
                    <h1 class="question">Please enter info for your property</h1>
                    </v-row>
                <v-container>
                    <v-row justify="center" align="center">
                        <v-row>
                            <v-col cols="4">
                            <h6>Purchased House on</h6> 
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="properties[0].owned.purchase_date">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <h6>Purchase value was</h6>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="properties[0].owned.purchase_value">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <h6>Currently market value is</h6>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="properties[0].owned.market_value">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <h6>Has a mortgage</h6>
                            </v-col>
                            <v-col cols="4">
                                <v-switch v-model="properties[0].owned.has_mortage" 
                                :label="`${properties[0].owned.has_mortage.toString()}`"></v-switch>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <h6>Has a home equity loan</h6>
                            </v-col>
                            <v-col cols="4">
                                <v-switch v-model="properties[0].owned.has_hel" 
                                :label="`${properties[0].owned.has_hel.toString()}`"></v-switch>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <h6>Has a home equity line of credit</h6>
                            </v-col>
                            <v-col cols="4">
                                <v-switch v-model="properties.has_helc" 
                                :label="`${properties[0].owned.has_helc.toString()}`"></v-switch>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <h6>Generates Income for me</h6>
                            </v-col>
                            <v-col cols="4">
                                <v-switch v-model="properties.generates_income" 
                                :label="`${properties[0].owned.generates_income.toString()}`"></v-switch>
                            </v-col>
                        </v-row>
                    </v-row>
                </v-container>
            </template>
            <template v-else>
                <v-row justify="center" align="center">
                    <h1 class="question">Please enter info for each property</h1>
                </v-row>
                <v-row justify="center" align="center">
                    <v-col cols="2">
                        <v-row>
                            <h6>Purchased House on</h6>
                        </v-row>
                        <v-row>
                            <h6>Purchase value was</h6>
                        </v-row>
                        <v-row>
                            <h6>Currently market value is</h6>
                        </v-row>
                        <v-row>
                            <h6>Has a mortgage</h6>
                        </v-row>
                        <v-row>
                            <h6>Has a home equity loan</h6>
                        </v-row>
                        <v-row>
                            <h6>Has a home equity line of credit</h6>
                        </v-row>
                        <v-row>
                            <h6>Generates Income for me</h6>
                        </v-row>
                    </v-col>
                    <v-col cols="2" v-for="n in properties[0].owned" :key="n">
                        <v-row>
                            <v-text-field v-model="n.purchase_date">
                            </v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="n.purchase_value">
                            </v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="n.market_value">
                            </v-text-field> 
                        </v-row>
                        <v-row>
                            <v-switch v-model="n.has_mortage" 
                            :label="`${n.has_mortage.toString()}`"></v-switch>
                        </v-row>
                        <v-row>
                            <v-switch v-model="n.has_hel" 
                            :label="`${n.has_hel.toString()}`"></v-switch>
                        </v-row>
                        <v-row>
                            <v-switch v-model="n.has_helc" 
                            :label="`${n.has_helc.toString()}`"></v-switch>
                        </v-row>
                        <v-row>
                            <v-switch v-model="n.generates_income" 
                            :label="`${n.generates_income.toString()}`"></v-switch>
                        </v-row>
                    </v-col>
                </v-row>
            </template>
            <v-row justify="center" align="center">
                <v-col cols="2">
                    <v-btn @click="goBack">Back</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn @click="updateProperties">Continue</v-btn>
                </v-col>
            </v-row>
            </v-card>
        </v-carousel-item>
    </v-carousel>
</v-container>
</template>

<script>
// NEED TO ADD MORE GOBACK FUNCTIONS SO IT WILL SOMETIMES TAKE STEPS GREATER THAN 1
import BinaryQuestion from "~/components/wm/BinaryQuestion.vue"
export default {
    components: { BinaryQuestion },
    data() {
        return {
            houseCarousel: 0,
            rentAmount: 0,
            properties: [
                {
                    owned: []
                }
            ],
            propertiesNumber: 1,

        };
        
    },
    methods: {
        skipThree() {
            this.houseCarousel += 3;
        },
        userOwns() {
            this.houseCarousel += 2;
        },
        moveUp() {
            this.houseCarousel += 1;
        },
        goBack() {
            this.houseCarousel -= 1;
        },
        isRenterDone() {
            const renter = {
                rent: this.rentAmount,
            };
            this.$store.commit('fpTool/clientProperties', renter);
            // re route to next section
        },
        ownsAndRents() {
            const renter = {
                rent: this.rentAmount,
            };
            this.properties.push(renter);
            this.houseCarousel += 1;
        },
        propertyRows() {
            let n = 0;
            while (n < this.propertiesNumber) {
                const name = "property #" + (n + 1)
                this.properties[0].owned.push({purchase_date: 0, purchase_value: 0, 
                market_value: 0, id: name, has_mortage: true, has_hel: false, has_helc: false, generates_income: false});
                n += 1;
            }
            this.houseCarousel += 1;
        },
        updateProperties() {
            const mortgages = [];
            const hels = [];
            const helcs = [];
            const incomes = [];
            this.$store.commit('fpTool/')
            this.properties.forEach(item => {
                if (item.has_mortage) {
                    mortgages.push(item.id)
                }
                if(item.has_hel) {
                    hels.push(item.id)
                }
                if(item.has_helc) {
                    helcs.push(item.id)
                }
                if(item.generates_income) {
                    incomes.push(item.id)
                }
            });

        } 
    }
}
</script>

<style>

</style>