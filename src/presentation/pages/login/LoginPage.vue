<template>

    <main class="w-full h-screen bg-background flex items-center justify-center">

        <div class="w-[30%] bg-white flex flex-col gap-2 items-center p-[50px] shadow-xl">

            <h2 class="text-primary text-[30px] font-bold">Kuepa<span class="text-label">EduTech</span></h2>

            <h1 class="text-[22px] font-semibold">Inicio de sesion</h1>

            <form class="flex flex-col gap-5" @submit="handleSubmit">

                <CustomInput input-type="text" placeholder="Ingresa tu usuario" id="username" label="Nombre de usuario:"
                    v-model="username" />

                <CustomInput input-type="password" placeholder="Ingresa tu contraseña" id="password" label="Contraseña:"
                    v-model="password" />

                <button class="bg-primary text-white py-[5px] rounded-[8px]">Iniciar sesion</button>

            </form>

        </div>

    </main>

</template>


<script setup>

import CustomInput from '../../components/CustomInput.vue'
import { ref } from 'vue'
import { ModalMessage } from '../../../utils/modal-message'
import axios from 'axios';
import { envs } from '../../../envs';
import { useRouter } from 'vue-router'
import { userStore } from '../../../stores'

const router = useRouter();
const store = userStore()
const username = ref('');
const password = ref('');

//methods
async function handleSubmit(event) {
    event.preventDefault();

    try {
        const response = await axios.post(`${envs.HOST_URL}/auth/login`, {
            username: username.value,
            password: password.value
        })

        store.saveUser(response.data);

        await ModalMessage.success("Bienvenido", () => {
            router.push({ name: 'streaming' });
        })

    } catch (error) {

        if (error.response.status === 400) return ModalMessage.error(error.response.data.error);
        if (error.response.status === 500) return ModalMessage.error(error.response.data.error);

    }


}

</script>
