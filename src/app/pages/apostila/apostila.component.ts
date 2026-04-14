import { Component, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// ==========================================
// 1. O "PIPE" QUE GRIFA O TEXTO PESQUISADO
// ==========================================
@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, search: string): SafeHtml {
    if (!search || !value) {
      return this.sanitizer.bypassSecurityTrustHtml(value);
    }
    const pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    const regex = new RegExp(`(${pattern})(?![^<]*>)`, 'gi');
    
    // Adicionamos a classe 'search-match' para o Angular conseguir contar as palavras depois
    const replaced = value.replace(regex, match => `<mark class="bg-warning text-dark fw-bold rounded px-1 search-match">${match}</mark>`);
    return this.sanitizer.bypassSecurityTrustHtml(replaced);
  }
}

// ==========================================
// 2. O COMPONENTE PRINCIPAL
// ==========================================
interface Secao {
  id: string;
  tituloMenu: string;
  conteudoHtml: string;
}

@Component({
  selector: 'app-apostila',
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightPipe],
  templateUrl: './apostila.component.html',
  styleUrls: ['./apostila.component.css']
})
export class ApostilaComponent {
  termoBusca: string = '';
  topicoAtivo: string = 'sec-1';
  
  // Controles do Navegador de Palavras
  totalPalavras: number = 0;
  indiceAtual: number = 0;

