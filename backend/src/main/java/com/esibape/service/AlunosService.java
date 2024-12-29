package com.esibape.service;


import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Period;
import java.util.List;
import java.util.NoSuchElementException;

import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.esibape.DTO.AlunoStatusDTO;
import com.esibape.DTO.AlunosDTO;
import com.esibape.DTO.ChamadaDTO;
import com.esibape.DTO.PagamentoDTO;
import com.esibape.DTO.ProjetosDTO;
import com.esibape.entities.AlunoStatus;
import com.esibape.entities.Alunos;
import com.esibape.entities.Chamada;
import com.esibape.entities.ChamadaAluno;
import com.esibape.entities.Pagamento;
import com.esibape.entities.Projetos;
import com.esibape.repository.AlunoStatusRepository;
import com.esibape.repository.AlunosRepository;
import com.esibape.repository.ChamadaRepository;
import com.esibape.repository.PagamentoRepository;
import com.esibape.repository.ProjetosRepository;

@Service
public class AlunosService {
    @Autowired
    private AlunosRepository repository;
    @Autowired
    private ProjetosRepository projetosRepository;
    @Autowired
    private ChamadaRepository chamadaRepository;
    @Autowired
    private AlunoStatusRepository alunoStatusRepository;
    @Autowired
    private PagamentoRepository pagamentoRepository;
    @Autowired
    private ChamadaService chamadaService;
    
