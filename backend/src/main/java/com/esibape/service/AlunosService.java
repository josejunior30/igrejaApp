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
    
    

    @Transactional(readOnly = true)
    public List<AlunosDTO> findAll() {
        List<Alunos> list = repository.findByAtivoTrue(); // Modificado para buscar apenas alunos ativos
        return list.stream()
            .map(x -> {
                AlunosDTO dto = new AlunosDTO(x, x.getProjetos(), x.getAlunoStatus(), x.getChamada(), x.getPagamentos());
                atualizarIdade(dto);
                verificarStatusPagamento(dto);
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
        Alunos entity = repository.findByIdAndAtivoTrue(id)
                .orElseThrow(() -> new NoSuchElementException("Aluno não encontrado ou inativo"));
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
    
    @Transactional(readOnly = true)
    public List<AlunosDTO> findByNomeIgnoreCaseContaining(String nome) {
        List<Alunos> result = repository.findByNomeIgnoreCaseContaining(nome); // Busca alunos independentemente do status 'ativo'
        return result.stream().map(x -> new AlunosDTO(x)).toList();
    }

    @Transactional(readOnly = true)
    public List<AlunosDTO> findByHorario(LocalTime horario) {
        List<Alunos> result = repository.findByHorarioAndAtivoTrue(horario); // Modificado para buscar apenas alunos ativos
        return result.stream().map(x -> new AlunosDTO(x)).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AlunosDTO> findByProjetoId(Long projetoId) {
        List<Alunos> result = repository.findByProjetosIdAndAtivoTrue(projetoId); // Modificado para buscar apenas alunos ativos
        return result.stream().map(x -> new AlunosDTO(x)).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AlunosDTO> findByProjetoIdAndHorario(Long projetoId, LocalTime horario) {
        List<Alunos> result = repository.findByProjetosIdAndHorarioAndAtivoTrue(projetoId, horario); // Modificado para buscar apenas alunos ativos
        return result.stream().map(x -> new AlunosDTO(x)).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AlunosDTO> findAllAlunos() {
        List<Alunos> list = repository.findAll(); // Busca todos os alunos, ativos e inativos
        return list.stream()
            .map(x -> {
                AlunosDTO dto = new AlunosDTO(x, x.getProjetos(), x.getAlunoStatus(), x.getChamada(), x.getPagamentos());
                verificarStatusPagamento(dto);
                return dto;
            })
            .collect(Collectors.toList());
    }

    
    
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
        entity.setDataReativado(dto.getDataReativado());
        entity.setDataMatricula(dto.getDataMatricula());
        entity.setDataInativo(dto.getDataInativo());
        entity.setHorario(dto.getHorario());
        entity.setGrauParentesco(dto.getGrauParentesco());
        entity.setPergunta(dto.getPergunta());

        // Configuração de Projetos
        ProjetosDTO pjDTO = dto.getProjetos();
        Projetos projetos = projetosRepository.getReferenceById(pjDTO.getId());
        entity.setProjetos(projetos);

        // Configuração de Chamada
        List<ChamadaDTO> chaDTO = dto.getChamada();
        List<Chamada> chamada = chaDTO.stream()
            .map(chamadaDto -> chamadaRepository.getReferenceById(chamadaDto.getId()))
            .collect(Collectors.toList());
        entity.setChamada(chamada);

        // Configuração de Pagamentos
        List<PagamentoDTO> pgDTO = dto.getPagamentos();
        List<Pagamento> pagamentos = pgDTO.stream()
            .map(pagamentoDto -> pagamentoRepository.getReferenceById(pagamentoDto.getId()))
            .collect(Collectors.toList());
        entity.setPagamentos(pagamentos);

        // Configuração de AlunoStatus
        if (dto.getAlunoStatus() != null) {
            AlunoStatusDTO aluDTO = dto.getAlunoStatus();
            AlunoStatus alunoStatus = alunoStatusRepository.getReferenceById(aluDTO.getId());
            entity.setAlunoStatus(alunoStatus);
        } else {
            entity.setAlunoStatus(null); // Permite que alunoStatus seja nulo na entidade
        }
    }

    public void atualizarIdade(AlunosDTO dto) {
        LocalDate dataNascimento = dto.getDataNascimento();
        Integer idadeAtual = dto.getIdade(); 
        
        // Calcula a idade apenas se a idade estiver vazia
        if (dataNascimento != null && idadeAtual == null) {
            LocalDate dataAtual = LocalDate.now();
            Period periodo = Period.between(dataNascimento, dataAtual);
            dto.setIdade(periodo.getYears());
        }
    }

    private void verificarStatusPagamento(AlunosDTO dto) {
        LocalDate hoje = LocalDate.now();
        LocalDate dia10DoMes = LocalDate.of(hoje.getYear(), hoje.getMonth(), 10);
        
        // Verifica se há pelo menos um pagamento registrado
        boolean temPagamento = !dto.getPagamentos().isEmpty();
        
        // Determina o status de acordo com a data e a presença de pagamentos
        if (temPagamento) {
            dto.setStatusPagamento("Pago");
        } else if (hoje.isBefore(dia10DoMes)) {
            dto.setStatusPagamento("Em Dia");
        } else {
            dto.setStatusPagamento("Pendente");
        }
    }
}




