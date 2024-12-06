import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut }  from 'firebase/auth'
import {ref, computed, onMounted} from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'


export const useAuthStore = defineStore('auth', ()=>{
    
    
    const auth = useFirebaseAuth()
    const authUser = ref(null)
    const router = useRouter()
    const errorMsg = ref('')
    const errorCodes = {
        'auth/invalid-credential' : 'Credenciales invalidas'
    }

    onMounted(()=>{
        // Para recuperar la sesion iniciada en firebase y que no se pierda al recargar
        onAuthStateChanged(auth, (user)=>{
            if (user) {
                authUser.value = user
            }
        })
    })

    const login = ({email,password})=>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user
            authUser.value = user
            // Redirecionar el usuario al login al iniciar sesión
            router.push({name:'admin-propiedades'})
            
        })
        .catch((error)=>{
            errorMsg.value = errorCodes[error.code]
        })
    }
    // Para cerrar sesion
    const logOut = ()=>{
        Swal.fire({
            title: "¿Estas seguro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText:"Cancelar",
            confirmButtonText: "Si, salir!"
          }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth)
                .then(()=>{
                    authUser.value = null
                    // Redirecionar el usuario al login al cerrar sesión
                    router.push({name:'login'})
                })
                .watch(error=>{
                    console.log(error)
                })
            }
          });
    }

    const hasError = computed(()=>{
        setTimeout(()=>{
            errorMsg.value = '' 
        },3000)
        return errorMsg.value
    })

    // los computed suelen tambien ser utiles para renombrar nuestras variables
    const isAuth = computed(()=>{
        return authUser.value
    })
    return {
        login,
        logOut,
        hasError,
        errorMsg,
        isAuth
    }

})

