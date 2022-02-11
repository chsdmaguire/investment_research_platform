<template>
  <div>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
  </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-currency-btc',
          title: 'Crypto',
          to: '/crypto'
        },
        {
          icon: 'mdi-podium-silver',
          title: 'Economics',
          to: '/economic'
        },
        {
          icon: 'mdi-school-outline',
          title: 'Education',
          to: '/education'
        },
        {
          icon: 'mdi-information-outline',
          title: 'About Flibyrd',
          to: '/about'
        },
        {
          icon: 'mdi-finance',
          title: 'Wealth Planning',
          to: '/wealth'
        },
        {
          icon: 'mdi-form-select',
          title: 'Privacy Policy',
          to: '/privacy'
        },
        {
          icon: 'mdi-file-settings',
          title: 'Terms of Use',
          to: '/terms'
        },
        {
          icon: 'mdi-keyboard-settings-outline',
          title: 'Contact Us',
          to: '/contact'
        },
      ],
        }
    }
}
</script>

<style>

</style>