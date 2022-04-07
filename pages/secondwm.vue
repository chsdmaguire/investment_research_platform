<template>
  <v-container>
    <v-row>
      <YesOrNo :question="msg" v-on:childYes="hasChildren"/>
    </v-row>
    <v-row v-if="many">
      <div>
        <HowMany v-on:childBackwards="slideBack" 
        @childForwards="updateChildNumber" ref="numChildren"/>
      </div>
    </v-row>
    <v-row>
    <DataInput v-if="many2" />
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      many: false,
      msg: 'do you own a checkings account?',
      many2: false,
    }
  },
  methods: {
    hasChildren() {
      console.log('we have received child message');
      this.many = true;
    },
    slideBack() {
      this.many = false;
    },
    updateChildNumber() {
      console.log(this.$refs.numChildren.num)
    }
  }
}
</script>

<style>

</style>