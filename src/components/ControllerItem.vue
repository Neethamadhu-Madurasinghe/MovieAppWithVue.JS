<template>
    <div class="control-selection-box">

        <div class="control-title">
            <span><slot name="title">No Title</slot></span>
            <i class="fa-solid fa-angle-right expand-shrink-btn" v-if="!isExpanded" @click="isExpanded = !isExpanded"></i>
            <i class="fa-solid fa-angle-down expand-shrink-btn" v-else @click="isExpanded = !isExpanded"></i>
        </div>
        <div v-show="isExpanded">
            <slot>No Controllers</slot>
        </div>
                    
    </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
    data() {
        return {
            isExpanded: false
        }
    }
}) 
</script>
