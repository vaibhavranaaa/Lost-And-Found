package com.lostfound.controller;

import com.lostfound.dto.ItemDTO;
import com.lostfound.model.Item;
import com.lostfound.model.ItemType;
import com.lostfound.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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