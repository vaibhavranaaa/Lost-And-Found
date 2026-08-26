package com.lostfound.service;

import com.lostfound.dto.ClaimDTO;
import com.lostfound.model.Claim;
import com.lostfound.model.ClaimStatus;
import com.lostfound.repository.ClaimRepository;
import com.lostfound.repository.ItemRepository;
import com.lostfound.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lostfound.model.Item;
import com.lostfound.model.ItemStatus;

import java.util.List;

@Service
public class ClaimService {

    @Autowired
    private final ClaimRepository claimRepository;

    @Autowired
    private final ItemRepository itemRepository;

    @Autowired
    private final UserRepository userRepository;

    public ClaimService(
            ClaimRepository claimRepository,
            ItemRepository itemRepository,
            UserRepository userRepository) {

        this.claimRepository = claimRepository;
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }

    public ClaimDTO createClaim(Claim claim) {

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

        Claim savedClaim = claimRepository.save(claim);

        return convertToDTO(savedClaim);
    }

    public List<ClaimDTO> getAllClaims() {

        return claimRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public ClaimDTO getClaimById(Long id) {

        Claim claim = claimRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim not found"));

        return convertToDTO(claim);
    }

    public List<ClaimDTO> getClaimsByItem(Long itemId) {

        return claimRepository.findByItemId(itemId)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<ClaimDTO> getClaimsByUser(Long userId) {

        return claimRepository.findByUserId(userId)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public ClaimDTO acceptClaim(Long id) {

        Claim claim = getClaimEntity(id);

        claim.setStatus(ClaimStatus.ACCEPTED);

        return convertToDTO(claimRepository.save(claim));
    }

    public ClaimDTO rejectClaim(Long id) {

        Claim claim = getClaimEntity(id);

        claim.setStatus(ClaimStatus.REJECTED);

        return convertToDTO(claimRepository.save(claim));
    }

    private Claim getClaimEntity(Long id) {

        return claimRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim not found"));
    }

    private ClaimDTO convertToDTO(Claim claim) {

        ClaimDTO dto = new ClaimDTO();

        dto.setId(claim.getId());
        dto.setItemId(claim.getItem().getId());
        dto.setUserId(claim.getUser().getId());
        dto.setMessage(claim.getMessage());
        dto.setStatus(claim.getStatus());

        return dto;
    }

    public ClaimDTO adminAcceptClaim(Long id) {

        Claim claim = getClaimEntity(id);

        claim.setStatus(ClaimStatus.ACCEPTED);

        Claim savedClaim = claimRepository.save(claim);

        Item item = claim.getItem();
        item.setStatus(ItemStatus.RESOLVED);

        itemRepository.save(item);

        return convertToDTO(savedClaim);
    }

    public ClaimDTO adminRejectClaim(Long id) {

        Claim claim = getClaimEntity(id);

        claim.setStatus(ClaimStatus.REJECTED);

        return convertToDTO(
                claimRepository.save(claim)
        );
    }
}