import { PageHeader } from "@/components/shared/page-header";

export default function TermosUsoPage() {
  return (
    <>
      <PageHeader title="Termos de Uso" />
      <section>
        <div className="container max-w-4xl prose lg:prose-lg">
            <p>Última atualização: [Data]</p>
            
            <h2>1. Acordo com os Termos</h2>
            <p>Ao aceder ao nosso site, gerido pela Áquila Fund FCR, concorda em ficar vinculado por estes Termos de Uso, todas as leis e regulamentos aplicáveis, e concorda que é responsável pelo cumprimento de quaisquer leis locais aplicáveis. Se não concordar com algum destes termos, está proibido de usar ou aceder a este site.</p>
            
            <h2>2. Uso da Licença</h2>
            <p>É concedida permissão para descarregar temporariamente uma cópia dos materiais (informação ou software) no site da Áquila Fund FCR, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título.</p>
            
            <h2>3. Isenção de Responsabilidade</h2>
            <p>Os materiais no site da Áquila Fund FCR são fornecidos 'como estão'. A Áquila Fund FCR não oferece garantias, expressas ou implícitas, e por este meio isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não infração de propriedade intelectual ou outra violação de direitos.</p>

            <h2>4. Limitações</h2>
            <p>Em nenhum caso a Áquila Fund FCR ou os seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro, ou devido a interrupção de negócios) decorrentes do uso ou da incapacidade de usar os materiais no site da Áquila Fund FCR.</p>

            <p>[Esta é uma página de exemplo. O conteúdo completo dos termos de uso deve ser fornecido por um consultor jurídico.]</p>
        </div>
      </section>
    </>
  );
}
