<template>

    <div class="flex flex-col gap-2">

        <label :for="id" v-if="label" class="text-label">{{ label }}</label>

        <input 
            :type="inputType"  
            :placeholder="placeholder" 
            :id="id"
            class="px-[8px] py-[5px] focus:outline-none border-[1px] border-orange-400 rounded-[8px]"
            autocomplete="off"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            required
        >

    </div>

</template>


<script setup>

    defineProps({

        id: {
            type: String,
            required: true
        },

        inputType: {
            type: String,
            default: 'text',
            required: true
        },

        placeholder: {
            type: String,
            required: true
        },

        label:{
            type: String,
        },

        modelValue: {
            type: String,
        }

    });

</script>