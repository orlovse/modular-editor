let state = {
        isOpen: false,
        text: '',
        currentPlatformId: null,
        isLoading: false,
        error: null,
};

export const getState = () => ({ ...state });
export const setState = (newData) => {
    state = { ...state, ...newData }

    notifySubscribers();
};


const subscribers = [];

export const subscribe = (callback) => {
    subscribers.push(callback);

    return () => {
        subscribers = subscribe.filter(subscriber => subscriber !== callback);
    };
};

const notifySubscribers = () => {
    const currentState = getState();

    subscribers.forEach(callback => callback(currentState));
}