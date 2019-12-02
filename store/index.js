import animals from '~/demodata/animals';

const sample = _.sample(animals);
export const state = () => ({
  user: {
    id: _.uniqueId('user_'),
    icon: sample,
    name: `Undefined wild ${_.upperFirst(sample)}`,
    current: true
  },
  timer: 0,
})

export const mutations = {
  updateUser (state, param) {
    state.user = {
      ...state.user,
      ...param
    }
  },
  updateTimer (state, value) {
    state.timer = value;
  },
}

export const getters = {
  getFormattedTimer: state => {
    let seconds = Math.floor((state.timer / 1000) % 60),
      minutes = Math.floor((state.timer / (1000 * 60)) % 60),
      hours = Math.floor((state.timer / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    let str = `${minutes}:${seconds}`;
    if (hours > 0) {
      str = `${hours}:` + str;
    }

    return str;
  },
}