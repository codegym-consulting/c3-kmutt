<script lang="ts" setup>
definePageMeta({
    layout: 'register',
})

const step = ref(1)
const validate = reactive({
    stepOne: false,
    stepTwo: false,
})

const onClickNext = () => {

}
</script>

<template>
    <div class="flex flex-col h-full">
        <h2 class="text-2xl leading-7 md:text-[32px] md:leading-10 font-bold text-gray-10">
            Input Resume
        </h2>
        <p class="text-base leading-5 text-gray-7 mt-2 mb-4">
            Upload your resume file for submission.
        </p>
        <div>option here</div>
        <RegisterActionFooter :buttons="step === 1 ? ['', 'next'] : ['back', 'done']"
            :disabled-next="step === 1 ? !validate.stepOne : !validate.stepTwo" :disabled-back="false"
            @click-back="step--" @click-next="onClickNext" />
    </div>
</template>
