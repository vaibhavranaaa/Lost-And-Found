package com.lostfound.repository;

import com.lostfound.model.Item;
import com.lostfound.model.ItemType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByType(ItemType type);

    List<Item> findByCategoryIgnoreCase(String category);

    List<Item> findByLocationContainingIgnoreCase(String location);

    List<Item> findByItemNameContainingIgnoreCase(String itemName);
}