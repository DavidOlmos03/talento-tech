<script setup>
    import { ref } from 'vue';
    import {useForm, useField} from 'vee-validate'
    import { useAuthStore } from '../stores/auth'
    import { loginSchema as validationSchema } from '../validation/loginSchema'

    const defaulEmail = 'correo@correo.com'

    const {handleSubmit} = useForm({validationSchema})
    const auth = useAuthStore()
    // console.log(auth)
    const email = useField('email')
    const password = useField('password')

    const submit = handleSubmit((values)=>{
        auth.login(values)
    })

</script>

<template>

    <v-card
        flat
        max-width="600"
        class="mx-auto my-10"
    >
        <v-card-title
            class = "text-h4 font-weight-bold pb-0"
            tag = "h3"

        >
           Iniciar Sesión
        </v-card-title>
        <v-card-subtitle
            class="text-h5"
        >
            Inicia Sesión con tu cuenta
        </v-card-subtitle>
        <v-card flat>
            <div style="color: #F50057;">
                Usa la cuenta correo@correo.com y contraseña password para continuar.
            </div>
        </v-card>
        <v-alert
            v-if="auth.hasError"
            class="my-5"
            :title="auth.errorMsg"
            type="error"
        ></v-alert>
        <v-form class="mt-5">
            <v-text-field 
                type="email"
                label="Email"
                formControlName="email"
                bg-color="blue-grey-lighten-5"
                class="mb-3"
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
            />
            <v-text-field 
                type="password"
                label="Password"
                bg-color="blue-grey-lighten-5"
                class="mb-3"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
            />
            <v-btn
                block
                color="pink-accent-3"
                @click="submit"
            >
                Iniciar Sesión
            </v-btn>
        </v-form>
    </v-card>
</template>
