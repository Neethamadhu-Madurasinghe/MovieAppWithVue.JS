<template>
    <div class="input-section" v-if="isExpanded">
        <div class="control-body">
            <label for="filter"><slot>No Controller Name</slot></label>
                <br>
            <span v-html="controller">
            </span>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
    props: {
        isExpanded: {
            type: Boolean,
            default: true
        },

        controller: {
            type: String,
            required: true
        },

        functions: {
            type: Object,
            required: true
        }
    }
}) 
</script>