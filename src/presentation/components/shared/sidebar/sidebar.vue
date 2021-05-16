<template>
    <div>
        <vs-row class="h-screen w-40">
            <vs-col w="12" class="">
                <vs-sidebar
                    v-model="activeLink"
                    absolute
                    open
                >
                    <vs-sidebar-item id="home">
                        <template #icon>
                            <i class="bx bx-home" />
                        </template>
                        {{ $t('components.sidebar.menu.home') }}
                    </vs-sidebar-item>
                    <vs-sidebar-item id="notification">
                        <template #icon>
                            <i class="bx bxs-notification" />
                        </template>
                        {{ $t('components.sidebar.menu.notifications') }}
                    </vs-sidebar-item>
                    <vs-sidebar-item id="profile">
                        <template #icon>
                            <i class="bx bxs-user-pin" />
                        </template>
                        {{ $t('components.sidebar.menu.profile') }}
                    </vs-sidebar-item>
                    <template #footer>
                        <vs-row justify="space-between">
                            <vs-button
                                block
                                size="large"
                            >
                                <span>
                                    <i class="bx bx-message-square-add" />
                                    {{ $t('components.sidebar.buttons.create_vueet') }}
                                </span>
                            </vs-button>
                        </vs-row>
                    </template>
                </vs-sidebar>
            </vs-col>
        </vs-row>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@nuxtjs/composition-api"

export default defineComponent({
    name: "VSidebar",
    setup () {

        const activeLink = ref<string>("home")

        return {
            activeLink
        }
    }
})

</script>

<style scoped>

.vs-sidebar-content.absolute {
  height: 100vh;
}

.vs-sidebar-content {
  box-shadow: none;
  border: none;
}

.vs-sidebar__item::after {
  display: none;
}

</style>
