package com.esibape.service;


import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.esibape.DTO.RoleDTO;
import com.esibape.DTO.UserDTO;

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
        String encodedPassword = passwordEncoder.encode(dto.getPassword());
        entity.setPassword(encodedPassword);
        Set<RoleDTO> roleDTOs = dto.getRoles();
        Set<Role> roles = roleDTOs.stream()
                .map(roleDto -> roleRepository.findById(roleDto.getId()).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());
        entity.setRoles(roles);

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
		    try {
		        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		        if (auth == null) {
		            throw new UsernameNotFoundException("Authentication is null");
		        }

		        String username = auth.getName();
		        System.out.println("Authenticated username: " + username); // Log para debug

		        User user = repository.findByEmail(username);
		        if (user == null) {
		            throw new UsernameNotFoundException("User not found for email: " + username);
		        }
		        return user;
		    } catch (Exception e) {
		        throw new UsernameNotFoundException("User not found", e);
		    }
		}

  @Transactional(readOnly = true)
  public UserDTO getMe() {
      User entity = authenticated();
      if (entity == null) {
        
          throw new UsernameNotFoundException("Authenticated user not found");
      }
      return new UserDTO(entity);
  }

  @Transactional
  public void changePassword(String username, String oldPassword, String newPassword) {
      // Recupera o usuário autenticado pelo email
      User user = repository.findByEmail(username);
      
      // Verifica se o usuário foi encontrado
      if (user == null) {
          throw new UsernameNotFoundException("Usuário não encontrado");
      }
      
      // Verifica se a senha antiga fornecida corresponde à senha armazenada
      if (!passwordEncoder().matches(oldPassword, user.getPassword())) {
          throw new IllegalArgumentException("Senha antiga incorreta");
      }
      
      // Codifica a nova senha
      String encodedPassword = passwordEncoder().encode(newPassword);
      
      // Define a nova senha e salva no banco de dados
      user.setPassword(encodedPassword);
      repository.save(user);
  }

}