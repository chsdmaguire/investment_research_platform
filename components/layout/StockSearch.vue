<template>
  <div>
      <v-autocomplete
      v-model="model"
      :items="items"
      :search-input.sync="search"
      auto-select-first
      dense
      allow-overflow
      cache-items
      rounded
      hide-details
      no-data-text=""
      item-text="name"
      item-value="ticker"
      label="Search for a stock..."
      solo
    >
      <template v-slot:item="{ item }">
        <v-list-item>
        <v-list-item-avatar
          color="indigo"
          class="white--text text-uppercase"
        >
          {{ item.ticker }}
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.name" class="text-capitalize"></v-list-item-title>
          <v-list-item-subtitle v-text="item.industry"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-finance</v-icon>
        </v-list-item-action>
        </v-list-item>  
        <v-divider></v-divider>
      </template>
    </v-autocomplete>

  </div>
</template>


<script>
  export default {
    data: () => ({
      items: [],
      model: null,
    search: null,
    tab: null,
    }),

    watch: {
      model (val) {
        if (val != null) this.tab = this.$router.push(`companies/${this.model}`)
        else this.tab = null
      },
      search (val) {
        // Items have already been loaded
        if (this.items.length > 0) return
        const token = process.env.ALL_API_TOKEN
        // Lazily load input items
        fetch(`/api/${token}/basic`)
          .then(res => res.clone().json())
          .then(res => {
            this.items = res
          })
          .catch(err => {
            console.log(err)
          })
 
      },
    },
  }
</script>
<style>

</style>