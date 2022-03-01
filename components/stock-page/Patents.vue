<template>
  <v-container fluid>
      <v-row align="center" justify="center"> 
          <h3>Company Patents</h3>
      </v-row>
      <v-row align="center" justify="center">
      <v-data-table
        :headers="headers"
        :items="items"
        hide-default-header
        class="elevation-1">
        <template v-slot:[`item.patent_number`]="{ item }">
            <a target="_blank" :href="item.url">
              {{ item.patent_number }}
            </a>
        </template> 
        <template v-slot:[`item.filing_date`]="{ item }">
        <span>{{  new Date(item.filing_date).getMonth() + '/'
           + (new Date(item.filing_date).getDate() + 1) + '/' + 
           new Date(item.filing_date).getFullYear() }}</span>
    </template>
     <template v-slot:[`item.publication_date`]="{ item }">
        <span>{{ (new Date(item.publication_date).getMonth() + 1) + '/' + new Date(item.publication_date).getDate() + '/'
           +   
           new Date(item.publication_date).getFullYear() }}</span>
    </template>
    <template v-slot:[`item.description`]="{ item }">
        <span>{{ item.description.toLowerCase() }}</span>
    </template>        
        </v-data-table>

      </v-row>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            headers: [
                {text: 'Patent Number', value: 'patent_number'}, 
                {text: 'Filing Date', value: 'filing_date'}, 
                {text: 'Status', value: 'filing_status'}, 
                {text: 'Type', value: 'patent_type'}, 
                {text: 'Description', value: 'description'}, 
                {text: 'Publication Date', value: 'publication_date'}, 
            ],
            items: [],
        }
    },
    methods: {
        async getPatents() {
            const ticker = this.$route.params.ticker.toUpperCase();
            const res = await this.$axios.get(`/stocks/patents/${ticker}`);
            this.items = res.data
        }
    },

    mounted() {
        this.getPatents();
    }
}
</script>

<style>

</style>