 // Modificado para buscar apenas alunos ativos
    @Transactional(readOnly = true)
    public List<AlunosDTO> findAll() {
        List<Alunos> list = repository.findByAtivoTrue(); 
        return list.stream()
            .map(x -> {
                // Atualiza a idade e verifica o status de pagamento
                AlunosDTO dto = new AlunosDTO(x, x.getProjetos(), x.getAlunoStatus(), x.getChamada(), x.getPagamentos());
                atualizarIdade(dto);
                verificarStatusPagamento(dto);

                // Chama o método verificarAusenciasConsecutivas para cada aluno
                chamadaService.verificarAusenciasConsecutivas(x);

                return dto;
            })
            .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<AlunosDTO> findAllAlunos() {
        List<Alunos> list = repository.findAll(); 
        return list.stream()
            .map(x -> {
                AlunosDTO dto = new AlunosDTO(x, x.getProjetos(), x.getAlunoStatus(), x.getChamada(), x.getPagamentos());
                verificarStatusPagamento(dto);
                verificarAusenciasConsecutivas(x);
                return dto;
            })
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AlunosDTO findById(Long id) {
        Alunos entity = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Aluno não encontrado"));
        AlunosDTO dto = new AlunosDTO(entity, entity.getProjetos(), entity.getAlunoStatus(), entity.getChamada(), entity.getPagamentos());
        atualizarIdade(dto);
        verificarStatusPagamento(dto);
        return dto;
    }

    @Transactional
    public AlunosDTO insert(AlunosDTO dto) {
        Alunos entity = new Alunos();
        copyDtoToEntity(dto, entity);
        entity.setAtivo(true); 
        entity = repository.save(entity);
        return new AlunosDTO(entity);
    }

    @Transactional
    public AlunosDTO update(Long id, AlunosDTO dto) {
    	atualizarIdade(dto);
        Alunos entity = repository.getReferenceById(id);
            
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new AlunosDTO(entity);
    }

    public void delete(Long id) {
        Alunos entity = repository.findByIdAndAtivoTrue(id)
                .orElseThrow(() -> new NoSuchElementException("Aluno não encontrado ou inativo"));
        entity.setAtivo(false); // Marca o aluno como inativo em vez de deletá-lo
        repository.save(entity);
    }
 // Busca alunos independentemente do status 'ativo'
    @Transactional(readOnly = true)
    public List<AlunosDTO> findByNomeIgnoreCaseContaining(String nome) {
        List<Alunos> result = repository.findByNomeIgnoreCaseContaining(nome); 
        return result.stream().map(x -> new AlunosDTO(x)).toList();
    }

 // Modificado para buscar apenas alunos ativos
    @Transactional(readOnly = true)
    public List<AlunosDTO> findByHorario(LocalTime horario) {
        List<Alunos> result = repository.findByHorarioAndAtivoTrue(horario); 
        return result.stream().map(x -> new AlunosDTO(x)).collect(Collectors.toList());
    }
 // Modificado para buscar apenas alunos ativos
    @Transactional(readOnly = true)
    public List<AlunosDTO> findByProjetoId(Long projetoId) {
        List<Alunos> result = repository.findByProjetosIdAndAtivoTrue(projetoId); 
        return result.stream().map(x -> new AlunosDTO(x)).collect(Collectors.toList());
    }
 // Modificado para buscar apenas alunos ativos
    @Transactional(readOnly = true)
    public List<AlunosDTO> findByProjetoIdAndHorario(Long projetoId, LocalTime horario) {
        List<Alunos> result = repository.findByProjetosIdAndHorarioAndAtivoTrue(projetoId, horario); 
        return result.stream().map(x -> new AlunosDTO(x)).collect(Collectors.toList());
    }

   
    private void verificarAusenciasConsecutivas(Alunos aluno) {
        List<Chamada> ultimasChamadas = chamadaRepository.findTop3ByAlunosOrderByDataDesc(aluno);

        boolean tresAusenciasSeguidas = ultimasChamadas.stream()
            .allMatch(chamada -> chamada.getChamadaAluno() == ChamadaAluno.AUSENTE);

        if (tresAusenciasSeguidas) {
            aluno.setAbandono(true);
            repository.save(aluno);
        }
    }
    // metodo para inserir atributos
    private void copyDtoToEntity(AlunosDTO dto, Alunos entity) {
        atualizarIdade(dto);
        entity.setNome(dto.getNome());
        entity.setDataNascimento(dto.getDataNascimento());
        entity.setIdade(dto.getIdade());
        entity.setEmail(dto.getEmail());
        entity.setResponsavel(dto.getResponsavel());
        entity.setRg(dto.getRg());
        entity.setCpfResponsavel(dto.getCpfResponsavel());
        entity.setBairro(dto.getBairro());
        entity.setCep(dto.getCep());
        entity.setCidade(dto.getCidade());
        entity.setComplemento(dto.getComplemento());
        entity.setNumero(dto.getNumero());
        entity.setTelefone(dto.getTelefone());
        entity.setUrl(dto.getUrl());
        entity.setRua(dto.getRua());
        entity.setAlunoDoenca(dto.getAlunoDoenca());
        entity.setSangue(dto.getSangue());
        entity.setAtivo(dto.isAtivo()); 
        entity.setAbandono(dto.isAbandono());
        entity.setDataReativado(dto.getDataReativado());
        entity.setDataMatricula(dto.getDataMatricula());
        entity.setDataInativo(dto.getDataInativo());
        entity.setHorario(dto.getHorario());
        entity.setGrauParentesco(dto.getGrauParentesco());
        entity.setPergunta(dto.getPergunta());
        
        
        ProjetosDTO pjDTO = dto.getProjetos();
        Projetos projetos = projetosRepository.getReferenceById(pjDTO.getId());
        entity.setProjetos(projetos);

     
        List<ChamadaDTO> chaDTO = dto.getChamada();
        List<Chamada> chamada = chaDTO.stream()
            .map(chamadaDto -> chamadaRepository.getReferenceById(chamadaDto.getId()))
            .collect(Collectors.toList());
        entity.setChamada(chamada);

     
        List<PagamentoDTO> pgDTO = dto.getPagamentos();
        List<Pagamento> pagamentos = pgDTO.stream()
            .map(pagamentoDto -> pagamentoRepository.getReferenceById(pagamentoDto.getId()))
            .collect(Collectors.toList());
        entity.setPagamentos(pagamentos);

     
        if (dto.getAlunoStatus() != null) {
            AlunoStatusDTO aluDTO = dto.getAlunoStatus();
            AlunoStatus alunoStatus = alunoStatusRepository.getReferenceById(aluDTO.getId());
            entity.setAlunoStatus(alunoStatus);
        } else {
            entity.setAlunoStatus(null); 
        }
    }
    
 // Calcula a idade apenas se a idade estiver vazia
    public void atualizarIdade(AlunosDTO dto) {
        LocalDate dataNascimento = dto.getDataNascimento();
        Integer idadeAtual = dto.getIdade(); 
        
        
        if (dataNascimento != null && idadeAtual == null) {
            LocalDate dataAtual = LocalDate.now();
            Period periodo = Period.between(dataNascimento, dataAtual);
            dto.setIdade(periodo.getYears());
        }
    }
 // Verifica o Pagamento
    private void verificarStatusPagamento(AlunosDTO dto) {
        LocalDate hoje = LocalDate.now();
        LocalDate dia10DoMes = LocalDate.of(hoje.getYear(), hoje.getMonth(), 10);
        
        // Verifica se há pelo menos um pagamento registrado
        boolean temPagamento = !dto.getPagamentos().isEmpty();
        
    
        if (temPagamento) {
            dto.setStatusPagamento("Pago");
        } else if (hoje.isBefore(dia10DoMes)) {
            dto.setStatusPagamento("Em Dia");
        } else {
            dto.setStatusPagamento("Pendente");
        }
    }
}




