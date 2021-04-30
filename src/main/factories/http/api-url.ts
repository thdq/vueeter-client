import environment from "@/main/config/env"

export const makeApiUrl = (path: string): string => `${environment.API_URL}${path}`
