package com.esibape.entities;

public enum FormaPagamento {
    PIX("pix"),
    DINHEIRO("dinheiro"),
	 GRATIS("gratis"),
	   CARTAO("cartao");
  

    
    private String descricao;

    FormaPagamento( String descricao) {
      
        this.descricao = descricao;
    }

   

    public String getDescricao() {
        return descricao;
    }
}

