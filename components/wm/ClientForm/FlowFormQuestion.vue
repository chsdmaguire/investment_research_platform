<template>
  <div class="vff-animate q-form" v-bind:class="mainClasses" ref="qanimate">
    <div class="q-inner">
      <div v-bind:class="{'f-section-wrap': question.type === QuestionType.SectionBreak}">
        <div v-bind:class="{'fh2': question.type !== QuestionType.SectionBreak}">
          <span class="f-tagline" v-if="question.tagline">{{ question.tagline }}</span>

          <template v-if="question.title">
            <span class="fh2" v-if="question.type === QuestionType.SectionBreak">{{ question.title }}</span>
            <span class="f-text" v-else>
              {{ question.title }}&nbsp;
              <!-- Required questions are marked by an asterisk (*) -->
              <span class="f-required" v-if="question.required" v-bind:aria-label="language.ariaRequired" role="note"><span aria-hidden="true">*</span></span>

              <span v-if="question.inline" class="f-answer">
                <component
                  ref="questionComponent"
                  v-bind:is="question.type"
                  v-bind:question="question"
                  v-bind:language="language"
                  v-model="dataValue"
                  v-bind:active="active"
                  v-bind:disabled="disabled"
                  v-on:next="onEnter"
                />
              </span>
            </span>
          </template>

          <span class="f-sub" v-if="showHelperText">
            <span v-if="question.subtitle">{{ question.subtitle }}</span>

            <span class="f-help" v-if="question.type === QuestionType.LongText && !isMobile" v-html="question.helpText || language.formatString(language.longTextHelpText)"></span>

            <span class="f-help" v-if="question.type === QuestionType.MultipleChoice && question.multiple">{{ question.helpText || language.multipleChoiceHelpText }}</span>
            <span class="f-help" v-else-if="question.type === QuestionType.MultipleChoice">{{ question.helpText || language.multipleChoiceHelpTextSingle }}</span>
          </span>

          <div v-if="!question.inline" class="f-answer f-full-width">
            <component
              ref="questionComponent"
              v-bind:is="question.type"
              v-bind:question="question"
              v-bind:language="language"
              v-model="dataValue"
              v-bind:active="active"
              v-bind:disabled="disabled"
              v-on:next="onEnter"
            />
          </div>
        </div>
        <p v-if="question.description || question.descriptionLink.length !== 0" class="f-description">
          <span v-if="question.description">{{ question.description }}</span>
          <a
            v-for="(link, index) in question.descriptionLink" 
            class="f-link" 
            v-bind:key="'m' + index"
            v-bind:href="link.url"
            v-bind:target="link.target"
          >{{ link.text || link.url }}</a>
        </p>

      </div>
      <div class="vff-animate f-fade-in f-enter" v-if="showOkButton()">
        <button 
          class="o-btn-action"
          type="button"
          ref="button"
          href="#"
          v-on:click.prevent="onEnter"
          v-bind:aria-label="language.ariaOk"
        >
          <span v-if="question.type === QuestionType.SectionBreak">{{ language.continue }}</span>
          <span v-else-if="showSkip()">{{ language.skip }}</span>
          <span v-else>{{ language.ok }}</span>
        </button>

        <a 
          class="f-enter-desc"
          href="#"
          v-if="question.type !== QuestionType.LongText || !isMobile"
          v-on:click.prevent="onEnter"
          v-html="language.formatString(language.pressEnter)">
        </a>
      </div>

      <div v-if="showInvalid()" class="f-invalid" role="alert" aria-live="assertive">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
  import LanguageModel from './models/LanguageModel'
  import QuestionModel, { QuestionType, LinkOption } from './models/QuestionModel'
  import FlowFormDropdownType from './QuestionTypes/DropdownType.vue'
  import FlowFormEmailType from './QuestionTypes/EmailType.vue'
  import FlowFormLongTextType from './QuestionTypes/LongTextType.vue'
  import FlowFormMultipleChoiceType from './QuestionTypes/MultipleChoiceType.vue'
  import FlowFormMultiplePictureChoiceType from './QuestionTypes/MultiplePictureChoiceType.vue'
  import FlowFormNumberType from './QuestionTypes/NumberType.vue'
  import FlowFormPasswordType from './QuestionTypes/PasswordType.vue'
  import FlowFormPhoneType from './QuestionTypes/PhoneType.vue'
  import FlowFormSectionBreakType from './QuestionTypes/SectionBreakType.vue'
  import FlowFormTextType from './QuestionTypes/TextType.vue'
  import FlowFormUrlType from './QuestionTypes/UrlType.vue'
  import FlowFormDateType from './QuestionTypes/DateType.vue'
  import FlowFormFileType from './QuestionTypes/FileType.vue'
  import FlowFormMatrixType from './QuestionTypes/MatrixType.vue'
