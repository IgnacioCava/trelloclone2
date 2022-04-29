export default function validate(input, form){
    const {name, value} = input

    const emailRegexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

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