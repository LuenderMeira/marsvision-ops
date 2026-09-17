# MarsVision Ops

Build a modern B2B SaaS administrative dashboard for "MarsVision", an exclusive eye clinic and ophthalmic product supplier located on Mars. 

**Visual Style & Theming:**

Use a "Utilitarian Aerospace / Industrial Sci-Fi" design style. It must be strictly flat, high-contrast, and professional. 

CRITICAL RULE: DO NOT use glassmorphism, blur effects, translucent panels, or excessive gradients. 

- Backgrounds: Solid dark colors (Space Black, dark charcoal).

- Primary Accents: Matte Terracotta / Mars Red and Dust Orange.

- Typography: Clean, technical sans-serif (e.g., Inter or a Monospace font for data/numbers).

- Components: Sharp borders or very slightly rounded (max 4px radius), solid fills, clear data separation. 

**Layout Structure:**

Create a full-screen layout with a fixed Left Sidebar for navigation and a main content area. Use a Tabs component in the main area so I can switch between the 5 main views.

**Sidebar Navigation:**

- App Name: "MarsVision OS" with a minimalist eye/planet logo icon.

- Menu Items (with icons): Dashboard, Schedule, Patients, Staff, Products, Settings.

- Bottom: Admin user profile (e.g., "Dr. Silva - Chief Medical Officer").

**View 1: Dashboard (Overview)**

- Top Alert Banner: "⚠️ Weather Alert: Class 3 Sandstorm approaching Sector 4. Advise patients of potential travel delays."

- 4 Key Metric Cards: 

  1. "Today's Consultations" (e.g., 42)

  2. "Sandstorm Goggles Sold" (e.g., 128)

  3. "Surface Radiation Level" (e.g., High - 3.2 mSv - Use a warning color)

  4. "Active Patients" (e.g., +12% this cycle)

- Add a placeholder for a Bar Chart comparing "Consultations vs. Product Sales".

**View 2: Schedule (Agenda)**

- A clean timeline or calendar view showing today's appointments.

- Example entries: "09:00 - Glaucoma Check - Zorg", "10:30 - Sandstorm debris extraction - John Doe", "13:00 - Routine Exam - T-800".

**View 3: Patients (Pacientes)**

- A robust data table.

- Columns: Patient ID, Full Name, Colony/Sector (e.g., Nova Terra, Dome 2), Species/Race (Use UI Badges with different colors: "Human", "Martian", "Cyborg", "Synthesian"), Next Exam.

- Include a primary button on top right: "+ Register Patient".

**View 4: Staff (Profissionais)**

- A grid of Profile Cards for the clinical team.

- Include: Name, Avatar placeholder, Specialty (e.g., "Radiation Optometry", "Multi-ocular Surgery"), and a Status badge (Available, In Surgery, Off-Planet).

**View 5: Products (Produtos)**

- An inventory table or grid for the clinic's store.

- Items: "Anti-Sandstorm Goggles Mk IV", "UV-X Radiation Lenses", "Zero-G Artificial Tears".

- Columns: Product Name, Category, Stock Level (show low stock in red), and Price in Galactic Credits (GC).

Make it look like a highly functional, serious, yet aesthetically striking tool ready to be pitched to investors.

```eof

O que acha dessa estrutura? O Lovable vai criar uma interface com abas (Tabs) para você poder clicar e mostrar cada uma dessas telas durante a sua apresentação, tudo em um único projeto. Se quiser ajustar algum detalhe, raça ou produto, me avise!Bora! Focar no modelo B2B dá uma margem excelente para estruturar algo robusto e que realmente resolve o problema de quem está na operação. Essa sacada de colocar a escolha de "raça" já entrega que estamos desenhando um sistema voltado para clínicas veterinárias ou pet shops, o que é um nicho com muita demanda por automação.

Aqui está uma proposta para desenhar esse sistema de forma elegante e funcional.

### O Estilo Visual: Fugindo do "Cara de IA"

Para fugir do *glassmorphism* (aqueles fundos translúcidos e desfocados que estão em todo template de IA hoje em dia), a melhor saída é adotar o estilo **Solid Clean UI**. 

*   **Cores Sólidas e Contraste:** Fundos opacos (como um off-white ou cinza muito claro), com os cartões de informação em branco puro. 

*   **Bordas Definidas:** Linhas finas e sólidas para separar os elementos, em vez de depender de sombras exageradas.

*   **Paleta de Confiança:** Tons de azul-marinho, verde-sálvia ou tons terrosos. Eles transmitem seriedade, saúde e cuidado, ideal para o nicho, e garantem um visual muito profissional.

*   **Tipografia Forte:** Fontes limpas e com bom peso (como *Inter* ou *Manrope*) para facilitar a leitura rápida no dia a dia da clínica.

### Estrutura das Páginas

Você mapeou muito bem a base. Aqui está como podemos enriquecer cada área dentro dessa interface mais sólida:

| Página | Funcionalidade e Diferenciais |

| :--- | :--- |

| **Dashboard** | A visão geral. Pode ter métricas rápidas de faturamento, consultas agendadas pro dia e alertas (ex: "5 produtos com estoque baixo"). |

| **Agenda** | Calendário interativo. Essencial ter cores sólidas diferentes para cada tipo de serviço (ex: azul para consulta, verde para cirurgia, laranja para banho/tosa). |

| **Pacientes** | Ficha completa do pet. Aqui entra o diferencial: foto do paciente, espécie, raça, idade, peso e um histórico cronológico de vacinas e atendimentos. |

| **Profissionais** | Gestão da equipe. Controle de quem está de plantão, especialidade do veterinário e vinculação de comissões por atendimento. |

| **Produtos** | Catálogo em formato de lista densa. Controle de estoque, preço de custo vs. preço de venda e alertas de validade. |

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/83c4bd22-84eb-4cd0-af1d-c6dfaf5f762b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
