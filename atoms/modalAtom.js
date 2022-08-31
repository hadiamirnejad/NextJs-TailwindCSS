import {atom} from 'recoil'

const modalAddPostState = atom({
  key: 'modalAddPostState',
  default: false,
})

const modalSignInState = atom({
  key: 'modalSignInState',
  default: false,
})

const modalSignUpState = atom({
  key: 'modalSignUpState',
  default: false,
})

const sessionState = atom({
  key: 'sessionState',
  default: false,
})

const authUserState = atom({
  key: 'authUserState',
  default: {},
})

export {modalAddPostState,modalSignInState,modalSignUpState,sessionState, authUserState}