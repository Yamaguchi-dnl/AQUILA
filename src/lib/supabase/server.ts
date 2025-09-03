import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies as nextCookies } from 'next/headers'
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/cookies';

export function createClient(cookieStore?: ReadonlyRequestCookies) {
  const store = cookieStore || nextCookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return store.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            // O tipo `store` pode ser `ReadonlyRequestCookies` que não tem o método `set`
            // Por isso, usamos o `nextCookies()` diretamente aqui, que tem.
            nextCookies().set({ name, value, ...options })
          } catch (error) {
            // O `set` foi chamado de um Server Component.
            // Isso pode ser ignorado se você tiver um middleware atualizando as sessões.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
             // O tipo `store` pode ser `ReadonlyRequestCookies` que não tem o método `delete`
            // Por isso, usamos o `nextCookies()` diretamente aqui, que tem.
            nextCookies().set({ name, value: '', ...options })
          } catch (error) {
            // O `delete` foi chamado de um Server Component.
            // Isso pode ser ignorado se você tiver um middleware atualizando as sessões.
          }
        },
      },
    }
  )
}
