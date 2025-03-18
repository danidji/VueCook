import {type TFetchResponse, ErrorHelper} from '@/models'
import {Config} from '@/utils/config'
// import {StorageService} from './storage.services'
// import {AuthService} from './auth/auth.services'

const CONTENT_TYPE_JSON = 'application/json'

function get<Response>(url: string) {
  return fetchGeneric<Response>(url, {
    method: 'GET',
  })
}

function post<Body, Response>(url: string, body: Body | FormData) {
  let contentType: string
  let processedBody: string | FormData

  if (body instanceof FormData) {
    processedBody = body
    return fetchGeneric<Response>(url, {
      method: 'POST',
      body: processedBody,
    })
  } else {
    contentType = CONTENT_TYPE_JSON
    processedBody = JSON.stringify(body)
    return fetchGeneric<Response>(url, {
      method: 'POST',
      body: processedBody,
      headers: {
        'Content-Type': contentType,
      },
    })
  }
}

function patch<Body, Response>(url: string, body?: Body, headers: Record<string, string> = {}) {
  return fetchGeneric<Response>(url, {
    method: 'PATCH',
    body: body ? JSON.stringify(body) : {},
    headers: {
      ...(body && {'Content-Type': CONTENT_TYPE_JSON}),
      ...headers,
    },
  })
}

function put<Body, Response>(url: string, body: Body) {
  return fetchGeneric<Response>(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': CONTENT_TYPE_JSON,
    },
  })
}

function del(url: string) {
  return fetchGeneric<void>(url, {
    method: 'DELETE',
  })
}

const fetcher = {
  get,
  post,
  patch,
  put,
  del,
}

export default fetcher

async function fetchGeneric<T>(url: string, config: any = {}): Promise<TFetchResponse<T>> {
  // const authAccess = StorageService.getAuthAccess()

  // if (authAccess && isProtectedUrl(url)) {
  //   config.headers = {
  //     ...config.headers,
  //     Authorization: `Bearer ${authAccess.accessToken}`,
  //   }
  // }

  console.log(import.meta.env.VITE_API_URL)
  const response = await fetch(`${Config.apiUrl}${url}`, config)

  if (!response.ok) {
    // throw await handleResponseError(response, url, config)
    const dataError = await response.json()
    throw new ErrorHelper(dataError)
  } else {
    if (response.status === 204) {
      return {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText,
      }
    }
    const data: T = await response.json()

    return {
      status: response.status,
      ok: response.ok,
      statusText: response.statusText,
      data,
    }
  }
}

// const isProtectedUrl = (url: string) => !url.includes('/api/auth')

// const handleResponseError = async <T>(
//   response: Response,
//   url: string,
//   config: any = {},
// ): Promise<TFetchResponse<T> | void> => {
//   const dataError = await response.json()
// if (response.status === 401) {
//   const authAccess = await StorageService.getAuthAccess()
//   if (dataError.code === EErrorCodes.INVALID_TOKEN) {
//     if (!authAccess?.rememberMe) {
//       return await AuthService.logout()
//     }
//     return await handleRefreshToken(url, config, authAccess?.refreshToken as string)
//   } else if (dataError.code === EErrorCodes.MISSING_TOKEN) {
//     return await AuthService.logout()
//   } else {
//     throw new ErrorHelper(dataError)
//   }
// } else {
//   throw new ErrorHelper(dataError)
// }
//   throw new ErrorHelper(dataError)
// }

// const handleRefreshToken = async <T>(
//   url: string,
//   config: any,
//   refreshToken: string,
// ): Promise<TFetchResponse<T>> => {
//   try {
//     const newTokens = await AuthService.refreshAccessToken(refreshToken)

//     if (newTokens === undefined || newTokens === null) {
//       throw new ErrorHelper({
//         statusCode: 401,
//         message: 'Unauthorized',
//         code: EErrorCodes.INVALID_TOKEN,
//         data: null,
//         error: 'Unauthorized',
//       })
//     }
//     await StorageService.updateAuthTokens(newTokens.accessToken, newTokens.refreshToken)
//     return fetchGeneric(url, config)
//   } catch (error: any) {
//     await AuthService.logout()
//     throw new ErrorHelper({
//       statusCode: error.statusCode,
//       message: error.message,
//       code: error.errorCode,
//       data: error.data,
//       error: error.error,
//     })
//   }
// }
