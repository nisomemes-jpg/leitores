"use client";

import { Fragment, useEffect, useState } from "react";

// EDIÇÃO RÁPIDA: altere aqui os roteiros permanentes, locais, livros, casos e regras.
const navItems = [
  ["Identidade", "#identidade"],
  ["Paróquia", "#paroquia"],
  ["Espiritualidade", "#espiritualidade"],
  ["Na Missa", "#missa"],
  ["Técnica", "#tecnica"],
  ["Formação", "#formacao"],
  ["Avaliação", "#avaliacao"],
  ["Fontes", "#fontes"],
] as const;

const formationResources = [
  {
    id: "identidade",
    marker: "SER",
    label: "Fundamento do ministério",
    title: "Vocação, identidade e serviço da Palavra",
    goal: "Compreender que o leitor não faz uma leitura comum: ele exerce um serviço eclesial dentro da ação litúrgica.",
    topics: ["Cristo presente na Palavra proclamada", "Leitor instituído e leitor designado", "Ministério, humildade e comunhão", "O que compete e o que não compete ao leitor"],
    practice: "Partilha vocacional, IGMR 55-59 e exercício de escuta em silêncio.",
    exercise: "Rezar com a primeira leitura do domingo e escrever o apelo central do texto.",
  },
  {
    id: "espiritualidade",
    marker: "REZ",
    label: "Vida espiritual",
    title: "Palavra-evento, espiritualidade e lugar na celebração",
    goal: "Aprender a ser o primeiro ouvinte da Palavra e compreender o ritmo completo da Liturgia da Palavra.",
    topics: ["Lectio divina e familiaridade bíblica", "Ambão, silêncio e assembleia", "Palavra e Eucaristia", "Leitor, salmista, diácono e presidente"],
    practice: "Lectio divina de Lucas 4,16-21 e reconhecimento dos lugares litúrgicos.",
    exercise: "Marcar no texto as unidades de sentido, pausas e palavras decisivas.",
  },
  {
    id: "tecnica",
    marker: "VOZ",
    label: "Oficina de proclamação",
    title: "Proclamação: voz, corpo, respiração e microfone",
    goal: "Desenvolver uma proclamação clara, natural e fiel ao gênero do texto, sem teatralidade nem monotonia.",
    topics: ["Dicção, articulação e projeção", "Ritmo, pausa e respiração", "Postura e contato visual", "Microfone e preparação prévia"],
    practice: "Gravação individual, escuta fraterna e nova proclamação após a orientação.",
    exercise: "Gravar a leitura em casa e anotar um ponto forte e um ponto a melhorar.",
  },
  {
    id: "rito",
    marker: "RITO",
    label: "Serviço na celebração",
    title: "O leitor no roteiro da Santa Missa",
    goal: "Conhecer fórmulas, lugares e movimentos para servir à unidade do rito sem improvisações ou acréscimos.",
    topics: ["Chegada e preparação", "Entrada e lugar do leitor", "Leituras, salmo e preces", "Ambão, fórmulas, silêncio e retorno"],
    practice: "Simulação no espaço celebrativo: chegada, conferência, procissão, proclamação, silêncio e retorno.",
    exercise: "Repassar o roteiro completo antes da próxima escala e esclarecer antecipadamente qualquer dúvida.",
  },
  {
    id: "livros",
    marker: "LIV",
    label: "Livros litúrgicos",
    title: "Missal, Lecionários e Evangeliário",
    goal: "Reconhecer cada livro e localizar corretamente os textos prescritos para a celebração.",
    topics: ["Missal Romano", "Lecionário Dominical", "Lecionário Semanal", "Lecionário Santoral e Evangeliário"],
    practice: "Localização de leituras em diferentes celebrações do calendário litúrgico.",
    exercise: "Localizar no Lecionário as leituras da próxima celebração e conferir o ciclo e o tempo litúrgico.",
  },
  {
    id: "pratica",
    marker: "PRÁX",
    label: "Ensaio acompanhado",
    title: "Prática, avaliação e resposta aos imprevistos",
    goal: "Integrar espiritualidade, técnica e rito com uma devolutiva fraterna e concreta.",
    topics: ["Ensaio no espaço e com o som", "Resposta aos imprevistos", "Avaliação individual", "Acompanhamento por leitor experiente"],
    practice: "Celebração simulada com dois leitores, salmista, preces e devolutiva.",
    exercise: "Escolher um ponto de melhoria, praticá-lo novamente e pedir nova escuta a um formador.",
  },
  {
    id: "permanente",
    marker: "CONT",
    label: "Formação contínua",
    title: "Permanecer em estudo, oração e comunhão",
    goal: "Fazer da formação um caminho permanente, também depois do ingresso na escala paroquial.",
    topics: ["Preparação semanal das leituras", "Revisões periódicas", "Vida sacramental e oração", "Comunhão com a coordenação e a Pastoral Litúrgica"],
    practice: "Reunião de revisão com escuta das necessidades da comunidade e exercícios escolhidos conforme a realidade local.",
    exercise: "Retomar este material sempre que houver dúvida, mudança de comunidade ou necessidade de aperfeiçoamento.",
  },
] as const;

