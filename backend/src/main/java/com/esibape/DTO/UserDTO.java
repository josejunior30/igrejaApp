package com.esibape.DTO;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;

import com.esibape.entities.User;


public class UserDTO implements Serializable{


	private static final long serialVersionUID = 1L;
	private Long id;
	private String nome;
	private String email;
	private String password;
	
	private Set<RoleDTO> roles = new HashSet<>();
	public UserDTO() {
		
	}
	

	public UserDTO(Long id, String nome, String email, String password, Set<RoleDTO> roles) {
		super();
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.password = password;
		this.roles = roles;
	}


	public UserDTO(User entity) {
        id = entity.getId();
        nome = entity.getNome();
        email = entity.getEmail();

        for (GrantedAuthority role : entity.getAuthorities()) {
            roles.add(new RoleDTO(id, role.getAuthority()));
        }
    }

	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public Set<RoleDTO> getRoles() {
		return roles;
	}


	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserDTO other = (UserDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
