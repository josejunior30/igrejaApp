package com.esibape.DTO;





import com.esibape.entities.Role;


public class RoleDTO{

	
	private Long id;
	private String authority;
	

    public RoleDTO() {
    }

	
	public RoleDTO(Long id, String authority) {
		super();
		this.id = id;
		this.authority = authority;
	}
	public RoleDTO(Role entity){
		id= entity.getId();
		authority= entity.getAuthority();
		
	}
	public long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}


	public String getAuthority() {
		return authority;
	}


	public void setAuthority(String authority) {
		this.authority = authority;
	}
	
	
	
}
