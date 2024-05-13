const tokenName = 'user-token'

export function setToken(token){
  localStorage.setItem(tokenName, token)
}

export function getToken(){
  return localStorage.getItem(tokenName)
}

export function removeToken(){
  localStorage.removeItem(tokenName)
}

export function isLoggedIn(){
  const token = getToken()
  if (!token) return false

  const payloadStr = token.split('.')[1]
  const payloadObj = JSON.parse(atob(payloadStr)) 

  if (payloadObj.exp > Date.now() / 1000) {
    return true
  } else {
    return false
  }
}