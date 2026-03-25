package com.pendragon.backend.controller;

import com.pendragon.backend.model.Session;
import com.pendragon.backend.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    @Autowired
    private SessionRepository repository;

    @GetMapping
    public List<Session> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Session create(@RequestBody Session session) {
        return repository.save(session);
    }

    @GetMapping("/{id}")
    public Session getById(@PathVariable("id") String id) {
        return repository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Session update(@PathVariable("id") String id, @RequestBody Session session) {
        session.setId(id);
        return repository.save(session);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        repository.deleteById(id);
    }
}
