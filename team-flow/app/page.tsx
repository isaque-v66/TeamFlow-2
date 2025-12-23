import { LoginForm } from "./components/login-form"
import { Layers3 } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Lado esquerdo*/}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <Layers3 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold text-foreground">Teamflow</span>
          </div>

          {/* Login */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-balance">Bem vindo de volta!</h1>
              <p className="text-muted-foreground text-pretty">
                Faça login na sua conta para continuar gerenciando os projetos da sua equipe.
              </p>
            </div>

            <LoginForm />
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              {"Don't have an account? "}
              <a href="/components/registerPage" className="text-primary hover:underline font-medium">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Lado Direito */}
      <div className="hidden lg:flex items-center justify-center bg-secondary p-12">
        <div className="max-w-lg space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-semibold text-foreground text-balance leading-tight">
              Otimize a colaboração da sua equipe.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Atribua tarefas aos membros da equipe, acompanhe o progresso do projeto em tempo real e defina prazos coletivos para manter todos alinhados e produtivos.
            </p>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent shrink-0">
                  <svg className="w-5 h-5 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-card-foreground">Atribuição de Tarefas</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Atribua facilmente tarefas aos membros da equipe e acompanhe a responsabilidade de cada uma.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent shrink-0">
                  <svg className="w-5 h-5 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-card-foreground">Acompanhamento de Progresso</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Monitore o progresso do projeto com atualizações e insights em tempo real.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent shrink-0">
                  <svg className="w-5 h-5 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-card-foreground">Gestão de Prazos</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Defina e gerencie prazos coletivos para manter as equipes dentro do cronograma.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
