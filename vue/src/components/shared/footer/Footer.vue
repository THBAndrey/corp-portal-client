<template>
    <div class="footer pos-rel" style="background: #fff; border: none; box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08)">
        <div class="row row-collapse">
            <div class="col">
                <router-link class="btn footer-btn text-small radius-none color-grey w-100" active-class="active" :to="'/news'">
                    <div class="icon">
                        <i class="mdi mdi-home mdi-24px"></i>
                    </div>
                </router-link>
            </div>
            <!-- <div class="col">
                <router-link class="btn footer-btn text-small radius-none color-grey w-100" active-class="active" :to="'/group'">
                    <div class="icon">
                        <i class="mdi mdi-account-group mdi-24px"></i>
                    </div>
                </router-link>
            </div> -->
            <div class="col" style="display: flex; justify-content: center; position: relative">
                <RoundButton @click.native="openManager = true" style="position: absolute; bottom: 15px" />
            </div>
            <!-- <div class="col">
                <router-link class="btn footer-btn text-small radius-none color-grey w-100" active-class="active" :to="'/timesheet'">
                    <div class="icon">
                        <i class="mdi mdi-poll mdi-24px"></i>
                    </div>
                </router-link>
            </div> -->
            <div class="col">
                <router-link class="btn footer-btn text-small radius-none color-grey w-100" active-class="active" :to="'/profile'">
                    <div class="icon">
                        <i class="mdi mdi-account mdi-24px"></i>
                    </div>
                </router-link>
            </div>
        </div>
        <DayTimeManager v-model="openManager" />
    </div>
</template>

<script>
import DayTimeManager from '../DayTimeManager';
import RoundButton from './RoundButton';

export default {
    components: {
        DayTimeManager,
        RoundButton
    },
    data() {
        return {
            openManager: false
        };
    }
};
</script>
