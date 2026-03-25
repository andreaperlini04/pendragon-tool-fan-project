package com.pendragon.backend.controller;

import com.pendragon.backend.model.NPC;
import com.pendragon.backend.repository.NPCRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/npcs")
public class NPCController {

    @Autowired
    private NPCRepository repository;

    @GetMapping
    public List<NPC> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public NPC create(@RequestBody NPC npc) {
        return repository.save(npc);
    }

    @GetMapping("/{id}")
    public NPC getById(@PathVariable String id) {
        return repository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public NPC update(@PathVariable String id, @RequestBody NPC npc) {
        npc.setId(id);
        return repository.save(npc);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        repository.deleteById(id);
    }
}
