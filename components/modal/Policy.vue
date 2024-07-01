<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const updateValue = (value: boolean) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <Modal
    title="Privacy & Policy"
    sub-title="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    :model-value="props.modelValue"
    @update:model-value="updateValue"
  >
  <article class="prose max-w-full text-sm text-gray-7">
    <p>
      We are committed to protecting your privacy and personal information.
      This Privacy Policy outlines how we collect, use, and safeguard your data when you use our services.
    </p>
    <p>
      Information Collection: We collect personal information such as your name, email address, 
      and student ID when you register for an account. We may also collect data on your usage patterns and preferences to improve our services.
    </p>
    <p>
      Data Usage: The information we collect is used to provide and enhance our services, 
      personalize your experience, and communicate important updates. We do not sell your personal information to third parties.
    </p>
    <p>
      Data Security: We implement industry-standard security measures to protect your personal information from unauthorized access, 
      alteration, or disclosure. However, no method of data transmission over the internet is 100% secure.
    </p>
    <p>
      Cookies: We use cookies to enhance your browsing experience and collect anonymous usage data. 
      You can modify your browser settings to decline cookies, but this may affect some features of our service.
    </p>
    <p>
      Third-Party Services: Our platform may include links to third-party websites or services. 
      We are not responsible for the privacy practices of these external sites.
    </p>
    <p>
      User Rights: You have the right to access, correct, or delete your personal information. 
      To exercise these rights, please contact our support team.
    </p>
    <p>
      Policy Updates: We may update this Privacy Policy from time to time. 
      We will notify you of any significant changes via email or through our platform.
    </p>
    <p>
      Contact Us: If you have any questions or concerns about this Privacy Policy, 
      please contact us at c3-support@kmutt.ac.th
    </p>
  </article>
  </Modal>
</template>