  secoes: Secao[] = [
    {
      id: 'sec-1',
      tituloMenu: '1. Significado e História',
      conteudoHtml: `
        <h3 class="text-primary fw-bold text-uppercase border-bottom border-secondary pb-2 mb-4">1 - SIGNIFICADO E HISTÓRIA.</h3>
        <h5 class="text-warning">Muaythai</h5>
        <p>Arte marcial tailandesa.</p>
        <p>Conhecida como "a arte das oito armas", pois caracteriza-se pelo uso combinado de punhos, cotovelos, joelhos, canelas e pés, estando associada a uma boa preparação física que a torna uma luta de contato total bastante eficiente.</p>
        <p>O Muay Thai, o qual também é conhecido como Thai Boxing em alguns países como E.U.A e Inglaterra, é também frequentemente denominado de Boxe Tailandês.</p>
        <p>Sendo uma arte marcial Tailandesa com mais de 2.200 anos de idade, a origem do Muay Thai confunde-se com a origem do povo Tailandês. Existem várias versões sobre a origem do Muay Thai, contudo a teoria considerada a mais aceita pela maioria dos mestres de Muay Thai assim como por vários historiadores Tailandeses fundamenta que a origem do seu povo encontra-se na província de Yunnan, nas margens do Rio Yangtzé na China Central.</p>
        <h5 class="text-warning mt-4">Muay Boran</h5>
        <p>Muay Thai Boran ou simplesmente Muay Boran é o pai da Arte Marcial conhecida mundialmente pelo nome de Muay Thai. O Muay Boran é um antigo estilo de luta tailandesa que deu origem ao Muay Thai. Registros históricos revelam que a arte tem pelo menos 2000 anos de idade, no entanto acredita-se que esta arte teve a sua origem e evolução conjuntamente ao Reino do Sião (=Tailândia) há milênios atrás.</p>
        <h5 class="text-warning mt-4">Código de honra</h5>
        <p>Não ter medo, não sentir dor e não demonstrar cansaço.</p>
        <h5 class="text-warning mt-4">Mandamentos do Muay Thai:</h5>
        <ul class="text-light">
          <li>Respeitar os Pais.</li>
          <li>Respeitar o Mestre/Professor.</li>
          <li>Respeitar os mais graduados.</li>
          <li>Respeitar os mais fracos.</li>
          <li>Respeitar os mais fortes.</li>
          <li>Nunca agredir.</li>
          <li>Utilizar as técnicas do Muay Thai somente para defesa.</li>
          <li>Treinar sempre.</li>
          <li>Manter o caráter e a honra em primeiro lugar.</li>
          <li>Ter amor à equipe - pois esta é a sua segunda família.</li>
        </ul>
      `
    },
    {
      id: 'sec-2',
      tituloMenu: '2. Vestimenta e Adornos',
      conteudoHtml: `
        <h3 class="text-primary fw-bold text-uppercase border-bottom border-secondary pb-2 mb-4">2 - VESTIMENTA - UNIFORME - ADORNOS.</h3>
        <p><strong class="text-warning">Mongkon (Cabeça):</strong> Adorno sagrado utilizado na cabeça. Mongkon é colocado na cabeça do lutador pelo professor para dar sorte. Antes do Wai Kru, o treinador coloca o objeto sagrado na cabeça do atleta, permitindo através da sua posição e formato, distinguir o respectivo local de onde o lutador tem a sua origem tal como quem é o seu treinador. Apenas o treinador é responsável por colocar e retirar o Mongkon da cabeça do lutador. Deve ser guardado em altura acima da cabeça. Não é permitido entrar no ringue por baixo das cordas utilizando o mongkon na cabeça, sempre por cima. As mulheres devem entrar no ringue por baixo das cordas e, somente depois, devem colocar o mongkon.</p>
        <p><strong class="text-warning">Prajhied (Braço):</strong> Braçadeiras feitas de corda e na cor da graduação (Khan) do usuário. Utiliza-se uma braçadeira em cada braço.</p>
        <p><strong class="text-warning">Camiseta (Chua):</strong> Na cor da equipe, com emblema da equipe e emblema do Kru.</p>
        <p><strong class="text-warning">Short (Ganken):</strong> Na cor da equipe e com estampa (Emblema equipe).</p>
        <p><strong class="text-warning">Phuang Malai (Pescoço):</strong> Grinalda de flores que é colocada no pescoço do lutador, o Phuang Malai é dado por amigos ao lutador e serve para dar sorte. O Phuang Malai faz parte da cultura tailandesa fora do ringue.</p>
      `
    },
    {
      id: 'sec-3',
      tituloMenu: '3. Cumprimentos',
      conteudoHtml: `
        <h3 class="text-primary fw-bold text-uppercase border-bottom border-secondary pb-2 mb-4">3 - CUMPRIMENTOS.</h3>
        <p>Sempre cumprimentar juntando as mãos como se fosse rezar e falar:</p>
        <ul class="text-light">
          <li><strong>Sawadee Krap</strong> - Cumprimento masculino. Significa "bom dia", "Boa Tarde" e "Boa noite".</li>
          <li><strong>Sawadee Kraa</strong> - Cumprimento feminino. Significa "bom dia", "Boa Tarde" e "Boa noite".</li>
          <li><strong>Kop Khun Krap</strong> - Cumprimento masculino. Significa "Obrigado".</li>
          <li><strong>Kop Khun Kraa</strong> - Cumprimento feminino. Significa "Obrigado".</li>
        </ul>
      `
    },
    {
      id: 'sec-4',
      tituloMenu: '4. Música, Dança e Cerimônia',
      conteudoHtml: `
        <h3 class="text-primary fw-bold text-uppercase border-bottom border-secondary pb-2 mb-4">4 - MÚSICA - DANÇA - CERIMÔNIA.</h3>
        <h5 class="text-warning">Pi Muay (antigamente tratado como "Sarama")</h5>
        <p>Ao contrário da constante evolução do esporte, a música tradicional "Pi Muay" permanece a mesma desde o início do Muay Thai. O Pi Muay tem duas finalidades dentro do Muay Thai. Ela é tocada durante a execução do Wai Kru Ram Muay e também para conduzir a velocidade do combate (quando a luta está devagar, o Pi Muay é tocado mais rapidamente, quando é preciso diminuir o ritmo da luta, ele é tocado mais lentamente).</p>
        <h5 class="text-warning mt-4">Wai Kru</h5>
        <p>Wai Significa "pagar o respeito" e Kru significa "professor". Também chamado de Khuen Kru é uma cerimônia para homenagear o mestre (Prestar respeito ao professor). Realizada antes da luta, onde o lutador circula por 3 vezes no ringue, passando as mãos nas cordas, prestando reverência e fazendo sua oração.</p>
        <h5 class="text-warning mt-4">Ram Muay</h5>
        <p>Ritual que mantém os espíritos do mal à distância, usado sempre antes das lutas com o propósito de que nenhum mal ocorra com lutador e o seu mestre. Após a apresentação do Wai Kru, é iniciado o Ram Muay que é um método de aquecimento e alongamento que consiste em desenvolver uma série de movimentos previamente estabelecidos ou improvisados em torno do ringue (boxeando, alongando etc).</p>
      `
    },
    {
      id: 'sec-5',
      tituloMenu: '5. Pronúncias',
      conteudoHtml: `
        <h3 class="text-primary fw-bold text-uppercase border-bottom border-secondary pb-2 mb-4">5 - PRONÚNCIAS.</h3>
        <div class="row">
          <div class="col-md-6">
            <ul class="text-light list-unstyled">
              <li>Sparring - Leng Cheng</li>
              <li>Bloqueio de golpe (Almofada) - Pao</li>
              <li>Clinch - Diab</li>
              <li>Joelhada - Khow</li>
              <li>Cotovelada - Sook</li>
            </ul>
          </div>
          <div class="col-md-6">
            <ul class="text-light list-unstyled">
              <li>Cruzado - Mat hook</li>
              <li>Uppercut - Mat ngad</li>
              <li>Direto - Mat throng</li>
              <li>Pontapé frontal - Teep</li>
              <li>Defesa com a canela - Kaak</li>
              <li>Muay nak - Aluno</li>
            </ul>
          </div>
        </div>
      `
    },
    {
      id: 'sec-6',
      tituloMenu: '6. Estilos dos Lutadores',
      conteudoHtml: `
        <h3 class="text-primary fw-bold text-uppercase border-bottom border-secondary pb-2 mb-4">6 - PRINCIPAIS ESTILOS DOS LUTADORES.</h3>
        <h5 class="text-warning">Muay Matt</h5>
        <p>Muay = Lutar, Boxear. Matt = Punhos - lutador que gosta de boxear forte e trabalhar bem essa área, muitas vezes com o suporte de chutes na coxa (low kicks). Suas lutas geralmente terminam em nocaute tendo em vista que é mais difícil pontuar com socos e chutes na coxa do que chutes na linha de cintura.</p>
        <p>Resumo: Lutador que utiliza muito as mãos, com muitas sequências e variações de boxe. Golpes fortes e com muita contundência.</p>
        <p>Exemplo lutador: Rodtang "O Homem de Ferro", Pornsanae Sitmonchai, Jomhod.</p>
        <h5 class="text-warning mt-4">Muay Fimeu</h5>
        <p>Muay = Lutar, Boxear. Fimeu = Habilidade - Lutador com técnica apurada e refinada, desde a execução dos golpes às esquivas e o "Timing" impecável.</p>
        <p>Resumo: Lutador que utiliza de muitas fintas e desvios (enganador). Mantém muito o controle de distância.</p>
        <p>Exemplo lutador: Tawanchai, Saenchai e Sangmane.</p>
        <h5 class="text-warning mt-4">Muay Darn</h5>
        <p>Muay = Lutar, Boxear. Darn = Andar - O Muay Darn é o nak muay que anda pra frente, independente da condição da luta. Eles têm um coração gigante e também são dominantes de todas as técnicas, de socos a joelhadas, de chutes a cotoveladas e projeções. Super bem treinados e com a condição física lá no topo, raramente você os vê cansados durante uma luta.</p>
        <p>Resumo: Lutador que sempre vai pra frente, abafando, com golpes fortes e isolados. Onde tem espaço ele bate!</p>
        <p>Exemplo lutador: Saeksan, Yodsanklai, Yodlekpet.</p>
        <h5 class="text-warning mt-4">Muay Khao</h5>
        <p>Muay = Lutar, Boxear. Khao = Joelho - A principal característica desse estilo é que o lutador simplesmente clincha do começo ao fim. Eles possuem muita força física para segurar seus oponentes e também a aptidão física no topo pois eles dependem muito da sua energia, pondo pressão no adversário do começo ao fim da luta com suas joelhadas destruidoras.</p>
        <p>Resumo: Lutador que usa muito volume de golpes, utilizando muitos joelhos.</p>
        <p>Exemplo de lutador: Petchboonchu, Kun Yothin, Neunglalek.</p>
        <h4 class="text-white mt-5">6.1 - Variações de estilos.</h4>
        <h5 class="text-warning mt-3">Muay Sok (Sawk)</h5>
        <p>Muay = Lutar, Boxear. Sok (Sawk) = Cotovelo - Principal característica desse estilo é que utiliza muito cotovelo com frequência em suas lutas e geralmente as finaliza em nocaute, seja técnico ou não. O "Timing" e a precisão cirúrgica são os aspectos em comum dos nak muays possuidores dessa maneira de lutar.</p>
        <p>Resumo: Lutador que utiliza muito cotovelo e clincha muito. Quer sempre se aproximar para utilizar o cotovelo.</p>
        <p>Exemplo de lutador: Jeferson Vulpe e Sayiok Pumphanmuang.</p>
        <h5 class="text-warning mt-4">Muay Kwai</h5>
        <p>Esse é aquele lutador que pensa pouco e usa muita força, não raciocina, caminha sempre pra frente de forma involuntária, é um cara muito aguerrido, costuma ser um Nak Muay que treina muito e tem muito gás, porém é um lutador limitado, pois possui pouca técnica. Um exemplo desse Nak Muay é Bovy Sor Udom.</p>
      `
    },
    {
      id: 'sec-7',
      tituloMenu: '7. Estádios',
      conteudoHtml: `
        <h3 class="text-primary fw-bold text-uppercase border-bottom border-secondary pb-2 mb-4">7 - ESTÁDIOS.</h3>
        <ul class="text-light list-unstyled">
          <li class="mb-2"><strong>Lumpinee Boxing Stadium ou Estádio de Muay Thai Lumpinee:</strong> É uma arena coberta, localizada em Banguecoque, na Tailândia. O estádio tornou-se o símbolo do atual Muay Thai.</li>
          <li><strong>Channel 7 Boxing Stadium</strong></li>
          <li><strong>Ratchadamnoen</strong></li>
          <li><strong>Omnoi</strong></li>
        </ul>
      `
    },
    {
      id: 'sec-8',
      tituloMenu: '8. Organizações',
      conteudoHtml: `
        <h3 class="text-primary fw-bold text-uppercase border-bottom border-secondary pb-2 mb-4">8 - ORGANIZAÇÕES.</h3>
        <ul class="text-light list-unstyled">
          <li><strong>WMC</strong> - World Muay Thai Council</li>
          <li><strong>WPMF</strong> - World Professional Muay Thai Federation</li>
          <li><strong>WMF</strong> - World Muay Thai Federation</li>
        </ul>
      `
    },
    {
      id: 'sec-9',
      tituloMenu: '9. Lutas e Regras',
      conteudoHtml: `
        <h3 class="text-primary fw-bold text-uppercase border-bottom border-secondary pb-2 mb-4">9 - LUTAS.</h3>
        <h5 class="text-warning mt-3">9.1 Regras básicas.</h5>
        <p>05 rounds de 3 minutos cada com intervalos de 2 minutos de descanso.</p>
        <p>Equipamentos obrigatórios do lutador: Protetor bucal, luvas, calção e coquilha de aço. Proibições: Cabelos longos (Homens), barba ou utilizar jóias. Podem ser utilizadas ligaduras elásticas nos braços ou nas pernas, contudo, não podem ser utilizados protetores nas canelas.</p>
        <h5 class="text-warning mt-4">9.2 Ritmo dos rounds.</h5>
        <p>Cada round possui, tradicionalmente, uma dinâmica específica, como um código não expresso inerente à cultura que envolve o evento que é uma luta de Muay Thai.</p>
        <p><strong>Primeiro e Segundo Rounds</strong> - A luta geralmente se manifesta num ritmo mais lento. Os lutadores costumam usar o primeiro round não apenas para identificar o estilo do oponente e suas reações, mas para evidenciar seu próprio estilo e ritmo aos juízes, para que eles possam compreender a estratégia dos lutadores e melhor julgá-los no decorrer da luta. Apesar do ritmo mais lento, isso não significa que esses rounds não contem para a atribuição de pontos.</p>
        <p><strong>Terceiro e Quarto Rounds</strong> - A luta acelera e no quarto round ela atinge seu ápice, com os lutadores dando seu máximo. Quarto round - É considerado o round mais importante, sendo que, muitas vezes, quem vence o quarto round é consagrado o vencedor da luta.</p>
        <p><strong>Quinto Round</strong> - Considerado um round de manutenção. Geralmente a luta já está definida, então, se não houve nocaute até aqui, o lutador vencedor busca apenas manter sua vantagem e ambos os lutadores controlam o nível de agressão para não correrem riscos de lesão desnecessários, apenas promovendo o entretenimento final.</p>
        <h5 class="text-warning mt-4">9.3 Pontuação.</h5>
        <p>A pontuação vai de 10 a 6. O sistema é de "Corrida". Todas as técnicas legais, que efetivamente atinjam áreas legais de ataque com velocidade, foco, equilíbrio e potência, serão consideradas como um ponto. Todas as técnicas devem ser executadas em potência. Qualquer técnica que apenas toque ou raspe no adversário não será pontuada. Geralmente em uma luta o vencedor leva 10 pontos no round e quem perde leva 9, 8 e até 7. Se chegar a 6 a luta será interrompida por incapacidade técnica - "Sumaidai".</p>
        <p><strong>Knockdown:</strong> No round: 1=2 pontos, 2=3 pontos e 3 a luta é interrompida e dada vitória.</p>
        <p><strong>Decisão por pontos:</strong></p>
        <ul class="text-light">
          <li>Unânime: Todos os juízes deram vitória para o lutador "X";</li>
          <li>Parcial: 02 juízes deram a vitória para o lutador "X" e 01 juiz para o lutador "Y";</li>
          <li>Majoritária: 02 juízes deram vitória para lutador "X" e 01 juiz define empate;</li>
          <li>Empate: a soma dos pontos de todos os juízes são iguais para cada lutador.</li>
        </ul>
        <p>Na ocorrência de 3 Knock Downs de um atleta no round, o árbitro encerra a luta e dá a vitória para outro lutador.</p>
        <p><strong>Dica - "Flashdown"</strong> - Quando o lutador é atingido por algum golpe, "apaga" por um pequeno instante e volta. Nessa situação o juiz NÃO abre contagem. É muito rápido esse "apagão".</p>
        <h5 class="text-warning mt-4">9.4 Vitória.</h5>
        <p>Declara-se vitória quando se assiste a um KO. Esta situação acontece quando um lutador é derrubado e é incapaz de continuar a lutar dentro da contagem de 10 segundos.</p>
        <p><strong>Quando é atribuído um KO técnico?</strong></p>
        <ul class="text-light">
          <li>Quando um lutador é seriamente ferido ou debilitado;</li>
          <li>Quando um lutador não consegue continuar depois de um intervalo;</li>
          <li>Por recomendação do médico, quando o árbitro não tem a certeza que um lutador pode continuar a luta devido a lesão;</li>
          <li>Quando um lutador está incapacitado de continuar o combate;</li>
          <li>Quando um adversário se retira do combate devido a uma lesão.</li>
          <li>Quando alguém não cumpre com as regras da modalidade;</li>
          <li>Se os oponentes não estiverem lutando corretamente ou se estão tentando enganar os juízes, é declarado pelo árbitro do combate "sem decisão";</li>
          <li>Quando ocorre um evento externo ao combate que o leva a ser interrompido. Nestas situações, o árbitro do combate declara que o mesmo ficou "sem competição".</li>
        </ul>
        <p>Sempre é avaliado a "Força, equilíbrio e postura" do lutador durante o combate. Basicamente comparam-se as performances e avalia-se quem está melhor em suas técnicas. A força é o fator principal de julgamento, com golpes limpos e precisos, que machucam e pontuam, mas há ainda o estilo dominante, performance, código de honra, cansaço. Existem lutadores que batem forte, como Pakorn, Seksan, Panpayak, entre outros; e os que pontuam, como Superbank, Saenchai... Assim, é importante avaliar o estilo dos lutadores e quem está dominando a luta.</p>
        <p>Às vezes o atleta não é dotado de muita força, porém tem habilidade técnica para parar seu adversário. Nesse caso, independente de andar para trás ou estar nas cordas, desde que não receba golpes e consiga pontuar, neutralizando seu adversário, ele pode vencer o combate.</p>
        <h5 class="text-warning mt-4">9.5 Faltas.</h5>
        <ul class="text-light">
          <li>Morder, introduzir os dedos nos olhos, cuspir, ou cabecear o adversário propositalmente;</li>
          <li>Wrestling, bloqueio de braços ou qualquer técnica de judô;</li>
          <li>Cair deliberadamente sobre o seu oponente;</li>
          <li>Segurar as cordas;</li>
          <li>Uso de palavrões ou linguagem ofensiva;</li>
          <li>Ferir o adversário depois do árbitro ter ordenado a paralisação do combate;</li>
          <li>Atingir propositadamente a região genital / pélvica do adversário. Um lutador que tenha sido atingido na virilha pode solicitar uma pausa de 5 minutos antes de continuar o embate.</li>
        </ul>
        <h5 class="text-warning mt-4">9.6 O árbitro e os juízes.</h5>
        <p>O comitê de arbitragem do Muay Thai é composto por três juízes, um árbitro de ringue e um responsável pela supervisão do confronto. Cada um tem funções específicas na observação do combate, no cumprimento das suas regras e na atribuição da vitória a um lutador.</p>
        <p>Principal diferença: Juiz é quem julga a luta, sentado no lado de fora do Ringue, árbitro é quem está dentro do ringue e sua principal função é preservar a integridade física do atleta.</p>
        <p>Árbitro central - Kamakan Pu Tat Sin<br>Juízes laterais - Kamakan Hi Haken</p>
        <p><strong>Comandos arbitragem:</strong><br>Lutar - Chok<br>Parar - Yud<br>Separar - Yak</p>
        <h5 class="text-warning mt-4">9.7 Clinch e projeções.</h5>
        <p>Durante a luta, o clinch e projeções são muito comuns, porém existem algumas restrições para aplicação.</p>
        <ul class="text-light">
          <li>Não pode levantar o adversário e projetá-lo;</li>
          <li>Não pode projeções de judô ou jiu-jitsu;</li>
          <li>Não pode projetar o corpo para trás ("Envergar a coluna");</li>
          <li>Utilizar de "Ganchos" nas pernas.</li>
        </ul>
        <p>Onde há combatividade o árbitro tem que deixar e quando não houver por 3 segundos ele deverá intervir. É permitido "Agarrar as pernas" quando o oponente desfere golpe de perna. A perna pode ser agarrada durante 3 segundos ou enquanto dá dois passos em frente podendo contra-atacar com as técnicas permitidas no Muay Thai.</p>
        <p>Projeções são permitidas e significantes na pontuação, sendo que é atribuída uma pontuação por cada projeção bem conseguida. Empurrar o adversário é um dos métodos mais eficazes para conseguir desequilibrar o oponente para consequentemente desferir golpes.</p>
        <p>Os bloqueios são utilizados para parar os low-kicks com a tíbia. Qualquer bloqueio bem efetuado permite que esse mesmo golpe bloqueado seja considerado neutro.</p>
      `
    },
    {
      id: 'sec-10',
      tituloMenu: '10. Graduação',
      conteudoHtml: `
        <h3 class="text-primary fw-bold text-uppercase border-bottom border-secondary pb-2 mb-4">10 - GRADUAÇÃO.</h3>
        <p>Desmistificando as variadas graduações do Muay Thai pelo mundo, é importante lembrar que não existe uma graduação na Tailândia. Não existem faixas como no karatê, judô, etc. Na Tailândia, simplesmente existem os lutadores, nas categorias amador e profissional, sem tal preocupação. A única coisa que conta é a experiência de luta.</p>
        <p>Aliás, na Tailândia as categorias: amador e profissional só existem no papel, pois na maioria das vezes garotos de dez ou doze anos já são lutadores profissionais. A categoria de lutador amador é mais usada para estrangeiros que vão lutar na Tailândia, não por tailandeses.</p>
        <p>Na Tailândia o Muay Thai é um emprego, um meio de sobrevivência, os lutadores lutam para sobreviver, para ganharem seus salários e sustentarem suas famílias que são na maioria das vezes muito pobres. Nem mesmo as faixas utilizadas no braço fazem sentido. Estas, são usadas meramente por tradição e misticismo (para proteção do lutador), não para demonstrar algum tipo de graduação.</p>
        <p>No ocidente, devido à necessidade cultural de graduar e avaliar alunos, algumas Federações e alguns mestres criam alguns sistemas de graduações. Com a expansão do Muay Thai pelo mundo, foi criado um sistema de graduações que tem como critério a evolução do praticante dentro desta arte marcial. A graduação simbolizada pelo Prajied é uma espécie de tarja colocada no braço do praticante (nos bíceps) com a respectiva cor da sua graduação.</p>
        <p>Ao iniciar o treino de Muay Thai, o aluno não recebe nenhum grau (ao contrário de demais artes marciais onde eles começam com a faixa branca). Após o aluno completar 6 meses de treino e dominar os pré-requisitos necessários (movimentações, nomenclaturas, golpes, etc), ele deverá ser examinado por um Kru, este então decidirá se o aluno estará apto a se tornar um Nak Muay (aluno de Muay Boran graduado).</p>
        <h5 class="text-warning mt-4">Sistema de graduação:</h5>
        <div class="table-responsive mt-3">
          <table class="table table-dark table-bordered table-striped border-secondary">
            <thead><tr><th>Grau</th><th>Khan</th><th>Cor do Prajied</th></tr></thead>
            <tbody>
              <tr><td rowspan="4" class="align-middle text-center border-end">INICIANTE</td><td>1º KHAN NUENG</td><td>BRANCO</td></tr>
              <tr><td>2º KHAN SONG</td><td>AMARELO</td></tr>
              <tr><td>3º KHAN SAM</td><td>AMARELO E BRANCO</td></tr>
              <tr><td>4º KHAN SIH</td><td>VERDE</td></tr>
              <tr><td rowspan="3" class="align-middle text-center border-end">INTERMEDIÁRIO</td><td>5º KHAN HAH</td><td>VERDE E BRANCO</td></tr>
              <tr><td>6º KHAN HOK</td><td>AZUL</td></tr>
              <tr><td>7º KHAN JED</td><td>AZUL E BRANCO</td></tr>
              <tr><td rowspan="2" class="align-middle text-center border-end">AVANÇADO</td><td>8º KHAN PAD</td><td>MARROM</td></tr>
              <tr><td>9º KHAN KAOH</td><td>MARROM E BRANCO</td></tr>
              <tr><td rowspan="5" class="align-middle text-center border-end text-warning fw-bold">SUPERIORES</td><td>10º KHAN SIB</td><td>VERMELHO - INSTRUTOR EM TREINAMENTO</td></tr>
              <tr><td>11º KHAN SIB ED</td><td>VERMELHO E BRANCO - INSTRUTOR</td></tr>
              <tr><td>12º KHAN KRU</td><td>VERMELHO E AMARELO - PROFESSOR</td></tr>
              <tr><td>13º KHAN KRU YAI</td><td>VERMELHO E PRATA - MESTRE</td></tr>
              <tr><td>14º KHAN ARJARN</td><td>PRATA</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'sec-11',
      tituloMenu: '11. Estrutura Equipe AMT',
      conteudoHtml: `
        <h3 class="text-primary fw-bold text-uppercase border-bottom border-secondary pb-2 mb-4">11 - Estrutura equipe AMT.</h3>
        <p>AMT - Alliance Muay Thai foi fundada em setembro de 2017, pelo Kru Jefferson Erbas.</p>
        <p>Atualmente (2025), a equipe possui 5 Kru's:</p>
        <ul class="text-light">
          <li>Jefferson Erbas</li>
          <li>Marlus Maciel</li>
          <li>Thammy Ribeiro</li>
          <li>Rodrigo Bischoff</li>
          <li>Milton Graner (Atualmente está nos EUA)</li>
        </ul>
      `
    },
    {
      id: 'sec-12',
      tituloMenu: '12. Dicas e Treinamentos',
      conteudoHtml: `
        <h3 class="text-primary fw-bold text-uppercase border-bottom border-secondary pb-2 mb-4">12 - DICAS - TREINAMENTOS.</h3>
        <h5 class="text-warning">12.1 Puxar treino com aparador (Pao).</h5>
        <p>Lutador que puxa o treino tem que colocar caneleira e deve fazer movimentos de chute para que o lutador que está batendo no Pao faça as defesas e contra-ataques. Lutador que está batendo não pode chutar nas pernas, costelas ou braços do lutador que está puxando, somente no aparador - Pao.</p>
        <h5 class="text-warning mt-4">12.2 Formas de "Bloqueios" no clinch.</h5>
        <ul class="text-light list-unstyled">
          <li class="mb-3"><strong>A -</strong> Juntar as mãos nas costas do adversário, colocando cabeça no queixo (Proteção), forçando para cima.<br><em>Detalhes importantes:</em> No movimento, fechar o cadeado com os braços do adversário para cima, evitando receber golpes.</li>
          <li class="mb-3"><strong>B -</strong> Mãos no queixo e empurrar para trás.<br><em>Detalhes importantes:</em> Para colocar as mãos no queixo do adversário, passar os braços por cima e empurrar o queixo para trás, forçando.</li>
          <li><strong>C -</strong> Jogar ombro nas axilas do adversário, braço por trás, buscando colocar a mão no rosto, jogando quadril para lateral e fazendo bloqueio.</li>
        </ul>
        <h5 class="text-warning mt-4">12.3 Muay Thai X Kickboxing - Principais diferenças.</h5>
        <p>Kickboxing pode ser definido como qualquer esporte de combate que inclua o uso de golpes com braços e pernas sob regras de contato total. As semelhanças com o Muay Thai acabam ficando por aqui. E por essa razão o Muay Thai enquadra-se como uma arte de Kickboxing.</p>
        <p><strong>Pontos de contato -</strong> O Kickboxing costuma contar com quatro pontos de contato para golpes (socos e chutes). O Muay Thai, por sua vez, conta com oito pontos (como já vimos, socos, chutes, cotovelos e joelhadas).</p>
        <p><strong>Clinch -</strong> Kickboxing = Apenas 1 golpe X Muay Thai = Pode golpear livremente e se utilizar de travas e desequilíbrios.</p>
        <p><strong>Pontuação -</strong> Kickboxing = Baseia-se num sistema linear que pontua de maneira igual todo o golpe válido. Já a pontuação no Muay Thai, além de dar mais valor para determinados golpes como chutes médios e altos, possui todo um rito durante todos os cinco rounds da luta, onde os juízes avaliam não apenas a eficiência do lutador, mas a "história" contada durante a luta.</p>
        <p>O Muay Thai enfatiza o uso de clinches e agarramentos para controlar o oponente, enquanto o Kickboxing se concentra mais na movimentação ágil e esquivas.</p>
      `
    },
    {
      id: 'sec-13',
      tituloMenu: '13. Campeonatos e Eventos',
      conteudoHtml: `
        <h3 class="text-primary fw-bold text-uppercase border-bottom border-secondary pb-2 mb-4">13 - CAMPEONATOS E EVENTOS.</h3>
        <h5 class="text-warning mt-3">13.1 Eventos nacionais e internacionais.</h5>
        <div class="row">
          <div class="col-md-6">
            <p><strong>Nacionais:</strong></p>
            <ul class="text-light list-unstyled">
              <li>Maximum Muay Thai Fight</li>
              <li>War Muaythai Fight</li>
              <li>Attack Fight</li>
              <li>The King</li>
              <li>Karacas Stadium Fury</li>
              <li>3M Fight Champions</li>
            </ul>
          </div>
          <div class="col-md-6">
            <p><strong>Internacionais:</strong></p>
            <ul class="text-light list-unstyled">
              <li>ONE Championship</li>
              <li>Muay Thai Grand Prix</li>
              <li>KGP (Kickboxing Grand Prix)</li>
              <li>Champions Collide</li>
            </ul>
          </div>
        </div>
        <h5 class="text-warning mt-4">13.2 Participações e reconhecimentos equipe AMT.</h5>
        <ul class="text-light list-unstyled">
          <li>João Pedro "JP" (AMT Caraguá) - Campeão 3M Fight Champions.</li>
          <li>Lauan Silva - (AMT - Quinthai) - Melhor atleta desafio The King (In memoriam).</li>
        </ul>
        <p class="text-secondary mt-4"><em>Elaborado por: Diogo Fernandes - 11° khan - Equipe AMT</em></p>
      `
    }
  ];

  get secoesFiltradas() {
    if (!this.termoBusca) return this.secoes;
    const termo = this.termoBusca.toLowerCase();
    return this.secoes.filter(s => 
      s.tituloMenu.toLowerCase().includes(termo) || 
      s.conteudoHtml.toLowerCase().includes(termo)
    );
  }

  // --- NOVA LÓGICA DO NAVEGADOR DE PALAVRAS --- //
  
  aoDigitar() {
    this.indiceAtual = 0;
    this.totalPalavras = 0;
    
    // O Angular precisa de um pequeno delay para desenhar os <mark> na tela antes de contarmos
    setTimeout(() => {
      this.atualizarContagemPalavras();
    }, 50);
  }

  atualizarContagemPalavras() {
    // Procura todos os grifos na tela
    const matches = document.querySelectorAll('mark.search-match');
    this.totalPalavras = matches.length;
    
    if (this.totalPalavras > 0) {
      this.destacarPalavraAtual();
    }
  }

  proximaPalavra() {
    if (this.totalPalavras === 0) return;
    this.indiceAtual = (this.indiceAtual + 1) % this.totalPalavras;
    this.destacarPalavraAtual();
  }

  palavraAnterior() {
    if (this.totalPalavras === 0) return;
    this.indiceAtual = (this.indiceAtual - 1 + this.totalPalavras) % this.totalPalavras;
    this.destacarPalavraAtual();
  }

  destacarPalavraAtual() {
    const matches = document.querySelectorAll('mark.search-match');
    
    // Remove o destaque forte de todas
    matches.forEach(m => m.classList.remove('active-match'));

    if (matches[this.indiceAtual]) {
      const el = matches[this.indiceAtual] as HTMLElement;
      // Coloca o destaque forte na palavra atual
      el.classList.add('active-match');
      // Rola a tela magicamente até a palavra, colocando-a no centro!
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Mantido: clique no menu lateral ainda rola para o capítulo todo
  rolarParaTopico(id: string) {
    this.topicoAtivo = id;
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}