import {
  AUSTRALIAN_OWNED,
  FIXED_PRICE,
  GREEN_OR_CARBON_NEUTRAL,
  LOCAL_CUSTOMER_SERVICE,
  LOWEST_PRICE,
  NO_PREFERENCE,
} from '../constants'

export const convertPreference = (prefList: string[]) => {
  const preferences = {
    greenOrCarbon: prefList.includes(GREEN_OR_CARBON_NEUTRAL),
    fixedPrice: prefList.includes(FIXED_PRICE),
    australianOwned: prefList.includes(AUSTRALIAN_OWNED),
    lowestPrice: prefList.includes(LOWEST_PRICE),
    localCustomerService: prefList.includes(LOCAL_CUSTOMER_SERVICE),
    noPreferences: prefList.includes(NO_PREFERENCE),
  }
  return preferences
}

export interface Preference {
  greenOrCarbon: boolean
  fixedPrice: boolean
  australianOwned: boolean
  lowestPrice: boolean
  localCustomerService: boolean
  noPreferences: boolean
}

export interface CommonResponse {
  id?: string
  items?: CommonResponseItems[]
  successful?: boolean
}

interface CommonResponseItems {
  exception?: string
  message?: string
  payload?: CommonResponseItemPayload
  id?: string
  successful?: boolean
  statusCode?: string
}

interface CommonResponseItemPayload {
  success?: boolean
  id?: string
  errors?: CommonResponsePayloadError[]
}

interface CommonResponsePayloadError {
  duplicateResult?: unknown
  message?: string
  fields?: unknown[] | null
  statusCode?: string
}

export interface CommonSFError {
  errorCode?: string // 'APEX_ERROR'
  message?: string // 'System.LimitException: Apex CPU time limit exceeded\n\n(System Code)\nClass.SkieLeadResource.processLead: line 10, column 1'
}

export interface SimpleResponse {
  message?: string
}

