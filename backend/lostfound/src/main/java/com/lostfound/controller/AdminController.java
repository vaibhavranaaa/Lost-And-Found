package com.lostfound.controller;

import com.lostfound.dto.UserDTO;
import com.lostfound.model.Claim;
import com.lostfound.model.Item;
import com.lostfound.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.lostfound.service.ClaimService;
import com.lostfound.dto.ClaimDTO;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    private final AdminService adminService;
    private final ClaimService claimService;

    public AdminController(
            AdminService adminService,
            ClaimService claimService) {

        this.adminService = adminService;
        this.claimService = claimService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {

        return ResponseEntity.ok(
                adminService.getAllUsers()
        );
    }

    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems() {

        return ResponseEntity.ok(
                adminService.getAllItems()
        );
    }

    @GetMapping("/claims")
    public ResponseEntity<List<Claim>> getAllClaims() {

        return ResponseEntity.ok(
                adminService.getAllClaims()
        );
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<String> deleteItem(
            @PathVariable Long id) {

        adminService.deleteItem(id);

        return ResponseEntity.ok("Item deleted successfully");
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long id) {

        adminService.deleteUser(id);

        return ResponseEntity.ok("User deleted successfully");
    }

    @PutMapping("/claims/{id}/accept")
    public ResponseEntity<ClaimDTO> acceptClaim(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                claimService.adminAcceptClaim(id)
        );
    }

    @PutMapping("/claims/{id}/reject")
    public ResponseEntity<ClaimDTO> rejectClaim(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                claimService.adminRejectClaim(id)
        );
    }
}