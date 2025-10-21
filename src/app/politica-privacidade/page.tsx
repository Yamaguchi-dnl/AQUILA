import { PageHeader } from "@/components/shared/page-header";

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <PageHeader title="Política de Privacidade" subtitle="A sua privacidade é importante para nós." />
      <section>
        <div className="container max-w-4xl prose lg:prose-lg">
            <p>Última atualização: [Data]</p>
            
            <h2>1. Introdução</h2>
            <p>O Aquila Fund FCR ("nós", "nosso") respeita a sua privacidade e está empenhado em proteger os seus dados pessoais. Esta política de privacidade irá informá-lo sobre como cuidamos dos seus dados pessoais quando visita o nosso site (independentemente de onde o visita) e informá-lo sobre os seus direitos de privacidade e como a lei o protege.</p>
            
            <h2>2. Dados que recolhemos sobre si</h2>
            <p>Podemos recolher, usar, armazenar e transferir diferentes tipos de dados pessoais sobre si, que agrupamos da seguinte forma:</p>
            <ul>
                <li><strong>Dados de Identidade:</strong> inclui nome, apelido, nome de utilizador ou identificador semelhante.</li>
                <li><strong>Dados de Contato:</strong> inclui endereço de e-mail e números de telefone.</li>
                <li><strong>Dados Técnicos:</strong> inclui endereço de protocolo de internet (IP), seus dados de login, tipo e versão do navegador, configuração e localização do fuso horário, tipos e versões de plug-in do navegador, sistema operativo e plataforma e outra tecnologia nos dispositivos que utiliza para aceder a este site.</li>
                <li><strong>Dados de Uso:</strong> inclui informações sobre como utiliza o nosso site, produtos e serviços.</li>
            </ul>
            
            <h2>3. Como utilizamos os seus dados pessoais</h2>
            <p>Utilizaremos os seus dados pessoais apenas quando a lei nos permitir. Mais comumente, usaremos seus dados pessoais nas seguintes circunstâncias:</p>
            <ul>
                <li>Para gerir a nossa relação consigo, o que incluirá notificá-lo sobre alterações aos nossos termos ou política de privacidade.</li>
                <li>Para administrar e proteger o nosso negócio e este site (incluindo solução de problemas, análise de dados, testes, manutenção do sistema, suporte, relatórios e alojamento de dados).</li>
            </ul>

            <p>[Esta é uma página de exemplo. O conteúdo completo da política de privacidade deve ser fornecido por um consultor jurídico.]</p>
        </div>
      </section>
    </>
  );
}
