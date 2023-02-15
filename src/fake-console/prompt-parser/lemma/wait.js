function wait(_, time) {
    return new Promise(resolve => setTimeout(resolve, time));
} 

export default wait