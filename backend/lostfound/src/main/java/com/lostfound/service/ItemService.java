package com.lostfound.service;
import com.lostfound.model.ItemType;
import com.lostfound.dto.ItemDTO;
import com.lostfound.model.Item;
import com.lostfound.model.ItemStatus;
import com.lostfound.model.User;
import com.lostfound.repository.ClaimRepository;
import com.lostfound.repository.ItemRepository;
import com.lostfound.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ItemService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private final ItemRepository itemRepository;

    @Autowired
    private ClaimRepository claimRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Item createItem(Item item) {

        if (item.getUser() == null || item.getUser().getId() == null) {
            throw new RuntimeException("User ID is required");
        }

        Long userId = item.getUser().getId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        item.setUser(user);

        return itemRepository.save(item);
    }

    public List<ItemDTO> getAllItems() {

        return itemRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public ItemDTO getItemById(Long id) {

        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        return convertToDTO(item);
    }

    public Item updateItem(Long id, Item updatedItem) {

        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        item.setItemName(updatedItem.getItemName());
        item.setCategory(updatedItem.getCategory());
        item.setDescription(updatedItem.getDescription());
        item.setLocation(updatedItem.getLocation());
        item.setDate(updatedItem.getDate());
        item.setType(updatedItem.getType());

        return itemRepository.save(item);
    }

    @Transactional
    public void deleteItem(Long id) {

        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        claimRepository.deleteByItemId(id);

        itemRepository.delete(item);
    }

    public Item resolveItem(Long id) {

        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        item.setStatus(ItemStatus.RESOLVED);

        return itemRepository.save(item);
    }

    private ItemDTO convertToDTO(Item item) {

        ItemDTO dto = new ItemDTO();

        dto.setId(item.getId());
        dto.setItemName(item.getItemName());
        dto.setCategory(item.getCategory());
        dto.setDescription(item.getDescription());
        dto.setLocation(item.getLocation());
        dto.setDate(item.getDate());
        dto.setType(item.getType());
        dto.setStatus(item.getStatus());
        dto.setUserId(item.getUser().getId());

        return dto;
    }

    public List<ItemDTO> searchItems(String keyword) {

        return itemRepository.findByItemNameContainingIgnoreCase(keyword)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<ItemDTO> filterByType(ItemType type) {

        return itemRepository.findByType(type)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<ItemDTO> filterByCategory(String category) {

        return itemRepository.findByCategoryIgnoreCase(category)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<ItemDTO> filterByLocation(String location) {

        return itemRepository.findByLocationContainingIgnoreCase(location)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }
}