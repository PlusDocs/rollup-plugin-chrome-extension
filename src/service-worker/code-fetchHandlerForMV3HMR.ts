// This fixes `self`'s type.
declare const self: ServiceWorkerGlobalScope
export {}

self.skipWaiting()

self.addEventListener('fetch', (fetchEvent) => {
  const url = new URL(fetchEvent.request.url)
  fetchEvent.respondWith(mapRequestsToLocalhost(url.href))
})

function mapRequestsToLocalhost(
  requestUrl: string,
): Response | PromiseLike<Response> {
  const url = new URL(requestUrl)
  url.protocol = 'http:'
  url.host = 'localhost'
  url.port = JSON.parse('%VITE_SERVE_PORT%')

  return fetch(url.href).then(async (r) => {
    const body = await r.text()
    const contentType =
      r.headers.get('Content-Type') ?? 'text/javascript'

    return new Response(body, {
      headers: {
        'Content-Type': contentType,
      },
    })
  })
}
