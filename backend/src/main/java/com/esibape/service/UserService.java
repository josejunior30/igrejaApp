package com.esibape.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.UserDTO;
import com.esibape.entities.User;
import com.esibape.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository repository;
	
	@Transactional(readOnly = true)
	public List<UserDTO>findAll(){
		List<User> list= repository.findAll();
		 return list.stream()
	               .map(x -> new UserDTO(x))
	               .collect(Collectors.toList());
		
	}
	@Transactional(readOnly = true)
    public UserDTO findById(Long id) {
    	Optional<User> user = repository.findById(id);
    	User entity = user.get();
    	return  new UserDTO(entity) ;
    }
    @Transactional
    public UserDTO insert( UserDTO dto) {
    		User entity =  new User();
    		copyDtoToEntity(dto, entity);
    		entity = repository.save(entity);
    		return new UserDTO(entity);
    	
    }
    @Transactional
    public UserDTO update(Long id, UserDTO dto) {
    	User entity=repository.getReferenceById(id);
    	copyDtoToEntity(dto, entity);
    	entity = repository.save(entity);
		return new UserDTO(entity);
    }
    
    
    public void delete(Long id) {
    	repository.deleteById(id);
 
    }
    
    private void copyDtoToEntity(UserDTO dto, User entity) {
		entity.setNome(dto.getNome());
		entity.setEmail(dto.getEmail());
		entity.setPassword(dto.getPassword());
		entity.setRole(dto.getRole());
	}
}
