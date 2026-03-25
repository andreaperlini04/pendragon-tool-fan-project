package com.pendragon.backend.controller;

import com.pendragon.backend.model.Quest;
import com.pendragon.backend.repository.QuestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quests")
public class QuestController {

    @Autowired
    private QuestRepository repository;

    @GetMapping
    public List<Quest> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Quest create(@RequestBody Quest quest) {
        return repository.save(quest);
    }

    @GetMapping("/{id}")
    public Quest getById(@PathVariable("id") String id) {
        return repository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Quest update(@PathVariable("id") String id, @RequestBody Quest quest) {
        quest.setId(id);
        return repository.save(quest);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        repository.deleteById(id);
    }
}
