package com.esibape.resource;


import java.net.URI;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.esibape.DTO.UserDTO;
import com.esibape.service.UserService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value="/user")
public class UserController {
	
	
	@Autowired
	private UserService service;
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_OPERATOR')")
	@GetMapping
	public ResponseEntity<List<UserDTO>> findAll(){
		List<UserDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_OPERATOR')")
	@GetMapping(value="/{id}")
	public ResponseEntity<UserDTO>findById(@PathVariable Long id){
		UserDTO user = service.findById(id);
		return ResponseEntity.ok().body(user);
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_OPERATOR')")
	@PostMapping
	public ResponseEntity<UserDTO> insert(@RequestBody UserDTO dto){
		dto= service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();
		
		
		
		return ResponseEntity.created(uri).body(dto);		
}	
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_OPERATOR')")
	@DeleteMapping(value="/{id}")
	public ResponseEntity<UserDTO>delete(@PathVariable Long id){
		 service.delete(id);
		return ResponseEntity.noContent().build();
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_OPERATOR')")
	@GetMapping(value="/me")
	public ResponseEntity<UserDTO> getMe() {
		UserDTO dto = service.getMe();
		return ResponseEntity.ok(dto);
	}
	@PutMapping(value="/{id}")
	public ResponseEntity<UserDTO>update (@PathVariable Long id, @RequestBody UserDTO dto){
		 dto =service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_OPERATOR')")
	@PutMapping(value = "/me/password")
	public ResponseEntity<Void> changePassword(@RequestParam String oldPassword, @RequestParam String newPassword) {
	    // Recupera o email do usuário autenticado
	    String username = SecurityContextHolder.getContext().getAuthentication().getName();
	    
	    // Chama o método do serviço para alterar a senha
	    service.changePassword(username, oldPassword, newPassword);
	    
	    // Retorna uma resposta de sucesso
	    return ResponseEntity.noContent().build();
	}

	
	
	}
