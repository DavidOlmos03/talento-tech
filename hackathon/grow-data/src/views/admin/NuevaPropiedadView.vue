
<script setup>
    import { useForm, useField } from 'vee-validate';
    import { useFirestore } from 'vuefire';
    import { useRouter } from 'vue-router';
    import {validationSchema, imageSchema} from '@/validation/propiedadSchema'  // El arroba esta definido para src en vite.config.js
    import { collection, addDoc } from "firebase/firestore";
    import useImage from '@/composables/useImage'
    import useLocationMap  from '@/composables/useLocationMap'
    import "leaflet/dist/leaflet.css";
    import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

    

    const {zoom, center, pin} = useLocationMap()
    // Va a nuestras variables de entorno para poder obtener las referencias de nuestro proyecto en cloud fire store
    const db = useFirestore()

    const {uploadImage,image,url} = useImage()
    
    const router = useRouter()
    // Aqui se dejan en uno solo validationSchema e imageSchema
    const { handleSubmit} = useForm({
        validationSchema : {
            ...validationSchema,
            ...imageSchema
        }
    })
    // Campos para el formulario de Nueva Propiedad
    const titulo = useField('titulo')
    const imagen = useField('imagen')
    const precio = useField('precio')
    const habitaciones = useField('habitaciones')
    const wc = useField('wc')
    const estacionamiento = useField('estacionamiento')
    const descripcion = useField('descripcion')
    const alberca = useField('alberca',null,{
        initialValue:false
    })


    const submit = handleSubmit(async(values)=>{
        // console.log(values)
        // return
        // Con esto no se esta enviando la imagen a la base de datos
        const {imagen, ...propiedad} = values
        // Add a new document with a generated id (https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es-419).
        const docRef = await addDoc(collection(db, "propiedades"), {
            ...propiedad,
            imagen: url.value,
            ubicacion: center.value 
        });
        if (docRef.id) {
            // console.log('redirigiendo...')
            router.push({name:'admin-propiedades'})
        }
        // console.log("Document written with ID: ", docRef.id);
    })

    const items = [1,2,3,4,5]
</script>
<template>
    <div>
    <h2 class="text-center text-h3 my-5 font-weight-bold">Nueva Propiedad</h2>
    <v-card max-width="800"  class="mx-auto">

        <v-card-title
            class = "text-h4 font-weight-bold pb-0"
            tag = "h3"

        >
        Nueva Propiedad
        </v-card-title>
        <v-card-subtitle
            class="text-h5"
        >
            Crea una nueva propiedad llenando el siguiente formulario
        </v-card-subtitle>
        <v-form class="mt-10 px-5">
            <v-text-field 
                class="mb-5"
                bg-color="blue-grey-lighten-5"
                label="Titulo propiedad"
                v-model="titulo.value.value"
                :error-messages="titulo.errorMessage.value"
            />
            <v-file-input 
                class="mb-5"
                bg-color="blue-grey-lighten-5"
                label="Fotografia"
                prepend-icon="mdi-camera"
                accept="image/jpeg"
                v-model="imagen.value.value"
                :error-messages="imagen.errorMessage.value"
                @change="uploadImage"
            />
            <div v-if="image" class="my-5">
                <p class="font-weight-bold">Imagen Propiedad:</p>

                <v-row justify="center" class="my-3">
                    <img :src="image" alt="" class="w-50 mx-auto">
                </v-row>
                
            </div>
            <v-text-field 
                class="mb-5"
                bg-color="blue-grey-lighten-5"
                label="Precio"
                v-model="precio.value.value"
                :error-messages="precio.errorMessage.value"
            />
            <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select
                    label="Habitaciones"
                    class="mb-5"
                    bg-color="blue-grey-lighten-5"
                    :items="items"
                    v-model="habitaciones.value.value"
                    :error-messages="habitaciones.errorMessage.value"
                    />
                </v-col>
            
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select
                    label="WC"
                    class="mb-5"
                    bg-color="blue-grey-lighten-5"
                    :items="items"
                    v-model="wc.value.value"
                    :error-messages="wc.errorMessage.value"
                    />
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select
                    label="Lugares de Estacionamiento"
                    class="mb-5"
                    bg-color="blue-grey-lighten-5"
                    :items="items"
                    v-model="estacionamiento.value.value"
                    :error-messages="estacionamiento.errorMessage.value"
                    />
                </v-col>
                <v-col cols="12"
                md="6"
                >
                    <v-textarea 
                    class="mb-5" 
                    label="Descripción"
                    v-model="descripcion.value.value"
                    :error-messages="descripcion.errorMessage.value"
                    ></v-textarea>
                </v-col>
                <v-col cols="12"
                md="6"
                >
                <v-checkbox 
                label="Alberca"
                v-model="alberca.value.value"
                :error-messages="alberca.errorMessage.value"
                />
            </v-col>
        </v-row>
        <h2 class="font-weight-bold text-center my-5">Ubicacion</h2>
        <div style="height:600px;" class="pb-3">
            <LMap 
            v-model:zoom="zoom" 
            :center="center" 
            :use-global-leaflet="false">
            <LMarker 
                :lat-lng="center"
                draggable
                @moveend="pin"
            />

                <LTileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                ></LTileLayer>
            </LMap>
        </div>
        <v-btn
            class="mb-5"
            color="pink-accent-3"
            block
            @click="submit"
        >Agregar Propiedad</v-btn>
        </v-form>
        </v-card>
    </div> 
</template>