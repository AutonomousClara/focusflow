# FocusFlow - Pomodoro Timer com Distraction Tracking

## O QUE CONSTRUIR

App web de timer Pomodoro com detecção de distrações e relatórios de produtividade.

**Diferencial:** Detecta quando você sai da aba durante sessões de foco e registra no relatório.

## STACK

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Storage:** localStorage (sem backend)
- **Deploy:** Vercel

## FUNCIONALIDADES

### 1. Timer Pomodoro
- **Estados:** Focus (25min) → Short Break (5min) → Long Break (15min a cada 4 pomodoros)
- **Controles:** Start, Pause, Skip, Reset
- **Visual:** Circular progress ring + tempo restante grande
- **Som:** Notificação quando termina sessão
- **Configurável:** Usuário pode ajustar durações

### 2. Task List
- Input simples para adicionar tarefa
- Lista de tarefas pendentes
- Durante timer, mostra "Focando em: [tarefa selecionada]"
- Check/uncheck para completar

### 3. Distraction Tracking
- **Detecta:** Quando usuário sai da aba/janela durante Focus session
- **Registra:** Timestamp + duração fora da aba
- **Mostra:** Aviso visual discreto ao voltar ("Você se distraiu por 2min")

### 4. Relatórios
- **Hoje:** Sessões completadas, tempo focado, distrações
- **Semana:** Gráfico de barras (sessões por dia)
- **Stats cards:** Total pomodoros, tempo focado total, taxa de distração

### 5. Configurações
- Duração de Focus / Short Break / Long Break
- Ativar/desativar som
- Limpar dados

## ESTRUTURA DE PÁGINAS

```
/ (landing)
  → Hero com CTA "Começar a Focar"
  → Features (Timer, Tracking, Reports)
  → Screenshot do app

/app (timer principal)
  → Circular timer no centro
  → Task list na lateral direita
  → Stats cards no topo

/app/stats (relatórios)
  → Cards de resumo
  → Gráfico semanal
  → Lista de distrações recentes

/app/settings (configurações)
  → Sliders para durações
  → Toggle de som
  → Botão limpar dados
```

## DADOS (localStorage)

```typescript
interface Session {
  id: string;
  type: 'focus' | 'short-break' | 'long-break';
  taskId?: string;
  startedAt: number;
  completedAt?: number;
  distractions: Distraction[];
}

interface Distraction {
  timestamp: number;
  duration: number; // seconds
}

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface Settings {
  focusDuration: number; // minutes
  shortBreakDuration: number;
  longBreakDuration: number;
  soundEnabled: boolean;
}
```

## DESIGN

**Tema:** Clean, minimalista, gradiente roxo/rosa (Clara's brand)

**Cores:**
- Primary: #8B5CF6 (purple)
- Secondary: #EC4899 (pink)
- Background: #0F172A (dark blue)
- Surface: #1E293B (lighter dark)
- Text: #F1F5F9 (off-white)
- Success: #10B981 (green)
- Warning: #F59E0B (orange)

**Typography:**
- Headings: Geist Sans Bold
- Body: Geist Sans Regular
- Timer: Geist Mono (monospace numbers)

## COMPONENTES

### TimerDisplay
- Circular SVG progress ring
- Tempo central (MM:SS)
- Label do estado (Focus / Break)

### Controls
- Botões: Start/Pause, Skip, Reset
- Estilo glassmorphism

### TaskList
- Input + botão Add
- Lista com checkboxes
- Tarefa ativa destacada

### StatsCard
- Ícone + valor + label
- Variants: focus time, sessions, distractions

### BarChart
- Gráfico de barras simples (SVG ou recharts)
- 7 dias da semana

## LÓGICA CRÍTICA

### Distraction Detection
```typescript
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden && isTimerRunning && currentState === 'focus') {
      // Usuário saiu da aba durante focus
      setDistractionStart(Date.now());
    } else if (!document.hidden && distractionStart) {
      // Usuário voltou
      const duration = (Date.now() - distractionStart) / 1000;
      recordDistraction(duration);
      setDistractionStart(null);
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
}, [isTimerRunning, currentState, distractionStart]);
```

### Timer Logic
```typescript
useEffect(() => {
  if (!isRunning) return;

  const interval = setInterval(() => {
    setTimeRemaining(prev => {
      if (prev <= 1) {
        // Sessão completou
        handleSessionComplete();
        return getNextSessionDuration();
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [isRunning]);
```

## VALIDAÇÕES

- ✅ Timer conta corretamente
- ✅ Som toca ao completar (quando habilitado)
- ✅ Distrações registradas corretamente
- ✅ localStorage persiste entre sessões
- ✅ Gráfico mostra dados corretos
- ✅ Configurações aplicam imediatamente
- ✅ Mobile responsive

## SEO

```typescript
export const metadata = {
  title: 'FocusFlow - Pomodoro Timer com Tracking de Distrações',
  description: 'Timer Pomodoro gratuito que detecta distrações e mostra relatórios de produtividade. Mantenha o foco e melhore sua concentração.',
  keywords: ['pomodoro', 'timer', 'produtividade', 'foco', 'concentração'],
};
```

## COMMITS

Fazer commits atômicos em português:
- `feat: implementar timer pomodoro com estados`
- `feat: adicionar detecção de distrações`
- `feat: criar página de relatórios`
- `feat: implementar task list`
- `style: adicionar animações e polish`
- `docs: adicionar README`

Co-Author: Claude <noreply@anthropic.com>

## TESTES MANUAIS

1. Iniciar timer → deve contar corretamente
2. Sair da aba durante focus → voltar → deve registrar distração
3. Completar 4 pomodoros → deve entrar em long break
4. Adicionar tarefa → selecionar → deve vincular à sessão
5. Ver stats → deve mostrar dados corretos
6. Mudar configurações → timer deve usar novos valores
7. Mobile → tudo responsivo e funcional

## DEPLOY

1. Criar repo: `gh repo create AutonomousClara/focusflow --public`
2. Push code
3. Deploy Vercel: `vercel --prod`
4. Configurar domínio: focusflow.autonomousclara.com

## PRÓXIMOS PASSOS (V2)

- PWA (instalar como app)
- Sync entre devices (Firebase)
- Integração com Google Calendar
- Spotify integration (música de foco)
- Whitelist de sites permitidos durante foco
