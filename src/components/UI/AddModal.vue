<script setup>
import { ref, reactive } from "vue";
import { supabase } from "../../supabase"
import { useUserStore } from "../../stores/users"
import { storeToRefs } from "pinia"

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const showModal = ref(false)

const props = defineProps(['fetchApplications']);
const errorMessage = ref('')
const applicationData = reactive({
    role: '',
    company: '',
    location: '',
    platform: '',
    description: '',
    links: ''
})


const submitCallback = async (formData) => {
    const { role, company, location, platform, description, links } = formData
    // Validations
    if (role.trim().length < 1) {
        showModal.value = true
        return errorMessage.value = 'Role must be provided'
    }
    if (company.trim().length < 2) {
        showModal.value = true
        return errorMessage.value = 'Company name must be provided'
    }
    if (!platform) {
        showModal.value = true
        return errorMessage.value = 'platform must be selected'
    }
    if (location.trim().length < 2) {
        showModal.value = true
        return errorMessage.value = 'Location must be selected, eg: remote, Berlin, etc'
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
        company: capitalizedCompany,
        status: 'applied',
        description: description,
        links: links
    })
    if (error) {
        return errorMessage.value = 'Oops an error has ocured, try later'
    }

    await props.fetchApplications();
    errorMessage.value = ''
    applicationData.role = ''
    applicationData.location = ''
    applicationData.platform = ''
    applicationData.company = ''
    applicationData.links = ''
    applicationData.description = ''
    showModal.value = false;
}
</script>

<template>
    <button @click="showModal = true" class="add-btn">Add</button>
    <n-modal v-model:show="showModal" preset="dialog" title="Add an application"
        style="background-color: #CEC7BF; border-radius: 10px;">
        <div class="modal-main-content">
            <input type="text" placeholder="Role" v-model="applicationData.role">
            <input type="text" placeholder="Company" v-model="applicationData.company">
            <input type="text" placeholder="Location" v-model="applicationData.location">
            <input type="text" placeholder="Application link" v-model="applicationData.links">
            <textarea name="description" cols="30" rows="10" maxlength="500" v-model="applicationData.description"
                placeholder="Add description"></textarea>
            <p>Applied on:</p>
            <select name="Choose platform" id="" v-model="applicationData.platform" class="select-platform">
                <option value="" selected disabled hidden>Choose platform</option>
                <option value="linkedin">Linkedin</option>
                <option value="infojobs">Infojobs</option>
                <option value="seek">Seek</option>
                <option value="other">Other</option>
            </select>
            <p>{{ errorMessage }}</p>
        </div>
        <div class="modal-btns-container">
            <button class="cancel-btn"> Cancel</button>
            <button @click="submitCallback(applicationData)" class="submit-btn"> Submit</button>
        </div>
    </n-modal>
</template>
<style scoped>
.add-btn {
    background-color: #CEC7BF;
    padding: 1px 14px;
    border: none;
    border-radius: 10px;
    font-weight: 600;
}

.add-btn:hover {
    cursor: pointer;
    letter-spacing: 1px;
}

.modal-main-content {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.modal-main-content input {
    max-width: 250px;
    height: 30px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid rgb(7, 22, 27);
    font-weight: 600;
}

textarea {
    background-color: transparent;
    border: 1px solid rgb(7, 22, 27);
    font-weight: 600;
    padding: 8px;
    border-radius: 10px;
}

.select-platform {
    max-width: 250px;
    height: 30px;
    border-radius: 10px;
    padding: 1px 5px;
    background-color: #CEC7BF;
    font-weight: 400;
}

.modal-btns-container {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
}

.modal-btns-container button {
    padding: 10px 15px;
    border-radius: 10px;
}

.submit-btn {
    border: none;
    background-color: #3D737F;
    font-weight: 600;
}

.submit-btn:hover {
    cursor: pointer;
}

.cancel-btn {
    background-color: #CEC7BF;
    border: 1px solid rgb(7, 22, 27);
}
</style>