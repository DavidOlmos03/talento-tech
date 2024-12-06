import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/propiedades/:id',
      name:'propiedad',
      component: ()=>import('../views/PropiedadView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import('../views/LoginView.vue')
    },
    {
      path:'/admin',
      name:'admin',
      component: ()=>import('../views/admin/AdminLayout.vue'),
      meta:{requiresAuth:true},   //route meta field para agregar información extra a una ruta
      children:[
        {
          // path:'/admin/propiedad' es una opción pero al ser hija de admin se puede quitar /admin/
          path:'propiedades',
          name:'admin-propiedades',
          component: ()=>import('../views/admin/AdminView.vue'),
        },
        {
          path:'nueva',
          name:'nueva-propiedad',
          component: ()=>import('../views/admin/NuevaPropiedadView.vue')
        },
        {
          path:'editar/:id',
          name:'editar-propiedad',
          component: ()=>import('../views/admin/EditarPropiedadView.vue')
        },
        {
          path:'seeder',
          name:'seeder-data',
          component: ()=>import('../views/admin/SeederDataView.vue')

        }
      ]
    }
  ]
})

// Guard de navegación
router.beforeEach(async(to,from,next)=>{

  // Verificamos que al menos uno cumpla la condición (para esto se utiliza el some)
  const requiresAuth = to.matched.some((url)=>url.meta.requiresAuth)

  // Aqui se comprueba si se requiere la autenticación
  if(requiresAuth){
  // Comprobar que el usuario este autenticado
   try{
    // En caso de que se ejecute el resolve sigue con next
      await authenticateUser() 
      next()
      // En caso de que se ejecute el reject ejecuta directamente el catch
    }catch(error) {
      console.log(error)
      next({name:'login'})
    }
    
  }else{
    // No esta protegido, mostramos la vista
    console.log(requiresAuth)

    next()
  }
  
  
})

function authenticateUser(){
    const auth = useFirebaseAuth()
    // Estudiar el teme de los promise !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // resolve en caso de que la conección o solicitud sea exitosa, y reject en caso contrario
    return new Promise((resolve, reject)=>{
      // el unsubscribe me permite escuchar a la funcion onAuthStateChanged una unica vez, y que asi no se ejecute varias veces, pues EN ESTE
      // caso, solo necesito saber si el usuario esta o no registrado
      const unsubscribe = onAuthStateChanged(auth,user=>{
        unsubscribe()
        if(user){
          resolve()
        }else{
          reject()
        }
      })
    })
  }

export default router
