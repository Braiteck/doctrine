<template>
    <!-- Меню-->
    <div class="menu accordion">
        <!-- Меню - Ссылка -->
        <div class="item">
            <button class="sub_link" v-accordion>
                <!-- Меню - Ссылка - Иконка -->
                <svg class="icon ic_courses_lessons"><use xlink:href="/images/menu.svg#ic_courses_lessons"></use></svg>

                <!-- Меню - Ссылка - Текст -->
                <span>{{ $t('message.author_menu_courses_lessons') }}</span>
            </button>

            <!-- Меню - Подменю -->
            <div class="sub_menu data">
                <!-- Меню - Подменю - Ссылка -->
                <div><router-link :to="`/${$store.state.user.data.route}/courses`">
                    <span>{{ $t('message.author_menu_courses') }}</span>
                </router-link></div>

                <!-- Меню - Подменю - Ссылка -->
                <div><router-link :to="`/${$store.state.user.data.route}/lessons`">
                    <span>{{ $t('message.author_menu_lessons') }}</span>
                </router-link></div>
            </div>
        </div>

        <!-- Меню - Ссылка -->
        <div class="item">
            <button class="sub_link" v-accordion>
                <!-- Меню - Ссылка - Иконка -->
                <svg class="icon ic_profile"><use xlink:href="/images/menu.svg#ic_profile"></use></svg>

                <!-- Меню - Ссылка - Текст -->
                <span>{{ $t('message.author_menu_profile') }}</span>
            </button>

            <!-- Меню - Подменю -->
            <div class="sub_menu data">
                <!-- Меню - Подменю - Ссылка -->
                <div><router-link :to="`/${$store.state.user.data.route}/order_history`">
                    <span>{{ $t('message.author_menu_order_history') }}</span>
                </router-link></div>
            </div>
        </div>

        <!-- Меню - Ссылка -->
        <div><router-link :to="`/${$store.state.user.data.route}/users`">
            <!-- Меню - Ссылка - Иконка -->
            <svg class="icon ic_users"><use xlink:href="/images/menu.svg#ic_users"></use></svg>

            <!-- Меню - Ссылка - Текст -->
            <span>{{ $t('message.author_menu_users') }}</span>
        </router-link></div>

        <!-- Меню - Ссылка -->
        <div><router-link :to="`/${$store.state.user.data.route}/tariffs`">
            <!-- Меню - Ссылка - Иконка -->
            <svg class="icon ic_tariffs"><use xlink:href="/images/menu.svg#ic_tariffs"></use></svg>

            <!-- Меню - Ссылка - Текст -->
            <span>{{ $t('message.author_menu_tariffs') }}</span>
        </router-link></div>

        <!-- Меню - Ссылка -->
        <div><router-link :to="`/${$store.state.user.data.route}/integrations`">
            <!-- Меню - Ссылка - Иконка -->
            <svg class="icon ic_integration"><use xlink:href="/images/menu.svg#ic_integration"></use></svg>

            <!-- Меню - Ссылка - Текст -->
            <span>{{ $t('message.author_menu_integration') }}</span>
        </router-link></div>
    </div>
</template>


<script>
// Import CSS
import '@/assets/css/component/sidebar/menu.css'

export default {
    name: 'AuthorMenu'
}
</script>