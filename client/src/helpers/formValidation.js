export default function validate(input){
    const {name, value} = input

    switch(name){
        case 'username':
            return {[name]:value&&value.length<3?'Username must be at least 3 characters':''};
        case 'email':
            return {[name]:value&&value.includes('@')?'':'Email must contain @'};
        case 'password':
            return {[name]:value&&value.length<6?'Password must be at least 6 characters':''};
        default:
            return {[name]:''};
    }
}