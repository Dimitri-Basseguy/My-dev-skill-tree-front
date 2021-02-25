export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';
export const CLEAR = 'CLEAR';

export const success = (message) => ({
  type: SUCCESS,
  message,
});

export const error = (message) => ({
  type: ERROR,
  message,
});

export const clear = () => ({
  type: CLEAR,
});
