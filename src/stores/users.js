import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from "../supabase"

export const useUserStore = defineStore('users', () => {
  const user = ref(null)
  const errorMessage = ref('')
  const loading = ref(false)

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async (credentials) => {
    const { email, password } = credentials
    if (!validateEmail(email)) {
      return errorMessage.value = 'Email Invalid'
    }
    if (!password.length) {
      return errorMessage.value = 'Please add a password'
    }

    // now we call supabese so we start by loading
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      loading.value = false
      return errorMessage.value = error.message
    }

    const { data: currentUser } = await supabase
      .from("users")
      .select()
      .eq('email', email)
      .single()

    user.value = {
      id: currentUser.id,
      email: currentUser.email,
      password: currentUser.password,
      username: currentUser.username

    }

    loading.value = false
    errorMessage.value = ''
  }

  const handleSignup = async (credentials) => {
    const { email, username, password } = credentials
    // Validations
    if (password.length < 6) {
      return errorMessage.value = 'Password is too short'
    }

    if (username.length < 4) {
      return errorMessage.value = 'Username is too short'
    }

    if (!validateEmail(email)) {
      return errorMessage.value = 'Email Invalid'
    }



    // validate if user exists
    loading.value = true
    const checkUser = await supabase
      .from("users")
      .select()
      .eq('username', username)
      .single()

    if (checkUser.data) {
      loading.value = false
      return errorMessage.value = "User already exists"
    }

    errorMessage.value = ''
    // we signup the user
    const { error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) {
      loading.value = false
      return errorMessage.value = error.message
    }

    await supabase.from("users").insert({
      username,
      email
    })

    const newUser = await supabase
      .from("users")
      .select()
      .eq('email', email)
      .single()

    user.value = {
      id: newUser.data.id,
      email: newUser.data.email,
      username: newUser.data.username
    }
    console.log('this is the user, TESTING', user.value)
    loading.value = false
  }
  const handleLogout = () => {

  }
  const getUser = async () => {
    loading.value = true
    const response = await supabase.auth.getUser()
    const userWithEmail = await supabase
      .from("users")
      .select()
      .eq("email", response.data.user.email)
      .single()

    user.value = {
      username: userWithEmail.data.username,
      email: userWithEmail.data.email,
      id: userWithEmail.data.id,

    }
    loading.value = false
  }
  return { user, errorMessage, loading, handleLogin, handleSignup, handleLogout, getUser }
})
