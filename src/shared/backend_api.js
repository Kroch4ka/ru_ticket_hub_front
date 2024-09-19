import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 1000
})

instance.interceptors.request.use(
    (config) => {
        // Получаем токен из localStorage или другого хранилища
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

export const apiAccountLogin = async({ email, password, config = {} }) => {
    const url = '/accounts/log_in'
    const { data } = await instance.post(url, { email, password }, config)
    return data
}

export const apiAccountSignUp = async({ password, passwordConfirmation, email, config = {} }) => {
    const url = '/accounts/sign_up'
    const { data } = await instance.post(
        url,
        { password, password_confirmation: passwordConfirmation, email },
        config
    )
    return data
}

export const apiResetPasswordRequest = async({ email, config = {} }) => {
    const url = '/accounts/reset_password/request'
    const { data } = await instance.post(url, { email }, config)
    return data
}

export const apiResetPasswordVerifyToken = async({ resetPasswordToken, config = {} }) => {
    const url = '/accounts/reset_password/verify'
    const { data } = await instance.post(url, { reset_password_token: resetPasswordToken }, config)
    return data
}

export const apiResetFinalize = async({ resetPasswordToken, password, passwordConfirmation, config = {} }) => {
    const url = '/accounts/reset_password/finalize'
    const { data } = await instance.post(
        url,
        { reset_password_token: resetPasswordToken, password, password_confirmation: passwordConfirmation },
        config
    )
    return data
}