const parishPlaces = [
  ["Igreja Matriz", "Nossa Senhora de Lourdes", "Ambiente principal do curso. Reconhecer ambão, sacristia, lugares dos ministros e sistema de som."],
  ["Capela", "São Francisco de Assis", "Realizar orientação no próprio espaço antes da primeira escala, pois percurso e acústica podem mudar."],
  ["Capela", "Sant’Ana e São Joaquim", "Conhecer Lecionário, lugar de espera, acesso ao ambão e comunicação com a equipe local."],
  ["Capela", "Hospital Onofre Lopes", "Servir com especial sobriedade, clareza, sensibilidade pastoral e atenção ao celebrante."],
] as const;

const books = [
  ["Livro do altar", "Missal Romano", "Contém orações e textos próprios da celebração; não é o livro ordinário das leituras bíblicas."],
  ["Anos A, B e C", "Lecionário Dominical", "Reúne domingos e solenidades conforme o ciclo litúrgico."],
  ["Férias litúrgicas", "Lecionário Semanal", "Usado principalmente nas celebrações feriais, conforme o tempo e a semana."],
  ["Santos e comuns", "Lecionário Santoral", "Traz memórias, festas, solenidades, comuns e celebrações específicas."],
  ["Evangelhos", "Evangeliário", "Livro próprio dos Evangelhos, levado e venerado conforme o rito."],
  ["Estudo prévio", "Bíblia, folheto e aplicativo", "Ajudam a preparar, mas no ambão proclama-se do Lecionário aprovado."],
] as const;

const cases = [
  ["O livro está aberto na leitura errada", "Não comece no texto duvidoso. Confirme antes da celebração. Se perceber no ambão, pare e aguarde orientação sem fazer comentários à assembleia."],
  ["O microfone falhou", "Pare, mantenha a calma e espere o ajuste. Recomece do ponto indicado com clareza."],
  ["Pronunciei uma palavra de modo errado", "Corrija com simplicidade se o sentido foi comprometido e prossiga, sem desculpas longas."],
  ["Não há salmista", "O leitor pode proclamar o salmo do ambão. O salmo previsto não pode ser trocado por outro canto."],
  ["Pediram ao leitor para proclamar o Evangelho", "Na Missa, o Evangelho pertence ao diácono ou ao sacerdote. Procure imediatamente o celebrante."],
  ["Pediram uma reflexão no lugar da homilia", "A homilia na Missa é reservada ao ministro ordenado; o leitor não deve substituí-la."],
  ["Fui escalado e não consegui me preparar", "Avise a coordenação e peça substituição. Reconhecer o limite é mais responsável do que improvisar."],
  ["Há dúvida sobre veste ou procissão", "Siga somente o que foi aprovado pelo pároco e pela Pastoral Litúrgica."],
] as const;

const goldenRules = [
  "Reze o texto antes de treinar a voz.",
  "Prepare sempre a leitura; nunca improvise no ambão.",
  "Proclame do Lecionário e use exatamente o texto litúrgico.",
  "Não anuncie número da leitura nem invente introduções.",
  "Diga somente a fórmula impressa e aguarde a resposta.",
  "O Evangelho pertence ao diácono ou ao sacerdote.",
  "O salmo é do salmista; o leitor o assume quando necessário.",
  "Respeite o silêncio depois das leituras e da homilia.",
  "A técnica deve revelar a Palavra, não exibir o leitor.",
  "Aceite correções e permaneça em formação e comunhão.",
] as const;

