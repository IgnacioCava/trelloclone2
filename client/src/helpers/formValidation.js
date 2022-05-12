export default function validate(input, form){
    const {name, value} = input

    const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    switch(name){
        case 'username': 
            return {[name]: value && value.length<3 ? 'Username must be at least 3 characters' : ''};
        case 'email': 
            return {[name]: value && !emailRegexp.test(value) ? 'Not a valid email' : ''};
        case 'password': 
            return {
                [name]: value && value.length<6 ? 'Password must be at least 6 characters' : '',
                [name+'2']: value && form.hasOwnProperty('password2') && value!==form.password ? 'Passwords do not match' : ''
            };
        case 'password2': 
            return {[name]: value && value!==form.password ? 'Passwords do not match' : ''};
        default: 
            return null;
    }
}