package com.lostfound.service;

import com.lostfound.dto.UserDTO;
import com.lostfound.model.Claim;
import com.lostfound.model.Item;
import com.lostfound.model.User;
import com.lostfound.repository.ClaimRepository;
import com.lostfound.repository.ItemRepository;
import com.lostfound.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    private final ClaimRepository claimRepository;

    public AdminService(
            UserRepository userRepository,
            ItemRepository itemRepository,
            ClaimRepository claimRepository) {

        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
        this.claimRepository = claimRepository;
    }

    public List<UserDTO> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    public void deleteItem(Long id) {

        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        itemRepository.delete(item);
    }

    public void deleteUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userRepository.delete(user);
    }

    private UserDTO convertToDTO(User user) {

        UserDTO dto = new UserDTO();

        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());

        return dto;
    }
}