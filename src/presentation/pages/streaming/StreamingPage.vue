<template>

    <div class="h-screen">
        <header class="bg-white w-full h-[10%] flex justify-between px-[30px] py-[10px] items-center">
            <h2 class="text-primary text-[30px] font-bold">Kuepa<span class="text-label">EduTech</span></h2>
            <button class="bg-orange-500 text-white p-[8px] rounded-[8px]" @click="logout">Cerrar sesion</button>
        </header>
        <main class="bg-background h-[90%] w-full flex items-center justify-center gap-5">

            <Video />
            <Chat />

        </main>
    </div>



</template>

<script setup>

import Video from './components/Video.vue';
import Chat from './components/Chat.vue';
import { userStore } from '../../../stores';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { ModalMessage } from '../../../utils/modal-message';

const store = userStore();
const router = useRouter();

const logout = () => {
    Swal.fire({
        title: "¿Desea cerrar sesion?",
        text: "¿Esta seguro que desea cerrar sesion?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, cerrar sesion",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            ModalMessage.success("Hasta la proxima!")
                .then(() => {
                    store.clearUser();
                    router.push({ name: 'login' });
                })
        }
    });

}

</script>