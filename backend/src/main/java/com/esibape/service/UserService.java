package com.esibape.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.esibape.DTO.RoleDTO;
import com.esibape.DTO.UserDTO;
import com.esibape.Projection.UserDetailsProjection;
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
		           .map(x -> new UserDTO(x, x.getRoles()))
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
    }
    
    @Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		List<UserDetailsProjection> result = repository.searchUserAndRolesByEmail(username);
		if (result.isEmpty()) {
			throw new UsernameNotFoundException("Email not found");
		}
		
		User user = new User();
		user.setEmail(result.get(0).getUsername());
		user.setPassword(result.get(0).getPassword());
		for (UserDetailsProjection projection : result) {
			user.addRole(new Role(projection.getRoleId(), projection.getAuthority()));
		}
		
		return user;
	}

    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
}
