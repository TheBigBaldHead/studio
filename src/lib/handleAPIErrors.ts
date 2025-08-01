
export function generateErrorMessage(error: any): string {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const status = error.response.status;
        const data = error.response.data;
        if (typeof data === 'string') {
            return data;
        }
        if (data && data.message) {
            if(Array.isArray(data.message)) {
                return data.message.join('\n');
            }
            return data.message;
        }
        return `خطایی با کد ${status} رخ داد`;
    } else if (error.request) {
        // The request was made but no response was received
        return "پاسخی از سرور دریافت نشد. لطفا اتصال اینترنت خود را بررسی کنید.";
    } else {
        // Something happened in setting up the request that triggered an Error
        return error.message || "خطایی در ارسال درخواست رخ داد.";
    }
}
