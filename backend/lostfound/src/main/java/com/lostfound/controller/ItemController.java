package com.lostfound.controller;

import com.lostfound.dto.ItemDTO;
import com.lostfound.model.Item;
import com.lostfound.model.ItemType;
import com.lostfound.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        return ResponseEntity.ok(itemService.createItem(item));
    }

    @PostMapping("/with-image")
    public ResponseEntity<Item> createItemWithImage(
            @RequestParam String itemName,
            @RequestParam String category,
            @RequestParam String description,
            @RequestParam String location,
            @RequestParam String date,
            @RequestParam ItemType type,
            @RequestParam Long userId,
            @RequestParam(required = false) MultipartFile image) {

        Item item = new Item();

        item.setItemName(itemName);
        item.setCategory(category);
        item.setDescription(description);
        item.setLocation(location);
        item.setDate(LocalDate.parse(date));
        item.setType(type);

        com.lostfound.model.User user = new com.lostfound.model.User();
        user.setId(userId);

        item.setUser(user);

        item.setStatus(com.lostfound.model.ItemStatus.ACTIVE);

        return ResponseEntity.ok(
                itemService.createItemWithImage(item, image)
        );
    }

    @GetMapping
    public ResponseEntity<List<ItemDTO>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @GetMapping("/search")
    public ResponseEntity<List<ItemDTO>> searchItems(
            @RequestParam String keyword) {

        return ResponseEntity.ok(itemService.searchItems(keyword));
    }

    @GetMapping("/filter/type")
    public ResponseEntity<List<ItemDTO>> filterByType(
            @RequestParam ItemType type) {

        return ResponseEntity.ok(itemService.filterByType(type));
    }

    @GetMapping("/filter/category")
    public ResponseEntity<List<ItemDTO>> filterByCategory(
            @RequestParam String category) {

        return ResponseEntity.ok(itemService.filterByCategory(category));
    }

    @GetMapping("/filter/location")
    public ResponseEntity<List<ItemDTO>> filterByLocation(
            @RequestParam String location) {

        return ResponseEntity.ok(itemService.filterByLocation(location));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDTO> getItemById(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(
            @PathVariable Long id,
            @RequestBody Item item) {

        return ResponseEntity.ok(itemService.updateItem(id, item));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable Long id) {

        itemService.deleteItem(id);

        return ResponseEntity.ok("Item deleted successfully");
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<Item> resolveItem(@PathVariable Long id) {

        return ResponseEntity.ok(itemService.resolveItem(id));
    }
}