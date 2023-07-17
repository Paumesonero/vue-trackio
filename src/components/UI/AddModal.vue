<script setup>
import { reactive, ref } from 'vue';
import { supabase } from "../../supabase"
import { useUserStore } from "../../stores/users"
import { storeToRefs } from "pinia"

const userStore = useUserStore()
const { user } = storeToRefs(userStore)


const open = ref(false);
const errorMessage = ref('')
const applicationData = reactive({
    role: '',
    company: '',
    location: '',
    platform: '',
})



const showModal = () => {
    open.value = true;
};

const handleOk = async (formData) => {
    const { role, company, location, platform } = formData
    // Validations
    if (role.length < 1) {
        return errorMessage.value = 'Role must be provided'
    }
    if (company.length < 2) {
        return errorMessage.value = 'Company name must be provided'
    }
    if (!platform) {
        return errorMessage.value = 'platform must be selected'
    }
    if (!location) {
        return errorMessage.value = 'platform must be selected, eg: remote, Berlin, etc'
    }
    // capitalizing first letter
    const capitalizeFirstLetter = ([first, ...rest]) => {
        return first.toUpperCase() + rest.join('');
    }
    const capitalizedRole = capitalizeFirstLetter(role)
    const capitalizedCompany = capitalizeFirstLetter(company)
    const capitalizedLocation = capitalizeFirstLetter(location)
    const capitalizedPlatform = capitalizeFirstLetter(platform)



    const { error } = await supabase.from('applications').insert({
        user_id: user.value.id,
        role: capitalizedRole,
        location: capitalizedLocation,
        platform: capitalizedPlatform,
        company: capitalizedCompany
    })
    if (error) {
        return errorMessage.value = 'Oops an error has ocured, try later'
    }

    errorMessage.value = ''
    open.value = false;
};
</script>
<template>
    <div>
        <a-button class="test" @click="showModal">Add</a-button>
        <a-modal v-model:open="open" title="Add" @ok="handleOk(applicationData)">
            <input type="text" placeholder="Role" v-model="applicationData.role">
            <input type="text" placeholder="Company" v-model="applicationData.company">
            <input type="text" placeholder="Location" v-model="applicationData.location">
            <p>Applied on:</p>
            <select name="" id="" v-model="applicationData.platform">
                <option value="linkedin">Linkedin</option>
                <option value="seek">Seek</option>
                <option value="infojobs">Infojobs</option>
                <option value="other">Other</option>
            </select>
            <p>{{ errorMessage }}</p>
        </a-modal>
    </div>
</template>
<style scoped>
.test {
    background-color: #CEC7BF;
    padding: 1px 10px;
}
</style>
