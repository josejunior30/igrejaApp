package com.esibape.service;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.esibape.DTO.ChamadaDTO;
import com.esibape.DTO.RoleDTO;
import com.esibape.DTO.UserDTO;
import com.esibape.entities.Chamada;
import com.esibape.entities.Role;
import com.esibape.entities.User;
import com.esibape.repository.RoleRepository;
import com.esibape.repository.UserRepository;


@Service
public class UserService implements UserDetailsService {
	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private RoleRepository roleRepository;	
	
	@Transactional(readOnly = true)
	public List<UserDTO> findAll() {
		List<User> list = repository.findAll();
		return list.stream()
		           .map(x -> new UserDTO(x))
		           .collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
    public UserDTO findById(Long id) {
    	Optional<User> user = repository.findById(id);
    	User entity = user.get();
    	return new UserDTO(entity);
    }
  
    @Transactional
    public UserDTO update(Long id, UserDTO dto) {
    	User entity = repository.getReferenceById(id);
    	copyDtoToEntity(dto, entity, passwordEncoder());
    	entity = repository.save(entity);
		return new UserDTO(entity);
    }
    
    public void delete(Long id) {
    	repository.deleteById(id);
    }
    
    @Transactional
    public UserDTO insert(UserDTO dto) {
    	User entity = new User();
    	copyDtoToEntity(dto, entity, passwordEncoder());
    	entity = repository.save(entity);
    	return new UserDTO(entity);
    }
    private void copyDtoToEntity(UserDTO dto, User entity, PasswordEncoder passwordEncoder) {
        entity.setNome(dto.getNome());
        entity.setEmail(dto.getEmail());
        
        // Codificando a senha antes de salvar na entidade
        String encodedPassword = passwordEncoder.encode(dto.getPassword());
        entity.setPassword(encodedPassword);
        
        // Obtendo os IDs das roles do DTO e mapeando para entidades de Role correspondentes
        Set<RoleDTO> roleDTOs = dto.getRoles();
        Set<Role> roles = roleDTOs.stream()
                .map(roleDto -> roleRepository.findById(roleDto.getId()).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());
        entity.setRoles(roles);

        // Definindo as roles na entidade User
        entity.setRoles(roles);
    }


  

    

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = repository.findByEmail(username);
		if (user == null) {
			throw new UsernameNotFoundException("Email not found");
		}
		return user;
	}
	  public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
  
   
  protected User authenticated() {
	  try{
		  String username = SecurityContextHolder.getContext().getAuthentication().getName();
		  return repository.findByEmail(username);
	  }catch( Exception e){
		  throw new UsernameNotFoundException("User not found");
	  }
  }
  @Transactional(readOnly = true)
  public UserDTO getMe() {
      User entity = authenticated();
      if (entity == null) {
          // Tratar o caso em que nenhum usuário autenticado é encontrado
          throw new UsernameNotFoundException("Authenticated user not found");
      }
      return new UserDTO(entity);
  }


}