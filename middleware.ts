import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // updateSession vai ler e atualizar o cookie de sessão
  const { response, supabase } = await updateSession(request)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  // Proteger rotas do admin
  if (pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const { data: userData, error } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', session.user.id)
      .single()

    if (error || !userData || !userData.is_admin) {
        console.error('Admin access error:', error?.message)
        // Redireciona para a home se não for admin
        return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Redirecionar para o admin se já estiver logado na página de login
  if (pathname === '/login' && session) {
      const { data: userData } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', session.user.id)
      .single()
    if (userData?.is_admin) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  // Retorna a resposta (com o cookie atualizado) para continuar a requisição
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