export default function Home() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("leitores-formacao-permanente");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const validIds = new Set(formationResources.map((resource) => resource.id));
          setCompleted(parsed.filter((item): item is string => typeof item === "string" && validIds.has(item as typeof formationResources[number]["id"])));
        }
      }
    } catch {
      window.localStorage.removeItem("leitores-formacao-permanente");
    } finally {
      setHydrated(true);
    }
  }, []);

  function toggleModule(id: string) {
    setCompleted((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      window.localStorage.setItem("leitores-formacao-permanente", JSON.stringify(next));
      return next;
    });
  }

  const progress = Math.round((completed.length / formationResources.length) * 100);

  return (
    <div className="site-shell" id="topo">
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
      <header className="site-header">
        <a className="brand" href="#topo" aria-label="Voltar ao início">
          <span className="brand-mark" aria-hidden="true">✦</span>
          <span><strong>A Voz da Palavra</strong><small>Formação de leitores</small></span>
        </a>
        <nav className="top-nav" aria-label="Seções da formação">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <button className="print-button" type="button" onClick={() => window.print()}>
          Imprimir roteiro
        </button>
      </header>

      <main id="conteudo">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="kicker">Formação permanente • Areia Preta • Natal/RN</p>
            <h1 id="hero-title">A Palavra precisa de uma voz preparada.</h1>
            <p className="hero-lead">Um material sempre disponível para formar novos leitores, revisar o serviço e aperfeiçoar quem já proclama na Paróquia Nossa Senhora de Lourdes.</p>
            <div className="hero-actions">
              <a className="button button-gold" href="#formacao">Iniciar a formação</a>
              <a className="button button-ghost" href="#missa">Ver o roteiro da Missa</a>
            </div>
            <p className="hero-note">Documento paroquial + Missal Romano + orientações da Arquidiocese de Natal.</p>
          </div>
          <div className="hero-visual" role="img" aria-label="Ambão e Lecionário abertos em uma igreja">
            <div className="hero-verse">
              <span>Espiritualidade mariana</span>
              <strong>“Fazei tudo o que Ele vos disser.”</strong>
              <q>João 2,5</q>
            </div>
          </div>
        </section>

        <section className="quick-summary" aria-label="Resumo da formação">
          {[
            ["01", "Primeiro ouvir", "O leitor acolhe a Palavra antes de emprestar-lhe a voz."],
            ["02", "Depois preparar", "Texto, rito, corpo, respiração, voz e microfone."],
            ["03", "Então proclamar", "Com clareza, naturalidade, reverência e fidelidade."],
            ["04", "Sempre servir", "Sem protagonismo, improvisação ou isolamento."],
          ].map(([n, title, text]) => (
            <article key={n}><span className="summary-icon">{n}</span><div><strong>{title}</strong><p>{text}</p></div></article>
          ))}
        </section>

        <aside className="dedication" aria-label="Dedicatória">
          <span className="dedication-cross" aria-hidden="true">✦</span>
          <div><p>Um presente à comunidade paroquial</p><h2>Aos leitores e candidatos: que a Palavra encontre em vocês escuta, voz e vida.</h2></div>
          <p className="dedication-signature">Formação para a matriz e suas comunidades, em comunhão com o pároco e a Pastoral Litúrgica.</p>
        </aside>

        <section className="section" id="identidade">
          <div className="section-heading">
            <div><p className="eyebrow">Parte 1 • Identidade</p><h2>Não é “ler na Missa”. É servir à Palavra.</h2></div>
            <p>Nas leituras, Deus fala ao seu povo e Cristo se faz presente por sua Palavra. O leitor não representa um personagem: serve para que a assembleia escute e responda.</p>
          </div>
          <div className="two-column">
            <article className="content-card feature-card">
              <p className="card-label">O que é</p><h3>Um serviço litúrgico e eclesial</h3>
              <p>A proclamação das leituras é ministerial, não presidencial. Na ausência de leitor instituído, leigos aptos e cuidadosamente preparados podem ser designados.</p>
              <span className="source-chip">IGMR 59 e 101</span>
            </article>
            <article className="content-card feature-card warm">
              <p className="card-label">Distinção necessária</p><h3>Designação paroquial não é instituição estável</h3>
              <p>O ministério instituído é conferido pela autoridade eclesiástica mediante rito próprio. Uma vestição ou envio paroquial não deve ser confundido com essa instituição.</p>
              <span className="source-chip">Cân. 230 • Spiritus Domini</span>
            </article>
          </div>
          <div className="principle-callout"><span aria-hidden="true">“</span><blockquote>O bom leitor não chama atenção para si. Sua voz abre espaço para que o texto alcance o coração da assembleia.</blockquote></div>
          <div className="do-dont-grid">
            <article><h3>Compete ao leitor</h3><ul className="check-list">
              <li>Proclamar as leituras que precedem o Evangelho.</li>
              <li>Proclamar o salmo quando não houver salmista.</li>
              <li>Anunciar as preces quando não houver diácono.</li>
              <li>Ler antífonas previstas quando necessário.</li>
              <li>Preparar-se e exercer pessoalmente o serviço.</li>
            </ul></article>
            <article><h3>Não compete ao leitor</h3><ul className="x-list">
              <li>Proclamar o Evangelho na Missa.</li>
              <li>Fazer a homilia ou reflexão substitutiva.</li>
              <li>Trocar leitura ou salmo por outro texto.</li>
              <li>Improvisar introduções ou fórmulas.</li>
              <li>Usar o ambão para avisos comuns por iniciativa própria.</li>
            </ul></article>
          </div>
        </section>

        <section className="section section-tinted" id="paroquia">
          <div className="section-heading">
            <div><p className="eyebrow">Parte 2 • Nossa casa</p><h2>Uma formação com rosto paroquial</h2></div>
            <p>A Paróquia Nossa Senhora de Lourdes serve Areia Preta, Petrópolis e Praia do Meio. O portal arquidiocesano registra a matriz e três capelas, sob o pastoreio do Pe. Bianor Francisco de Lima Júnior.</p>
          </div>
          <div className="status-banner">
            <span className="status-dot" aria-hidden="true" />
            <div><strong>Antes da primeira escala</strong><p>Conheça o espaço, o Lecionário, a acústica, o microfone e o modo de organização do lugar onde servirá.</p></div>
            <span>Ensaio acompanhado</span>
          </div>
          <div className="local-grid">
            {parishPlaces.map(([type, place, note]) => <article className="local-card" key={place}><span>{type}</span><h3>{place}</h3><p>{note}</p></article>)}
          </div>
          <article className="saint-card">
            <span className="saint-medallion" aria-hidden="true">NSL</span>
            <div><p className="card-label">Nossa Senhora de Lourdes</p><h3>Maria escuta, guarda e conduz a Cristo</h3><p>A espiritualidade paroquial inspira o leitor a acolher a Palavra com humildade e indicar sempre Jesus, nunca a si mesmo.</p></div>
          </article>
          <div className="pastoral-note"><strong>Diretório local</strong><p>O Diretório de 2015 pede uma Pastoral Litúrgica com leitores e equipe de celebração para evitar improvisação; também proíbe substituir leituras e salmo. Como está em atualização sinodal, decisões locais devem ser confirmadas com o pároco.</p><span>Nos. 100-107</span></div>
        </section>

        <section className="section" id="espiritualidade">
          <div className="section-heading">
            <div><p className="eyebrow">Parte 3 • Espiritualidade</p><h2>Antes da voz, a escuta.</h2></div>
            <p>A técnica protege a compreensão; a vida espiritual impede que o serviço se torne vazio. O leitor é o primeiro destinatário da Palavra que proclama.</p>
          </div>
          <div className="spiritual-grid">
            {[
              ["01", "Ler", "O que o texto diz? Observe contexto, repetições, contrastes e movimento."],
              ["02", "Meditar", "O que Deus diz hoje? Deixe a Palavra alcançar primeiro sua vida."],
              ["03", "Rezar", "Responda com gratidão, conversão e disponibilidade."],
              ["04", "Agir", "Guarde silêncio e escolha um gesto concreto para viver a Palavra."],
            ].map(([n, title, text]) => <article key={n}><span className="big-number">{n}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <article className="prayer-card">
            <p className="eyebrow">Oração antes de proclamar</p>
            <p className="prayer-text">Senhor Jesus, Palavra viva do Pai, abri meus ouvidos e meu coração. Purificai minha intenção, firmai minha voz e dai-me humildade para desaparecer diante da vossa Palavra. Nossa Senhora de Lourdes, ensinai-me a guardar e servir a Palavra. Amém.</p>
            <small>Oração devocional sugerida; não integra o rito da Missa.</small>
          </article>
        </section>

        <section className="section section-navy" id="missa">
          <div className="section-heading light">
            <div><p className="eyebrow">Parte 4 • Na Santa Missa</p><h2>O caminho do leitor, passo a passo</h2></div>
            <p>O Lecionário, o ambão, as fórmulas e o silêncio fazem parte da ação ritual. Cada gesto serve à unidade da celebração.</p>
          </div>
          <div className="timeline">
            <article><span>Antes</span><h3>Confira sem improvisar</h3><ul>
              <li>Chegue na antecedência combinada.</li><li>Confira dia e leituras.</li><li>Veja se o Lecionário está marcado.</li><li>Teste o microfone.</li><li>Reze e conserve o recolhimento.</li>
            </ul></article>
            <article><span>Entrada</span><h3>Assuma seu lugar</h3><p>Na ausência de diácono, o leitor pode levar o Evangeliário se isso foi previsto. O Lecionário permanece no ambão e não é levado em procissão.</p><span className="source-chip dark">IGMR 194-195</span></article>
            <article><span>Proclamação</span><h3>Texto e fórmula</h3><div className="dialogue">
              <p><small>Início</small><strong>Leitura do Livro...</strong></p><p><small>Fim</small><strong>Palavra do Senhor.</strong></p><p><small>Assembleia</small><strong>Graças a Deus.</strong></p>
            </div><p>Não diga “Primeira leitura”, não anuncie capítulo e versículo e não acrescente fórmulas.</p></article>
            <article><span>Depois</span><h3>Deixe ressoar</h3><p>Dê espaço ao silêncio, saia do ambão com serenidade e retorne ao lugar indicado. Não feche o livro com ruído nem invente gestos.</p><span className="source-chip dark">IGMR 56 e 128-130</span></article>
          </div>
          <div className="communion-options">
            <article><span className="option-icon">A</span><h3>Leituras</h3><p>São proclamadas do ambão. O Evangelho é reservado ao diácono ou sacerdote.</p></article>
            <article><span className="option-icon">B</span><h3>Salmo</h3><p>É Palavra de Deus e pertence ao salmista. Não pode ser substituído por outro canto.</p></article>
            <article><span className="option-icon">C</span><h3>Preces</h3><p>Podem ser anunciadas pelo leitor. Devem ser sóbrias, breves e oração de toda a comunidade.</p></article>
          </div>
        </section>

        <section className="section" id="tecnica">
          <div className="section-heading">
            <div><p className="eyebrow">Parte 5 • Técnica</p><h2>A técnica fica escondida; o sentido aparece.</h2></div>
            <p>A voz corresponde ao gênero do texto e à assembleia. Clareza não é gritar; expressividade não é representar.</p>
          </div>
          <div className="visit-flow" aria-label="Preparação técnica">
            {[
              ["1", "Compreenda", "Quem fala, a quem fala e onde o texto chega."],
              ["2", "Marque", "Unidades de sentido, pausas e nomes difíceis."],
              ["3", "Respire", "Planeje o ar e sustente o fim da frase."],
              ["4", "Proclame", "Olhe a assembleia e mantenha naturalidade."],
            ].map(([n, title, text], index) => (
              <Fragment key={n}>
                <article><span>{n}</span><h3>{title}</h3><p>{text}</p></article>
                {index < 3 && <span className="flow-line" aria-hidden="true" />}
              </Fragment>
            ))}
          </div>
          <div className="sick-grid">
            <article className="content-card"><p className="card-label">Voz</p><h3>Clara, firme e humana</h3><ul className="plain-list"><li>Articule sem endurecer.</li><li>Projete sem gritar.</li><li>Evite cantar ou correr.</li><li>Conclua bem cada frase.</li></ul></article>
            <article className="content-card"><p className="card-label">Corpo</p><h3>Postura a serviço</h3><ul className="plain-list"><li>Caminhe sem pressa.</li><li>Fique estável no ambão.</li><li>Evite gestos teatrais.</li><li>Siga a veste aprovada.</li></ul></article>
            <article className="content-card accent-card"><p className="card-label">Microfone</p><h3>Constância, não luta</h3><p>Teste com a equipe de som, mantenha distância estável e não encoste. Se falhar, pare e aguarde a orientação.</p><span className="source-chip dark">Ensaio real</span></article>
          </div>
        </section>

        <section className="section section-soft" id="livros">
          <div className="section-heading">
            <div><p className="eyebrow">Parte 6 • Livros litúrgicos</p><h2>Conhecer os livros evita muitos erros.</h2></div>
            <p>Os livros são tratados com cuidado porque deles se proclama a Palavra de Deus e se profere a oração da Igreja.</p>
          </div>
          <div className="local-grid">
            {books.map(([label, title, text]) => <article className="local-card" key={title}><span>{label}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="section section-soft">
          <div className="section-heading">
            <div><p className="eyebrow">Parte 7 • Situações reais</p><h2>Serenidade diante do imprevisto</h2></div>
            <p>O leitor não resolve dúvidas litúrgicas sozinho. Ele comunica, aguarda e segue o celebrante e a coordenação.</p>
          </div>
          <div className="case-grid">
            {cases.map(([title, text]) => <details key={title}><summary>{title}</summary><p>{text}</p></details>)}
          </div>
        </section>

        <section className="section" id="formacao">
          <div className="section-heading formation-heading">
            <div><p className="eyebrow">Parte 8 • Biblioteca permanente</p><h2>Roteiros prontos para usar em qualquer tempo</h2><p>Não existe quantidade fixa de encontros. O formador pode usar o material completo ou escolher os temas necessários para formação inicial, revisão, retiro, ensaio ou estudo pessoal.</p></div>
            <div className="progress-card" aria-label="Conteúdos consultados">
              <div><span>Conteúdos estudados</span><strong>{hydrated ? progress : 0}%</strong></div>
              <div className="progress-track"><span style={{ width: (hydrated ? progress : 0) + "%" }} /></div>
              <small>{hydrated ? completed.length : 0} de {formationResources.length} roteiros consultados neste aparelho</small>
            </div>
          </div>
          <div className="modules-list">
            {formationResources.map((module) => {
              const isCompleted = completed.includes(module.id);
              return <article className={"module-card " + (isCompleted ? "completed" : "")} data-resource-id={module.id} key={module.id}>
                <span className="module-number">{module.marker}</span>
                <div className="module-content">
                  <div className="module-title-row">
                    <div><p>{module.label}</p><h3>{module.title}</h3></div>
                    <label className="module-check"><input type="checkbox" checked={isCompleted} onChange={() => toggleModule(module.id)} />{isCompleted ? "Estudado" : "Marcar como estudado"}</label>
                  </div>
                  <p className="module-goal">{module.goal}</p>
                  <details><summary>Abrir roteiro formativo</summary><div className="module-details">
                    <div><strong>Conteúdos</strong><ul>{module.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul></div>
                    <div><strong>Prática sugerida</strong><p>{module.practice}</p><strong>Exercício pessoal</strong><p>{module.exercise}</p></div>
                  </div></details>
                </div>
              </article>;
            })}
          </div>
          <article className="trainer-box">
            <div><p className="card-label">Para o formador</p><h3>Use conforme a necessidade da comunidade</h3></div>
            <ol><li><span>1</span><strong>Escolha</strong><small>um ou mais temas</small></li><li><span>2</span><strong>Reze</strong><small>com a Palavra</small></li><li><span>3</span><strong>Pratique</strong><small>no espaço celebrativo</small></li><li><span>4</span><strong>Acompanhe</strong><small>de modo contínuo</small></li></ol>
          </article>
        </section>

        <section className="section section-gold" id="avaliacao">
          <div className="rules-heading"><p className="eyebrow">Parte 9 • Avaliação</p><h2>Dez sinais de prontidão</h2><p>Não é preciso voz de locutor. É preciso fé, preparação, compreensão, clareza, docilidade e segurança ritual.</p></div>
          <ol className="golden-rules">{goldenRules.map((rule, index) => <li key={rule}><span>{String(index + 1).padStart(2, "0")}</span><p>{rule}</p></li>)}</ol>
        </section>

        <section className="section">
          <div className="section-heading">
            <div><p className="eyebrow">Parte 10 • Envio</p><h2>A formação termina; o aprendizado continua.</h2></div>
            <p>Cada candidato passa por ensaio e devolutiva. Nos primeiros serviços, recomenda-se acompanhamento por leitor experiente.</p>
          </div>
          <div className="two-column">
            <article className="content-card feature-card"><p className="card-label">Uso permanente</p><h3>Sem calendário obrigatório</h3><p>O conteúdo pode ser usado em qualquer mês, em encontros únicos ou sequenciais, conforme a disponibilidade da paróquia e a necessidade dos leitores.</p><span className="source-chip">Sempre disponível</span></article>
            <article className="content-card feature-card warm"><p className="card-label">Integração ao serviço</p><h3>Preparar, acompanhar e revisar</h3><p>O ingresso na escala, qualquer rito de envio e o uso de veste dependem da orientação do pároco. A formação continua depois da primeira proclamação.</p><span className="source-chip">Confirmar com o pároco</span></article>
          </div>
        </section>

        <section className="section references" id="fontes">
          <div className="section-heading">
            <div><p className="eyebrow">Fontes e transparência</p><h2>Formação construída a partir da Igreja</h2></div>
            <p>O site organiza o documento paroquial, mas não substitui os livros litúrgicos nem a autoridade do bispo, pároco e Pastoral Litúrgica.</p>
          </div>
          <div className="reference-list">
            <a href="https://www.vatican.va/roman_curia/congregations/ccdds/documents/rc_con_ccdds_doc_20030317_ordinamento-messale_en.html" target="_blank" rel="noreferrer"><span>01</span><div><strong>Instrução Geral do Missal Romano</strong><p>Nos. 55-71, 99-101, 128-138, 194-198 e 309.</p></div><b>↗</b></a>
            <a href="https://www.vatican.va/content/francesco/pt/motu_proprio/documents/papa-francesco-motu-proprio-20210110_spiritus-domini.pdf" target="_blank" rel="noreferrer"><span>02</span><div><strong>Spiritus Domini e Direito Canônico</strong><p>Ministério instituído, deputação temporária e formação.</p></div><b>↗</b></a>
            <a href="https://www.arquidiocesedenatal.org.br/documentos" target="_blank" rel="noreferrer"><span>03</span><div><strong>Diretório Pastoral da Arquidiocese</strong><p>Edição de 2015, especialmente os nos. 100-107.</p></div><b>↗</b></a>
            <a href="https://www.arquidiocesedenatal.org.br/post/comiss%C3%A3o-oferece-curso-para-leitores-das-celebra%C3%A7%C3%B5es" target="_blank" rel="noreferrer"><span>04</span><div><strong>Formação arquidiocesana de leitores</strong><p>Comissão para Liturgia e Sacramentos.</p></div><b>↗</b></a>
            <a href="https://www.cnbb.org.br/o-ministerio-da-proclamacao-da-palavra-de-deus/" target="_blank" rel="noreferrer"><span>05</span><div><strong>CNBB: Ministério da proclamação</strong><p>Aptidão, preparação, voz e dignidade do ambão.</p></div><b>↗</b></a>
            <a href="https://www.arquidiocesedenatal.org.br/post/par%C3%B3quia-de-nossa-senhora-de-lourdes-areia-preta-natal" target="_blank" rel="noreferrer"><span>06</span><div><strong>Nossa Senhora de Lourdes</strong><p>Matriz, capelas, território e dados paroquiais.</p></div><b>↗</b></a>
          </div>
          <article className="editorial-note"><strong>Documento-base</strong><p>“Formação Inicial para o Ministério de Leitores”. Seus conteúdos espirituais, técnicos, litúrgicos e práticos foram preservados e reorganizados como material permanente, sem número fixo de encontros. Costumes, veste e eventual rito de envio devem ser revisados com o pároco.</p></article>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#topo"><span className="brand-mark" aria-hidden="true">✦</span><span><strong>A Voz da Palavra</strong><small>Nossa Senhora de Lourdes</small></span></a>
        <p>Formação permanente para leitores e candidatos de Areia Preta.<br />Material editável e sujeito à aprovação pastoral.</p>
        <a href="#topo">Voltar ao início ↑</a>
      </footer>
    </div>
  );
}
