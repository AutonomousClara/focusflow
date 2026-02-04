import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface/20 to-background">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
            FocusFlow
          </h1>
          <p className="text-2xl text-text/80 mb-8">
            Pomodoro Timer com Detecção de Distrações
          </p>
          <p className="text-lg text-text/60 max-w-2xl mx-auto mb-12">
            Mantenha o foco, acompanhe distrações automaticamente e veja relatórios
            completos de produtividade. 100% gratuito, 100% privado.
          </p>
          <Link
            href="/app"
            className="inline-block bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all hover:scale-105 shadow-lg"
          >
            Começar Agora →
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-text/10 hover:border-primary/30 transition-all">
            <div className="text-5xl mb-4">🍅</div>
            <h3 className="text-xl font-bold text-text mb-3">Timer Pomodoro</h3>
            <p className="text-text/60">
              25 minutos de foco, 5 de pausa. Personalize intervalos e sons do jeito que você
              precisa.
            </p>
          </div>

          <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-text/10 hover:border-secondary/30 transition-all">
            <div className="text-5xl mb-4">👀</div>
            <h3 className="text-xl font-bold text-text mb-3">Detecta Distrações</h3>
            <p className="text-text/60">
              Sabe quando você troca de aba? O app detecta automaticamente e registra suas
              distrações.
            </p>
          </div>

          <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-text/10 hover:border-accent/30 transition-all">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-text mb-3">Relatórios Completos</h3>
            <p className="text-text/60">
              Veja quanto tempo focou, quantas distrações teve, e acompanhe sua evolução ao
              longo dos dias.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-text mb-12">Como Funciona</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/30">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h4 className="font-semibold text-text">Escolha uma tarefa</h4>
              <p className="text-text/60 text-sm">
                Defina o que você vai fazer nos próximos 25 minutos
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center mx-auto border border-secondary/30">
                <span className="text-2xl font-bold text-secondary">2</span>
              </div>
              <h4 className="font-semibold text-text">Inicie o timer</h4>
              <p className="text-text/60 text-sm">
                Clique em começar e mergulhe no trabalho focado
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center mx-auto border border-accent/30">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h4 className="font-semibold text-text">Mantenha o foco</h4>
              <p className="text-text/60 text-sm">
                Distrações são detectadas automaticamente se você trocar de aba
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-success/20 to-success/10 rounded-full flex items-center justify-center mx-auto border border-success/30">
                <span className="text-2xl font-bold text-success">4</span>
              </div>
              <h4 className="font-semibold text-text">Veja relatórios</h4>
              <p className="text-text/60 text-sm">
                Acompanhe sua produtividade e identifique padrões
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-12 border border-text/10">
          <h2 className="text-3xl font-bold text-text mb-4">
            Pronto para aumentar sua produtividade?
          </h2>
          <p className="text-text/60 mb-8 text-lg">
            Comece agora. Não precisa criar conta. Tudo fica salvo no seu navegador.
          </p>
          <Link
            href="/app"
            className="inline-block bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all hover:scale-105 shadow-lg"
          >
            Começar Agora →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-text/10 mt-20 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-text/60 text-sm">
          <p>
            Criado por{' '}
            <a
              href="https://autonomousclara.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Clara
            </a>{' '}
            • 100% Gratuito • Seus dados ficam apenas no seu navegador
          </p>
        </div>
      </footer>
    </div>
  );
}
