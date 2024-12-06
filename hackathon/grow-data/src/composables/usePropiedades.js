import { ref, computed } from 'vue'
import {collection, doc, deleteDoc} from 'firebase/firestore'
import {useFirestore, useCollection, useFirebaseStorage} from 'vuefire'
import { ref as storageRef, deleteObject} from 'firebase/storage'
import Swal from 'sweetalert2';
// import VueSweetalert2 from 'vue-sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';

export default function usePropiedades(){
    const alberca = ref(false)

    const storage = useFirebaseStorage()

    // Conecta y hace la peticion a firebase
    const db = useFirestore()
    // Se accede a la información que se encuentra en firebase, el propiedadesCollection es por convencion de firebase
    const propiedadesCollection = useCollection(collection(db, 'propiedades'))

    async function deleteItem(id, urlImage){
        await Swal.fire({
            title: "¿Estas seguro?",
            text: "No te sera posible revertir esta elección!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText:"Cancelar",
            confirmButtonText: "Si, eliminar propiedad"
          }).then((result) => {
            if (result.isConfirmed) {
                const docRef = doc(db, 'propiedades', id)
                const imageRef = storageRef(storage, urlImage)

                // De esta forma se ejecutan los awaits al mismo tiempo 
                Promise.all([
                    deleteDoc(docRef),
                    deleteObject(imageRef)
                ])
              Swal.fire({
                title: "Eliminado!",
                text: "La propiedad ha sido eliminada.",
                icon: "success"
              });
            }
          });

        
        // if(confirm('¿Deseas eliminar esta propiedad?')){
        //     const docRef = doc(db, 'propiedades', id)
        //     const imageRef = storageRef(storage, urlImage)

        //     // De esta forma se ejecutan los awaits al mismo tiempo 
        //     await Promise.all([
        //         deleteDoc(docRef),
        //         deleteObject(imageRef)
        //     ])
        //     // De esta forma se ejecutan los await por separado
        //     // await deleteDoc(docRef)
        //     // await deleteObject(imageRef)
        // }
    }

    const filteredItems = computed(()=>{
        return alberca.value ? 
        propiedadesCollection.value.filter(propiedad => propiedad.alberca) : 
        propiedadesCollection.value
    })

    // function prueba(){
    //     // Use sweetalert2
    //     Swal.fire('Hello Vue world!!!');
    // }
    return {
        alberca,
        propiedadesCollection,
        filteredItems,
        deleteItem
        // prueba
    }

}