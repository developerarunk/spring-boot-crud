package com.example.demo.controller;

import com.example.demo.dto.ItemDTO;
import com.example.demo.service.FileStorageService;
import com.example.demo.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping
    public List<ItemDTO> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/{id}")
    public ItemDTO getItemById(@PathVariable Long id) {
        return itemService.getItemById(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ItemDTO createItem(@ModelAttribute ItemDTO itemDTO,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        if (image != null && !image.isEmpty()) {
            String fileName = fileStorageService.store(image);
            itemDTO.setImageUrl(fileName);
        }
        return itemService.createItem(itemDTO);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ItemDTO updateItem(@PathVariable Long id, @ModelAttribute ItemDTO itemDTO,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        if (image != null && !image.isEmpty()) {
            String fileName = fileStorageService.store(image);
            itemDTO.setImageUrl(fileName);
        }
        return itemService.updateItem(id, itemDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
    }
}
