package com.lostfound.service;

import com.lostfound.model.Claim;
import com.lostfound.model.ClaimStatus;
import com.lostfound.repository.ClaimRepository;
import com.lostfound.repository.ItemRepository;
import com.lostfound.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClaimService {

    private final ClaimRepository claimRepository;
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    public ClaimService(
            ClaimRepository claimRepository,
            ItemRepository itemRepository,
            UserRepository userRepository) {

        this.claimRepository = claimRepository;
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }

    public Claim createClaim(Claim claim) {

        if (claim.getItem() == null || claim.getItem().getId() == null) {
            throw new RuntimeException("Item ID is required");
        }

        if (claim.getUser() == null || claim.getUser().getId() == null) {
            throw new RuntimeException("User ID is required");
        }

        Long itemId = claim.getItem().getId();
        Long userId = claim.getUser().getId();

        claim.setItem(
                itemRepository.findById(itemId)
                        .orElseThrow(() -> new RuntimeException("Item not found"))
        );

        claim.setUser(
                userRepository.findById(userId)
                        .orElseThrow(() -> new RuntimeException("User not found"))
        );

        claim.setStatus(ClaimStatus.PENDING);

        return claimRepository.save(claim);
    }

    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    public Claim getClaimById(Long id) {

        return claimRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim not found"));
    }

    public List<Claim> getClaimsByItem(Long itemId) {

        return claimRepository.findByItemId(itemId);
    }

    public List<Claim> getClaimsByUser(Long userId) {

        return claimRepository.findByUserId(userId);
    }

    public Claim acceptClaim(Long id) {

        Claim claim = getClaimById(id);

        claim.setStatus(ClaimStatus.ACCEPTED);

        return claimRepository.save(claim);
    }

    public Claim rejectClaim(Long id) {

        Claim claim = getClaimById(id);

        claim.setStatus(ClaimStatus.REJECTED);

        return claimRepository.save(claim);
    }
}
