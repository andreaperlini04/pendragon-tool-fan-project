package com.pendragon.backend.controller;

import com.pendragon.backend.model.PlayerCharacter;
import com.pendragon.backend.repository.PlayerCharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/characters")
public class PlayerCharacterController {

    @Autowired
    private PlayerCharacterRepository repository;

    @GetMapping
    public List<PlayerCharacter> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public PlayerCharacter create(@RequestBody PlayerCharacter character) {
        return repository.save(character);
    }

    @GetMapping("/{id}")
    public PlayerCharacter getById(@PathVariable String id) {
        return repository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public PlayerCharacter update(@PathVariable String id, @RequestBody PlayerCharacter character) {
        character.setId(id);
        return repository.save(character);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        repository.deleteById(id);
    }
}