//   import { IsMobile } from './mixins/IsMobile'
  
  export default {
    name: 'FlowFormQuestion',
    components: {
      FlowFormDateType,
      FlowFormDropdownType,
      FlowFormEmailType,
      FlowFormLongTextType,
      FlowFormMultipleChoiceType,
      FlowFormMultiplePictureChoiceType,
      FlowFormNumberType,
      FlowFormPasswordType,
      FlowFormPhoneType,
      FlowFormSectionBreakType,
      FlowFormTextType,
      FlowFormFileType,
      FlowFormUrlType,
      FlowFormMatrixType
    },
    props: {
      question: QuestionModel,
      language: LanguageModel,
      value: [String, Array, Boolean, Number, Object],
      active: {
        type: Boolean,
        default: false
      },
      reverse: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      autofocus: {
        type: Boolean,
        default: true
      }
    },
    // mixins: [
    //   IsMobile
    // ],
    data() {
      return {
        QuestionType: QuestionType,
        dataValue: null,
        debounced: false
      }
    },
    mounted() {
      this.autofocus && this.focusField()
      this.dataValue = this.question.answer
      this.$refs.qanimate.addEventListener('animationend', this.onAnimationEnd)
    },
    beforeUnmount() {
      this.$refs.qanimate.removeEventListener('animationend', this.onAnimationEnd)
    },
    methods: {
      /**
       * Autofocus the input box of the current question
       */
      focusField() {
        const el = this.$refs.questionComponent
        
        el && el.focus()
      },
      onAnimationEnd() {
        this.autofocus && this.focusField()
      },
      shouldFocus() {
        const q = this.$refs.questionComponent
        return q && q.canReceiveFocus && !q.focused
      },
      returnFocus() {
        const q = this.$refs.questionComponent
        if (this.shouldFocus()) {
          this.focusField()
        }
      },
      /**
       * Emits "answer" event and calls "onEnter" method on Enter press
       */ 
      onEnter($event) {
        this.checkAnswer(this.emitAnswer)
      },
      onTab($event) {
        this.checkAnswer(this.emitAnswerTab)
      },
      checkAnswer(fn) {
        const q = this.$refs.questionComponent
        if (q.isValid() && this.question.isMultipleChoiceType() && this.question.nextStepOnAnswer &&  !this.question.multiple) {
          this.$emit('disable', true)
          this.debounce(() => {
            fn(q)
            this.$emit('disable', false)
          }, 350)
        } else {
          fn(q)
        }
      },
      emitAnswer(q) {
        if (q) {
          if (!q.focused) {
            this.$emit('answer', q)
          }
          q.onEnter()
        }
      },
      emitAnswerTab(q) {
        if (q && this.question.type !== QuestionType.Date) {
          this.returnFocus()
          this.$emit('answer', q)
          
          q.onEnter()
        }
      },
      debounce(fn, delay) {
        let debounceTimer
        this.debounced = true
      
        return (() => {
          clearTimeout(debounceTimer)
          debounceTimer = setTimeout(fn, delay)
        })()
      },
      
      /**
       * Check if the "OK" button should be shown.
       */
      showOkButton() {
        const q = this.$refs.questionComponent
        if (this.question.type === QuestionType.SectionBreak) {
          return this.active
        }
        if (!this.question.required) {
          return true
        }
        if (this.question.allowOther && this.question.other) {
          return true
        }
        if (this.question.isMultipleChoiceType() && !this.question.multiple && this.question.nextStepOnAnswer) {
          return false
        }
      
        // If there is no question referenced, or dataValue is still set to its default (null).
        // This allows a ChoiceOption value of false, but will not allow you to use null as a value.
        if (!q || this.dataValue === null) {
          return false
        }
        return q.hasValue && q.isValid()
      },
      showSkip() {
        const q = this.$refs.questionComponent
        // We might not have a reference to the question component at first
        // but we know that if we don't, it's definitely empty
        return !this.question.required && (!q || !q.hasValue)
      },
      /**
       * Determins if the invalid message should be shown.
       */
      showInvalid() {
        const q = this.$refs.questionComponent
        if (!q || this.dataValue === null) {
          return false
        }
        return q.showInvalid()
      }
    },
    computed: {
        isMobile() {
        if(this.$vuetify.breakpoint.name == 'xs' || this.$vuetify.breakpoint.name == 'sm') {
          return true
        } else {
          return false
        }
      },
      mainClasses: {
        cache: false,
        get() {
          const classes = {
            'q-is-active': this.active,
            'q-is-inactive': !this.active,
            'f-fade-in-down': this.reverse,
            'f-fade-in-up': !this.reverse,
            'f-focused': this.$refs.questionComponent && this.$refs.questionComponent.focused,
            'f-has-value': this.$refs.questionComponent && this.$refs.questionComponent.hasValue
          }
          classes['field-' + this.question.type.toLowerCase().substring(8, this.question.type.length - 4)] = true
          return classes
        }
      },
      showHelperText() {
        if (this.question.subtitle) {
          return true
        }
        if (this.question.type === QuestionType.LongText || this.question.type === QuestionType.MultipleChoice) {
          return this.question.helpTextShow
        }
        return false
      },
      errorMessage() {
        const q = this.$refs.questionComponent
        if (q && q.errorMessage) {
          return q.errorMessage
        }
        return this.language.invalidPrompt
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