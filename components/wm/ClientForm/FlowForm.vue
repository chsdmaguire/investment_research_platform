<template>
  <div class="vff" :class="{'vff-not-standalone': !standalone, 'vff-is-mobile': isMobile, 'vff-is-ios': isIos}">
    <div class="f-container">
      <div class="f-form-wrap">
        <flow-form-question
          :ref="setQuestionRef"
          v-for="(q, index) in questionList"
          v-bind:question="q"
          v-bind:language="language"
          v-bind:key="'q' + index"
          v-bind:active="q.index === activeQuestionIndex"
          v-model="q.answer"
          v-on:answer="onQuestionAnswered"
          v-bind:reverse="reverse"
          v-bind:disabled="disabled"
          v-on:disable="setDisabled"
          v-bind:autofocus="autofocus"
        />

        <slot></slot>

        <!-- Complete/Submit screen slots -->   
        <div v-if="isOnLastStep" class="vff-animate f-fade-in-up field-submittype">
          <slot name="complete">
            <!-- Default content for the "complete" slot -->
            <div class="f-section-wrap">
              <p>
                <span class="fh2">{{ language.thankYouText }}</span>
              </p>
            </div>
          </slot>

          <slot name="completeButton">
            <!-- Default content for the "completeButton" slot -->
            <button 
              class="o-btn-action"
              ref="button" 
              type="button" 
              href="#" 
              v-on:click.prevent="submit()" 
              v-if="!submitted"
              v-bind:aria-label="language.ariaSubmitText">
                <span>{{ language.submitText }}</span>
            </button>
            <a 
              class="f-enter-desc"
              href="#"
              v-on:click.prevent="submit()"
              v-if="!submitted"
              v-html="language.formatString(language.pressEnter)">
            </a>
            <p class="text-success" v-if="submitted">{{ language.successText }}</p>
          </slot>
        </div>
      </div>
    </div>

    <div class="vff-footer">
      <div class="footer-inner-wrap">
        <div v-if="progressbar" class="f-progress" v-bind:class="{'not-started': percentCompleted === 0, 'completed': percentCompleted === 100}">
          <div class="f-progress-bar">
            <div class="f-progress-bar-inner" v-bind:style="'width: ' + percentCompleted + '%;'"></div>
          </div>
          {{ language.percentCompleted.replace(':percent', percentCompleted) }}
        </div>
        <div v-if="navigation" class="f-nav">
          <a
            class="f-prev"
            href="#"
            v-bind:class="{'f-disabled': activeQuestionIndex === 0 || submitted}"
            v-on:click.prevent="goToPreviousQuestion()"
            role="button"
            v-bind:aria-label="language.ariaPrev"
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="42.333px"
              height="28.334px"
              viewBox="78.833 5.5 42.333 28.334"
              aria-hidden="true"
            >
              <path
                d="M82.039,31.971L100,11.442l17.959,20.529L120,30.187L101.02,8.492c-0.258-0.295-0.629-0.463-1.02-0.463c-0.39,0-0.764,0.168-1.02,0.463L80,30.187L82.039,31.971z"
              />
            </svg>
            <span class="f-nav-text" aria-hidden="true">{{ language.prev }}</span>
          </a>
          <a
            class="f-next"
            href="#"
            v-bind:class="{'f-disabled': !isNextQuestionAvailable()}"
            v-on:click.prevent="goToNextQuestion()"
            role="button"
            v-bind:aria-label="language.ariaNext"
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="42.333px"
              height="28.334px"
              viewBox="78.833 5.5 42.333 28.334"
              aria-hidden="true"
            >
              <path
                d="M117.963,8.031l-17.961,20.529L82.042,8.031l-2.041,1.784l18.98,21.695c0.258,0.295,0.629,0.463,1.02,0.463c0.39,0,0.764-0.168,1.02-0.463l18.98-21.695L117.963,8.031z"
              />
            </svg>
            <span class="f-nav-text" aria-hidden="true">{{ language.next }}</span>
          </a>
        </div>
        <div v-if="timer" class="f-timer">
          <span>{{ formatTime(time) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FlowFormQuestion from './FlowFormQuestion.vue'
  import QuestionModel, { ChoiceOption, LinkOption, QuestionType } from './models/QuestionModel'
  import LanguageModel from './models/LanguageModel'
  // import { IsMobile } from './mixins/IsMobile'
  // import { ComponentInstance } from './mixins/ComponentInstance'

  export default {
    name: 'FlowForm',

    components: {
      FlowFormQuestion
    },
    
    props: {
      questions: {
        type: Array,
        validator: value => value.every(q => q instanceof QuestionModel)
      }, 
      language: {
        type: LanguageModel,
        default: () => new LanguageModel()
      },
      progressbar: {
        type: Boolean, 
        default: true
      },
      standalone: {
        type: Boolean, 
        default: true
      },
      navigation: {
        type: Boolean, 
        default: true
      },
      timer: {
        type: Boolean,
        default: false
      },
      timerStartStep: [String, Number],
      timerStopStep: [String, Number],
      autofocus: {
        type: Boolean,
        default: true
      }
    },

    // mixins: [
    //   IsMobile,
    //   ComponentInstance
    // ],

    data() {
      return {
        questionRefs: [],
        completed: false,
        submitted: false,
        activeQuestionIndex: 0,
        questionList: [],
        questionListActivePath: [],
        reverse: false,
        timerOn: false,
        timerInterval: null,
        time: 0,
        disabled: false
      }
    },

    mounted() {
      document.addEventListener('keydown', this.onKeyDownListener)
      document.addEventListener('keyup', this.onKeyUpListener, true)
      window.addEventListener('beforeunload', this.onBeforeUnload)

      this.setQuestions()
      this.checkTimer()
    },

    beforeUnmount() {
      document.removeEventListener('keydown', this.onKeyDownListener)
      document.removeEventListener('keyup', this.onKeyUpListener, true)
      window.removeEventListener('beforeunload', this.onBeforeUnload)
      
      this.stopTimer()
    },

    beforeUpdate() {
      this.questionRefs = []
    },
    
    computed: {
      numActiveQuestions() {
        return this.questionListActivePath.length
      },
      isMobile() {
        if(this.$vuetify.breakpoint.name == 'xs' || this.$vuetify.breakpoint.name == 'sm') {
          return true
        } else {
          return false
        }
      },
      isIos() {
       const isIos =  navigator.userAgent.match(/iphone|ipad|ipod/i) || (navigator.userAgent.indexOf('Mac') !== -1 && 'ontouchend' in document);
       return isIos
      },

      activeQuestion() {
        return this.questionListActivePath[this.activeQuestionIndex]
      },

      activeQuestionId() {
        const question = this.questionModels[this.activeQuestionIndex]

        if (this.isOnLastStep) {
          return '_submit'
        }

        if (question && question.id) {
          return question.id
        }

        return null
      },

      numCompletedQuestions() {
        let num = 0

        this.questionListActivePath.forEach(question => {
          if (question.answered) {
            ++num
          }
        })

        return num
      },

      percentCompleted() {
        if (!this.numActiveQuestions) {
          return 0
        }

        return Math.floor((this.numCompletedQuestions / this.numActiveQuestions) * 100)
      },

      isOnLastStep() {
        return this.numActiveQuestions > 0 && this.activeQuestionIndex === this.questionListActivePath.length
      }, 

      isOnTimerStartStep() {
        if (this.activeQuestionId === this.timerStartStep) {
          return true
        }

        if (!this.timerOn && !this.timerStartStep && this.activeQuestionIndex === 0) {
          return true
        }

        return false
      },

      isOnTimerStopStep() {
        if (this.submitted) {
          return true
        }
        
        if (this.activeQuestionId === this.timerStopStep) {
          return true 
        }

        return false
      },

      questionModels: {
        cache: false,

        get() {
          if (this.questions && this.questions.length) {
            return this.questions
          }

          const questions = []

          if (!this.questions) {
            const classMap = {
              options: ChoiceOption,
              descriptionLink: LinkOption
            }

            const defaultSlot = this.$slots.default()
            let children = null

            if (defaultSlot && defaultSlot.length) {
              children = defaultSlot[0].children
              if (!children) {
                children = defaultSlot
              } 
            }

            if (children) {
              children
                .filter(q => q.type && q.type.name.indexOf('Question') !== -1)
                .forEach(q => {
                  const props = q.props
                  const componentInstance = this.getInstance(props.id)
                  let model = new QuestionModel()

                  if (componentInstance.question !== null) {
                    model = componentInstance.question
                  } 

                  if (props.modelValue) {
                    model.answer = props.modelValue
                  }

                  Object.keys(model).forEach(key => {
                    if (props[key] !== undefined) {
                      if (typeof model[key] === 'boolean') {
                        model[key] = props[key] !== false
                      } else if (key in classMap) {
                        const
                          classReference = classMap[key],
                          options = []

                        props[key].forEach(option => {
                          const instance = new classReference()

                          Object.keys(instance).forEach(instanceKey => {
                            if (option[instanceKey] !== undefined) {
                              instance[instanceKey] = option[instanceKey]
                            }
                          })

                          options.push(instance)
                        })

                        model[key] = options
                      } else {
                        switch(key) {
                          case 'type':
                            if (Object.values(QuestionType).indexOf(props[key]) !== -1) {
                              model[key] = props[key]
                            } else {
                              for (const questionTypeKey in QuestionType) {
                                if (questionTypeKey.toLowerCase() === props[key].toLowerCase()) {
                                  model[key] = QuestionType[questionTypeKey]
                                  break
                                }
                              }
                            }
                            break

                          default:
                            model[key] = props[key]
                            break
                        }
                      }
                    }
                  })

                  componentInstance.question = model

                  model.resetOptions()

                  questions.push(model)
                })
            }
          }

          return questions
        }
      }
    },

    methods: {
      setQuestionRef(el) {
        this.questionRefs.push(el)
      },

      /**
       * Returns currently active question component (if any).
       */
      activeQuestionComponent() {
        return this.questionRefs[this.activeQuestionIndex]
      },

      setQuestions() {
        this.setQuestionListActivePath()
        this.setQuestionList()
      },

      /**
       * This method goes through all questions and sets the ones
       * that are in the current path (taking note of logic jumps)
       */
      setQuestionListActivePath() {
        const questions = []

        if (!this.questionModels.length) {
          return
        }

        let
          index = 0,
          serialIndex = 0,
          nextId,
          activeIndex = this.activeQuestionIndex

        do {
          let question = this.questionModels[index]

          if (questions.some(q => q === question)) {
            break
          }
          
          question.setIndex(serialIndex)
          question.language = this.language

          questions.push(question)

          if (!question.jump) {
            ++index
          } else if (question.answered) {
            nextId = question.getJumpId()
            
            if (nextId) {
              if (nextId === '_submit') {
                index = this.questionModels.length
              } else {
                for (let i = 0; i < this.questionModels.length; i++) {
                  if (this.questionModels[i].id === nextId) {
                    if (i < index && questions.some(q => q === this.questionModels[i])) {
                      question.answered = false
                      activeIndex = i
                      ++index
                    } else {
                      index = i
                    }
                    break
                  }
                }
              }
            } else {
              ++index
            }
          } else {
            index = this.questionModels.length
          }

          ++serialIndex
        } while (index < this.questionModels.length)

        this.questionListActivePath = questions
        this.goToQuestion(activeIndex)
      },

      /**
       * Sets the question list array
       * (all questions up to, and including, the current one)
       */
      setQuestionList() {
        const questions = []

        for (let index = 0; index < this.questionListActivePath.length; index++) {
          const question = this.questionListActivePath[index]

          questions.push(question)

          if (!question.answered) {
            if (this.completed) {
              // The "completed" status changed - user probably changed an
              // already entered answer.
              this.completed = false
            }
            break
          }
        }

        this.questionList = questions
      },

      /**
       * If we have any answered questions, notify user before leaving
       * the page.
       */
      onBeforeUnload(event) {
        if (this.activeQuestionIndex > 0 && !this.submitted) {
          event.preventDefault()
          event.returnValue = ''
        }
      },

      /**
       * Global key listeners, listen for Enter or Tab key events.
       */
      onKeyDownListener(e) {
        if (e.key !== 'Tab' || this.submitted) {
          return
        }

        if (e.shiftKey) {
          e.stopPropagation()
          e.preventDefault()

          if (this.navigation) {
            this.goToPreviousQuestion()
          }
        } else {
          const q = this.activeQuestionComponent()

          if (q.shouldFocus()) {
            e.preventDefault()

            q.focusField()
          } else {
            e.stopPropagation()

            this.emitTab()
            this.reverse = false
          }
        }
      }, 

      onKeyUpListener(e) {
        if (e.shiftKey || ['Tab', 'Enter'].indexOf(e.key) === -1 || this.submitted) {
          return
        }

        const q = this.activeQuestionComponent()

        if (e.key === 'Tab' && q.shouldFocus()) {
          q.focusField()
        } else {
          if (e.key === 'Enter') {
            this.emitEnter()
          } 

          e.stopPropagation()
          this.reverse = false
        }
      },

      emitEnter() {
        if (this.disabled) {
          return
        }

        const q = this.activeQuestionComponent()

        if (q) {
          // Send enter event to the current question component
          q.onEnter()
        } else if (this.completed && this.isOnLastStep) {
          // We're finished - submit form
          this.submit()
        }
      },

      emitTab() {
        const q = this.activeQuestionComponent()

        if (q) {
          // Send tab event to the current question component
          q.onTab()
        } else {
          this.emitEnter()
        }
      },

      submit() {
        this.emitSubmit()
        this.submitted = true
      },

      emitComplete() {
        this.$emit('complete', this.completed, this.questionList)
      },

      emitSubmit() {
        this.$emit('submit', this.questionList)
      },

      /**
       * Checks if we have another question and if we
       * can jump to it.
       */
      isNextQuestionAvailable() {
        if (this.submitted) {
          return false
        }

        const q = this.activeQuestion
        if (q && !q.required) {
          return true
        }

        if (this.completed && !this.isOnLastStep) {
          return true
        }
   
        return this.activeQuestionIndex < this.questionList.length - 1
      },

      /**
       * Triggered by the "answer" event in the Question component
       */
      onQuestionAnswered(question) {
        if (question.isValid()) {
          this.$emit('answer', question.question)

          if (this.activeQuestionIndex < this.questionListActivePath.length) {
            ++this.activeQuestionIndex
          }
         
          this.$nextTick(() => {
            this.reverse = false

            this.setQuestions()
            this.checkTimer()
            // Nested $nextTick so we're 100% sure that setQuestions
            // actually updated the question array
            this.$nextTick(() => {
              const q = this.activeQuestionComponent()

              if (q) {
                this.autofocus && q.focusField()
                this.activeQuestionIndex = q.question.index
              } else if (this.isOnLastStep) {
                // No more questions left - set "completed" to true
                this.completed = true
                this.activeQuestionIndex = this.questionListActivePath.length
                
                this.$refs.button && this.$refs.button.focus()
              }

              this.$emit('step', this.activeQuestionId, this.activeQuestion)
            })
          })
        } else if (this.completed) {
          this.completed = false
        }
      },

      /**
       * Jumps to previous question.
       */
      goToPreviousQuestion() {
        this.blurFocus()
    
        if (this.activeQuestionIndex > 0 && !this.submitted) {
          if (this.isOnTimerStopStep) {
            this.startTimer()
          }

          --this.activeQuestionIndex

          this.reverse = true

          this.checkTimer()
        }
      },

      /**
       * Jumps to next question.
       */
      goToNextQuestion() {
        this.blurFocus()

        if (this.isNextQuestionAvailable()) {
          this.emitEnter()
        }

        this.reverse = false
      },

      /**
       * Jumps to question with specific index.
       */
      goToQuestion(index) {
        if (isNaN(+index)) {
          let questionIndex = this.activeQuestionIndex

          this.questionListActivePath.forEach((question, _index) => {
            if (question.id === index) {
              questionIndex = _index
            }
          })

          index = questionIndex
        }

        if (index !== this.activeQuestionIndex) {
          this.blurFocus()
      
          if (!this.submitted && index <= this.questionListActivePath.length - 1) {
            // Check if we can actually jump to the wanted question.
            do {
              const previousQuestionsAnswered = 
                this
                  .questionListActivePath
                  .slice(0, index)
                  .every(q => q.answered)

              if (previousQuestionsAnswered) {
                break
              }

              --index
            } while (index > 0)

            this.reverse = index < this.activeQuestionIndex
            this.activeQuestionIndex = index

            this.checkTimer()
          }
        }
      },

      /**
       * Removes focus from the currently focused DOM element.
       */
      blurFocus() {
        document.activeElement && document.activeElement.blur && document.activeElement.blur()
      },

      checkTimer() {
        if (this.timer) {
          if (this.isOnTimerStartStep) {
            this.startTimer()
          } else if (this.isOnTimerStopStep) {
            this.stopTimer()
          }
        }
      },

      startTimer() {
        if (this.timer && !this.timerOn) {
          this.timerInterval = setInterval(this.incrementTime, 1000)
          this.timerOn = true
        }
      },

      stopTimer() {
        if (this.timerOn) {
          clearInterval(this.timerInterval)
        }

        this.timerOn = false
      },

      incrementTime() {
        ++this.time
        
        this.$emit('timer', this.time, this.formatTime(this.time))
      },

      formatTime(seconds) {
        let
          startIndex = 14,
          length = 5
            
        if (seconds >= 60 * 60) {
          startIndex = 11
          length = 8
        }

        return new Date(1000 * seconds).toISOString().substr(startIndex, length)
      },

      setDisabled(state) {
        this.disabled = state
      },

      reset() {
        this.questionModels.forEach(question => question.resetAnswer())
        this.goToQuestion(0)
      }
    },

    watch: {
      completed() {
        this.emitComplete()
      },
      
      submitted() {
        this.stopTimer()
      }
    }
  }
</script>

<style scoped>
.vff {
    font-weight: 400;
    line-height: 1.34;
    min-height: 220px;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -o-font-smoothing: antialiased;
  }
  
  @media screen and (max-width:1023px) {
    .vff,
    .vff-footer {
      font-size: 15px;
    }
  }
  
  @media screen and (min-width:1366px) {
    .vff,
    .vff-footer {
      font-size: 18px;
    }
  }
  
  @media screen and (min-width:1920px) {
    .vff {
      font-size: 22px;
    }
  }
  
  @media screen and (min-width:2560px) {
    .vff {
      font-size: 25px;
    }
  }
  
  /*
    global
  */
  
  .vff hr {
    box-sizing: content-box;
    overflow: visible;
    height: 0;
  }
  
  .vff pre,
  .vff code,
  .vff kbd {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  
  .vff small {
    font-size: 80%;
  }
  
  .vff sub,
  .vff sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  
  .vff sub {
    bottom: -0.25em;
  }
  
  .vff sup {
    top: -0.5em;
  }
  
  .vff b,
  .vff strong {
    font-weight: bolder;
  }
  
  .vff a {
    cursor: pointer;
    background-color: transparent;
  }
  
  .vff a,
  .vff a:hover,
  .vff a:active,
  .vff a:focus {
    outline: 0;
    text-decoration: none;
  }
  
  .vff ol,
  .vff ul,
  .vff table {
    margin-top: 0;
    margin-bottom: 22px;
  }
  
  .vff img {
    max-width: 100%;
    height: auto;
    margin-bottom: 22px;
  }
  
  /* utils */
  .vff .text-thin {
    font-weight: 300;
  }
  
  .vff .disabled,
  .vff [disabled] {
    opacity: .4;
    user-select: none;
    pointer-events: none;
    cursor: not-allowed;
  }
  
  .vff .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
  
  .vff ol.reset-list,
  .vff ul.reset-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  /*
    vff-form
  */
  
  .vff {
    width: 100%;
    padding: 0 10%;
    margin: 18vh 0 60px;
    position: relative;
    text-align: left;
    box-sizing: border-box;
  }
  
  header.vff-header + .vff {
    margin-top: 16vh;
  }
  
  header.vff-header + .vff.vff-not-standalone {
    margin-top: 0;
  }
  
  .vff *,
  .vff *:before,
  .vff *:after {
    box-sizing: inherit;
  }
  
  .vff .q-is-active {
    opacity: 1;
  }
  
  .vff .q-form.q-is-inactive {
    display: none;
  }
  
  .vff .f-full-width {
    display: block;
    width: 100%;
  }
  
  .vff .f-string-em {
    text-transform: uppercase;
  }
  
  .vff .f-enter {
    margin-bottom: 20px;
  }
  
  /* container */
  .vff .f-container,
  header.vff-header .f-container{
    padding: 0 8%;
    width: 100%;
  }
  
  .vff .f-container {
    margin-top: 1em;
    margin-bottom: 1em;
  }
  
  /* header */
  header.vff-header {
    line-height: 1;
    padding: .9em 10% .8em;
    box-sizing: border-box;
    position: static;
    width: 100%;
  }
  
  .vff-header *,
  .vff-header *:before,
  .vff-header *:after {
    box-sizing: inherit;
  }
  
  header.vff-header .f-container {
    margin: 0;
  }
  
  header.vff-header img.f-logo,
  header.vff-header svg.f-logo {
    height: 18px;
    max-width: 240px;
    opacity: 1;
  }
  
  /*
    form elements
  */
  
  .vff button,
  .vff input,
  .vff optgroup,
  .vff select,
  .vff textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }
  
  .vff fieldset {
    padding: 0.35em 0.75em 0.625em;
  }
  
  .vff legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }
  
  .vff [type="number"]::-webkit-inner-spin-button,
  .vff [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }
  
  .vff [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }
  
  .vff [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  
  .vff [type="file"] {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border: 0;
    outline: 0;
    border-radius: 0;
    margin: 0 .2em;
    padding: .1em 0 .15em;
    font-size: .5em;
    line-height: normal;
    font-weight: 900;
  }
  
  .vff input[type="file"]:focus {
    outline: 1px dotted #000;
    outline-offset: 4px;
  }
  
  @media (prefers-color-scheme: dark) {
    .vff input[type="file"]:focus{
      outline-color: #fff;
    }
  }
  
  .vff input[type="file"]::-webkit-file-upload-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    outline: 0;
    border: 0;
    font: inherit;
    font-size: .86em;
    font-weight: 400;
    margin-right: .7em;
    text-align: center;
    max-width: 100%;
    min-width: 90px;
    min-height: 44px;
    display: inline-block;
    white-space: pre-wrap;
    cursor: pointer;
    padding: .6em 1.4em; 
    background-color: #efefef;
  }
  
  .vff input[type="file"]::-webkit-file-upload-button:active {
    color: #000;
  }
  
  .vff input[type="file"]::file-selector-button {
    min-height: 44px;
    display: inline-block;
    white-space: pre-wrap;
    font: inherit;
    font-size: .86em;
    font-weight: 400;
    margin-right: .6em;
    max-width: 100%;
    min-width: 90px;
  }
  
  /* buttons */
  .vff button,
  .vff [type="button"],
  .vff [type="reset"],
  .vff [type="submit"],
  .vff input {
    -webkit-appearance: none;
    overflow: visible;
  }
  
  /* default button */
  .vff button {
    border: none;
    outline: 0;
    cursor: pointer;
    padding: .6em 1.4em;
    text-align: center;
    display: inline-block;
    min-height: 44px;
    white-space: pre-wrap;
    max-width: 100%;
  } 
  
  .vff .o-btn-action {
    z-index: 1;
    line-height: 1.2;
    font-weight: 900;
    text-transform: lowercase;
  }
  
  .vff .o-btn-action span {
    font-size: 1em;
    user-select: none;
    text-decoration: none;
    transition: all 0.4s ease 0s;
  }
  
  .vff .f-enter-desc {
    font-size: .9em;
    display: inline-block;
    margin-left: .6em;
    margin-top: .7em;
  }
  
  .vff span.faux-form {
    border-bottom: 1px solid;
    display: inline-block;
    margin-right: .2em;
    margin-left: 0;
    position: relative;
    white-space: nowrap;
  }
  
  .vff select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    text-transform: none;
    background: transparent;
    border-radius: 0;
    border: 0;
    cursor: pointer;
    font-size: .5em;
    line-height: 1.32;
    margin: 0;
    opacity: 0;
    outline: 0;
    padding: .6em 8px;
    width: 100%;
    position: absolute;
    z-index: 1;
  }
  
  .vff input[type="text"],
  .vff input[type="number"],
  .vff input[type="tel"],
  .vff input[type="email"],
  .vff input[type="url"],
  .vff input[type="password"],
  .vff input[type="date"],
  .vff textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    border: 0;
    border-bottom: 1px solid;
    border-radius: 0;
    line-height: 1.48;
    margin: 0 .6em 0 0;
    outline: 0;
    padding: .16em .2em;
    font-size: .72em;
    font-weight: 900;
  }
  
  .vff .f-other.f-selected .f-label {
    font-weight: 900;
  }
  
  .vff textarea {
    overflow: auto;
    display: block;
    outline: none;
    resize: vertical;
  }
  
  .vff .f-full-width input[type="text"],
  .vff .f-full-width input[type="number"],
  .vff .f-full-width input[type="tel"],
  .vff .f-full-width input[type="email"],
  .vff .f-full-width input[type="url"],
  .vff .f-full-width input[type="password"],
  .vff .f-full-width input[type="date"],
  .vff .f-full-width input[type="file"],
  .vff .f-full-width textarea,
  .vff .f-full-width span.faux-form {
    width: 100%;
    padding-left: .16em;
    padding-right: .16em;
  }
  
  .vff .f-required {
    display: none; /* hides required asterisks */
  }
  
  .vff .f-answer.f-full-width {
    margin-top: 26px;
  }
  
  .vff span.f-sub + .f-answer.f-full-width {
    margin-top: 22px;
  }
  
  .vff div.field-sectionbreak .f-answer {
    margin-top: 18px;
  }
  
  .vff span.f-empty {
    display: inline-block;
    min-width: 3em;
    padding-right: 28px;
    font-weight: 300;
    padding-bottom: 4px;
  }
  
  .vff span.f-answered {
    font-weight: 900;
  }
  
  /* faux select arrow */
  .vff .f-arrow-down {
    display: inline-block;
    margin-left: .2em;
    pointer-events: none;
    width: 18px;
    height: 100%;
    position: absolute;
    right: 0;
    bottom: 0;
    line-height: 1.3;
  }
  
  .vff .f-arrow-down svg {
    width: 100%;
    height: auto;
  }
  
  /* ios datepicker */
  .vff.vff-is-ios .field-date:not(.f-has-value) .f-answer > span {
    position: relative;
    top: 0;
    left: 0;
  }
  
  .vff.vff-is-ios .field-date:not(.f-has-value) .f-answer > span::before {
    position: absolute;
    content: attr(data-placeholder);
    display: block;
    pointer-events: none;
    padding: 0.12em .2em;
  }
  
  .vff.vff-is-ios input[type="date"] {
    height: 32px;
    display: block;
  }
  
  /*
    links
  */
  
  .vff a.f-link, 
  .vff .field-submit .f-section-wrap a {
    color: inherit;
    border-bottom: 1px dotted;
    word-break: break-word;
  }
  
  .vff a.f-link:hover, 
  .vff a.f-link:active,  
  .vff .field-submit .f-section-wrap a:hover, 
  .vff .field-submit .f-section-wrap a:active {
    color: inherit; 
    border-bottom: none;
  }
  
  /*
    typography
  */
  
  .vff li,
  .vff p,
  .vff .f-section-text,
  .vff span.f-tagline,
  .vff span.f-sub {
    font-size: 1.1em;
    line-height: 1.34;
  }
  
  .vff h1,
  .vff .fh1 {
    font-weight: 900;
    font-size: 3em;
    margin: 0.67em 0;
  }
  
  .vff h2,
  .vff .fh2 {
    font-weight: 900;
    font-size: 2.4em;
    line-height: 1.34;
    padding-right: 1.8em;
    margin-bottom: 20px;
  }
  
  .vff h3,
  .vff .fh3 {
    font-weight: 300;
    font-size: 1.5em;
    margin-top: 0;
    margin-bottom: 0;
  }
  
  .vff .fh1,
  .vff .fh2,
  .vff .fh3 {
    display: block;
  }
  
  /* misc-typography */
  .vff span.f-tagline,
  .vff span.f-sub {
    font-weight: 400;
    display: block;
  }
  
  .vff .fh2 span.f-tagline,
  .vff .fh2 span.f-sub {
    font-size: .51em;
  }
  
  .vff span.f-tagline,
  .vff span.f-text {
    margin-bottom: 8px;
  }
  
  .vff span.f-sub {
    margin-bottom: 8px;
    margin-top: 5px;
  }
  
  .vff span.f-sub span:not(.f-string-em) {
    margin-right: .4em;
  }
  
  .vff span.f-sub span.f-help {
    display: block;
  }
  
  .vff span.f-sub span + span.f-help {
    margin-top: 0;
  }
  
  .vff span.f-text {
    margin-right: .6em;
  }
  
  /* description */
  .vff p.f-description {
    margin-top: 0;
    padding-right: 4em;
  }
  
  .vff p.f-description span,
  .vff p.f-description a.f-link {
    margin-right: 8px;
  }
  
  /*
    f-radios (multiple choice)
  */
  
  .vff ul.f-radios {
    margin: 0;
    padding: 0;
    list-style-type: none;
    max-width: 590px;
    min-width: 160px;
  }
  
  .vff ul.f-radios li {
    padding: .6em .68em;
    margin: .5em 0 .6em;
    font-weight: 300;
    line-height: 1.24;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
    overflow: hidden;
  }
  
  .vff ul.f-radios li.f-other input[type="text"] {
    border-bottom: none;
    width: 100%;
    padding: 0;
    margin: 0;
    border: 0;
    line-height: inherit;
    font-size: inherit;
  }
  
  .vff .f-radios-desc {
    display: block;
  }
  
  .vff .f-radios-desc,
  .vff ul.f-radios li,
  .vff ul.f-radios li input[type="text"] {
    font-size: .4em;
  }
  
  .vff ul.f-radios li div.f-label-wrap {
    display: -ms-flexbox;
    display: flex;
    width: 100%;
  }
  
  .vff ul.f-radios li span.f-label {
    margin-left: .4em;
  }
  
  .vff ul.f-radios li span.f-key {
    width: 16px;
    text-align: center;
  }
  
  /*
    f-radios (multiple picture choice)
  */
  
  .vff .field-multiplepicturechoice ul.f-radios {
    max-width: 750px;
    min-width: auto;
    display: -ms-flexbox;
    display: flex;
    margin: 0 -8px 0 0;
    flex-flow: 0 1;
    -moz-box-align: stretch;
    align-items: stretch;
    flex-wrap: wrap;
  }
  
  .vff .field-multiplepicturechoice ul.f-radios li {
    position: relative;
    cursor: pointer;
    display: -ms-flexbox;
    display: flex;
    -moz-box-align: center;
    align-items: center;
    flex-direction: column;
    padding: 8px 8px 10px;
    margin-bottom: 8px;
    margin-right: 8px;
    -ms-flex: 0 0 calc(25% - 8px);
    flex: 0 0 calc(25% - 8px);
    font-size: 15px;
    line-height: 1.38;
  }
  
  .vff .field-multiplepicturechoice ul.f-radios li span.f-image {
    display: flex;
    display: -ms-flexbox;
    -moz-box-align: center;
    align-items: center;
    -moz-box-pack: center;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    height: 140px;
    margin-bottom: 8px;
  }
  
  .vff .field-multiplepicturechoice ul.f-radios li span.f-image img {
    margin-bottom: 0;
    max-height: 100%;
    max-width: 100%;
  }
  
  /* 
    field matrix
  */
  
  .vff .f-matrix-wrap {
    overflow-x: auto;
  }
  
  .vff .f-matrix-table {
    width: 100%;
    font-size: .5em;
    line-height: 1.36;
    font-weight: normal;
    margin-bottom: 0;
  }
  
  .vff .f-table-string {
    font-size: .84em;
  }
  
  .vff .f-table-cell {
    padding: .52em;
    min-width: 8.6em;
    text-align: left;
  }
  
  .vff .f-table-cell.f-row-cell {
    min-width: 9.2em;
  }
   
  .vff .f-row-cell {
    padding-left: 1em;
  }
  
  .vff .f-column-cell {
    font-weight: 900;
    text-align: center;
  }
  
  .vff .f-matrix-cell {
    text-align: center;
  }
  
  .vff .f-field-wrap, 
  .vff .f-matrix-field {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .vff .f-field-mask {
    position: relative;
    display: inline-block;
    cursor: pointer;
    width: 1.4em;
    height: 1.4em;
  }
  
  .vff .f-field-svg {
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #000;
    border: 1px solid currentColor;
    fill: transparent;
    width: 100%;
    height: 100%;
    transition: color 0.2s ease 0s;
  }
  
  .vff .f-radio-svg {
    border-radius: 100%;
  }
  
  .vff .f-radio-svg circle, 
  .vff .f-checkbox-svg rect {
    fill: inherit;
  }
  
  .vff .f-field-control:checked ~ .f-field-mask .f-field-svg {
    color: inherit;
  }
  
  .vff .f-field-control:hover ~ .f-field-mask .f-field-svg,
  .vff .f-field-control:checked ~ .f-field-mask .f-field-svg {
    fill: currentColor;
  }
  
  .vff .f-field-control:focus {
    outline: none;
  }
  
  .vff .f-field-control:focus-visible ~ .f-field-mask {
    outline: 1px dotted;
  }
  
  .vff .f-field-control:focus-visible ~ .f-checkbox-mask {
    outline-offset: 2px;
  }
  
  /*
    footer
  */
  
  .vff-footer {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    font-weight: 300;
    line-height: 1.2;
  }
  
  .vff-footer .footer-inner-wrap {
    text-align: right;
    padding: 11px 20px 12px;
  }
  
  .vff-footer .f-progress,
  .vff-footer .f-nav,
  .vff-footer .f-timer {
    display: inline-block;
  }
  
  .vff-footer .f-timer {
    font-family: monospace;
    font-size: 17px;
    margin-left: .18em;
  }
  
  .vff-footer .f-prev,
  .vff-footer .f-next,
  .vff-footer .f-progress {
    margin: 0 .18em;
    padding: .2em .2em;
  }
  
  .vff-footer .f-progress {
    top: -1px;
    position: relative;
  }
  
  .vff-footer a.f-disabled {
    opacity: .4;
    cursor: default;
    pointer-events: none;
  }
  
  .vff-footer .f-prev svg,
  .vff-footer .f-next svg {
    display: inline-block;
    transition: fill 0.2s ease 0s;
    width: 23px;
    height: 13px;
  }
  
  .vff-footer .f-nav-text {
    display: none;
  }
  
  /*progress-bar*/
  .vff-footer .f-progress-bar {
    height: 1px;
    position: static;
    display: inline-block;
    width: 64px;
    vertical-align: middle;
    margin: 0 6px 0 0;
  }
  
  .vff-footer .f-progress-bar-inner {
    height: 1px;
    transition: width .3s ease;
  }
  
  /*section breaks*/
  .vff .f-section-wrap {
    margin-bottom: 30px;
  }
  
  .vff .f-section-wrap > div,
  .vff .f-submit {
    margin-bottom: 20px;
  }
  
  .vff .field-sectionbreak,
  .vff .field-submit {
    max-width: 920px;
  }
  
  /*
    not-standalone option
  */
  
  .vff.vff-not-standalone {
    height: 100%;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 50px;
    padding-bottom: 100px;
  }
  
  .vff.vff-not-standalone .f-container {
    margin: 0;
  }
  
  .vff.vff-not-standalone .vff-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  
  /*
    animations
  */
  
  .vff-animate {
    -webkit-animation-duration: .4s;
    animation-duration: .4s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
  }
  
  /* prevent Android Chrome flickering */
  .vff-animate * {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  
  .vff .f-fade-in {
    animation-name: ffadeIn;
  }
  
  @keyframes ffadeIn {
    0% {
      opacity: 0;
    }
  
    100% {
      opacity: 1;
    } 
  }
  
  .vff .f-fade-in-down {
    animation-name: ffadeInDown;
  }
  
  @keyframes ffadeInDown {
    0% {
      opacity: 0;
      transform: translate3d(0, -12px, 0);
    }
  
    100% {
      opacity: 1;
      transform: none;
    }
  }
  
  .vff .f-fade-in-up {
    animation-name: ffadeInUp;
  }
  
  @keyframes ffadeInUp {
    0% {
      opacity: 0;
      transform: translate3d(0, 12px, 0);
    }
  
    100% {
      opacity: 1;
      transform: none;
    }
  }
  
  /*
    media-start
  */
  
  @media only screen and (min-width: 1440px) {
    .vff .field-sectionbreak,
    .vff .field-submit {
      max-width: 960px;
    }
  
    .vff h2,
    .vff .fh2 {
      padding-right: 2.2em;
    }
  }
  
  @media only screen and (min-width: 1920px) {
    .vff .field-sectionbreak,
    .vff .field-submit {
      max-width: 1160px;
    }
  }
  
  @media screen and (max-width: 1366px) {
    header.vff-header,
    .vff {
      padding-right: 5%;
      padding-left: 5%;
    }
  }
  
  @media only screen and (max-width: 1023px) {
    header.vff-header {
      padding-left: 0;
      padding-right: 0;
    }
  
    .vff {
      padding-left: 0;
      padding-right: 0;
    }
  }
  
  @media only screen and (max-width: 767px) {
    .vff h2,
    .vff .fh2 {
      font-size: 2.2em;
      padding-right: 0;
    }
  
    .vff input[type="text"],
    .vff input[type="number"],
    .vff input[type="tel"],
    .vff input[type="email"],
    .vff input[type="url"],
    .vff input[type="password"],
    .vff input[type="date"],
    .vff input[type="file"],
    .vff textarea {
      font-size: .78em;
    }
  
    .vff input[type="file"] {
      font-size: .4em;
    }
    
    .vff .fh2 span.f-sub, 
    .vff .fh2 span.f-tagline {
      font-size: .58em;
    }
    
    .vff .f-container,
    header.vff-header .f-container {
      padding: 0 5.5%;
    }
  
    .vff span.f-empty {
      min-width: 2.2em;
      padding-right: 20px;
    }
    
    .vff p.f-description {
      padding-right: 0;
    }
  
    .vff .field-multiplepicturechoice ul.f-radios li {
      font-size: 14px;
    }
  
    .vff .field-multiplepicturechoice ul.f-radios li span.f-image {
      height: 90px;
    }
  }
  
  @media screen and (max-width:479px) {
    .vff {
      margin-top: 10vh;
      min-height: 180px;
    }
  
    header.vff-header + .vff {
      margin-top: 8vh;
    }
  
    header.vff-header + .vff.vff-not-standalone {
      margin-top: 0;
    }
    
    .vff input[type="text"],
    .vff input[type="number"],
    .vff input[type="tel"],
    .vff input[type="email"],
    .vff input[type="url"],
    .vff input[type="password"],
    .vff input[type="date"],
    .vff input[type="file"],
    .vff textarea {
      line-height: 1.4;
      padding: .16em .2em;
    }
  
    .vff input[type="file"] {
      font-size: .6em;
    }
  
    .vff select {
      font-size: .72em;
      padding-top: .2em;
      padding-bottom: .2em;
    }
  
    .vff button {
      min-height: 42px;
    }
  
    .vff .f-arrow-down {
      width: 12px;
    }
  
    .vff .fh2 span.f-sub, 
    .vff .fh2 span.f-tagline {
      font-size: .64em;
    }
  
    .vff span.f-tagline {
      line-height: 1.5;
    }
  
    .vff span.f-text {
      margin-right: 0;
    }
  
    .vff h2,
    .vff .fh2 {
      font-size: 1.56em;
    }
  
    .vff ul.f-radios li,
    .vff ul.f-radios li input[type="text"] {
      font-size: .62em;
    }
  
    .vff .field-sectionbreak p {
      font-size: 1em;
    }
  
    .vff-footer .f-timer {
      font-size: 16px;
    }
  
    .vff .field-multiplepicturechoice ul.f-radios {
      max-width: 320px;
    }
  
    .vff .field-multiplepicturechoice ul.f-radios li {
      -ms-flex: 0 0 calc(50% - 8px);
      flex: 0 0 calc(50% - 8px);
    }
  }
  
  @media screen and (max-height:400px) {
    .vff {
      margin-top: 12vh;
      min-height: 180px;
    }
  
    header.vff-header {
      position: static;
    }
  
    .vff-footer {
      font-size: 15px;
    }
  
    .vff-footer .footer-inner-wrap {
      padding-top: 8px;
      padding-bottom: 8px;
    }
  
    .vff .f-radios-desc,
    .vff ul.f-radios li,
    .vff ul.f-radios li input[type="text"] {
      font-size: 14px;
    }
  
    .vff h2,
    .vff .fh2 {
      font-size: 1.56em;
    }
  
    .vff .fh2 span.f-sub, 
    .vff .fh2 span.f-tagline {
      font-size: .6em;
    }
  
    .vff .field-multiplepicturechoice ul.f-radios li span.f-image {
      height: 90px;
    }
  }
</style>
