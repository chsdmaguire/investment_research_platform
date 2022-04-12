<template>
  <v-container>
    <v-carousel hide-delimiters v-model="assetsCarousel">
      <v-carousel-item>
        <BinaryQuestion question="do you own a checkings account?" v-on:childYes="continueQuestion" 
        @childNo="skipQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
            <h1 class="question">how many checkings accounts do you have?</h1>
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-text-field v-model="checkingsCount" />
              </v-col>  
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-btn @click="slideBack">Go Back</v-btn>
              </v-col>
              <v-col cols="2">
                  <v-btn @click="checkingsRows">Continue</v-btn>
              </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
      <v-carousel-item>
          <v-card class="mx-auto mt-10" color="#121212">
        <v-row justify="center" align="center">
            <h1 class="question">Please enter info for each one</h1>
        </v-row>
        <v-row justify="center" align="center" 
        v-for="(n, idx) in checkingsBalance" :key="idx">
            <v-row justify="center" align="center">
                <v-col cols="3">
                    <v-text-field v-model="n.bank" />
                </v-col>
                <v-col cols="3">
                    <v-text-field v-model="n.balance" />
                </v-col>
            </v-row>    
        </v-row>
        <v-row justify="center" align="center">
            <v-col cols="3">
                <v-btn @click="slideBack">Back</v-btn>
            </v-col>
            <v-col cols="3">
                <v-btn @click="updateCheckings">Continue</v-btn>
            </v-col>
        </v-row>
    </v-card>
      </v-carousel-item>
      <v-carousel-item>
         <BinaryQuestion question="do you own a savings account?" 
         v-on:childYes="continueQuestion" @childNo="skipQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
            <h1 class="question">how many savings accounts do you have?</h1>
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-text-field v-model="savingsCount" />
              </v-col>  
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-btn @click="slideBack">Go Back</v-btn>
              </v-col>
              <v-col cols="2">
                  <v-btn @click="savingsRows">Continue</v-btn>
              </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
   
     <v-carousel-item>
          <v-card class="mx-auto mt-10" color="#121212">
        <v-row justify="center" align="center">
            <h1 class="question">Please enter info for each one</h1>
        </v-row>
        <v-row justify="center" align="center" 
        v-for="(n, idx) in savingsBalance" :key="idx">
            <v-row justify="center" align="center">
                <v-col cols="3">
                    <v-text-field v-model="n.bank" />
                </v-col>
                <v-col cols="3">
                    <v-text-field v-model="n.balance" />
                </v-col>
            </v-row>    
        </v-row>
        <v-row justify="center" align="center">
            <v-col cols="3">
                <v-btn @click="slideBack">Back</v-btn>
            </v-col>
            <v-col cols="3">
                <v-btn @click="updateSavings">Continue</v-btn>
            </v-col>
        </v-row>
    </v-card>
      </v-carousel-item>

      <v-carousel-item>
        <BinaryQuestion question="do you own a money market savings account?" 
        v-on:childYes="continueQuestion" @childNo="skipQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
            <h1 class="question">how many money market savings accounts do you have?</h1>
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-text-field v-model="mmSavingsCount" />
              </v-col>  
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-btn @click="slideBack">Go Back</v-btn>
              </v-col>
              <v-col cols="2">
                  <v-btn @click="mmfsRows">Continue</v-btn>
              </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
      <v-carousel-item>
          <v-card class="mx-auto mt-10" color="#121212">
        <v-row justify="center" align="center">
            <h1 class="question">Please enter info for each one</h1>
        </v-row>
        <v-row justify="center" align="center" 
        v-for="(n, idx) in mmfSavingsBalance" :key="idx">
            <v-row justify="center" align="center">
                <v-col cols="2">
                    <v-text-field v-model="n.bank" />
                </v-col>
                <v-col cols="2">
                    <v-text-field v-model="n.balance" />
                </v-col>
                <v-col cols="2">
                    <v-text-field v-model="n.contribution" />
                </v-col>
            </v-row>    
        </v-row>
        <v-row justify="center" align="center">
            <v-col cols="3">
                <v-btn @click="slideBack">Back</v-btn>
            </v-col>
            <v-col cols="3">
                <v-btn @click="updateMmfs">Continue</v-btn>
            </v-col>
        </v-row>
    </v-card>
      </v-carousel-item>

      <v-carousel-item>
        <BinaryQuestion question="do you own a CD account?" 
        v-on:childYes="continueQuestion" @childNo="skipQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
            <h1 class="question">how many CD accounts do you have?</h1>
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-text-field v-model="cdsCount" />
              </v-col>  
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-btn @click="slideBack">Go Back</v-btn>
              </v-col>
              <v-col cols="2">
                  <v-btn @click="cdsRows">Continue</v-btn>
              </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
      <v-carousel-item>
          <v-card class="mx-auto mt-10" color="#121212">
              <v-row justify="center" align="center">
                  <h1 class="question">Please enter info for each one</h1>
              </v-row>
              <v-row justify="center" align="center" 
              v-for="(n, idx) in cdsBalance" :key="idx">
                  <v-row justify="center" align="center">
                      <v-col cols="2">
                          <v-text-field v-model="n.bank" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.balance" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.contribution" />
                      </v-col>
                  </v-row>    
              </v-row>
              <v-row justify="center" align="center">
                  <v-col cols="3">
                      <v-btn @click="slideBack">Back</v-btn>
                  </v-col>
                  <v-col cols="3">
                      <v-btn @click="updateCds">Continue</v-btn>
                  </v-col>
              </v-row>
          </v-card>
      </v-carousel-item>

      <v-carousel-item>
        <BinaryQuestion question="do you own a brokerage account?" 
        v-on:childYes="continueQuestion" @childNo="skipQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
            <h1 class="question">how many brokerage accounts do you have?</h1>
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-text-field v-model="brokerageCount" />
              </v-col>  
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-btn @click="slideBack">Go Back</v-btn>
              </v-col>
              <v-col cols="2">
                  <v-btn @click="brokerageRows">Continue</v-btn>
              </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
      <v-carousel-item>
          <v-card class="mx-auto mt-10" color="#121212">
              <v-row justify="center" align="center">
                  <h1 class="question">Please enter info for each one</h1>
              </v-row>
              <v-row justify="center" align="center" 
              v-for="(n, idx) in brokerBalance" :key="idx">
                  <v-row justify="center" align="center">
                      <v-col cols="2">
                          <v-text-field v-model="n.bank" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.balance" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.contribution" />
                      </v-col>
                  </v-row>    
              </v-row>
              <v-row justify="center" align="center">
                  <v-col cols="3">
                      <v-btn @click="slideBack">Back</v-btn>
                  </v-col>
                  <v-col cols="3">
                      <v-btn @click="updateBroker">Continue</v-btn>
                  </v-col>
              </v-row>
          </v-card>
      </v-carousel-item>

       <v-carousel-item>
        <BinaryQuestion question="do you own a Traditional IRA account?" 
        v-on:childYes="continueQuestion" @childNo="skipQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
            <h1 class="question">how many traditional IRAs do you have?</h1>
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-text-field v-model="tradIraCount" />
              </v-col>  
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-btn @click="slideBack">Go Back</v-btn>
              </v-col>
              <v-col cols="2">
                  <v-btn @click="tradIraRows">Continue</v-btn>
              </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
      <v-carousel-item>
          <v-card class="mx-auto mt-10" color="#121212">
              <v-row justify="center" align="center">
                  <h1 class="question">Please enter info for each one</h1>
              </v-row>
              <v-row justify="center" align="center" 
              v-for="(n, idx) in tradIraBalance" :key="idx">
                  <v-row justify="center" align="center">
                      <v-col cols="2">
                          <v-text-field v-model="n.bank" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.balance" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.contribution" />
                      </v-col>
                  </v-row>    
              </v-row>
              <v-row justify="center" align="center">
                  <v-col cols="3">
                      <v-btn @click="slideBack">Back</v-btn>
                  </v-col>
                  <v-col cols="3">
                      <v-btn @click="continueQuestion">Continue</v-btn>
                  </v-col>
              </v-row>
          </v-card>
      </v-carousel-item>

      <v-carousel-item>
        <BinaryQuestion question="do you own a Roth IRA account?" 
        v-on:childYes="continueQuestion" @childNo="skipQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
            <h1 class="question">how many roth IRAs do you have?</h1>
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-text-field v-model="rothIraCount" />
              </v-col>  
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-btn @click="slideBack">Go Back</v-btn>
              </v-col>
              <v-col cols="2">
                  <v-btn @click="tradIraRows">Continue</v-btn>
              </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
      <v-carousel-item>
          <v-card class="mx-auto mt-10" color="#121212">
              <v-row justify="center" align="center">
                  <h1 class="question">Please enter info for each one</h1>
              </v-row>
              <v-row justify="center" align="center" 
              v-for="(n, idx) in rothIraBalance" :key="idx">
                  <v-row justify="center" align="center">
                      <v-col cols="2">
                          <v-text-field v-model="n.bank" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.balance" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.contribution" />
                      </v-col>
                  </v-row>    
              </v-row>
              <v-row justify="center" align="center">
                  <v-col cols="3">
                      <v-btn @click="slideBack">Back</v-btn>
                  </v-col>
                  <v-col cols="3">
                      <v-btn @click="continueQuestion">Continue</v-btn>
                  </v-col>
              </v-row>
          </v-card>
      </v-carousel-item>

      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
            <h1 class="question">Does this look accurate?</h1>
            <!-- show IRA data -->
          </v-row>
           <v-row justify="center" align="center">
                  <v-col cols="3">
                      <v-btn @click="slideBack">Back</v-btn>
                  </v-col>
                  <v-col cols="3">
                      <v-btn @click="updateIras">Continue</v-btn>
                  </v-col>
              </v-row>
        </v-card> 
      </v-carousel-item>

      <v-carousel-item>
        <BinaryQuestion question="do you own a 401K retirement account?" 
        v-on:childYes="continueQuestion" @childNo="skipQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
            <h1 class="question">how many 401K accounts do you have?</h1>
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-text-field v-model="forO1KCount" />
              </v-col>  
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-btn @click="slideBack">Go Back</v-btn>
              </v-col>
              <v-col cols="2">
                  <v-btn @click="forO1KRows">Continue</v-btn>
              </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
      <v-carousel-item>
          <v-card class="mx-auto mt-10" color="#121212">
              <v-row justify="center" align="center">
                  <h1 class="question">Please enter info for each one</h1>
              </v-row>
              <v-row justify="center" align="center" 
              v-for="(n, idx) in forO1KBalance" :key="idx">
                  <v-row justify="center" align="center">
                      <v-col cols="2">
                          <v-text-field v-model="n.bank" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.balance" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.contribution" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.employer_contribution" />
                      </v-col>
                  </v-row>    
              </v-row>
              <v-row justify="center" align="center">
                  <v-col cols="3">
                      <v-btn @click="slideBack">Back</v-btn>
                  </v-col>
                  <v-col cols="3">
                      <v-btn @click="continueQuestion">Continue</v-btn>
                  </v-col>
              </v-row>
          </v-card>
      </v-carousel-item>

      <v-carousel-item>
        <BinaryQuestion question="Have you ever been employed by th US National Government or its Agency?" 
        v-on:childYes="continueQuestion" @childNo="skipLongQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <BinaryQuestion question="do you own a 401A retirement account?" 
        v-on:childYes="continueQuestion" @childNo="skipQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
            <h1 class="question">how many 401A accounts do you have?</h1>
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-text-field v-model="forO1ACount" />
              </v-col>  
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-btn @click="slideBack">Go Back</v-btn>
              </v-col>
              <v-col cols="2">
                  <v-btn @click="forO1ARows">Continue</v-btn>
              </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
      <v-carousel-item>
          <v-card class="mx-auto mt-10" color="#121212">
              <v-row justify="center" align="center">
                  <h1 class="question">Please enter info for each one</h1>
              </v-row>
              <v-row justify="center" align="center" 
              v-for="(n, idx) in forO1ABalance" :key="idx">
                  <v-row justify="center" align="center">
                      <v-col cols="2">
                          <v-text-field v-model="n.bank" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.balance" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.contribution" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.employer_contribution" />
                      </v-col>
                  </v-row>    
              </v-row>
              <v-row justify="center" align="center">
                  <v-col cols="3">
                      <v-btn @click="slideBack">Back</v-btn>
                  </v-col>
                  <v-col cols="3">
                      <v-btn @click="continueQuestion">Continue</v-btn>
                  </v-col>
              </v-row>
          </v-card>
      </v-carousel-item>

      <v-carousel-item>
        <BinaryQuestion question="Have you ever been employed by a public school or a tax-exempt organization?" 
        v-on:childYes="continueQuestion" @childNo="skipLongQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <BinaryQuestion question="do you own a 403B retirement account?" 
        v-on:childYes="continueQuestion" @childNo="skipQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
            <h1 class="question">how many 403B accounts do you have?</h1>
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-text-field v-model="forOthreeBCount" />
              </v-col>  
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-btn @click="slideBack">Go Back</v-btn>
              </v-col>
              <v-col cols="2">
                  <v-btn @click="forOthreeRows">Continue</v-btn>
              </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
      <v-carousel-item>
          <v-card class="mx-auto mt-10" color="#121212">
              <v-row justify="center" align="center">
                  <h1 class="question">Please enter info for each one</h1>
              </v-row>
              <v-row justify="center" align="center" 
              v-for="(n, idx) in forOthreeBBalance" :key="idx">
                  <v-row justify="center" align="center">
                      <v-col cols="2">
                          <v-text-field v-model="n.bank" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.balance" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.contribution" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.employer_contribution" />
                      </v-col>
                  </v-row>    
              </v-row>
              <v-row justify="center" align="center">
                  <v-col cols="3">
                      <v-btn @click="slideBack">Back</v-btn>
                  </v-col>
                  <v-col cols="3">
                      <v-btn @click="continueQuestion">Continue</v-btn>
                  </v-col>
              </v-row>
          </v-card>
      </v-carousel-item>

      <v-carousel-item>
        <BinaryQuestion question="Have you ever been employed by a US state/local government or its agency or tax-exempt organization?" 
        v-on:childYes="continueQuestion" @childNo="skipLongQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <BinaryQuestion question="do you own a 457B retirement account?" 
        v-on:childYes="continueQuestion" @childNo="skipQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
            <h1 class="question">how many 457B accounts do you have?</h1>
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-text-field v-model="forFiftSevenBCount" />
              </v-col>  
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-btn @click="slideBack">Go Back</v-btn>
              </v-col>
              <v-col cols="2">
                  <v-btn @click="forFiftSevenBRows">Continue</v-btn>
              </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
      <v-carousel-item>
          <v-card class="mx-auto mt-10" color="#121212">
              <v-row justify="center" align="center">
                  <h1 class="question">Please enter info for each one</h1>
              </v-row>
              <v-row justify="center" align="center" 
              v-for="(n, idx) in forO1ABalance" :key="idx">
                  <v-row justify="center" align="center">
                      <v-col cols="2">
                          <v-text-field v-model="n.bank" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.balance" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.contribution" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.employer_contribution" />
                      </v-col>
                  </v-row>    
              </v-row>
              <v-row justify="center" align="center">
                  <v-col cols="3">
                      <v-btn @click="slideBack">Back</v-btn>
                  </v-col>
                  <v-col cols="3">
                      <v-btn @click="continueQuestion">Continue</v-btn>
                  </v-col>
              </v-row>
          </v-card>
      </v-carousel-item>

      <v-carousel-item>
        <BinaryQuestion question="do you own a 457F retirement account?" 
        v-on:childYes="continueQuestion" @childNo="skipQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
            <h1 class="question">how many 457F accounts do you have?</h1>
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-text-field v-model="forFiftSevenBCount" />
              </v-col>  
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-btn @click="slideBack">Go Back</v-btn>
              </v-col>
              <v-col cols="2">
                  <v-btn @click="forFiftSevenBRows">Continue</v-btn>
              </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
      <v-carousel-item>
          <v-card class="mx-auto mt-10" color="#121212">
              <v-row justify="center" align="center">
                  <h1 class="question">Please enter info for each one</h1>
              </v-row>
              <v-row justify="center" align="center" 
              v-for="(n, idx) in forFiftSevenBBalance" :key="idx">
                  <v-row justify="center" align="center">
                      <v-col cols="2">
                          <v-text-field v-model="n.bank" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.balance" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.contribution" />
                      </v-col>
                      <v-col cols="2">
                          <v-text-field v-model="n.employer_contribution" />
                      </v-col>
                  </v-row>    
              </v-row>
              <v-row justify="center" align="center">
                  <v-col cols="3">
                      <v-btn @click="slideBack">Back</v-btn>
                  </v-col>
                  <v-col cols="3">
                      <v-btn @click="continueQuestion">Continue</v-btn>
                  </v-col>
              </v-row>
          </v-card>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
            <h1 class="question">Does this look accurate?</h1>
            <!-- show retirement data -->
          </v-row>
           <v-row justify="center" align="center">
                  <v-col cols="3">
                      <v-btn @click="slideBack">Back</v-btn>
                  </v-col>
                  <v-col cols="3">
                      <v-btn @click="updateRetirements">Continue</v-btn>
                  </v-col>
              </v-row>
        </v-card> 
      </v-carousel-item>

      <v-carousel-item>
        <BinaryQuestion question="do you own any savings bonds outside of the investment accounts previously discussed?" 
        v-on:childYes="continueQuestion" @childNo="skipQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
            <h1 class="question">how many savings bonds do you have?</h1>
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-text-field v-model="savingsBondsCount" />
              </v-col>  
          </v-row>
          <v-row justify="center" align="center">
              <v-col cols="2">
                  <v-btn @click="slideBack">Go Back</v-btn>
              </v-col>
              <v-col cols="2">
                  <v-btn @click="sBondsRows">Continue</v-btn>
              </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
      <v-carousel-item>
          <v-card class="mx-auto mt-10" color="#121212">
              <v-row justify="center" align="center">
                  <h1 class="question">Please enter info for each one</h1>
              </v-row>
              <v-row justify="center" align="center" 
              v-for="(n, idx) in sBondsBalance" :key="idx">
                  <v-row justify="center" align="center">
                      <v-col cols="1">
                          <v-text-field v-model="n.type" />
                      </v-col>
                      <v-col cols="1">
                          <v-text-field v-model="n.amount" />
                      </v-col>
                      <v-col cols="1">
                          <v-text-field v-model="n.purchase_value" />
                      </v-col>
                      <v-col cols="1">
                          <v-text-field v-model="n.purchase_date" />
                      </v-col>
                      <v-col cols="1">
                          <v-text-field v-model="n.coupon" />
                      </v-col>
                      <v-col cols="1">
                          <v-text-field v-model="n.maturity_date" />
                      </v-col>
                  </v-row>    
              </v-row>
              <v-row justify="center" align="center">
                  <v-col cols="3">
                      <v-btn @click="slideBack">Back</v-btn>
                  </v-col>
                  <v-col cols="3">
                      <v-btn @click="updateBonds">Continue</v-btn>
                  </v-col>
              </v-row>
          </v-card>
      </v-carousel-item>

      <v-carousel-item>
        <BinaryQuestion question="do you own any cryptocurrency" 
        v-on:childYes="continueQuestion" @childNo="skipTwoQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
                <h3>Please Enter Info for Each One</h3>
            </v-row>
            <v-row justify="center" align="center">
                <v-row v-for="(i, idx) in cryptoBalance" :key="idx"  justify="center" align="center">
                    <v-col cols="1">
                        <v-text-field label="First Name"
                        v-model="i.coin" outlined>
                        </v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-text-field label="Last Name"
                        v-model="i.purchase_price" outlined>
                        </v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-text-field label="Age"
                        v-model="i.purchase_date" outlined>
                        </v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-text-field label="Age"
                        v-model="i.num_coins" outlined>
                        </v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-text-field label="Age"
                        v-model="i.current_value" outlined>
                        </v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-btn @click="removeCryptoRow(i)"><v-icon>mdi-minus</v-icon></v-btn>
                    </v-col>
                </v-row>
            </v-row>
            <v-row justify="center" align="center">
                    <v-btn block @click="addCryptoRow"><v-icon>mdi-plus</v-icon></v-btn>
                </v-row>
            <v-row justify="center" align="center">
                  <v-col cols="3">
                      <v-btn @click="slideBack">Back</v-btn>
                  </v-col>
                  <v-col cols="3">
                      <v-btn @click="updateCrypto">Continue</v-btn>
                  </v-col>
              </v-row>
        </v-card>
      </v-carousel-item>

      <v-carousel-item>
        <BinaryQuestion question="do you own any NFTs" 
        v-on:childYes="continueQuestion" @childNo="skipTwoQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
                <h3>Please Enter Info for Each One</h3>
            </v-row>
            <v-row justify="center" align="center">
                <v-row v-for="(i, idx) in nftBalance" :key="idx"  justify="center" align="center">
                    <v-col cols="1">
                        <v-text-field label="First Name"
                        v-model="i.name" outlined>
                        </v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-text-field label="Last Name"
                        v-model="i.purchase_price" outlined>
                        </v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-text-field label="Age"
                        v-model="i.purchase_date" outlined>
                        </v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-text-field label="Age"
                        v-model="i.current_value" outlined>
                        </v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-btn @click="removeNftRow(i)"><v-icon>mdi-minus</v-icon></v-btn>
                    </v-col>
                </v-row>
            </v-row>
            <v-row justify="center" align="center">
                  <v-btn block @click="addNftRow"><v-icon>mdi-plus</v-icon></v-btn>
              </v-row>
            <v-row justify="center" align="center">
                  <v-col cols="3">
                      <v-btn @click="slideBack">Back</v-btn>
                  </v-col>
                  <v-col cols="3">
                      <v-btn @click="updateNfts">Continue</v-btn>
                  </v-col>
              </v-row>
        </v-card>
      </v-carousel-item>

      <v-carousel-item>
        <BinaryQuestion question="do you own any valuable items such as expensive jewewlry or art?" 
        v-on:childYes="continueQuestion" @childNo="skipTwoQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
                <h3>Please Enter Info for Each One</h3>
            </v-row>
            <v-row justify="center" align="center">
                <v-row v-for="(i, idx) in valuablesBalance" :key="idx"  justify="center" align="center">
                    <v-col cols="3">
                        <v-text-field label="First Name"
                        v-model="i.description" outlined>
                        </v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field label="Last Name"
                        v-model="i.value" outlined>
                        </v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-btn @click="removeValuablesRow(i)"><v-icon>mdi-minus</v-icon></v-btn>
                    </v-col>
                </v-row>
            </v-row>
            <v-row justify="center" align="center">
                  <v-btn block @click="addValuablesRow"><v-icon>mdi-plus</v-icon></v-btn>
              </v-row>
            <v-row justify="center" align="center">
                  <v-col cols="3">
                      <v-btn @click="slideBack">Back</v-btn>
                  </v-col>
                  <v-col cols="3">
                      <v-btn @click="updateValuables">Continue</v-btn>
                  </v-col>           
              </v-row>
        </v-card>
      </v-carousel-item>

      <v-carousel-item>
        <BinaryQuestion question="do you expect to receive any signficant gifts or inheritance in the next year?" 
        v-on:childYes="continueQuestion" @childNo="skipTwoQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
                <h3>Please Enter Info for Each One</h3>
            </v-row>
            <v-row justify="center" align="center">
                <v-row v-for="(i, idx) in significantGifts" :key="idx"  justify="center" align="center">
                    <v-col cols="3">
                        <v-text-field label="First Name"
                        v-model="i.description" outlined>
                        </v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field label="Last Name"
                        v-model="i.value" outlined>
                        </v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-btn @click="removeGiftsRow(i)"><v-icon>mdi-minus</v-icon></v-btn>
                    </v-col>
                </v-row>
            </v-row>
            <v-row justify="center" align="center">
                  <v-btn block @click="addGiftsRow"><v-icon>mdi-plus</v-icon></v-btn>
              </v-row>
            <v-row justify="center" align="center">
                  <v-col cols="3">
                      <v-btn @click="slideBack">Back</v-btn>
                  </v-col>
                  <v-col cols="3">
                      <v-btn @click="updateGifts">Continue</v-btn>
                  </v-col>           
              </v-row>
        </v-card>
      </v-carousel-item>

      <v-carousel-item>
        <BinaryQuestion question="Are there any other assets not yet covered?" 
        v-on:childYes="continueQuestion" @childNo="skipTwoQuestion"/>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
                <h3>Please Enter Info for Each One</h3>
            </v-row>
            <v-row justify="center" align="center">
                <v-row v-for="(i, idx) in otherAssets" :key="idx"  justify="center" align="center">
                    <v-col cols="3">
                        <v-text-field label="First Name"
                        v-model="i.description" outlined>
                        </v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field label="Last Name"
                        v-model="i.value" outlined>
                        </v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-btn @click="removeOthersRow(i)"><v-icon>mdi-minus</v-icon></v-btn>
                    </v-col>
                </v-row>
            </v-row>
            <v-row justify="center" align="center">
                  <v-btn block @click="addOthersRow"><v-icon>mdi-plus</v-icon></v-btn>
              </v-row>
            <v-row justify="center" align="center">
                  <v-col cols="3">
                      <v-btn @click="slideBack">Back</v-btn>
                  </v-col>
                  <v-col cols="3">
                      <v-btn @click="updateOtherAssets">Continue</v-btn>
                  </v-col>           
              </v-row>
        </v-card>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
                <h3>All done!</h3>
            </v-row>
        </v-card>
      </v-carousel-item>
      </v-carousel>
  </v-container>
