package com.esibape.service;



import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.OutrosPGDTO;
import com.esibape.DTO.PagamentoDTO;
import com.esibape.entities.MesReferencia;
import com.esibape.entities.OutrosPG;
import com.esibape.entities.Pagamento;
import com.esibape.repository.OutrosPGRepository;


@Service
public class OutrosPGService {
    @Autowired
    private OutrosPGRepository repository;
   

    @Transactional(readOnly = true)
    public List<OutrosPGDTO> findAll() {
        List<OutrosPG> list = repository.findAll();
        return list.stream()
            .map(x -> {
            	OutrosPGDTO dto = new OutrosPGDTO(x);
        
                return dto;
            })
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public OutrosPGDTO findById(Long id) {
        Optional<OutrosPG> outrosPG = repository.findById(id);
        OutrosPG entity = outrosPG.get();
        OutrosPGDTO dto = new OutrosPGDTO(entity);
        return dto;
    }

    @Transactional
    public OutrosPGDTO insert(OutrosPGDTO dto) {
    	OutrosPG entity = new OutrosPG();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new OutrosPGDTO(entity);
    }

    @Transactional
    public OutrosPGDTO update(Long id, OutrosPGDTO dto) {
    	OutrosPG entity = repository.getReferenceById(id);
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new OutrosPGDTO(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }



    private void copyDtoToEntity(OutrosPGDTO dto, OutrosPG entity) {
    
        entity.setEntrada(dto.getEntrada());
        entity.setValor(dto.getValor());
        entity.setMesReferencia(dto.getMesReferencia());
        entity.setFormaPagamento(dto.getFormaPagamento());

     
    }
    @Transactional(readOnly = true)
    public List<OutrosPGDTO> findEntradaByMesReferencia(MesReferencia mesReferencia) {
        List<OutrosPG> outros = repository.findByMesReferencia(mesReferencia);
      
        return outros.stream()
                     .map(outrosPG -> new OutrosPGDTO(outrosPG))
                     .collect(Collectors.toList());
    }
}

