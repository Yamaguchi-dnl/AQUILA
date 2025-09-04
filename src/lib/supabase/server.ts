import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Estas funções foram separadas para garantir que o cliente Supabase é criado com o contexto correto,
// resolvendo problemas de autenticação onde a sessão do usuário não era reconhecida.

export function createClientForServerComponent() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Ignorado em Server Components
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Ignorado em Server Components
          }
        },
      },
    }
  )
}

export function createClientForAction() {
  const cookieStore = cookies()
   return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
            // Em Server Actions, nós podemos e devemos definir cookies.
            cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
            // Em Server Actions, nós podemos e devemos remover cookies.
            cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // O `set` foi chamado de um Server Component.
            // Pode ser ignorado se você tiver um middleware a atualizar as sessões.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // O `delete` foi chamado de um Server Component.
            // Pode ser ignorado se você tiver um middleware a atualizar as sessões.
          }
        },
      },
    }
  )
}