</template>

<script>
import BinaryQuestion from '~/components/wm/BinaryQuestion';
// AFTER EACH IR/EMPLOYER SPONSORED ACCOUNTS QUESITON, SHOW TOTAL BREAKDOWN, ASK 
// FOR CONFIRMATION, & THEN THATS WHEN YOU DO STORE COMMITS FOR TOTALS EMPTY ARRAY

// IN EACH THAT UPDATES ROWS METHOD, ADD IF STATEMENT TO MAKE SURE 
// IF COUNT > 0 THIS.CONTINUEQUESTION() ELSE { THIS.SKIPTWO()}

export default {
  components: {BinaryQuestion},
  data() {
    return {
      totalIras: [],
      totalEmployerRetirementAccounts: [],
      assetsCarousel: 0,
      checkingsCount: 1,
      savingsCount: 1,
      cdsCount: 1,
      mmSavingsCount: 1,
      brokerageCount: 1,
      tradIraCount: 1,
      rothIraCount: 1,
      forO1KCount: 1,
      forO1ACount: 1,
      forOthreeBCount: 1,
      forFiftSevenBCount: 1,
      forFiftSevenFCount: 1,
      savingsBondsCount: 1,
      checkingsBalance: [],
      savingsBalance: [],
      cdsBalance: [],
      mmfSavingsBalance: [],
      brokerBalance: [],
      tradIraBalance: [],
      rothIraBalance: [],
      forO1KBalance: [],
      forO1ABalance: [],
      forOthreeBBalance: [],
      forFiftSevenBBalance: [],
      forFiftSevenFBalance: [],
      sBondsBalance: [],
      cryptoBalance: [{coin: '', purchase_price: 0, 
      purchase_date: 0, num_coins: 0, current_value: 0}],
      nftBalance: [{name: '', purchase_date: 0, purchase_price: 0, current_value}],
      valuablesBalance: [{description: '', value: 0}],
      significantGifts: [{description: '', value: 0}],
      otherAssets: [{description: '', value: 0}]

      }
  },
  methods: {
    skipQuestion() {
      this.assetsCarousel += 3;
    },
    skipLongQuestion() {
      this.assetsCarousel += 4
    },
    continueQuestion() {
      this.assetsCarousel += 1;
    },
    slideBack() {
      this.assetsCarousel -= 1;
    },
    skipTwoQuestion() {
      this.assetsCarousel += 2;
    },
    checkingsRows() {
    this.checkingsBalance.length = 0;
    const rowAmount = Number(this.checkingsCount);
    let j = 0;
    while (j < rowAmount) {
      this.checkingsBalance.push({bank: '', balance: 0})
      j += 1
    }
    this.continueQuestion()
    },
    savingsRows() {
    const rowAmount = Number(this.savingsCount);
    let j = 0;
    while (j < rowAmount) {
      this.savingsBalance.push({bank: '', balance: 0})
      j += 1
    }
    this.continueQuestion()
    },
    cdsRows() {
    const rowAmount = Number(this.cdsCount);
    let j = 0;
    while (j < rowAmount) {
      this.cdsBalance.push({bank: '', balance: 0, contribution: 0})
      j += 1
    }
    this.continueQuestion()
    },
    mmfsRows() {
    const rowAmount = Number(this.mmSavingsCount);
    let j = 0;
    while (j < rowAmount) {
      this.mmfSavingsBalance.push({bank: '', balance: 0, contribution: 0})
      j += 1
    }
    this.continueQuestion()
    },
    brokerageRows() {
    const rowAmount = Number(this.brokerageCount);
    let j = 0;
    while (j < rowAmount) {
      this.brokerBalance.push({bank: '', balance: 0, contribution: 0})
      j += 1
    }
    this.continueQuestion()
    },
    tradIraRows() {
    const rowAmount = Number(this.tradIraCount);
    let j = 0;
    while (j < rowAmount) {
      this.tradIraBalance.push({bank: '', balance: 0, contribution: 0})
      j += 1
    }
    this.continueQuestion()
    },
    rothIraRows() {
    const rowAmount = Number(this.rothIraCount);
    let j = 0;
    while (j < rowAmount) {
      this.tradIraBalance.push({bank: '', balance: 0, contribution: 0})
      j += 1
    }
    this.continueQuestion()
    },
    forO1KRows() {
    const rowAmount = Number(this.forO1KCount);
    let j = 0;
    while (j < rowAmount) {
      this.forO1KBalance.push({bank: '', balance: 0, contribution: 0, employer_contribution: 0})
      j += 1
    }
    this.continueQuestion()
    },
    forO1ARows() {
    const rowAmount = Number(this.forO1ACount);
    let j = 0;
    while (j < rowAmount) {
      this.forO1ABalance.push({bank: '', balance: 0, contribution: 0, employer_contribution: 0})
      j += 1
    }
    this.continueQuestion()
    },
    forOthreeRows() {
    const rowAmount = Number(this.forOthreeBCount);
    let j = 0;
    while (j < rowAmount) {
      this.forOthreeBBalance.push({bank: '', balance: 0, contribution: 0, employer_contribution: 0})
      j += 1
    }
    this.continueQuestion()
    },
    forFiftSevenBRows() {
    const rowAmount = Number(this.forFiftSevenBCount);
    let j = 0;
    while (j < rowAmount) {
      this.forFiftSevenBBalance.push({bank: '', balance: 0, contribution: 0, employer_contribution: 0})
      j += 1
    }
    this.continueQuestion()
    },
    forFiftSevenFRows() {
    const rowAmount = Number(this.forFiftSevenFCount);
    let j = 0;
    while (j < rowAmount) {
      this.forFiftSevenFBalance.push({bank: '', balance: 0, contribution: 0, employer_contribution: 0})
      j += 1
    }
    this.continueQuestion()
    },
    sBondsRows() {
    const rowAmount = Number(this.savingsBondsCount);
    let j = 0;
    while (j < rowAmount) {
      this.sBondsBalance.push({type: '', amount: 0, purchase_value: 0, purchase_date: 0, coupon: 0, 
      maturity_date: 0})
      j += 1
    }
    this.continueQuestion()
    },
    updateCheckings() {
      this.$store.commit('fpTool/clientCheckings', this.checkingsBalance)
      this.continueQuestion();
    },
  },
  updateSavings() {
    this.$store.commit('fpTool/clientSavings', this.savingsBalance)
    this.continueQuestion();
  },
  updateCds() {
    this.$store.commit('fpTool/clientCDs', this.cdsBalance)
    this.continueQuestion();
  },
  updateMmfs() {
    this.$store.commit('fpTool/clientMmfs', this.mmfSavingsBalance)
    this.continueQuestion();
  },
  updateBroker() {
    this.$store.commit('fpTool/clientBrokerage', this.brokerBalance)
    this.continueQuestion();
  },
  updateIras() {
    if(this.tradIraBalance.length > 0) {
      this.totalIras.push({traditional_ira: this.tradIraBalance})
    };
    if(this.rothIraBalance.length > 0) {
      this.totalIras.push({roth_ira: this.rothIraBalance})
    };
    this.$store.commit('fpTool/clientIra', this.totalIras)
    this.continueQuestion();
  },
  updateRetirements() {
    if(this.forO1KBalance.length > 0) {
      this.totalEmployerRetirementAccounts.push({forO1K: this.forO1KBalance})
    };
    if(this.forO1ABalance.length > 0) {
      this.totalEmployerRetirementAccounts.push({forO1A: this.forO1ABalance})
    };
    if(this.forOthreeBBalance.length > 0) {
      this.totalEmployerRetirementAccounts.push({forO3B: this.forOthreeBBalance})
    };
    if(this.forFiftSevenBBalance.length > 0) {
      this.totalEmployerRetirementAccounts.push({four57B: this.forFiftSevenBBalance})
    };
    if(this.forFiftSevenFBalance.length > 0) {
      this.totalEmployerRetirementAccounts.push({four57F: this.forFiftSevenFBalance})
    };
    this.$store.commit('fpTool/compRetirementPlans', this.totalEmployerRetirementAccounts)
    this.continueQuestion();
  },
  updateBonds() {
    this.$store.commit('fpTool/clientBonds', this.sBondsBalance)
    this.continueQuestion();
  },
  updateCrypto() {
    this.$store.commit('fpTool/clientCrypto', this.cryptoBalance)
    this.continueQuestion();
  },
  updateNfts() {
    this.$store.commit('fpTool/clientNfts', this.nftBalance)
    this.continueQuestion();
  },
  updateValuables() {
    this.$store.commit('fpTool/clientValuables', this.valuablesBalance)
    this.continueQuestion();
  },
  updateGifts() {
    this.$store.commit('fpTool/clientGifts', this.significantGifts)
    this.continueQuestion();
  },
  updateOtherAssets() {
    this.$store.commit('fpTool/clientOtherAssets', this.otherAssets)
    this.continueQuestion();
  },
  addCryptoRow() {
    this.id += 1;
    this.cryptoBalance.push({coin: '', purchase_price: 0, 
      purchase_date: 0, num_coins: 0, current_value: 0})
  },
  removeCryptoRow(i) {
      this.cryptoBalance.splice(i, 1)
  },
  addNftRow() {
    this.id += 1;
    this.nftBalance.push({name: '', purchase_date: 0, 
    purchase_price: 0, current_value})
  },
  removeNftRow(i) {
      this.nftBalance.splice(i, 1)
  },
  addValuablesRow() {
    this.id += 1;
    this.valuablesBalance.push({description: '', value: 0})
  },
  removeValuablesRow(i) {
      this.valuablesBalance.splice(i, 1)
  },
  addGiftsRow() {
    this.id += 1;
    this.significantGifts.push({description: '', value: 0})
  },
  removeGiftsRow(i) {
      this.significantGifts.splice(i, 1)
  },
  addOthersRow() {
    this.id += 1;
    this.otherAssets.push({description: '', value: 0})
  },
  removeOthersRow(i) {
      this.otherAssets.splice(i, 1)
  },
}
</script>

<style>

</style>