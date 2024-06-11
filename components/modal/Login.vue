<script lang="ts" setup>
import { isEmpty } from '~/utils/validator'
import { loginSchema } from '~/models/login'

type LoginState = {
    email: string
    password: string
}

const props = withDefaults(defineProps<{
  modelValue: boolean,
  formState?: LoginState
}>(), {
    formState() {
        return {
            email: '',
            password: ''
        }
    }
})

const updateValue = (value: boolean) => {
  emit('update:modelValue', value)
  
}

const emit = defineEmits<{
    (event: 'update:formState', value: LoginState): void
    (event: 'update:modelValue' | 'validate', value: boolean): void
    (event: 'touched' | 'focus'): void
}>()

const state = computed({
    get: () => props.formState,
    set: (value) => emit('update:formState', value),
})

const touchedField = ref('')
const { errors, validate } = useFormValidation(
    loginSchema,
    state,
    touchedField,
)

const onTouch = (field: string) => {
    touchedField.value = field
    validate()
    emit('touched')
}

const displayValue = () => {
    console.log(state.value)
}

watch(
    () => state.value,
    (value) => {
        const allRequiredFieldAreFilled =
            !isEmpty(value.email) && value.password

        // Check if all required fields are filled and then validate the form at once
        emit('validate', !!(allRequiredFieldAreFilled && validate()))
    },
    { deep: true },
)

</script>

<template>
    <Modal title="Login with KMUTT account" sub-title="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        :model-value="props.modelValue"  @update:model-value="updateValue">
        <UForm :schema="loginSchema" :state="state" @error="validate">
            <div class="flex flex-col space-y-6 mx-auto w-full">
                <Input v-model="state.email" label="Email" name="email" type="email" required :error="errors.email"
                    @focus="emit('focus')" @touched="onTouch('email')" />
                <Input v-model="state.password" label="Password" name="password" type="password" required
                    :error="errors.password" @focus="emit('focus')" @touched="onTouch('password')" />
            </div>
            <UButton type="submit" label="Login" class="mt-8 min-w-[300px] mx-auto" :disabled="!validate()"
                @click="displayValue()" />
        </UForm>
    </Modal>
</template>

<style lang="pcss" scoped>
.row {
  @apply flex gap-4 flex-col md:flex-row [&>*]:flex-1;
}
</style>
