package com.esibape.service;



import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.MembroDTO;
import com.esibape.DTO.PequenoGrupoDTO;
import com.esibape.entities.Membro;
import com.esibape.entities.PequenoGrupo;
import com.esibape.repository.MembroRepository;
import com.esibape.repository.PequenoGrupoRepository;


@Service
public class MembroService {
    
    @Autowired
    private MembroRepository repository;
    
    @Autowired
    private PequenoGrupoRepository pequenoGrupoRepository;
   
    @Autowired
    private FileStorageService fileStorageService;
   
    @Transactional(readOnly = true)
    public List<MembroDTO> findAll() {
        List<Membro> list = repository.findAll();
        
        return  list.stream()
	               .map(x -> new MembroDTO(x, x.getPequenoGrupo()))
	               .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public MembroDTO findById(Long id) {
    	Optional<Membro> membro = repository.findById(id);
    	Membro entity = membro.get();
    	return  new MembroDTO(entity, entity.getPequenoGrupo());
    }
   
    @Transactional
    public MembroDTO insert( MembroDTO dto) {
    		Membro entity =  new Membro();
    		copyDtoToEntity(dto, entity);
    		entity = repository.save(entity);
    		return new MembroDTO(entity);
    	
    }
    
    @Transactional
    public MembroDTO update(Long id, MembroDTO dto) {
    	Membro entity=repository.getReferenceById(id);
    	copyDtoToEntity(dto, entity);
    	entity = repository.save(entity);
		return new MembroDTO(entity);
    }
    public void delete(Long id) {
    	repository.deleteById(id);
 
    }
    private void copyDtoToEntity(MembroDTO dto, Membro entity) {
		entity.setNome(dto.getNome());
		entity.setSobrenome(dto.getSobrenome());
		entity.setEmail(dto.getEmail());
		entity.setDataNascimento(dto.getDataNascimento());
		entity.setIdade(dto.getIdade());
		entity.setTelefone(dto.getTelefone());
		entity.setCpf(dto.getCpf());
		entity.setBairro(dto.getBairro());
		entity.setCep(dto.getCep());
		entity.setCidade(dto.getCidade());
		entity.setComplemento(dto.getComplemento());
		entity.setRua(dto.getRua());
		entity.setNumero(dto.getNumero());
		entity.setEstadoCivil(dto.getEstadoCivil());
		PequenoGrupoDTO pgDTO = dto.getPequenoGrupo();
		PequenoGrupo pequenoGrupo = pequenoGrupoRepository.getReferenceById(pgDTO.getId());
		entity.setPequenoGrupo(pequenoGrupo);
	
		
	}	
    
    
    @Transactional(readOnly = true)
	public List<MembroDTO> findByNomeIgnoreCaseContaining(String nome) {
		List<Membro> result = repository.findByNomeIgnoreCaseContaining(nome);
		 return  result.stream().map(x -> new MembroDTO(x)).toList();
		
	}
    @Transactional(readOnly = true)
    public List<MembroDTO> findByPequenoGrupoApelido(String apelido) {
        List<Membro> result = repository.findByPequenoGrupo_Apelido(apelido);
		 return  result.stream().map(x -> new MembroDTO(x)).toList();
    }

    public void atualizarIdade(MembroDTO dto) {
        LocalDate dataNascimento = dto.getDataNascimento();
        Integer idadeAtual = dto.getIdade(); // Verifica se a idade já foi definida explicitamente
        
        // Calcula a idade apenas se a idade estiver vazia
        if (dataNascimento != null && idadeAtual == null) {
            LocalDate dataAtual = LocalDate.now();
            Period periodo = Period.between(dataNascimento, dataAtual);
            dto.setIdade(periodo.getYears());
        }
    }
        
        
    
    
}

