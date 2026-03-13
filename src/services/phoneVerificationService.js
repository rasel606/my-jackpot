import { apiService } from './api';

export const phoneVerificationService = {
    sendVerificationCode: async (phoneNumber) => {
        try {
            const response = await apiService.post('/phone/verification/send', {
                phone_number: phoneNumber,
                country_code: '+880', // Default for Bangladesh
            });

            return {
                success: true,
                data: response.data,
                message: 'Verification code sent successfully'
            };
        } catch (error) {
            throw {
                success: false,
                message: error.response?.data?.message || 'Failed to send verification code',
                code: error.response?.status
            };
        }
    },

    verifyCode: async (phoneNumber, verificationCode) => {
        try {
            const response = await apiService.post('/phone/verification/verify', {
                phone_number: phoneNumber,
                verification_code: verificationCode,
            });

            return {
                success: true,
                data: response.data,
                message: 'Phone number verified successfully'
            };
        } catch (error) {
            throw {
                success: false,
                message: error.response?.data?.message || 'Invalid verification code',
                code: error.response?.status
            };
        }
    },

    // Resend verification code
    resendVerificationCode: async (phoneNumber) => {
        try {
            const response = await apiService.post('/phone/verification/resend', {
                phone_number: phoneNumber,
            });

            return {
                success: true,
                data: response.data,
                message: 'Verification code sent again'
            };
        } catch (error) {
            throw {
                success: false,
                message: error.response?.data?.message || 'Failed to resend verification code',
                code: error.response?.status
            };
        }
    },


    updatePhoneNumber: async (phoneNumber) => {
        try {
            const response = await apiService.put('/user/profile/phone', {
                phone_number: phoneNumber,
            });

            return {
                success: true,
                data: response.data,
                message: 'Phone number updated successfully'
            };
        } catch (error) {
            throw {
                success: false,
                message: error.response?.data?.message || 'Failed to update phone number',
                code: error.response?.status
            };
        }
    }
    ,
    user_balance_update: async () => {

        const response = await apiService.get('/v1/user_balance');
        console.log("User profile user_balance_update------------------------------------1:", response);
        return await response;
    },


};

export default phoneVerificationService;