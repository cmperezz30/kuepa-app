<template>
    <section class="w-[20%] bg-white h-[70%] flex flex-col shadow-2xl">
        <div class="flex justify-center pt-[5px] font-semibold bg-primary text-white">
            <h3>Chat en vivo</h3>
        </div>
        <section class="h-full flex flex-col gap-2 overflow-y-scroll" id="chat">
            <div v-for="mensaje in messages" v-if="messages" class="text-[12px] p-[8px] border-b-[1px] border-gray-300"
                :key="mensaje.id">
                <div class="flex justify-between">
                    <span class="font-semibold">{{ mensaje.user.name }}</span>
                    <span>{{ mensaje.user.role[0] === 'STUDENT' ? 'Estudiante' : 'Moderador' }}</span>
                </div>
                <p>{{ mensaje.content }}</p>
            </div>
        </section>
        <form @submit="sendMessage">
            <CustomInput placeholder="Escribe un mensaje" v-model="message" id="message" input-type="text" />
        </form>

    </section>
</template>

<script setup>

import CustomInput from '../../../components/CustomInput.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { envs } from '../../../../envs';
import { userStore } from '../../../../stores'


const message = ref('');
const messages = ref([]);

const store = userStore();

const getMessages = async () => {
    const response = await axios.get(`${envs.HOST_URL}/messages/`);
    messages.value.push(...response.data)
}

const sendMessage = async (event) => {
    event.preventDefault();
    const chat = document.getElementById('chat')

    await axios.post(
        `${envs.HOST_URL}/messages/`,
        {
            content: message.value,
            userId: store.getUser.user.id,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.getUser.token}`
            }
        }
    );

    message.value = ''
    chat.scrollTop = chat.scrollHeight    
    
}

function connectToWebSockets() {

    const chat = document.getElementById('chat')
    const socket = new WebSocket(envs.WEBSOCKET_URL);
  
    socket.onmessage = (event) => {
        console.log(event.data)
        const {type, payload} = JSON.parse(event.data);

        if(type !== 'on-new-message-changed') return;

        
        messages.value.push(payload);
        chat.scrollTop = chat.scrollHeight
        
    }

    socket.onclose = (event) => {
        console.log('Connection closed');

        setTimeout(() => {
            console.log('Retrying to connect');
            connectToWebSockets()
        }, 1500)
    }

    socket.onopen = (event) => {
        console.log('Connected')
    }
}

onMounted(() => {
    connectToWebSockets()
    getMessages()
})

</script>