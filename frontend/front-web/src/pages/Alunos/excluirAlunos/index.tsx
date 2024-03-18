// Em algum lugar do seu código ou em um arquivo separado (por exemplo, utils/membroUtils.ts)

import * as alunosService from '../../../service/alunosService';

export const deleteAluno = async (id: number) => {
   
  
  try {
    const response = await alunosService.deleteMembro(id);
    console.log("Membro deletado com sucesso:", response.data);

   
    // ou redirecionamento para a lista de membros após a deleção
  } catch (error) {
    console.error("Erro ao deletar membro:", error);
    // Adicione lógica para lidar com erros, se necessário
  }
};
