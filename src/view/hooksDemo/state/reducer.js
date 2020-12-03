export default function reducer(state, action) {
    switch (action.type) {
        case 'setName':
            state.name = action.name;
            return {
                ...state
            };
        case 'setAge':
            state.age = action.age;
            return {
                ...state
            };
        case 'clearData':
            state = {
                name: 'zj',
                age: 10
            };
            return {
                ...state
            };
        default:
            throw new Error();
    }
}