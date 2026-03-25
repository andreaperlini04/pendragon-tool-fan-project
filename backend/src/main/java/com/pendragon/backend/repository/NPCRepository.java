package com.pendragon.backend.repository;

import com.pendragon.backend.model.NPC;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NPCRepository extends MongoRepository<NPC, String> {
}
