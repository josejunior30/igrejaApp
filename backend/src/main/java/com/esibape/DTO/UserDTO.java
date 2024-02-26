package com.esibape.DTO;

import java.io.Serializable;
import java.util.Objects;

import com.esibape.entities.User;
import com.esibape.entities.UserRole;

public class UserDTO implements Serializable{
	private static final long serialVersionUID = 1L;

	private Long id;
	private String nome;
	private String email;
	private String password;
	private UserRole role;
	
	public UserDTO(){
		
	}

	public UserDTO(Long id, String nome, String email, String password, UserRole role) {
		super();
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.password = password;
		this.role = role;
	}
	
	public UserDTO(User entity){
		this.id= entity.getId();
		this.nome= entity.getNome();
		this.email= entity.getEmail();
		this.password= entity.getPassword();
		this.role= entity.getRole();
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

	public UserRole getRole() {
		return role;
	}

	public void setRole(UserRole role) {
		this.role = role;
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
