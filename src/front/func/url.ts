export function urlSearchParams () {
  return new URL(window.location.href).searchParams
}

export function updateQueryParams(
    params: Record<string, string>) {
    const url = new URL(window.location.href)
    Object.keys(params).forEach((key) => {
        url.searchParams.set(key, params[key])
    })
    history.replaceState(null, '', url)
}