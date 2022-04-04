<template>
<v-container>
    <v-card color="#121212" height="400">
        <v-container v-if="!working">
            <v-row align="center" justify="center">
            <h3 class="question">
                Are you currently working?
            </h3>
        </v-row>
        <v-row justify="center" align="center" class="mt-5">
            <v-col cols="3">
            <v-card class="mx-auto rounded-circle" 
                width="170" height="170" color="indigo" @click.stop="isWorking">
                <v-row justify="center" align="center">
                <h3 class="mt-16">Yes</h3>
                </v-row>
                </v-card>
            </v-col>
            <v-col cols="3">
            <v-card class="mx-auto rounded-circle"
                width="170" height="170" color="indigo">
                <v-row justify="center" align="center">
                <h3 class="mt-16">No</h3>
                </v-row>
                </v-card>
            </v-col>
        </v-row> 
        </v-container>   
        <v-container v-if="working">
            <v-carousel v-model="mainJob" :show-arrows="false" hide-delimiters>
                <v-carousel-item>
                    <v-row justify="center" align="center" class="mt-12">
                        What is your job title?
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="4">
                            <v-text-field label="job title" v-model="jobTitle" outlined>
                            </v-text-field>
                        </v-col>                
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="1">
                            <v-btn class="secondary" @click="endCarousel">
                            Back
                            </v-btn>
                        </v-col>
                        <v-col cols="1">
                            <v-btn class="primary" @click="upCarousel">
                            Next
                            </v-btn>
                        </v-col>                       
                    </v-row>
                </v-carousel-item>
                <v-carousel-item>
                    <v-row justify="center" align="center" class="mt-12">
                        What is your annual salary before taxes not including bonus?
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="4">
                            <v-text-field label="salary" v-model="salary" outlined>
                            </v-text-field>
                        </v-col>                
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="1">
                            <v-btn class="secondary" @click="backCarousel">
                            Back
                            </v-btn>
                        </v-col>
                        <v-col cols="1">
                            <v-btn class="primary" @click="upCarousel">
                            Next
                            </v-btn>
                        </v-col>                       
                    </v-row>
                </v-carousel-item>
                 <v-carousel-item>
                    <v-row justify="center" align="center" class="mt-12">
                        Do you usually receive a bonus?
                    </v-row>
                     <v-row justify="center" align="center">
                         <v-col cols="3">
                            <v-card class="mx-auto rounded-circle" 
                                width="170" height="170" color="indigo" @click.stop="upCarousel">
                                <v-row justify="center" align="center">
                                <h3 class="mt-16">Yes</h3>
                                </v-row>
                                </v-card>
                            </v-col>
                            <v-col cols="3">
                            <v-card class="mx-auto rounded-circle" @click.stop="skipCarousel"
                                width="170" height="170" color="indigo">
                                <v-row justify="center" align="center">
                                <h3 class="mt-16">No</h3>
                                </v-row>
                                </v-card>
                            </v-col>
                     </v-row>
                      <v-row justify="center" align="center">
                        <v-col cols="1">
                            <v-btn class="secondary" @click="backCarousel">
                            Back
                            </v-btn>
                        </v-col>
                      </v-row>
                 </v-carousel-item>
                <v-carousel-item>
                    <v-row justify="center" align="center" class="mt-12">
                        How much do you receive in bonuses each year on average?
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="4">
                            <v-text-field label="bonus" v-model="bonus" outlined>
                            </v-text-field>
                        </v-col>                
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="1">
                            <v-btn class="secondary" @click="backCarousel">
                            Back
                            </v-btn>
                        </v-col>
                        <v-col cols="1">
                            <v-btn class="primary" @click="upCarousel">
                            Next
                            </v-btn>
                        </v-col>                       
                    </v-row>
                </v-carousel-item>
                 <v-carousel-item>
                    <v-row justify="center" align="center" class="mt-12">
                        Do you receive commissions?
                    </v-row>
                     <v-row justify="center" align="center">
                         <v-col cols="3">
                            <v-card class="mx-auto rounded-circle" 
                                width="170" height="170" color="indigo" @click.stop="upCarousel">
                                <v-row justify="center" align="center">
                                <h3 class="mt-16">Yes</h3>
                                </v-row>
                                </v-card>
                            </v-col>
                            <v-col cols="3">
                            <v-card class="mx-auto rounded-circle" @click.stop="skipCarousel"
                                width="170" height="170" color="indigo">
                                <v-row justify="center" align="center">
                                <h3 class="mt-16">No</h3>
                                </v-row>
                                </v-card>
                            </v-col>
                     </v-row>
                     <v-row justify="center" align="center">
                        <v-col cols="1">
                            <v-btn class="secondary" @click="backCarousel">
                            Back
                            </v-btn>
                        </v-col>
                      </v-row>
                 </v-carousel-item>
                  <v-carousel-item>
                    <v-row justify="center" align="center" class="mt-12">
                        How much do you usually receive in commissions each year?
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="4">
                            <v-text-field label="commissions" v-model="commissions" outlined>
                            </v-text-field>
                        </v-col>                
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="1">
                            <v-btn class="secondary" @click="backCarousel">
                            Back
                            </v-btn>
                        </v-col>
                        <v-col cols="1">
                            <v-btn class="primary" @click="upCarousel">
                            Next
                            </v-btn>
                        </v-col>                       
                    </v-row>
                </v-carousel-item>
                <v-carousel-item>
                    <v-row justify="center" align="center" class="mt-12">
                        Do you receive stock options?
                    </v-row>
                     <v-row justify="center" align="center">
                         <v-col cols="3">
                            <v-card class="mx-auto rounded-circle" 
                                width="170" height="170" color="indigo" @click.stop="upCarousel">
                                <v-row justify="center" align="center">
                                <h3 class="mt-16">Yes</h3>
                                </v-row>
                                </v-card>
                            </v-col>
                            <v-col cols="3">
                            <v-card class="mx-auto rounded-circle" @click.stop="skipCarousel"
                                width="170" height="170" color="indigo">
                                <v-row justify="center" align="center">
                                <h3 class="mt-16">No</h3>
                                </v-row>
                                </v-card>
                            </v-col>
                     </v-row>
                     <v-row justify="center" align="center">
                        <v-col cols="1">
                            <v-btn class="secondary" @click="backCarousel">
                            Back
                            </v-btn>
                        </v-col>
                      </v-row>
                 </v-carousel-item>
            </v-carousel>
        </v-container>
    </v-card>
</v-container>
</template>

<script>
export default {
    data(){
        return {
            working: false,
            salary: 0,
            jobTitle: '',
            bonus: 0,
            mainJob: 0,
            commissions: 0,

        }
    },
    methods:{
        isWorking() {
            this.working = true;
        },
        upCarousel() {
            this.mainJob += 1
        },
        endCarousel() {
            this.working = false;
        },
        backCarousel() {
            this.mainJob -= 1
        },
        skipCarousel() {
            this.mainJob += 2
        }
        }
}
</script>

<style>

</style>