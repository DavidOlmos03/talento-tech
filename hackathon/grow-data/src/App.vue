<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { storeToRefs } from 'pinia';

const auth = useAuthStore()
// Esta es una forma de aplicar destuction en los store manteniendo la reactividad
// const { isAuth } = storeToRefs(auth)  
</script>

<template>
  <!-- Elemento de vuetify, todos inician con v -->
  <v-card
    elevation="10"
    max-width="1200"
    class="mx-auto"
  >  
    <v-layout>
      <v-app-bar
        color="blue-darken-1"
      >
      <template v-slot:prepend>
        <v-btn
        :to="{name: 'home'}"
        >
          Data and Web - Talento Tech
        </v-btn>          
        
      </template>
      <template v-slot:append>
        <div v-if="auth.isAuth">
          <v-btn :to="{name:'admin-propiedades'}"> Admin </v-btn>
          <v-btn @click="auth.logOut"> Cerrar Sesión </v-btn>
        </div>
        <div v-else>
          <v-btn :to="{name:'home'}"> Inicio </v-btn>
          <v-btn :to="{name:'login'}"> Iniciar Sesión </v-btn>
        </div>
        
      </template>
      </v-app-bar>
      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>

</template>

<style scoped>

</style>
