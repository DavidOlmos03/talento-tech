
<script setup>
    import usePropiedades from '@/composables/usePropiedades';
    import {propertyPrice} from '@/helpers'
    const {propiedadesCollection, deleteItem} = usePropiedades()

</script>
<template>
    <div>
        <h2 class="text-center text-h3 my-5 font-weight-bold">Admin Panel</h2>
    <v-btn
        color="blue"
        :to="{name:'nueva-propiedad'}"
    >
        Nueva propiedad
    </v-btn>
    <v-card class="mx-auto mt-10">
        <v-list>
        <v-list-item
            v-for="propiedad in propiedadesCollection" 
            :key="propiedad.id"
            border
        >
            <!--  :title="propiedad.titulo"
            :subtitle="propiedad.precio" -->
            <template v-slot:prepend>
                <v-list-item-media :start="true">
                    <img width="180" :src="propiedad.imagen" alt="Imagen" />
                </v-list-item-media>
            </template>
            
            <v-list-item-title>{{ propiedad.titulo }}</v-list-item-title>
            <v-list-item-subtitle>{{ propertyPrice(propiedad.precio) }}</v-list-item-subtitle>

            <template v-slot:append>
                    <v-btn 
                    color="info" 
                    class="mr-2"
                    :to="{name:'editar-propiedad', params: {id: propiedad.id}}"
                    >
                        Editar
                    </v-btn>
                    <v-btn 
                    color="red-darken-3"
                    @click="deleteItem(propiedad.id, propiedad.imagen)"
                    >
                        Eliminar
                    </v-btn>
                    <!-- <v-btn
                    @click="prueba()"
                    >
                        Prueba
                    </v-btn> -->
            </template>
        </v-list-item>
        </v-list>
    </v-card>

    </div>
    
</template>

