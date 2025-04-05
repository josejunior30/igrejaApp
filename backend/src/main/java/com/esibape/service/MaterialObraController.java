package com.esibape.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/materiais")
@CrossOrigin("http://localhost:3000")
public class MaterialObraController {

    @Autowired
    private MaterialObraService service;

    @PatchMapping("/{id}/checkin")
    public ResponseEntity<Void> atualizarCheckIn(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> payload
    ) {
        Boolean checkIn = payload.get("checkInConfirmado");
        service.atualizarCheckIn(id, checkIn);
        return ResponseEntity.noContent().build();
    }
}