// export interface MulesoftError {
//   suppressedErrors: []
//   errorType: {
//     parentErrorType: {
//       parentErrorType: null
//       identifier: 'ANY'
//       namespace: 'MULE'
//     }
//     identifier: 'BAD_REQUEST'
//     namespace: 'HTTP'
//   }
//   childErrors?: unknown[]
//   errorMessage: {
//     inboundAttachmentNames: []
//     exceptionPayload: null
//     inboundPropertyNames: []
//     outboundAttachmentNames: []
//     payload: {
//       error: {
//         code: 400
//         message: 'Request contains an invalid argument.'
//         status: 'INVALID_ARGUMENT'
//         details: [
//           {
//             '@type': 'type.googleapis.com/google.rpc.BadRequest'
//             fieldViolations: [
//               {
//                 field: 'raw_document.content'
//                 description: 'Inline document content must be provided.'
//               },
//               {
//                 field: 'raw_document.mime_type'
//                 description: 'Unsupported mime type.'
//               },
//             ]
//           },
//         ]
//       }
//     }
//     outboundPropertyNames: []
//     attributes: {
//       headers: {
//         vary: 'X-Origin'
//         vary: 'Referer'
//         vary: 'Origin,Accept-Encoding'
//         'content-type': 'application/json; charset=UTF-8'
//         date: 'Wed, 20 Sep 2023 14:18:16 GMT'
//         server: 'scaffolding on HTTPServer2'
//         'cache-control': 'private'
//         'x-xss-protection': '0'
//         'x-frame-options': 'SAMEORIGIN'
//         'x-content-type-options': 'nosniff'
//         'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000'
//         'accept-ranges': 'none'
//         'transfer-encoding': 'chunked'
//       }
//       reasonPhrase: 'Bad Request'
//       statusCode: 400
//     }
//   }
//   description?: string | null | undefined "HTTP POST on resource 'https://us-documentai.googleapis.com:443/v1/projects/880170123019/locations/us/processors/d57ff0f09d28a3c:process' failed: bad request (400)."
//   cause: {
//     localizedMessage: "HTTP POST on resource 'https://us-documentai.googleapis.com:443/v1/projects/880170123019/locations/us/processors/d57ff0f09d28a3c:process' failed: bad request (400)."
//     errorMessage: {
//       inboundAttachmentNames: []
//       exceptionPayload: null
//       inboundPropertyNames: []
//       outboundAttachmentNames: []
//       payload: {
//         error: {
//           code: 400
//           message: 'Request contains an invalid argument.'
//           status: 'INVALID_ARGUMENT'
//           details: [
//             {
//               '@type': 'type.googleapis.com/google.rpc.BadRequest'
//               fieldViolations: [
//                 {
//                   field: 'raw_document.content'
//                   description: 'Inline document content must be provided.'
//                 },
//                 {
//                   field: 'raw_document.mime_type'
//                   description: 'Unsupported mime type.'
//                 },
//               ]
//             },
//           ]
//         }
//       }
//       outboundPropertyNames: []
//       attributes: {
//         headers: {
//           vary: 'X-Origin'
//           vary: 'Referer'
//           vary: 'Origin,Accept-Encoding'
//           'content-type': 'application/json; charset=UTF-8'
//           date: 'Wed, 20 Sep 2023 14:18:16 GMT'
//           server: 'scaffolding on HTTPServer2'
//           'cache-control': 'private'
//           'x-xss-protection': '0'
//           'x-frame-options': 'SAMEORIGIN'
//           'x-content-type-options': 'nosniff'
//           'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000'
//           'accept-ranges': 'none'
//           'transfer-encoding': 'chunked'
//         }
//         reasonPhrase: 'Bad Request'
//         statusCode: 400
//       }
//     }
//     cause: null
//     type: 'BAD_REQUEST'
//     message: "HTTP POST on resource 'https://us-documentai.googleapis.com:443/v1/projects/880170123019/locations/us/processors/d57ff0f09d28a3c:process' failed: bad request (400)."
//     stackTrace: [
//       {
//         fileName: 'RangeStatusCodeValidator.java'
//         methodName: 'lambda$throwValidationException$3'
//         className: 'org.mule.extension.http.api.request.validator.RangeStatusCodeValidator'
//         nativeMethod: false
//         lineNumber: 107
//       },
//       {
//         fileName: 'Optional.java'
//         methodName: 'map'
//         className: 'java.util.Optional'
//         nativeMethod: false
//         lineNumber: 215
//       },
//       {
//         fileName: 'RangeStatusCodeValidator.java'
//         methodName: 'throwValidationException'
//         className: 'org.mule.extension.http.api.request.validator.RangeStatusCodeValidator'
//         nativeMethod: false
//         lineNumber: 106
//       },
//       {
//         fileName: 'SuccessStatusCodeValidator.java'
//         methodName: 'lambda$validate$1'
//         className: 'org.mule.extension.http.api.request.validator.SuccessStatusCodeValidator'
//         nativeMethod: false
//         lineNumber: 39
//       },
//       {
//         fileName: 'SuccessStatusCodeValidator.java'
//         methodName: 'validate'
//         className: 'org.mule.extension.http.api.request.validator.SuccessStatusCodeValidator'
//         nativeMethod: false
//         lineNumber: 46
//       },
//       {
//         fileName: 'SuccessStatusCodeValidator.java'
//         methodName: 'validate'
//         className: 'org.mule.extension.http.api.request.validator.SuccessStatusCodeValidator'
//         nativeMethod: false
//         lineNumber: 39
//       },
//       {
//         fileName: 'HttpRequester.java'
//         methodName: 'lambda$null$5'
//         className: 'org.mule.extension.http.internal.request.HttpRequester'
//         nativeMethod: false
//         lineNumber: 174
//       },
//       {
//         fileName: 'DefaultAuthorizationCodeGrantType.java'
//         methodName: 'retryIfShould'
//         className: 'org.mule.extension.oauth2.api.authorizationcode.DefaultAuthorizationCodeGrantType'
//         nativeMethod: false
//         lineNumber: 341
//       },
//       {
//         fileName: 'HttpRequester.java'
//         methodName: 'resendRequest'
//         className: 'org.mule.extension.http.internal.request.HttpRequester'
//         nativeMethod: false
//         lineNumber: 267
//       },
//       {
//         fileName: 'HttpRequester.java'
//         methodName: 'lambda$doRequestWithRetry$6'
//         className: 'org.mule.extension.http.internal.request.HttpRequester'
//         nativeMethod: false
//         lineNumber: 167
//       },
//       {
//         fileName: 'CompletableFuture.java'
//         methodName: 'uniWhenComplete'
//         className: 'java.util.concurrent.CompletableFuture'
//         nativeMethod: false
//         lineNumber: 774
//       },
//       {
//         fileName: 'CompletableFuture.java'
//         methodName: 'tryFire'
//         className: 'java.util.concurrent.CompletableFuture$UniWhenComplete'
//         nativeMethod: false
//         lineNumber: 750
//       },
//       {
//         fileName: 'CompletableFuture.java'
//         methodName: 'postComplete'
//         className: 'java.util.concurrent.CompletableFuture'
//         nativeMethod: false
//         lineNumber: 488
//       },
//       {
//         fileName: 'CompletableFuture.java'
//         methodName: 'complete'
//         className: 'java.util.concurrent.CompletableFuture'
//         nativeMethod: false
//         lineNumber: 1975
//       },
//       {
//         fileName: 'EEGrizzlyHttpClient.java'
//         methodName: 'lambda$sendAsync$1'
//         className: 'com.mulesoft.service.http.impl.service.client.EEGrizzlyHttpClient'
//         nativeMethod: false
//         lineNumber: 145
//       },
//       {
//         fileName: 'CompletableFuture.java'
//         methodName: 'uniWhenComplete'
//         className: 'java.util.concurrent.CompletableFuture'
//         nativeMethod: false
//         lineNumber: 774
//       },
//       {
//         fileName: 'CompletableFuture.java'
//         methodName: 'tryFire'
//         className: 'java.util.concurrent.CompletableFuture$UniWhenComplete'
//         nativeMethod: false
//         lineNumber: 750
//       },
//       {
//         fileName: 'CompletableFuture.java'
//         methodName: 'postComplete'
//         className: 'java.util.concurrent.CompletableFuture'
//         nativeMethod: false
//         lineNumber: 488
//       },
//       {
//         fileName: 'CompletableFuture.java'
//         methodName: 'complete'
//         className: 'java.util.concurrent.CompletableFuture'
//         nativeMethod: false
//         lineNumber: 1975
//       },
//       {
//         fileName: 'GrizzlyHttpClient.java'
//         methodName: 'lambda$sendAsync$0'
//         className: 'org.mule.service.http.impl.service.client.GrizzlyHttpClient'
//         nativeMethod: false
//         lineNumber: 455
//       },
//       {
//         fileName: 'CompletableFuture.java'
//         methodName: 'uniWhenComplete'
//         className: 'java.util.concurrent.CompletableFuture'
//         nativeMethod: false
//         lineNumber: 774
//       },
//       {
//         fileName: 'CompletableFuture.java'
//         methodName: 'tryFire'
//         className: 'java.util.concurrent.CompletableFuture$UniWhenComplete'
//         nativeMethod: false
//         lineNumber: 750
//       },
//       {
//         fileName: 'CompletableFuture.java'
//         methodName: 'postComplete'
//         className: 'java.util.concurrent.CompletableFuture'
//         nativeMethod: false
//         lineNumber: 488
//       },
//       {
//         fileName: 'CompletableFuture.java'
//         methodName: 'complete'
//         className: 'java.util.concurrent.CompletableFuture'
//         nativeMethod: false
//         lineNumber: 1975
//       },
//       {
//         fileName: 'ResponseAsyncHandler.java'
//         methodName: 'onCompleted'
//         className: 'org.mule.service.http.impl.service.client.async.ResponseAsyncHandler'
//         nativeMethod: false
//         lineNumber: 47
//       },
//       {
//         fileName: 'ResponseAsyncHandler.java'
//         methodName: 'onCompleted'
//         className: 'org.mule.service.http.impl.service.client.async.ResponseAsyncHandler'
//         nativeMethod: false
//         lineNumber: 29
//       },
//       {
//         fileName: 'AsyncCompletionHandler.java'
//         methodName: 'onCompleted'
//         className: 'com.ning.http.client.AsyncCompletionHandler'
//         nativeMethod: false
//         lineNumber: 55
//       },
//       {
//         fileName: 'PreservingClassLoaderAsyncHandler.java'
//         methodName: 'onCompleted'
//         className: 'org.mule.service.http.impl.service.client.async.PreservingClassLoaderAsyncHandler'
//         nativeMethod: false
//         lineNumber: 83
//       },
//       {
//         fileName: 'AhcEventFilter.java'
//         methodName: 'onHttpPacketParsed'
//         className: 'com.ning.http.client.providers.grizzly.AhcEventFilter'
//         nativeMethod: false
//         lineNumber: 433
//       },
//       {
//         fileName: 'HttpCodecFilter.java'
//         methodName: 'decodeWithTransferEncoding'
//         className: 'org.glassfish.grizzly.http.HttpCodecFilter'
//         nativeMethod: false
//         lineNumber: 1429
//       },
//       {
//         fileName: 'HttpCodecFilter.java'
//         methodName: 'handleRead'
//         className: 'org.glassfish.grizzly.http.HttpCodecFilter'
//         nativeMethod: false
//         lineNumber: 677
//       },
//       {
//         fileName: 'HttpClientFilter.java'
//         methodName: 'handleRead'
//         className: 'org.glassfish.grizzly.http.HttpClientFilter'
//         nativeMethod: false
//         lineNumber: 182
//       },
//       {
//         fileName: 'ExecutorResolver.java'
//         methodName: 'execute'
//         className: 'org.glassfish.grizzly.filterchain.ExecutorResolver$9'
//         nativeMethod: false
//         lineNumber: 119
//       },
//       {
//         fileName: 'DefaultFilterChain.java'
//         methodName: 'executeFilter'
//         className: 'org.glassfish.grizzly.filterchain.DefaultFilterChain'
//         nativeMethod: false
//         lineNumber: 284
//       },
//       {
//         fileName: 'DefaultFilterChain.java'
//         methodName: 'executeChainPart'
//         className: 'org.glassfish.grizzly.filterchain.DefaultFilterChain'
//         nativeMethod: false
//         lineNumber: 201
//       },
//       {
//         fileName: 'DefaultFilterChain.java'
//         methodName: 'execute'
//         className: 'org.glassfish.grizzly.filterchain.DefaultFilterChain'
//         nativeMethod: false
//         lineNumber: 133
//       },
//       {
//         fileName: 'DefaultFilterChain.java'
//         methodName: 'process'
//         className: 'org.glassfish.grizzly.filterchain.DefaultFilterChain'
//         nativeMethod: false
//         lineNumber: 112
//       },
//       {
//         fileName: 'ProcessorExecutor.java'
//         methodName: 'execute'
//         className: 'org.glassfish.grizzly.ProcessorExecutor'
//         nativeMethod: false
//         lineNumber: 77
//       },
//       {
//         fileName: 'TCPNIOTransport.java'
//         methodName: 'fireIOEvent'
//         className: 'org.glassfish.grizzly.nio.transport.TCPNIOTransport'
//         nativeMethod: false
//         lineNumber: 540
//       },
//       {
//         fileName: 'AbstractIOStrategy.java'
//         methodName: 'fireIOEvent'
//         className: 'org.glassfish.grizzly.strategies.AbstractIOStrategy'
//         nativeMethod: false
//         lineNumber: 112
//       },
//       {
//         fileName: 'SameThreadIOStrategy.java'
//         methodName: 'executeIoEvent'
//         className: 'org.glassfish.grizzly.strategies.SameThreadIOStrategy'
//         nativeMethod: false
//         lineNumber: 103
//       },
//       {
//         fileName: 'AbstractIOStrategy.java'
//         methodName: 'executeIoEvent'
//         className: 'org.glassfish.grizzly.strategies.AbstractIOStrategy'
//         nativeMethod: false
//         lineNumber: 89
//       },
//       {
//         fileName: 'SelectorRunner.java'
//         methodName: 'iterateKeyEvents'
//         className: 'org.glassfish.grizzly.nio.SelectorRunner'
//         nativeMethod: false
//         lineNumber: 415
//       },
//       {
//         fileName: 'SelectorRunner.java'
//         methodName: 'iterateKeys'
//         className: 'org.glassfish.grizzly.nio.SelectorRunner'
//         nativeMethod: false
//         lineNumber: 384
//       },
//       {
//         fileName: 'SelectorRunner.java'
//         methodName: 'doSelect'
//         className: 'org.glassfish.grizzly.nio.SelectorRunner'
//         nativeMethod: false
//         lineNumber: 348
//       },
//       {
//         fileName: 'SelectorRunner.java'
//         methodName: 'run'
//         className: 'org.glassfish.grizzly.nio.SelectorRunner'
//         nativeMethod: false
//         lineNumber: 279
//       },
//       {
//         fileName: 'Executors.java'
//         methodName: 'call'
//         className: 'java.util.concurrent.Executors$RunnableAdapter'
//         nativeMethod: false
//         lineNumber: 511
//       },
//       {
//         fileName: 'FutureTask.java'
//         methodName: 'run'
//         className: 'java.util.concurrent.FutureTask'
//         nativeMethod: false
//         lineNumber: 266
//       },
//       {
//         fileName: 'AbstractRunnableFutureDecorator.java'
//         methodName: 'doRun'
//         className: 'org.mule.service.scheduler.internal.AbstractRunnableFutureDecorator'
//         nativeMethod: false
//         lineNumber: 151
//       },
//       {
//         fileName: 'RunnableFutureDecorator.java'
//         methodName: 'run'
//         className: 'org.mule.service.scheduler.internal.RunnableFutureDecorator'
//         nativeMethod: false
//         lineNumber: 54
//       },
//       {
//         fileName: 'ThreadPoolExecutor.java'
//         methodName: 'runWorker'
//         className: 'java.util.concurrent.ThreadPoolExecutor'
//         nativeMethod: false
//         lineNumber: 1149
//       },
//       {
//         fileName: 'ThreadPoolExecutor.java'
//         methodName: 'run'
//         className: 'java.util.concurrent.ThreadPoolExecutor$Worker'
//         nativeMethod: false
//         lineNumber: 624
//       },
//       {
//         fileName: 'Thread.java'
//         methodName: 'run'
//         className: 'java.lang.Thread'
//         nativeMethod: false
//         lineNumber: 750
//       },
//     ]
//     suppressed: []
//   }
//   detailedDescription?: string | null | undefined // "HTTP POST on resource 'https://us-documentai.googleapis.com:443/v1/projects/880170123019/locations/us/processors/d57ff0f09d28a3c:process' failed: bad request (400)."
//   failingComponent?: string | null | undefined // 'post:\\ocr:Router/processors/4/processors/2 @ zembl-salesforce-integration:zembl-salesforce-integration.xml:907 (Request to Google OCR)'
// }
