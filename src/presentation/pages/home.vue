<template>
    <div>
        <vs-row class="h-screen" align="center" justify="space-around" direction="column">
            <vs-col w="8" class="h-screen">
                <vs-row>
                    <vs-col w="3">
                        <v-sidebar />
                    </vs-col>
                </vs-row>
            </vs-col>
        </vs-row>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Sidebar from '~app/components/shared/sidebar/sidebar.vue'

export default defineComponent({
    components: {
        'v-sidebar': Sidebar
    },
    middleware: ['home'],
    name: "VHome",
    setup () {

        return {
        }
    }
})

</script>
