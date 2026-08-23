package com.lostfound.controller;

import com.lostfound.model.Claim;
import com.lostfound.service.ClaimService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin
public class ClaimController {

    private final ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @PostMapping
    public ResponseEntity<Claim> createClaim(
            @RequestBody Claim claim) {

        return ResponseEntity.ok(
                claimService.createClaim(claim)
        );
    }

    @GetMapping
    public ResponseEntity<List<Claim>> getAllClaims() {

        return ResponseEntity.ok(
                claimService.getAllClaims()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Claim> getClaimById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                claimService.getClaimById(id)
        );
    }

    @GetMapping("/item/{itemId}")
    public ResponseEntity<List<Claim>> getClaimsByItem(
            @PathVariable Long itemId) {

        return ResponseEntity.ok(
                claimService.getClaimsByItem(itemId)
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Claim>> getClaimsByUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                claimService.getClaimsByUser(userId)
        );
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<Claim> acceptClaim(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                claimService.acceptClaim(id)
        );
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Claim> rejectClaim(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                claimService.rejectClaim(id)
        );
    }
}